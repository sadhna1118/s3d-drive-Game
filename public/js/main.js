/**
 * Velocity Rush: Neon Rebellion - Master Game Coordinator & AAA State Machine
 */
import { GameRenderer } from './engine/Renderer.js';
import { Track, TRACK_PRESETS } from './engine/Track.js';
import { Car } from './engine/Car.js';
import { BotRacer, RIVAL_PROFILES } from './engine/BotAI.js';
import { ParticleSystem } from './engine/Particles.js';
import { AudioManager } from './engine/Audio.js';
import { CameraController, CAMERA_MODES } from './engine/Camera.js';
import { Minimap } from './engine/Minimap.js';
import { InputManager } from './engine/Input.js';
import { NetworkClient } from './network/NetworkClient.js';
import { UIManager } from './ui/UIManager.js';
import { CareerManager } from './systems/CareerManager.js';
import { GhostCarManager } from './engine/GhostCar.js';
import { CAR_CONFIGS } from './engine/CarBuilder.js';
import { TelemetryManager } from './engine/Telemetry.js';
import { ReplaySystem } from './engine/Replay.js';
import { PhotoModeManager } from './engine/PhotoMode.js';
import { VoiceControlManager } from './engine/VoiceControl.js';

class GameApp {
  constructor() {
    this.state = 'GARAGE'; // 'GARAGE' | 'COUNTDOWN' | 'RACING' | 'FINISHED' | 'REPLAY' | 'PHOTO'
    this.mode = 'GP'; // 'GP' | 'DRIFT_ARENA' | 'TIME_ATTACK' | 'KNOCKOUT' | 'BOSS_BATTLE' | 'CAREER' | 'MP'

    // Core Systems
    this.career = new CareerManager();
    this.renderer = new GameRenderer(document.getElementById('canvas-container'));
    this.track = new Track(this.renderer.scene);
    this.track.buildTrack('neon_city', 'clear');

    try {
      this.audio = new AudioManager();
    } catch (e) {
      console.warn('Audio fallback:', e);
      this.audio = { init: () => {}, resume: () => {}, playBeep: () => {}, startMusic: () => {}, stopMusic: () => {}, cycleStation: () => ({ name: 'OFF' }), toggleMute: () => true, setWeatherAudio: () => {} };
    }

    try {
      this.voice = new VoiceControlManager();
    } catch (e) {
      console.warn('VoiceControl fallback:', e);
      this.voice = { isListening: false, toggleListening: () => {}, isSupported: false, voiceState: { throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false } };
    }

    try {
      this.input = new InputManager(this.voice);
    } catch (e) {
      console.warn('Input fallback:', e);
      this.input = { getState: () => ({ throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false }), keys: {} };
    }

    try {
      this.particles = new ParticleSystem(this.renderer.scene);
    } catch (e) {
      console.warn('Particles fallback:', e);
      this.particles = { update: () => {}, setWeather: () => {}, emitSkid: () => {}, emitNitro: () => {}, emitSparks: () => {}, emitExplosion: () => {} };
    }

    try {
      this.cameraCtrl = new CameraController(this.renderer.camera, this.renderer.scene);
    } catch (e) {
      console.warn('CameraController fallback:', e);
      this.cameraCtrl = { setMode: () => {}, cycleMode: () => 'CHASE', update: () => {}, triggerShake: () => {} };
    }

    try {
      this.ghostManager = new GhostCarManager(this.renderer.scene);
    } catch (e) {
      console.warn('GhostManager fallback:', e);
      this.ghostManager = { loadGhost: () => {}, saveGhost: () => {}, startRecording: () => {}, recordFrame: () => {}, finishRecording: () => {}, spawnGhostVisual: () => {}, destroyGhost: () => {}, updatePlayback: () => {} };
    }

    try {
      this.network = new NetworkClient();
    } catch (e) {
      console.warn('NetworkClient fallback:', e);
      this.network = { ping: 0, myId: 'offline', createRoom: () => {}, joinRoom: () => {}, leaveRoom: () => {}, toggleReady: () => {}, startRace: () => {}, sendChat: () => {}, sendTransform: () => {}, sendFinishRace: () => {} };
    }

    this.ui = new UIManager(this.career);

    // Advanced AAA Engines
    try {
      this.telemetry = new TelemetryManager();
    } catch (e) {
      this.telemetry = { startRace: () => {}, update: () => {}, getSummary: () => ({}) };
    }

    try {
      this.replay = new ReplaySystem(this.renderer.scene, this.renderer.camera);
    } catch (e) {
      this.replay = { startRecording: () => {}, recordFrame: () => {}, startPlayback: () => {}, update: () => {}, isPlaying: false, setSpeed: () => {}, cycleAngle: () => {} };
    }

    try {
      this.photoMode = new PhotoModeManager(this.renderer, this.renderer.camera, this.renderer.scene);
    } catch (e) {
      this.photoMode = { enter: () => {}, exit: () => {}, captureScreenshot: () => {}, setFov: () => {} };
    }

    try {
      const minimapCanvas = document.getElementById('minimap-canvas');
      this.minimap = new Minimap(minimapCanvas, this.track);
    } catch (e) {
      this.minimap = { calculateBounds: () => {}, render: () => {} };
    }

    // Entities
    this.playerCar = null;
    this.showroomCar = null;
    this.bots = [];
    this.remotePlayers = new Map();

    // Active Race Configuration
    this.activeRaceConfig = {
      mode: 'GP',
      trackId: 'neon_city',
      weather: 'clear',
      laps: 3,
      careerCup: null,
      careerStageIndex: 0
    };

    // Knockout & Mode States
    this.knockoutTimer = 30;
    this.lastKnockoutLap = 1;

    this.lastTime = performance.now();
    this.raceStartTime = 0;

    this.initShowroom();
    this.bindUIHandlers();
    this.bindNetworkHandlers();

    // Auto unlock audio on first interaction
    const unlockAudio = () => {
      try {
        if (this.audio) {
          this.audio.init();
          this.audio.resume();
        }
      } catch (e) {}
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    requestAnimationFrame((t) => this.loop(t));
  }

  // --- 1. Garage / Showroom View ---
  initShowroom() {
    try {
      this.state = 'GARAGE';
      if (this.cameraCtrl) this.cameraCtrl.setMode(CAMERA_MODES.SHOWROOM);

      const safeIdx = Math.abs(parseInt(this.ui?.selectedCarIndex) || 0) % CAR_CONFIGS.length;
      const carConfig = CAR_CONFIGS[safeIdx] || CAR_CONFIGS[0];
      const upgrades = this.career ? this.career.getCarUpgrades(carConfig.id) : { engine: 1, turbo: 1, tires: 1, nitro: 1 };

      if (this.showroomCar) {
        if (typeof this.showroomCar.destroy === 'function') this.showroomCar.destroy();
        else if (this.showroomCar.mesh && this.renderer?.scene) this.renderer.scene.remove(this.showroomCar.mesh);
        this.showroomCar = null;
      }

      this.showroomCar = new Car(
        this.renderer.scene,
        this.track,
        safeIdx,
        this.ui?.selectedColor || '#00f0ff',
        false,
        'Showroom',
        this.ui?.visualMods || {},
        upgrades
      );
      if (this.showroomCar && this.showroomCar.mesh) {
        this.showroomCar.mesh.position.set(0, 0.4, 0);
      }
    } catch (e) {
      console.warn('initShowroom fallback:', e);
    }
  }

  // --- 2. Start Single Player / Career / Modes ---
  startRace(raceConfig = {}) {
    console.log('🏁 Launching S3D Drive Race:', raceConfig);
    try {
      if (this.audio && typeof this.audio.init === 'function') {
        this.audio.init();
        this.audio.resume();
      }

      this.activeRaceConfig = { ...this.activeRaceConfig, ...raceConfig };
      this.mode = this.activeRaceConfig.mode || 'GP';

      // Track & Weather Setup
      const trackId = this.activeRaceConfig.trackId || 'neon_city';
      const weather = this.activeRaceConfig.weather || 'clear';
      if (this.track && typeof this.track.buildTrack === 'function') {
        this.track.buildTrack(trackId, weather);
      }
      if (this.particles && typeof this.particles.setWeather === 'function') {
        this.particles.setWeather(weather);
      }
      if (this.audio && typeof this.audio.setWeatherAudio === 'function') {
        this.audio.setWeatherAudio(weather);
      }
      if (this.minimap && typeof this.minimap.calculateBounds === 'function') {
        this.minimap.calculateBounds();
      }

      // Visual preset lighting
      const preset = TRACK_PRESETS[trackId] || TRACK_PRESETS.neon_city;
      if (this.renderer?.scene?.background && typeof this.renderer.scene.background.setHex === 'function') {
        this.renderer.scene.background.setHex(preset.skyColor);
      }
      if (this.renderer?.scene?.fog?.color && typeof this.renderer.scene.fog.color.setHex === 'function') {
        this.renderer.scene.fog.color.setHex(preset.fogColor);
      }

      this.cleanUpEntities();

      // Spawn Player Car
      const safeCarIdx = Math.abs(parseInt(this.ui?.selectedCarIndex) || 0) % CAR_CONFIGS.length;
      const carConfig = CAR_CONFIGS[safeCarIdx] || CAR_CONFIGS[0];
      const upgrades = this.career ? this.career.getCarUpgrades(carConfig.id) : {};

      this.playerCar = new Car(
        this.renderer.scene,
        this.track,
        safeCarIdx,
        this.ui?.selectedColor || '#00f0ff',
        true,
        this.ui?.playerName || 'Player',
        this.ui?.visualMods || {},
        upgrades
      );
      if (this.playerCar && this.playerCar.physics) {
        this.playerCar.physics.totalLaps = this.activeRaceConfig.laps || 3;
        if (this.track?.gridSlots && this.track.gridSlots[0]) {
          this.playerCar.physics.resetToGrid(this.track.gridSlots[0]);
        }
      }

      // Initialize Telemetry & Replay
      if (this.telemetry && typeof this.telemetry.startRace === 'function') {
        this.telemetry.startRace(1);
      }
      if (this.replay && typeof this.replay.startRecording === 'function') {
        this.replay.startRecording();
      }

      // Mode-Specific Racers Setup
      this.bots = [];
      if (this.mode === 'TIME_ATTACK') {
        if (this.ghostManager) {
          this.ghostManager.loadGhost(trackId);
          this.ghostManager.spawnGhostVisual(safeCarIdx);
        }
      } else if (this.mode === 'BOSS_BATTLE') {
        const bossProfile = RIVAL_PROFILES.find(r => r.id === 'apex') || RIVAL_PROFILES[3];
        const bossBot = new BotRacer(
          this.renderer.scene,
          this.track,
          1,
          bossProfile,
          (name, color, text) => this.ui?.showRivalBanter(name, color, text)
        );
        this.bots.push(bossBot);
      } else {
        for (let i = 1; i <= 5; i++) {
          const rivalProfile = RIVAL_PROFILES[(i - 1) % RIVAL_PROFILES.length];
          const bot = new BotRacer(
            this.renderer.scene,
            this.track,
            i,
            rivalProfile,
            (name, color, text) => this.ui?.showRivalBanter(name, color, text)
          );
          this.bots.push(bot);
        }
      }

      this.startRaceCountdown();
      console.log('✅ S3D Drive Race Started Successfully!');
    } catch (err) {
      console.error('Fatal startRace error:', err);
      if (this.ui && typeof this.ui.showToast === 'function') {
        this.ui.showToast(`⚠️ Race start notice: ${err.message}`);
      }
    }
  }

  // --- 3. Start Multiplayer Race ---
  startMultiplayerRace(playersData, trackId = 'neon_city') {
    this.audio.init();
    this.audio.resume();

    this.mode = 'MP';
    this.track.buildTrack(trackId, 'clear');
    this.minimap.calculateBounds();
    this.cleanUpEntities();

    const myData = playersData.find(p => p.id === this.network.myId);
    const mySlot = myData ? myData.gridSlot : 0;

    const carConfig = CAR_CONFIGS[(myData?.carIndex || 0) % CAR_CONFIGS.length];
    const upgrades = this.career.getCarUpgrades(carConfig.id);

    this.playerCar = new Car(
      this.renderer.scene,
      this.track,
      myData?.carIndex || 0,
      myData?.carColor || '#00f0ff',
      true,
      myData?.name || 'Player',
      this.ui.visualMods,
      upgrades
    );
    this.playerCar.physics.resetToGrid(this.track.gridSlots[mySlot]);

    this.remotePlayers.clear();
    playersData.forEach((p) => {
      if (p.id !== this.network.myId) {
        const remoteCar = new Car(
          this.renderer.scene,
          this.track,
          p.carIndex,
          p.carColor,
          false,
          p.name
        );
        remoteCar.physics.resetToGrid(this.track.gridSlots[p.gridSlot]);
        this.remotePlayers.set(p.id, remoteCar);
      }
    });

    this.telemetry.startRace(mySlot + 1);
    this.replay.startRecording();
    this.startRaceCountdown();
  }

  // --- 4. Starting Countdown Sequence ---
  startRaceCountdown() {
    this.state = 'COUNTDOWN';
    this.ui.showScreen('hud');
    this.cameraCtrl.setMode(CAMERA_MODES.CHASE);
    this.cameraCtrl.update(0.016, this.playerCar.mesh, this.playerCar.physics);

    this.ui.showCountdown('3');
    this.audio.playBeep('countdown_low');

    setTimeout(() => {
      if (this.state !== 'COUNTDOWN') return;
      this.ui.showCountdown('2');
      this.audio.playBeep('countdown_low');
    }, 450);

    setTimeout(() => {
      if (this.state !== 'COUNTDOWN') return;
      this.ui.showCountdown('1');
      this.audio.playBeep('countdown_low');
    }, 900);

    setTimeout(() => {
      if (this.state !== 'COUNTDOWN') return;
      this.state = 'RACING';
      this.raceStartTime = performance.now();
      if (this.playerCar) {
        this.playerCar.physics.lapStartTime = this.raceStartTime;
        if (this.mode === 'TIME_ATTACK') {
          this.ghostManager.startRecording();
        }
      }
      this.ui.showCountdown('GO!');
      this.audio.playBeep('countdown_high');
      this.audio.startMusic();
    }, 1350);
  }

  cleanUpEntities() {
    try {
      if (this.showroomCar) {
        if (typeof this.showroomCar.destroy === 'function') this.showroomCar.destroy();
        else if (this.showroomCar.mesh) this.renderer.scene.remove(this.showroomCar.mesh);
        this.showroomCar = null;
      }
      if (this.playerCar) {
        if (typeof this.playerCar.destroy === 'function') this.playerCar.destroy();
        else if (this.playerCar.mesh) this.renderer.scene.remove(this.playerCar.mesh);
        this.playerCar = null;
      }
      if (this.bots && Array.isArray(this.bots)) {
        this.bots.forEach(b => {
          if (b && typeof b.destroy === 'function') b.destroy();
          else if (b && b.car && b.car.mesh) this.renderer.scene.remove(b.car.mesh);
        });
      }
      this.bots = [];
      if (this.remotePlayers) {
        this.remotePlayers.forEach(p => {
          if (p && typeof p.destroy === 'function') p.destroy();
          else if (p && p.mesh) this.renderer.scene.remove(p.mesh);
        });
        this.remotePlayers.clear();
      }
      if (this.ghostManager && typeof this.ghostManager.destroyGhost === 'function') {
        this.ghostManager.destroyGhost();
      }
    } catch (e) {
      console.warn('cleanUpEntities fallback:', e);
    }
  }

  // --- 5. UI Event Bindings ---
  bindUIHandlers() {
    this.ui.onCarSelect = (idx) => {
      if (this.showroomCar) {
        const carConfig = CAR_CONFIGS[idx % CAR_CONFIGS.length];
        const upgrades = this.career.getCarUpgrades(carConfig.id);
        this.showroomCar.updateCustomization(idx, this.ui.selectedColor, null, this.ui.visualMods, upgrades);
      }
    };

    this.ui.onColorSelect = (hex) => {
      if (this.showroomCar) {
        this.showroomCar.updateCustomization(this.ui.selectedCarIndex, hex);
      }
    };

    this.ui.onVisualModChange = (mods) => {
      if (this.showroomCar) {
        this.showroomCar.updateCustomization(this.ui.selectedCarIndex, this.ui.selectedColor, null, mods);
      }
    };

    this.ui.onStartRace = (raceConfig) => {
      this.startRace(raceConfig);
    };

    this.ui.onCreateMultiplayerRoom = (data) => {
      this.network.createRoom(data, (res) => {
        if (res.success) {
          this.ui.renderLobby(res.room, this.network.myId);
          document.getElementById('modal-multiplayer')?.classList.add('hidden');
        } else {
          alert(res.message || 'Failed to create room');
        }
      });
    };

    this.ui.onJoinMultiplayerRoom = (code, data) => {
      this.network.joinRoom(code, data, (res) => {
        if (res.success) {
          this.ui.renderLobby(res.room, this.network.myId);
          document.getElementById('modal-multiplayer')?.classList.add('hidden');
        } else {
          alert(res.message || 'Failed to join room');
        }
      });
    };

    this.ui.onLeaveRoom = () => {
      this.network.leaveRoom();
      this.initShowroom();
    };

    this.ui.onToggleReady = (isReady) => {
      this.network.toggleReady(isReady);
    };

    this.ui.onStartMultiplayerRace = () => {
      this.network.startRace();
    };

    this.ui.onSendChat = (text) => {
      this.network.sendChat(text);
    };

    this.ui.onCycleRadio = () => {
      return this.audio.cycleStation();
    };

    this.ui.onToggleMute = () => {
      return this.audio.toggleMute();
    };

    this.ui.onCamSwitch = () => {
      this.cameraCtrl.cycleMode();
    };

    this.ui.onRestartRace = () => {
      this.startRace(this.activeRaceConfig);
    };

    this.ui.onReturnToGarage = () => {
      this.audio.stopMusic();
      this.cleanUpEntities();
      this.track.buildTrack(this.ui.selectedTrackId, 'clear');
      this.particles.setWeather('clear');
      this.audio.setWeatherAudio('clear');
      this.initShowroom();
      this.ui.showScreen('garage');
      this.ui.updateCreditsDisplay();
    };

    this.ui.onOpenReplay = () => {
      this.state = 'REPLAY';
      this.ui.showScreen('replay');
      this.replay.startPlayback();
    };

    this.ui.onOpenPhotoMode = () => {
      this.state = 'PHOTO';
      this.ui.showScreen('photo');
      this.photoMode.enter(this.playerCar?.mesh);
    };

    this.ui.onToggleVoice = () => {
      this.voice.toggleListening();
    };

    this.voice.onStateChange = (isListening) => {
      this.ui.updateVoiceMicUI(isListening);
    };

    this.voice.onCommandRecognized = (title, desc, icon, rawText) => {
      this.ui.showVoiceFeedback(title, desc, icon, rawText);
      this.audio.playBeep('countdown_high');
    };

    this.voice.onError = (err) => {
      this.ui.showToast(`⚠️ ${err}`);
    };

    this.input.onCamChange = () => {
      this.cameraCtrl.cycleMode();
    };

    this.input.onResetCar = () => {
      if (this.playerCar && this.state === 'RACING') {
        const sp = this.track.getClosestPoint(this.playerCar.physics.position).sample;
        this.playerCar.physics.position.copy(sp.position).add(new THREE.Vector3(0, 0.4, 0));
        this.playerCar.physics.velocity.set(0, 0, 0);
        this.playerCar.physics.speed = 0;
        this.playerCar.physics.rotationY = Math.atan2(sp.tangent.x, sp.tangent.z);
      }
    };

    this.voice.onStartRaceVoice = () => {
      if (this.state === 'GARAGE') {
        this.startRace({ mode: 'GP', trackId: this.ui.selectedTrackId, laps: 3 });
      }
    };

    window.addEventListener('keydown', (e) => {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

      if (e.code === 'KeyV') {
        this.voice.toggleListening();
      } else if (this.state === 'GARAGE' && (e.code === 'Enter' || e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp')) {
        this.startRace({ mode: 'GP', trackId: this.ui.selectedTrackId, laps: 3 });
      }
    });
  }

  // --- 6. Network Event Bindings ---
  bindNetworkHandlers() {
    this.network.onRoomState = (room) => {
      this.ui.renderLobby(room, this.network.myId);
    };

    this.network.onRaceStartCountdown = (data) => {
      this.startMultiplayerRace(data.players, this.network.currentRoom?.trackId || 'neon_city');
    };

    this.network.onRoomTransforms = (transforms) => {
      if (this.state === 'RACING' || this.state === 'FINISHED') {
        Object.keys(transforms).forEach((id) => {
          if (id !== this.network.myId && this.remotePlayers.has(id)) {
            const remoteCar = this.remotePlayers.get(id);
            remoteCar.setRemoteTransform(transforms[id]);
          }
        });
      }
    };

    this.network.onChatMessage = (msg) => {
      this.ui.addChatMessage(msg);
    };

    this.network.onRaceEnded = (data) => {
      this.finishRaceSequence(data.podium, (performance.now() - this.raceStartTime) / 1000, 4000);
    };
  }

  // --- 7. Calculate Standings & Leaderboard ---
  calculateLeaderboard() {
    const list = [];

    if (this.playerCar) {
      const sp = this.track.getClosestPoint(this.playerCar.physics.position).sample;
      const progress = (this.playerCar.physics.lap - 1) + sp.u;
      list.push({
        name: this.playerCar.name,
        color: this.playerCar.color,
        progress,
        isMe: true
      });
    }

    this.bots.forEach((b) => {
      const progress = (b.car.physics.lap - 1) + b.u;
      list.push({
        name: b.rival.name,
        color: b.rival.color,
        progress,
        isMe: false
      });
    });

    this.remotePlayers.forEach((p) => {
      const sp = this.track.getClosestPoint(p.targetTransform.position).sample;
      const progress = (p.physics.lap - 1) + sp.u;
      list.push({
        name: p.name,
        color: p.color,
        progress,
        isMe: false
      });
    });

    list.sort((a, b) => b.progress - a.progress);
    return list;
  }

  // --- 8. Check Achievements ---
  checkAchievements(physics, rank) {
    if (physics.speedKmh >= 300) {
      this.career.unlockAchievement('speed_300');
    }
    if (physics.driftScore >= 10000) {
      this.career.unlockAchievement('drift_king');
    }
    if (physics.lap > 1 && physics.wallCollisionsCount === 0) {
      this.career.unlockAchievement('clean_lap');
    }
    if (rank === 1) {
      this.career.unlockAchievement('first_win');
      if (this.track.weather === 'rain') {
        this.career.unlockAchievement('rain_master');
      }
      if (this.mode === 'BOSS_BATTLE') {
        this.career.unlockAchievement('boss_defeated');
      }
    }
  }

  // --- 9. Finish Race Sequence ---
  finishRaceSequence(customPodium = null, totalTime = 0, cashPrize = 0) {
    this.state = 'FINISHED';
    this.telemetry.finishRace();
    this.replay.stopRecording();

    if (this.playerCar) {
      this.particles.emitConfetti(this.playerCar.mesh.position);
      const telSummary = this.telemetry.getAnalyticsSummary(this.playerCar.physics.bestLapTime, totalTime);
      this.ui.populateTelemetryModal(telSummary);
    }
    this.audio.playBeep('lap_complete');

    if (customPodium) {
      this.ui.showPodiumResults(customPodium, totalTime, this.playerCar?.physics.bestLapTime, cashPrize);
      return;
    }

    const leaderboard = this.calculateLeaderboard();
    const myRank = leaderboard.findIndex(l => l.isMe) + 1;
    const prizeTiers = [7500, 4500, 2500, 1200, 600, 300];
    const cashEarned = cashPrize || prizeTiers[myRank - 1] || 300;

    this.career.earnCredits(cashEarned, `${this.mode} Rank #${myRank}`);
    if (this.playerCar) {
      this.checkAchievements(this.playerCar.physics, myRank);
    }

    const podium = leaderboard.map((l, i) => ({
      name: l.name,
      carColor: l.color,
      totalTime: l.isMe ? totalTime : totalTime + (i * 1.5)
    }));
    this.ui.showPodiumResults(podium, totalTime, this.playerCar?.physics.bestLapTime, cashEarned);
  }

  // --- 10. Main Animation Loop ---
  loop(timestamp) {
    requestAnimationFrame((t) => this.loop(t));

    const dt = Math.min(0.05, (timestamp - this.lastTime) / 1000);
    this.lastTime = timestamp;

    const inputState = (this.state === 'RACING') ? this.input.getState() : { throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false };

    // --- GARAGE STATE ---
    if (this.state === 'GARAGE') {
      if (this.showroomCar) {
        this.cameraCtrl.update(dt, this.showroomCar.mesh, null);
        if (this.showroomCar.modelData.updateUnderglowAnimation) {
          this.showroomCar.modelData.updateUnderglowAnimation(dt);
        }
      }
    }
    // --- REPLAY STATE ---
    else if (this.state === 'REPLAY') {
      const allOpponents = this.bots.length > 0 ? this.bots : Array.from(this.remotePlayers.values()).map(p => ({ car: p }));
      this.replay.update(dt, this.playerCar, allOpponents);
    }
    // --- PHOTO MODE STATE ---
    else if (this.state === 'PHOTO') {
      // Camera controlled by orbit mouse events in PhotoModeManager
    }
    // --- COUNTDOWN / RACING / FINISHED ---
    else if (this.state === 'COUNTDOWN' || this.state === 'RACING' || this.state === 'FINISHED') {
      const allOpponents = (this.mode === 'MP') ? Array.from(this.remotePlayers.values()).map(p => ({ car: p })) : this.bots;

      // 1. Player Car
      if (this.playerCar) {
        this.playerCar.update(dt, inputState, this.particles, this.audio);
        this.cameraCtrl.update(dt, this.playerCar.mesh, this.playerCar.physics);

        const currentLeaderboard = this.calculateLeaderboard();
        const myRank = currentLeaderboard.findIndex(l => l.isMe) + 1;

        if (this.state === 'RACING') {
          // Telemetry & Replay keyframes
          this.telemetry.update(dt, this.playerCar.physics, myRank);
          const totalRaceElapsed = (performance.now() - this.raceStartTime) / 1000;
          this.replay.recordFrame(totalRaceElapsed, this.playerCar, allOpponents);

          // Drift Arena Win Check (15,000 points)
          if (this.mode === 'DRIFT_ARENA' && this.playerCar.physics.driftScore >= 15000) {
            this.finishRaceSequence(null, totalRaceElapsed, 10000);
            this.career.unlockAchievement('drift_king');
          }

          // Knockout Mode: Eliminate last place every lap
          if (this.mode === 'KNOCKOUT' && this.playerCar.physics.lap > this.lastKnockoutLap) {
            this.lastKnockoutLap = this.playerCar.physics.lap;
            if (this.bots.length > 0) {
              const eliminatedBot = this.bots.pop();
              if (eliminatedBot) {
                this.ui.showToast(`☠️ ELIMINATED: ${eliminatedBot.rival.name}`);
                eliminatedBot.destroy();
              }
            }
            if (myRank === currentLeaderboard.length && this.bots.length > 0) {
              this.finishRaceSequence(null, totalRaceElapsed, 500);
            }
          }
        }

        // Time Attack Ghost Recording & Playback
        if (this.mode === 'TIME_ATTACK') {
          this.ghostManager.recordFrame(this.playerCar.physics);
          const currLapTime = (performance.now() - this.playerCar.physics.lapStartTime) / 1000;
          this.ghostManager.updatePlayback(currLapTime);
        }

        // Check race victory finish
        if (this.playerCar.physics.raceFinished && this.state === 'RACING') {
          const totalTime = (performance.now() - this.raceStartTime) / 1000;
          if (this.mode === 'TIME_ATTACK') {
            this.ghostManager.finishRecording(this.activeRaceConfig.trackId, this.playerCar.physics.bestLapTime);
            this.career.saveBestLap(this.activeRaceConfig.trackId, this.playerCar.physics.bestLapTime);
            this.career.earnCredits(4500, 'Time Attack Complete');
            this.career.unlockAchievement('time_attack');
            this.finishRaceSequence([{ name: this.playerCar.name, carColor: this.playerCar.color, totalTime }], totalTime, 4500);
          } else if (this.mode === 'MP') {
            this.network.sendFinishRace(totalTime, this.playerCar.physics.bestLapTime);
          } else {
            this.finishRaceSequence(null, totalTime);
          }
        }

        // Check achievements real-time
        if (this.state === 'RACING') {
          this.checkAchievements(this.playerCar.physics, 0);
        }

        // Multiplayer transform packet
        if (this.mode === 'MP' && this.state === 'RACING') {
          this.network.sendTransform({
            x: this.playerCar.physics.position.x,
            y: this.playerCar.physics.position.y,
            z: this.playerCar.physics.position.z,
            qx: this.playerCar.physics.quaternion.x,
            qy: this.playerCar.physics.quaternion.y,
            qz: this.playerCar.physics.quaternion.z,
            qw: this.playerCar.physics.quaternion.w,
            speed: this.playerCar.physics.speedKmh,
            steer: this.playerCar.physics.steeringAngle,
            wheelRot: this.playerCar.physics.wheelRotation,
            nitro: this.playerCar.physics.isNitroActive,
            drift: this.playerCar.physics.isDrifting,
            lap: this.playerCar.physics.lap,
            checkpoint: this.playerCar.physics.currentCheckpoint
          });
        }
      }

      // 2. AI Bots
      if ((this.mode !== 'MP' && this.mode !== 'TIME_ATTACK') && this.state === 'RACING') {
        this.bots.forEach(b => b.update(dt, this.playerCar, this.bots));
      }

      // 3. Remote Players
      if (this.mode === 'MP') {
        this.remotePlayers.forEach(p => p.update(dt, null, this.particles, null));
      }

      // 4. Update HUD & Minimap
      const leaderboard = this.calculateLeaderboard();
      const modeLabels = {
        GP: 'GRAND PRIX',
        DRIFT_ARENA: 'DRIFT ARENA',
        TIME_ATTACK: 'TIME ATTACK',
        KNOCKOUT: 'KNOCKOUT SURVIVAL',
        BOSS_BATTLE: 'BOSS: APEX OVERLORD',
        CAREER: 'CHAMPIONSHIP CUP',
        MP: 'ONLINE MULTIPLAYER'
      };
      this.ui.updateHUD(this.playerCar?.physics, this.network.ping, leaderboard, modeLabels[this.mode] || 'RACE');

      this.minimap.render(this.playerCar, allOpponents);
    }

    // 5. Update Particles with Camera Pos
    this.particles.update(dt, this.renderer.camera.position);

    // 6. Render 3D Scene
    this.renderer.render();
  }
}

// Polyfill Canvas roundRect if not natively available
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

// Instant GameApp Launch with Robust Diagnostic Boundary
function launchVelocityRush() {
  if (!window.gameApp) {
    try {
      console.log('⚡ Initializing S3D Drive Master Engine...');
      window.gameApp = new GameApp();
      console.log('✅ S3D Drive Engine initialized successfully!');
      const existingBanner = document.getElementById('s3d-error-banner');
      if (existingBanner) existingBanner.remove();
      const existingDebug = document.getElementById('debug-error-box');
      if (existingDebug) existingDebug.remove();
    } catch (err) {
      console.error('Fatal GameApp launch error:', err);
      try {
        fetch('/api/client-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: err.message,
            stack: err.stack,
            type: 'FATAL_LAUNCH_ERROR'
          })
        });
      } catch (e) {}

      let errBanner = document.getElementById('s3d-error-banner');
      if (!errBanner) {
        errBanner = document.createElement('div');
        errBanner.id = 's3d-error-banner';
        errBanner.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(255,0,85,0.96);color:#fff;padding:16px 28px;border-radius:12px;z-index:999999;font-family:sans-serif;font-weight:700;box-shadow:0 8px 30px rgba(0,0,0,0.8);border:2px solid #fff;text-align:center;max-width:90vw;';
        document.body.appendChild(errBanner);
      }
      errBanner.innerHTML = `
        <div style="font-size:16px;margin-bottom:6px;">⚠️ S3D Drive Launch Notice: ${err.message}</div>
        <div style="font-size:11px;font-weight:normal;opacity:0.95;max-height:100px;overflow:auto;background:rgba(0,0,0,0.4);padding:6px;border-radius:6px;text-align:left;font-family:monospace;white-space:pre-wrap;">${err.stack || err.message}</div>
        <div style="font-size:12px;margin-top:8px;font-weight:normal;opacity:0.9;">Please press <b>Ctrl + F5</b> to refresh or enable hardware acceleration in browser settings.</div>
      `;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchVelocityRush);
} else {
  launchVelocityRush();
}


