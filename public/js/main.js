/**
 * Velocity Rush: Neon Rebellion - Master Game Coordinator & AAA State Machine
 */
import { GameRenderer } from './engine/Renderer.js';
import { Track, TRACK_PRESETS, resolveWorldPreset } from './engine/Track.js';
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
import { CarBuilder, CAR_CONFIGS } from './engine/CarBuilder.js';
import { TelemetryManager } from './engine/Telemetry.js';
import { ReplaySystem } from './engine/Replay.js';
import { PhotoModeManager } from './engine/PhotoMode.js';
import { VoiceControlManager } from './engine/VoiceControl.js';
import { GestureControlManager } from './engine/GestureControl.js';
import { DateExperienceManager, PURE_VEG_VENUES } from './systems/DateExperience.js';

class GameApp {
  constructor() {
    this.state = 'GARAGE'; // 'GARAGE' | 'COUNTDOWN' | 'RACING' | 'FINISHED' | 'REPLAY' | 'PHOTO'
    this.mode = 'GP';      // 'GP' | 'DRIFT_ARENA' | 'TIME_ATTACK' | 'KNOCKOUT' | 'BOSS_BATTLE' | 'CAREER' | 'MP'
    this.isPaused = false;
    this.pauseStartTime = 0;
    this.fpsEstimate = 60;
    this.fxSpawnTimer = 0;
    this.dateArrivedNotified = false;
    this.lastLiveClockCheck = 0;

    // Load Solo / Couple Cabin Profile (Solo Only Driver by default in Garage!)
    this.coupleProfile = { partner1: 'Aarav', partner2: 'Meera', dateMode: 'off', showCharacters: 'driver_only', crewExplicit: false };
    try {
      const savedCouple = localStorage.getItem('s3d_couple_date_v1');
      if (savedCouple) {
        const parsed = JSON.parse(savedCouple);
        if (!parsed.crewExplicit) {
          parsed.showCharacters = 'driver_only';
        } else if (parsed.showCharacters === true || parsed.showCharacters === 'true') {
          parsed.showCharacters = 'couple';
        } else if (parsed.showCharacters === false || parsed.showCharacters === 'false') {
          parsed.showCharacters = 'none';
        }
        this.coupleProfile = { ...this.coupleProfile, ...parsed };
      }
    } catch (e) { }

    // Core Systems
    this.career = new CareerManager();
    this.renderer = new GameRenderer(document.getElementById('canvas-container'));
    this.track = new Track(this.renderer.scene);
    this.track.buildTrack('city_live', 'clear', { coupleNames: this.coupleProfile });

    try {
      this.audio = new AudioManager();
    } catch (e) {
      console.warn('Audio fallback:', e);
      this.audio = {
        init: () => { }, resume: () => { }, playBeep: () => { }, startMusic: () => { },
        stopMusic: () => { }, cycleStation: () => ({ name: 'OFF' }), toggleMute: () => true,
        toggleSfxMute: () => true, toggleMusicMute: () => true,
        setWeatherAudio: () => { }, setPaused: () => { }, silenceDrivingLoops: () => { }
      };
    }

    try {
      this.voice = new VoiceControlManager();
    } catch (e) {
      console.warn('VoiceControl fallback:', e);
      this.voice = {
        isListening: false, toggleListening: () => { }, isSupported: false,
        consumeAction: () => { },
        getState: () => ({ throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false, changeCam: false, reset: false })
      };
    }

    try {
      this.gesture = new GestureControlManager();
    } catch (e) {
      console.warn('GestureControl fallback:', e);
      this.gesture = {
        isCamActive: false, toggleCamera: async () => false, setSensitivity: () => {},
        attachSurface: () => {}, getState: () => ({ active: false, throttle: 0, brake: 0, steer: 0, nitro: false, handbrake: false })
      };
    }

    try {
      this.input = new InputManager(this.voice, this.gesture);
    } catch (e) {
      console.warn('Input fallback:', e);
      this.input = {
        getState: () => ({ throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false, steerSensitivity: 1.0 }),
        getSteerSensitivity: () => 1.0,
        setSteerSensitivity: () => { },
        resetTransientKeys: () => { },
        keys: {}
      };
    }

    try {
      this.particles = new ParticleSystem(this.renderer.scene);
    } catch (e) {
      console.warn('Particles fallback:', e);
      this.particles = {
        update: () => { }, setWeather: () => { }, reset: () => { }, addSkidMark: () => { },
        emitSmoke: () => { }, emitWaterSpray: () => { }, emitNitro: () => { }, emitSparks: () => { }, emitConfetti: () => { }
      };
    }

    try {
      this.cameraCtrl = new CameraController(this.renderer.camera, this.renderer.scene);
    } catch (e) {
      console.warn('CameraController fallback:', e);
      this.cameraCtrl = { setMode: () => { }, cycleMode: () => 'CHASE', update: () => { }, snapToTarget: () => { }, triggerShake: () => { } };
    }

    try {
      this.ghostManager = new GhostCarManager(this.renderer.scene);
    } catch (e) {
      console.warn('GhostManager fallback:', e);
      this.ghostManager = { loadGhost: () => { }, saveGhost: () => { }, startRecording: () => { }, recordFrame: () => { }, finishRecording: () => { }, spawnGhostVisual: () => { }, destroyGhost: () => { }, updatePlayback: () => { } };
    }

    try {
      this.network = new NetworkClient();
    } catch (e) {
      console.warn('NetworkClient fallback:', e);
      this.network = { ping: 0, myId: 'offline', createRoom: () => { }, joinRoom: () => { }, leaveRoom: () => { }, toggleReady: () => { }, startRace: () => { }, sendChat: () => { }, sendTransform: () => { }, sendFinishRace: () => { } };
    }

    this.ui = new UIManager(this.career);
    this.ui.syncSettingsUI(this.input.getDrivingProfile ? this.input.getDrivingProfile() : 1.0);
    this.ui.syncCoupleProfileUI?.(this.coupleProfile);
    if (this.input.getSystemSettings) {
      this.applySystemSettings(this.input.getSystemSettings());
    }

    try {
      this.telemetry = new TelemetryManager();
    } catch (e) {
      this.telemetry = { startRace: () => { }, update: () => { }, finishRace: () => { }, getAnalyticsSummary: () => ({}) };
    }

    try {
      this.replay = new ReplaySystem(this.renderer.scene, this.renderer.camera);
    } catch (e) {
      this.replay = { startRecording: () => { }, recordFrame: () => { }, stopRecording: () => { }, startPlayback: () => false, stopPlayback: () => { }, canPlay: () => false, update: () => { }, isPlaying: false, setSpeed: () => { }, cycleAngle: () => { } };
    }

    try {
      this.photoMode = new PhotoModeManager(this.renderer, this.renderer.camera, this.renderer.scene);
    } catch (e) {
      this.photoMode = { enter: () => { }, exit: () => { }, captureScreenshot: () => { }, setFov: () => { } };
    }

    try {
      const minimapCanvas = document.getElementById('minimap-canvas');
      this.minimap = new Minimap(minimapCanvas, this.track);
    } catch (e) {
      this.minimap = { calculateBounds: () => { }, render: () => { } };
    }

    try {
      this.dateExperience = new DateExperienceManager(
        this.renderer.scene,
        this.track,
        this.cameraCtrl,
        this.particles,
        this.audio,
        this.renderer
      );
      this.dateExperience.onStateChange = (st) => this.ui?.syncDateExperienceUI?.(st);
      this.dateExperience.onToast = (msg) => this.ui?.showToast?.(msg);
    } catch (e) {
      console.warn('DateExperience fallback:', e);
      this.dateExperience = null;
    }

    // Entities
    this.playerCar = null;
    this.showroomCar = null;
    this.bots = [];
    this.remotePlayers = new Map();

    // Active Race Configuration
    this.activeRaceConfig = {
      mode: 'GP',
      trackId: 'city_live',
      weather: 'clear',
      laps: 3,
      careerCup: null,
      careerStageIndex: 0
    };

    this.lastKnockoutLap = 1;
    this.indicatorSteerArmed = false;
    this.lastTime = performance.now();
    this.raceStartTime = 0;

    this.initShowroom();
    this.bindUIHandlers();
    this.gesture.attachSurface?.(
      document.getElementById('canvas-container'),
      this.ui?.gestureVideo || null,
      this.ui?.gestureCanvas || null
    );
    this.bindNetworkHandlers();
    CarBuilder.preloadRealModels();

    const unlockAudio = () => {
      try {
        if (this.audio) {
          this.audio.init();
          this.audio.resume();
        }
      } catch (e) { }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    requestAnimationFrame((t) => this.loop(t));
  }

  applyWorldVisualTheme(trackId) {
    const preset = resolveWorldPreset(trackId);
    if (this.renderer && typeof this.renderer.setWorldTheme === 'function') {
      this.renderer.setWorldTheme(preset);
    }
    this.ui?.updateClimateBadge?.(preset);
  }

  resolveCharMode(raw = this.coupleProfile?.showCharacters) {
    if (raw === 'couple') return 'couple';
    if (raw === false || raw === 'false' || raw === 'none') return 'none';
    return 'driver_only';
  }

  updateCoupleProfile(partial = {}) {
    this.coupleProfile = { ...this.coupleProfile, ...partial };
    this.coupleProfile.showCharacters = this.resolveCharMode(this.coupleProfile.showCharacters);
    try {
      localStorage.setItem('s3d_couple_date_v1', JSON.stringify(this.coupleProfile));
    } catch (e) { }
    const modsUpdate = {
      dateMode: this.coupleProfile.dateMode || 'off',
      showCharacters: this.coupleProfile.showCharacters,
      coupleNames: { partner1: this.coupleProfile.partner1, partner2: this.coupleProfile.partner2 }
    };
    this.ui.visualMods = { ...this.ui.visualMods, ...modsUpdate };
    this.ui.syncCoupleProfileUI?.(this.coupleProfile);
    this.track?.setCoupleNames?.(this.coupleProfile.partner1, this.coupleProfile.partner2);
    if (this.showroomCar) {
      this.showroomCar.updateCustomization(this.ui.selectedCarIndex, this.ui.selectedColor, null, modsUpdate);
      const sys = this.input?.getSystemSettings?.();
      if (sys) this.showroomCar.modelData?.setHeadlightsEnabled?.(sys.headlightsEnabled !== false);
    }
  }

  applySystemSettings(settings) {
    if (!settings) return;
    this.renderer?.applyGraphicsSettings?.(settings);
    this.cameraCtrl?.setCameraOptions?.({
      distanceMode: settings.cameraDistance,
      fovScale: settings.fovScale
    });
    this.audio?.setVolumes?.({
      master: settings.masterVolume,
      engine: settings.engineVolume,
      music: settings.musicVolume,
      sfx: settings.sfxVolume
    });
    const hlOn = settings.headlightsEnabled !== false;
    this.showroomCar?.modelData?.setHeadlightsEnabled?.(hlOn);
    this.playerCar?.modelData?.setHeadlightsEnabled?.(hlOn);
    this.ui?.syncSystemSettingsUI?.(settings);
  }

  // --- 1. Garage / Showroom View ---
  initShowroom() {
    try {
      this.state = 'GARAGE';
      this.setPaused(false);
      this.ui.setChatVisible(false);
      this.track?.setShowroomStageVisible?.(true);
      this.applyWorldVisualTheme(this.ui?.selectedTrackId || 'city_live');

      if (this.cameraCtrl) this.cameraCtrl.setMode(CAMERA_MODES.SHOWROOM);

      const safeIdx = Math.abs(parseInt(this.ui?.selectedCarIndex) || 0) % CAR_CONFIGS.length;
      const carConfig = CAR_CONFIGS[safeIdx] || CAR_CONFIGS[0];
      this.audio?.setCarProfile?.(carConfig.id);
      const upgrades = this.career ? this.career.getCarUpgrades(carConfig.id) : { engine: 1, turbo: 1, tires: 1, nitro: 1 };
      const mergedMods = {
        ...(this.ui?.visualMods || {}),
        dateMode: this.coupleProfile.dateMode || 'off',
        showCharacters: this.resolveCharMode(this.coupleProfile.showCharacters),
        coupleNames: { partner1: this.coupleProfile.partner1, partner2: this.coupleProfile.partner2 }
      };
      this.ui.visualMods = mergedMods;

      if (this.showroomCar) {
        this.showroomCar.destroy();
        this.showroomCar = null;
      }

      this.showroomCar = new Car(
        this.renderer.scene,
        this.track,
        safeIdx,
        this.ui?.selectedColor || '#00f0ff',
        false,
        'Showroom',
        mergedMods,
        upgrades
      );
      if (this.showroomCar && this.showroomCar.mesh) {
        this.showroomCar.mesh.position.set(0, 0.035, 0);
        const sys = this.input?.getSystemSettings?.();
        if (sys) this.showroomCar.modelData?.setHeadlightsEnabled?.(sys.headlightsEnabled !== false);
      }
      if (this.renderer && this.showroomCar?.mesh) {
        this.renderer.updateShadowTarget(this.showroomCar.mesh.position);
      }
    } catch (e) {
      console.warn('initShowroom fallback:', e);
    }
  }

  // --- 2. Pause / Resume ---
  setPaused(paused) {
    const next = !!paused;
    if (next === this.isPaused) return;

    if (next) {
      if (this.state !== 'RACING' && this.state !== 'COUNTDOWN') return;
      this.isPaused = true;
      this.pauseStartTime = performance.now();
      this.audio?.stopHorn?.();
      this.audio?.setPaused?.(true);
      this.input?.resetTransientKeys?.();
      this.ui.togglePause(true);
    } else {
      if (this.isPaused && this.pauseStartTime > 0) {
        const pausedDuration = performance.now() - this.pauseStartTime;
        if (this.raceStartTime > 0) this.raceStartTime += pausedDuration;
        if (this.playerCar?.physics?.lapStartTime > 0) {
          this.playerCar.physics.lapStartTime += pausedDuration;
        }
      }
      this.isPaused = false;
      this.pauseStartTime = 0;
      this.audio?.setPaused?.(false);
      this.ui.togglePause(false);
      if (typeof document !== 'undefined') document.activeElement?.blur?.();
    }
  }

  // --- 3. Start Single Player / Career / Modes ---
  startRace(raceConfig = {}) {
    try {
      this.setPaused(false);
      this.dateExperience?.stopSession?.();
      this.audio?.init?.();
      this.audio?.resume?.();
      this.audio?.setPaused?.(false);

      this.activeRaceConfig = { ...this.activeRaceConfig, ...raceConfig };
      this.mode = this.activeRaceConfig.mode || 'GP';
      this.lastKnockoutLap = 1;
      this.dateArrivedNotified = false;
      this.ui.setChatVisible(false);

      const trackId = this.activeRaceConfig.trackId || this.ui?.selectedTrackId || 'city_live';
      const preset = resolveWorldPreset(trackId);
      const weather = preset.isRain ? 'rain' : (this.activeRaceConfig.weather || 'clear');
      this.activeRaceConfig.trackId = preset.id;
      this.activeRaceConfig.weather = weather;

      const coupleForRun = this.activeRaceConfig.coupleProfile || this.coupleProfile;
      if (this.mode === 'DATE_DRIVE' && coupleForRun && coupleForRun.dateMode === 'off') {
        coupleForRun.dateMode = 'romance';
      }

      this.track.buildTrack(preset.id, weather, { coupleNames: coupleForRun });
      this.track?.setShowroomStageVisible?.(false);
      this.particles.reset();
      this.particles.setWeather(weather);
      this.audio.setWeatherAudio(weather);
      this.minimap.calculateBounds();
      this.applyWorldVisualTheme(preset.id);

      this.cleanUpEntities();

      const safeCarIdx = Math.abs(parseInt(this.ui?.selectedCarIndex) || 0) % CAR_CONFIGS.length;
      const carConfig = CAR_CONFIGS[safeCarIdx] || CAR_CONFIGS[0];
      this.audio?.setCarProfile?.(carConfig.id);
      const upgrades = this.career ? this.career.getCarUpgrades(carConfig.id) : {};
      const runMods = {
        ...(this.ui?.visualMods || {}),
        dateMode: this.mode === 'DATE_DRIVE' ? (coupleForRun.dateMode || 'romance') : (this.coupleProfile.dateMode || 'off'),
        showCharacters: this.mode === 'DATE_DRIVE' ? 'couple' : this.resolveCharMode(this.coupleProfile.showCharacters),
        coupleNames: { partner1: coupleForRun.partner1, partner2: coupleForRun.partner2 }
      };

      this.playerCar = new Car(
        this.renderer.scene,
        this.track,
        safeCarIdx,
        this.ui?.selectedColor || '#00f0ff',
        true,
        this.ui?.playerName || 'Player',
        runMods,
        upgrades
      );
      if (this.playerCar?.physics) {
        this.playerCar.physics.totalLaps = this.activeRaceConfig.laps || 3;
        const sys = this.input?.getSystemSettings?.();
        if (sys) this.playerCar.modelData?.setHeadlightsEnabled?.(sys.headlightsEnabled !== false);
        if (this.track?.gridSlots?.[0]) {
          this.playerCar.physics.resetToGrid(this.track.gridSlots[0]);
          this.playerCar.mesh.position.copy(this.playerCar.physics.position);
          this.playerCar.mesh.quaternion.copy(this.playerCar.physics.quaternion);
        }
      }

      this.telemetry.startRace(1);
      this.replay.startRecording();

      this.bots = [];
      if (this.mode === 'DATE_DRIVE') {
        this.state = 'RACING';
        this.raceStartTime = performance.now();
        if (this.playerCar?.physics) this.playerCar.physics.lapStartTime = this.raceStartTime;
        this.ui.showScreen('hud');
        this.ui.setCinemaBarsVisible?.(true);
        this.cameraCtrl.setMode(CAMERA_MODES.CHASE);
        if (this.playerCar?.mesh) {
          this.cameraCtrl.snapToTarget(this.playerCar.mesh);
          this.renderer.updateShadowTarget(this.playerCar.mesh.position);
        }
        if (!this.audio?.hasCustomMusicActive?.()) {
          const romStation = this.audio?.setStationById?.('romance');
          if (romStation && this.ui?.hudRadioStation) {
            this.ui.hudRadioStation.textContent = romStation.name;
          }
        }
        this.audio?.startMusic?.();
        const chosenVenueId = this.activeRaceConfig.venueId || this.ui?.selectedDateVenueId || 'shah_rasoi';
        this.dateExperience?.startSession?.(this.playerCar, coupleForRun, chosenVenueId);
        const venueObj = this.dateExperience?.getVenueConfig?.() || PURE_VEG_VENUES[0];
        this.ui.showToast(`❤️ ${coupleForRun.partner1} ♥ ${coupleForRun.partner2} — Drive together to ${venueObj.name} (100% Pure Veg)!`);
        return;
      }

      this.ui.setCinemaBarsVisible?.(false);
      if (this.mode === 'TIME_ATTACK') {
        this.ghostManager.loadGhost(trackId);
        this.ghostManager.spawnGhostVisual(safeCarIdx);
      } else if (this.mode === 'BOSS_BATTLE') {
        const bossProfile = RIVAL_PROFILES.find(r => r.id === 'apex') || RIVAL_PROFILES[3];
        const bossBot = new BotRacer(
          this.renderer.scene,
          this.track,
          1,
          bossProfile,
          (name, color, text) => this.ui?.showRivalBanter(name, color, text),
          (pos, dir, intensity, isMajor) => this.triggerCrashCinematic(pos, dir, intensity, isMajor)
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
            (name, color, text) => this.ui?.showRivalBanter(name, color, text),
            (pos, dir, intensity, isMajor) => this.triggerCrashCinematic(pos, dir, intensity, isMajor)
          );
          this.bots.push(bot);
        }
      }

      this.startRaceCountdown();
    } catch (err) {
      console.error('Fatal startRace error:', err);
      this.ui?.showToast?.(`⚠️ Race start error: ${err.message}`);
    }
  }

  // --- 4. Start Multiplayer Race ---
  startMultiplayerRace(playersData, trackId = 'city_live', laps = 3) {
    this.setPaused(false);
    this.audio.init();
    this.audio.resume();
    this.audio?.setPaused?.(false);

    this.mode = 'MP';
    const weather = (trackId === 'city_monsoon' || trackId === 'cyber_rain') ? 'rain' : 'clear';
    this.track.buildTrack(trackId, weather);
    this.track?.setShowroomStageVisible?.(false);
    this.particles.reset();
    this.particles.setWeather(weather);
    this.audio.setWeatherAudio(weather);
    this.minimap.calculateBounds();
    this.applyWorldVisualTheme(trackId);
    this.cleanUpEntities();
    this.ui.setChatVisible(true);

    const myData = playersData.find(p => p.id === this.network.myId);
    const mySlot = myData ? myData.gridSlot : 0;

    const carConfig = CAR_CONFIGS[(myData?.carIndex || 0) % CAR_CONFIGS.length];
    this.audio?.setCarProfile?.(carConfig.id);
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
    this.playerCar.physics.totalLaps = laps || 3;
    const sys = this.input?.getSystemSettings?.();
    if (sys) this.playerCar.modelData?.setHeadlightsEnabled?.(sys.headlightsEnabled !== false);
    this.playerCar.physics.resetToGrid(this.track.gridSlots[mySlot]);
    this.playerCar.mesh.position.copy(this.playerCar.physics.position);
    this.playerCar.mesh.quaternion.copy(this.playerCar.physics.quaternion);

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
        remoteCar.mesh.position.copy(remoteCar.physics.position);
        remoteCar.mesh.quaternion.copy(remoteCar.physics.quaternion);
        remoteCar.targetTransform.position.copy(remoteCar.physics.position);
        remoteCar.targetTransform.quaternion.copy(remoteCar.physics.quaternion);
        this.remotePlayers.set(p.id, remoteCar);
      }
    });

    this.telemetry.startRace(mySlot + 1);
    this.replay.startRecording();
    this.startRaceCountdown();
  }

  // --- 5. Starting Countdown Sequence ---
  startRaceCountdown() {
    this.state = 'COUNTDOWN';
    this.ui.showScreen('hud');
    this.cameraCtrl.setMode(CAMERA_MODES.CHASE);
    if (this.playerCar?.mesh) {
      this.cameraCtrl.snapToTarget(this.playerCar.mesh);
      this.renderer.updateShadowTarget(this.playerCar.mesh.position);
    }

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
        this.showroomCar.destroy();
        this.showroomCar = null;
      }
      if (this.playerCar) {
        this.playerCar.destroy();
        this.playerCar = null;
      }
      if (this.bots && Array.isArray(this.bots)) {
        this.bots.forEach(b => b?.destroy?.());
      }
      this.bots = [];
      if (this.remotePlayers) {
        this.remotePlayers.forEach(p => p?.destroy?.());
        this.remotePlayers.clear();
      }
      this.ghostManager?.destroyGhost?.();
    } catch (e) {
      console.warn('cleanUpEntities fallback:', e);
    }
  }

  // --- 6. UI Event Bindings ---
  bindUIHandlers() {
    this.ui.onCarSelect = (idx) => {
      const carConfig = CAR_CONFIGS[idx % CAR_CONFIGS.length];
      this.audio?.playRevPreview?.(carConfig.id);
      if (this.showroomCar) {
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
        const sys = this.input?.getSystemSettings?.();
        if (sys) this.showroomCar.modelData?.setHeadlightsEnabled?.(sys.headlightsEnabled !== false);
      }
    };

    this.ui.onImportCustomGlb = (carId, blobUrl, fileName) => {
      CarBuilder.setCustomGlbForCar(carId, blobUrl);
      if (this.showroomCar) {
        this.showroomCar.updateCustomization(this.ui.selectedCarIndex, this.ui.selectedColor, null, { ...this.ui.visualMods, forceReload: true });
      }
      this.ui.showToast(`📦 Loaded custom 3D model: ${fileName}`);
    };

    this.ui.onTrackSelect = (trackId) => {
      const preset = resolveWorldPreset(trackId);
      const weather = preset.isRain ? 'rain' : 'clear';
      if (this.state === 'GARAGE') {
        this.track.buildTrack(preset.id, weather, { coupleNames: this.coupleProfile });
        this.track.setShowroomStageVisible(true);
        this.particles?.setWeather?.(weather);
        this.audio?.setWeatherAudio?.(weather);
        this.applyWorldVisualTheme(preset.id);
      }
    };

    this.ui.onCoupleProfileChange = (partial) => {
      this.updateCoupleProfile(partial);
    };

    this.ui.onStartDateCruise = (coupleCfg) => {
      if (coupleCfg) this.updateCoupleProfile(coupleCfg);
      this.startRace({
        mode: 'DATE_DRIVE',
        trackId: this.ui.selectedTrackId || 'city_live',
        laps: 99,
        venueId: coupleCfg?.venueId || this.ui?.selectedDateVenueId || 'shah_rasoi',
        coupleProfile: { ...this.coupleProfile }
      });
    };

    this.ui.onSelectDateVenue = (venueId) => {
      this.dateExperience?.selectVenue?.(venueId, this.state === 'RACING' && this.mode === 'DATE_DRIVE');
    };
    this.ui.onDateParkNow = () => this.dateExperience?.triggerArrivalCutscene?.(false);
    this.ui.onDateSkipWalk = () => {
      if (this.dateExperience?.phase === 'CUTSCENE_RETURN') {
        this.dateExperience.returnToCarAndDrive(true);
      } else {
        this.dateExperience?.triggerArrivalCutscene?.(true);
      }
    };
    this.ui.onDateOrderDish = (dishId) => this.dateExperience?.orderDish?.(dishId);
    this.ui.onDateFeed = () => this.dateExperience?.triggerFeedEachOther?.();
    this.ui.onDateCutCake = () => this.dateExperience?.triggerCutCake?.();
    this.ui.onDatePropose = () => this.dateExperience?.triggerProposal?.();
    this.ui.onDateReturnToTable = () => this.dateExperience?.triggerReturnToTable?.();
    this.ui.onDateTwirl = () => this.dateExperience?.triggerDanceTwirl?.();
    this.ui.onDateCelebrate = () => this.dateExperience?.triggerCelebrate?.();
    this.ui.onDateSing = () => this.dateExperience?.triggerSingDuet?.();
    this.ui.onDateDance = () => this.dateExperience?.triggerSlowDance?.();
    this.ui.onDateBackToCar = () => this.dateExperience?.returnToCarAndDrive?.(false);

    this.ui.onCycleClimate = () => {
      const ids = Object.keys(TRACK_PRESETS);
      const curr = this.activeRaceConfig?.trackId || this.ui.selectedTrackId || 'city_live';
      const nextId = ids[(ids.indexOf(curr) + 1) % ids.length];
      this.ui.selectedTrackId = nextId;
      if (this.ui.trackSelect) this.ui.trackSelect.value = nextId;
      const preset = resolveWorldPreset(nextId);
      const weather = preset.isRain ? 'rain' : 'clear';
      this.activeRaceConfig.trackId = nextId;
      this.activeRaceConfig.weather = weather;
      this.particles?.setWeather?.(weather);
      this.audio?.setWeatherAudio?.(weather);
      this.applyWorldVisualTheme(nextId);
      this.ui.showToast(`🌦️ CLIMATE: ${preset.timeLabel || preset.name}`);
    };

    this.ui.onStartRace = (raceConfig) => this.startRace(raceConfig);

    this.ui.onCreateMultiplayerRoom = (data) => {
      this.network.createRoom(data, (res) => {
        if (res.success) {
          this.ui.renderLobby(res.room, this.network.myId);
          document.getElementById('modal-multiplayer')?.classList.add('hidden');
        } else {
          this.ui.showToast(`⚠️ ${res.message || 'Failed to create room'}`);
        }
      });
    };

    this.ui.onJoinMultiplayerRoom = (code, data) => {
      this.network.joinRoom(code, data, (res) => {
        if (res.success) {
          this.ui.renderLobby(res.room, this.network.myId);
          document.getElementById('modal-multiplayer')?.classList.add('hidden');
        } else {
          this.ui.showToast(`⚠️ ${res.message || 'Failed to join room'}`);
        }
      });
    };

    this.ui.onLeaveRoom = () => {
      this.network.leaveRoom();
      this.initShowroom();
    };

    this.ui.onToggleReady = (isReady) => this.network.toggleReady(isReady);
    this.ui.onStartMultiplayerRace = () => this.network.startRace();
    this.ui.onSendChat = (text) => this.network.sendChat(text);
    this.audio.onMusicStateChange = (st) => this.ui?.syncMusicUI?.(st);
    this.ui.onCycleRadio = () => this.audio.cycleStation();
    this.ui.onUploadDeviceMusic = (files) => {
      const list = this.audio.addLocalFiles?.(files);
      if (list?.length) this.ui.showToast(`🎵 Loaded ${list.length} device track(s) — Playing now!`);
    };
    this.ui.onPlayLocalTrack = (idx) => this.audio.playLocalTrack?.(idx);
    this.ui.onRemoveLocalTrack = (idx) => this.audio.removeLocalTrack?.(idx);
    this.ui.onClearLocalMusic = () => this.audio.clearLocalPlaylist?.();
    this.ui.onPlayLiveStation = (id) => {
      const st = this.audio.playLiveStation?.(id);
      if (st) this.ui.showToast(`📡 Tuning ${st.name}`);
    };
    this.ui.onPlaySynthStation = (id) => {
      const st = this.audio.setStationById?.(id);
      if (st) {
        this.audio.startMusic?.();
        this.ui.showToast(`🎹 Playing ${st.name}`);
      }
    };
    this.ui.onPlayCustomStreamUrl = (url) => this.audio.playCustomStreamUrl?.(url);
    this.ui.onMusicPlayPause = () => this.audio.togglePlayback?.();
    this.ui.onMusicNext = () => this.audio.nextTrack?.();
    this.ui.onMusicPrev = () => this.audio.prevTrack?.();
    this.ui.onMusicSeek = (frac) => this.audio.seekLocal?.(frac);
    this.ui.onRequestMusicState = () => this.audio.getMusicState?.();
    const handleToggleSfx = () => {
      const muted = this.audio.toggleSfxMute?.();
      this.ui.syncAudioToggleUI?.(this.audio.isSfxMuted, this.audio.isMusicMuted);
      this.ui.showToast(muted ? '🏎️🔇 Car Sound OFF (Music stays ON!)' : '🏎️🔊 Car Sound ON');
      return muted;
    };
    const handleToggleMusic = () => {
      const muted = this.audio.toggleMusicMute?.();
      this.ui.syncAudioToggleUI?.(this.audio.isSfxMuted, this.audio.isMusicMuted);
      this.ui.showToast(muted ? '🎵🔇 Music OFF (Car Sound stays ON!)' : '🎵🔊 Music ON');
      return muted;
    };
    this.ui.onToggleSfxMute = handleToggleSfx;
    this.ui.onToggleMusicMute = handleToggleMusic;
    this.ui.onToggleMute = handleToggleSfx;
    this.input.onToggleSfxMute = handleToggleSfx;
    this.input.onToggleMusicMute = handleToggleMusic;
    this.ui.syncAudioToggleUI?.(this.audio.isSfxMuted, this.audio.isMusicMuted);

    const handleHornStart = () => {
      if (this.isPaused || this.ui?.hasOpenModal?.()) return;
      this.audio?.init?.();
      this.audio?.resume?.();
      this.audio?.startHorn?.();
      this.ui?.syncVehicleFxUI?.(this.audio?.indicatorMode || 'off', !!this.audio?.indicatorPhaseOn, !!this.audio?.hornActive);
    };
    const handleHornStop = () => {
      this.audio?.stopHorn?.();
      this.ui?.syncVehicleFxUI?.(this.audio?.indicatorMode || 'off', !!this.audio?.indicatorPhaseOn, false);
    };
    const handleToggleIndicator = (side) => {
      if (this.isPaused || this.ui?.hasOpenModal?.()) return;
      this.audio?.init?.();
      this.audio?.resume?.();
      const nextMode = (this.audio?.indicatorMode === side) ? 'off' : side;
      this.indicatorSteerArmed = false;
      this.audio?.setIndicatorMode?.(nextMode);
      this.ui?.syncVehicleFxUI?.(nextMode, !!this.audio?.indicatorPhaseOn, !!this.audio?.hornActive);
    };
    this.input.onHornStart = handleHornStart;
    this.input.onHornStop = handleHornStop;
    this.input.onToggleIndicator = handleToggleIndicator;
    this.ui.onHornStart = handleHornStart;
    this.ui.onHornStop = handleHornStop;
    this.ui.onToggleIndicator = handleToggleIndicator;
    this.ui.onCamSwitch = () => this.cameraCtrl.cycleMode();
    this.ui.onRestartRace = () => this.startRace(this.activeRaceConfig);
    this.ui.onTogglePause = (show) => this.setPaused(show);

    this.ui.onSensitivityChange = (val) => {
      const p = this.input.updateDrivingProfile?.({ steerSensitivity: val });
      if (p) this.ui.syncDrivingProfileUI(p);
    };

    this.ui.onSteeringPresetSelect = (presetId) => {
      const p = this.input.applySteeringPreset?.(presetId);
      if (p) {
        this.ui.syncDrivingProfileUI(p);
        this.ui.showToast(`🎛️ STEERING MODE: ${presetId.toUpperCase()}`);
      }
    };

    this.ui.onDrivingProfileChange = (partial) => {
      const p = this.input.updateDrivingProfile?.(partial);
      if (p) this.ui.syncDrivingProfileUI(p);
    };

    const triggerShift = (dir, allowAutoSwitch = false) => {
      if (!this.playerCar?.physics || (this.state !== 'RACING' && this.state !== 'COUNTDOWN') || this.isPaused) return;
      if (this.playerCar.physics.transmissionMode !== 'manual') {
        if (!allowAutoSwitch) {
          this.ui?.showToast?.('⚙️ AUTO GEARBOX ACTIVE (Click AUTO pill to use Manual Q/E)', 1400);
          return;
        }
        this.playerCar.physics.transmissionMode = 'manual';
        const updated = this.input.updateDrivingProfile?.({ transmissionMode: 'manual', manualExplicit: true });
        if (updated) this.ui.syncDrivingProfileUI(updated);
        this.ui.showToast('⚙️ MANUAL GEARBOX ACTIVE (Q / E)');
      }
      const shifted = dir > 0 ? this.playerCar.physics.shiftUp() : this.playerCar.physics.shiftDown();
      if (shifted) {
        this.audio?.playShift?.(dir < 0);
      }
    };

    this.input.onShiftUp = () => triggerShift(1, false);
    this.input.onShiftDown = () => triggerShift(-1, false);
    this.ui.onShiftUp = () => triggerShift(1, true);
    this.ui.onShiftDown = () => triggerShift(-1, true);

    this.ui.onQualityChange = (level) => {
      const s = this.input.applyGraphicsPreset?.(level);
      if (s) this.applySystemSettings(s);
    };

    this.ui.onGraphicsPresetSelect = (presetId) => {
      const s = this.input.applyGraphicsPreset?.(presetId);
      if (s) {
        this.applySystemSettings(s);
        this.ui.showToast(`🖥️ GRAPHICS: ${presetId.toUpperCase()}`);
      }
    };

    this.ui.onSystemSettingsChange = (partial) => {
      const s = this.input.updateSystemSettings?.(partial);
      if (s) this.applySystemSettings(s);
    };

    this.ui.onResetSettings = () => {
      const res = this.input.resetAllSettings?.();
      if (res) {
        this.ui.syncDrivingProfileUI(res.driving);
        this.applySystemSettings(res.system);
        this.ui.showToast('🔄 ALL SETTINGS RESET TO DEFAULTS');
      }
    };

    this.ui.onReturnToGarage = () => {
      this.setPaused(false);
      this.dateExperience?.stopSession?.();
      this.ui.setCinemaBarsVisible?.(false);
      this.audio.stopMusic();
      this.audio?.stopHorn?.();
      this.audio?.setIndicatorMode?.('off');
      this.indicatorSteerArmed = false;
      this.particles.reset();
      this.cleanUpEntities();
      const preset = resolveWorldPreset(this.ui.selectedTrackId || 'city_live');
      const weather = preset.isRain ? 'rain' : 'clear';
      this.track.buildTrack(preset.id, weather, { coupleNames: this.coupleProfile });
      this.particles.setWeather(weather);
      this.audio.setWeatherAudio(weather);
      this.initShowroom();
      this.ui.showScreen('garage');
      this.ui.updateCreditsDisplay();
    };

    this.ui.onOpenReplay = () => {
      if (!this.replay.canPlay()) {
        this.ui.showToast('⚠️ Not enough recorded frames for replay yet!');
        return;
      }
      this.ui.screenResults?.classList.add('hidden');
      this.state = 'REPLAY';
      this.ui.showScreen('replay');
      this.replay.startPlayback();
    };

    this.ui.onExitReplay = () => {
      this.replay.stopPlayback();
      this.state = 'FINISHED';
    };

    this.ui.onOpenPhotoMode = () => {
      this.state = 'PHOTO';
      this.ui.showScreen('photo');
      this.photoMode.enter(this.playerCar?.mesh);
    };

    this.ui.onExitPhotoMode = () => {
      this.photoMode.exit();
      this.state = 'REPLAY';
    };

    this.ui.onToggleVoice = () => this.voice.toggleListening();
    this.ui.onToggleGestureCam = () => this.gesture.toggleCamera?.();
    this.input.onToggleGestureCam = () => this.gesture.toggleCamera?.();

    this.gesture.onCamStateChange = (active, statusText) => {
      this.ui?.updateGestureCamUI?.(active, statusText);
      if (active && statusText !== 'LOADING AI...') {
        this.ui?.showToast?.(`🖐️ FINGER GESTURE CAM: ${statusText} (1 Finger=Steer, 🖐️=Gas, ✊=Brake, ✌️=Nitro)`);
      }
    };
    this.gesture.onGestureFeedback = (title, desc, icon) => {
      this.ui?.showVoiceFeedback?.(title, desc, icon, '');
    };
    this.gesture.onError = (err) => this.ui?.showToast?.(`⚠️ ${err}`);
    this.gesture.onTouchVisual = (active, ax, ay, cx, cy) => {
      this.ui?.updateTouchSwipeVisual?.(active, ax, ay, cx, cy);
    };

    this.voice.onStateChange = (isListening) => this.ui.updateVoiceMicUI(isListening);

    this.voice.onCommandRecognized = (title, desc, icon, rawText) => {
      this.ui.showVoiceFeedback(title, desc, icon, rawText);
      this.audio.playBeep('countdown_high');
    };

    this.voice.onError = (err) => this.ui.showToast(`⚠️ ${err}`);

    this.input.onCamChange = () => {
      if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
        this.cameraCtrl.cycleMode();
      }
    };

    this.input.onTogglePause = () => {
      if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
        this.setPaused(!this.isPaused);
      } else if (this.state === 'GARAGE' && this.ui.hasOpenModal()) {
        this.ui.closeAllModals();
      }
    };

    this.input.onResetCar = () => {
      if (this.playerCar && this.state === 'RACING' && !this.isPaused) {
        const sp = this.track.getClosestPoint(this.playerCar.physics.position).sample;
        this.playerCar.physics.position.copy(sp.position).add(new THREE.Vector3(0, 0.035, 0));
        this.playerCar.physics.velocity.set(0, 0, 0);
        this.playerCar.physics.speed = 0;
        this.playerCar.physics.speedKmh = 0;
        this.playerCar.physics.gear = 1;
        this.playerCar.physics.isReversing = false;
        this.playerCar.physics.autoReverseHoldTimer = 0;
        this.playerCar.physics.rotationY = Math.atan2(sp.tangent.x, sp.tangent.z);
        this.playerCar.physics.suspensionPitch = 0;
        this.playerCar.physics.suspensionRoll = 0;
      }
    };

    this.voice.onStartRaceVoice = () => {
      if (this.state === 'GARAGE' && !this.ui.hasOpenModal()) {
        this.startRace({ mode: 'GP', trackId: this.ui.selectedTrackId, laps: 3 });
      }
    };

    window.addEventListener('keydown', (e) => {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) return;

      if (e.code === 'KeyV' && !e.repeat) {
        this.voice.toggleListening();
      } else if (this.state === 'GARAGE' && !this.ui.hasOpenModal() && e.code === 'Enter' && !e.repeat) {
        this.startRace({ mode: 'GP', trackId: this.ui.selectedTrackId, laps: 3 });
      }
    });
  }

  // --- 7. Network Event Bindings ---
  bindNetworkHandlers() {
    this.network.onRoomState = (room) => {
      this.ui.renderLobby(room, this.network.myId);
    };

    this.network.onRaceStartCountdown = (data) => {
      const trackId = this.network.currentRoom?.trackId || 'city_live';
      const laps = this.network.currentRoom?.laps || 3;
      this.startMultiplayerRace(data.players, trackId, laps);
    };

    this.network.onRoomTransforms = (transforms) => {
      if (this.state === 'RACING' || this.state === 'FINISHED') {
        Object.keys(transforms).forEach((id) => {
          if (id !== this.network.myId && this.remotePlayers.has(id)) {
            this.remotePlayers.get(id).setRemoteTransform(transforms[id]);
          }
        });
      }
    };

    this.network.onPlayerLeft = (data) => {
      if (data?.id && this.remotePlayers.has(data.id)) {
        this.remotePlayers.get(data.id).destroy();
        this.remotePlayers.delete(data.id);
      }
      if (this.state === 'GARAGE' && this.network.currentRoom) {
        this.network.currentRoom.players = data.players;
        this.network.currentRoom.hostId = data.newHostId;
        this.ui.renderLobby(this.network.currentRoom, this.network.myId);
      }
    };

    this.network.onChatMessage = (msg) => this.ui.addChatMessage(msg);

    this.network.onRaceEnded = (data) => {
      this.finishRaceSequence(data.podium, (performance.now() - this.raceStartTime) / 1000, 4000);
    };
  }

  // --- 8. Calculate Standings & Leaderboard ---
  calculateLeaderboard() {
    const list = [];

    if (this.playerCar) {
      const sp = this.track.getClosestPoint(this.playerCar.physics.position).sample;
      const progress = (this.playerCar.physics.lap - 1) + sp.u;
      list.push({
        id: 'player',
        name: this.playerCar.name,
        color: this.playerCar.color,
        progress,
        isMe: true
      });
    }

    this.bots.forEach((b, idx) => {
      const progress = (b.car.physics.lap - 1) + b.u;
      list.push({
        id: `bot_${idx}`,
        botRef: b,
        name: b.rival.name,
        color: b.rival.color,
        progress,
        isMe: false
      });
    });

    this.remotePlayers.forEach((p, id) => {
      const sp = this.track.getClosestPoint(p.targetTransform.position).sample;
      const progress = (p.physics.lap - 1) + sp.u;
      list.push({
        id,
        name: p.name,
        color: p.color,
        progress,
        isMe: false
      });
    });

    list.sort((a, b) => b.progress - a.progress);
    return list;
  }

  // --- 9. Check Achievements ---
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

  // --- 10. Finish Race Sequence ---
  finishRaceSequence(customPodium = null, totalTime = 0, cashPrize = 0) {
    this.state = 'FINISHED';
    this.audio.silenceDrivingLoops();
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
    let cashEarned = cashPrize || prizeTiers[myRank - 1] || 300;

    // Career Championship Multi-Stage Progression
    if (this.mode === 'CAREER' && this.activeRaceConfig.careerCup) {
      const cup = this.activeRaceConfig.careerCup;
      const stageIdx = this.activeRaceConfig.careerStageIndex || 0;
      const nextStageIdx = stageIdx + 1;

      if (nextStageIdx < cup.races.length) {
        const nextStage = cup.races[nextStageIdx];
        this.career.earnCredits(cashEarned, `${cup.name} Stage ${stageIdx + 1}`);
        this.ui.showToast(`🏁 Stage ${stageIdx + 1}/${cup.races.length} Complete! Advancing to ${nextStage.name}...`);
        setTimeout(() => {
          this.startRace({
            mode: 'CAREER',
            trackId: nextStage.track,
            weather: nextStage.weather,
            laps: nextStage.laps,
            careerCup: cup,
            careerStageIndex: nextStageIdx
          });
        }, 2500);
        return;
      } else {
        if (myRank <= 3) {
          cashEarned += cup.prizeMoney;
          this.career.data.careerProgress[cup.id] = {
            completed: true,
            bestRank: Math.min(this.career.data.careerProgress[cup.id]?.bestRank || 99, myRank)
          };
          this.career.save();
          this.ui.showToast(`🏆 CHAMPIONSHIP COMPLETE: ${cup.name} (+$${cup.prizeMoney.toLocaleString()} Bonus!)`);
        }
      }
    }

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

  /**
   * Triggers dramatic crash explosion particles, heavy crunch audio, camera kick, and brief slow-mo impact frame.
   */
  triggerCrashCinematic(pos, dir = null, intensity = 0.85, isMajor = true) {
    if (pos) {
      this.particles?.emitCrashExplosion?.(pos, dir, intensity);
    }
    this.audio?.playCrash?.(Math.min(1.25, intensity));
    this.cameraCtrl?.triggerCrashKick?.(intensity);
    if (isMajor && intensity >= 0.72 && (this.crashSlowMoCooldown || 0) <= 0) {
      this.crashSlowMoTimer = 0.24;
      this.crashSlowMoCooldown = 2.0;
    }
  }

  // --- 11. Main Animation Loop ---
  loop(timestamp) {
    requestAnimationFrame((t) => this.loop(t));

    const dt = Math.min(0.05, Math.max(0.001, (timestamp - this.lastTime) / 1000));
    this.lastTime = timestamp;
    this.fpsEstimate = THREE.MathUtils.lerp(this.fpsEstimate || 60, 1 / Math.max(0.004, dt), 0.08);
    if ((this.crashSlowMoTimer || 0) > 0) this.crashSlowMoTimer = Math.max(0, this.crashSlowMoTimer - dt);
    if ((this.crashSlowMoCooldown || 0) > 0) this.crashSlowMoCooldown = Math.max(0, this.crashSlowMoCooldown - dt);
    const simDt = (this.state === 'RACING' && (this.crashSlowMoTimer || 0) > 0) ? dt * 0.42 : dt;
    this.track?.updateWorldAnimations?.(simDt);

    if (this.isPaused) {
      this.renderer.render();
      return;
    }

    const fxState = this.audio?.updateIndicatorFx?.(dt) || { mode: 'off', phaseOn: false };

    const liveInput = this.input.getState();
    if (fxState.mode === 'left' || fxState.mode === 'right') {
      const steerVal = Math.abs(liveInput.steer || 0);
      if (steerVal > 0.42) {
        this.indicatorSteerArmed = true;
      } else if (this.indicatorSteerArmed && steerVal < 0.10) {
        this.indicatorSteerArmed = false;
        this.audio?.setIndicatorMode?.('off');
        fxState.mode = 'off';
        fxState.phaseOn = false;
      }
    } else {
      this.indicatorSteerArmed = false;
    }

    this.ui?.syncVehicleFxUI?.(fxState.mode, fxState.phaseOn, !!this.audio?.hornActive);

    const inputState = (this.state === 'RACING')
      ? { ...liveInput, indicatorMode: fxState.mode, indicatorPhaseOn: fxState.phaseOn }
      : {
        throttle: (this.state === 'COUNTDOWN' && liveInput.handbrake) ? liveInput.throttle : 0,
        brake: 0,
        steer: 0,
        handbrake: this.state === 'COUNTDOWN',
        nitro: false,
        horn: !!liveInput.horn,
        indicatorMode: fxState.mode,
        indicatorPhaseOn: fxState.phaseOn,
        steerSensitivity: liveInput.steerSensitivity,
        stabilityAssist: liveInput.stabilityAssist,
        transmissionMode: liveInput.transmissionMode,
        nitroMode: liveInput.nitroMode,
        handbrakeMode: liveInput.handbrakeMode,
        absEnabled: liveInput.absEnabled,
        tcsEnabled: liveInput.tcsEnabled,
        brakeBias: liveInput.brakeBias,
        aeroTrim: liveInput.aeroTrim,
        finalDrive: liveInput.finalDrive
      };

    if (this.state === 'GARAGE') {
      this.track?.updateShowroomStage?.(dt);
      this.renderer?.setSpeedEffect?.(0, false);
      if (this.showroomCar) {
        this.cameraCtrl.update(dt, this.showroomCar.mesh, null);
        this.renderer.updateShadowTarget(this.showroomCar.mesh.position);
        this.showroomCar.modelData.updateUnderglowAnimation?.(dt);
        this.showroomCar.modelData.updateDateAnimations?.(dt, 0);
        this.showroomCar.modelData.setIndicatorVisual?.(fxState.mode, fxState.phaseOn);
      }
      if ((this.ui?.selectedTrackId === 'city_live') && timestamp - this.lastLiveClockCheck > 30000) {
        this.lastLiveClockCheck = timestamp;
        this.applyWorldVisualTheme('city_live');
      }
    } else if (this.state === 'REPLAY') {
      const allOpponents = this.bots.length > 0 ? this.bots : Array.from(this.remotePlayers.values()).map(p => ({ car: p }));
      this.replay.update(dt, this.playerCar, allOpponents);
      if (this.playerCar?.mesh) {
        this.renderer.updateShadowTarget(this.playerCar.mesh.position);
      }
    } else if (this.state === 'PHOTO') {
      // Camera controlled by PhotoModeManager
    } else if (this.state === 'COUNTDOWN' || this.state === 'RACING' || this.state === 'FINISHED') {
      const allOpponents = (this.mode === 'MP') ? Array.from(this.remotePlayers.values()).map(p => ({ car: p })) : this.bots;

      if (this.state === 'RACING') {
        this.track.updateMovingObstacles?.(simDt);
      }

      if (this.playerCar) {
        const isDateCutscene = (
          this.mode === 'DATE_DRIVE'
          && this.dateExperience
          && (
            this.dateExperience.phase === 'CUTSCENE_WALK'
            || this.dateExperience.phase === 'CAFE_DINING'
            || this.dateExperience.phase === 'CUTSCENE_RETURN'
            || this.dateExperience.phase === 'HOME_ARRIVED'
          )
        );
        const carFrameInput = isDateCutscene
          ? { ...inputState, throttle: 0, brake: 0, steer: 0, nitro: false, handbrake: true }
          : inputState;
        this.playerCar.update(simDt, carFrameInput, this.particles, this.audio);
        if (this.mode === 'DATE_DRIVE' && this.state === 'RACING') {
          this.dateExperience?.update?.(dt);
          this.track?.updateWorldAnimations?.(simDt);
        }
        this.cameraCtrl.update(dt, this.playerCar.mesh, this.playerCar.physics);
        this.renderer.updateShadowTarget(this.playerCar.mesh.position);

        const currentLeaderboard = this.calculateLeaderboard();
        const myRank = currentLeaderboard.findIndex(l => l.isMe) + 1;

        if (this.state === 'RACING') {
          this.telemetry.update(dt, this.playerCar.physics, myRank);
          const totalRaceElapsed = (performance.now() - this.raceStartTime) / 1000;
          this.replay.recordFrame(totalRaceElapsed, this.playerCar, allOpponents);

          if (this.mode === 'DRIFT_ARENA' && this.playerCar.physics.driftScore >= 15000) {
            this.finishRaceSequence(null, totalRaceElapsed, 10000);
            this.career.unlockAchievement('drift_king');
          }

          // Knockout Mode: Eliminate true last-place AI racer on each lap completion
          if (this.mode === 'KNOCKOUT' && this.playerCar.physics.lap > this.lastKnockoutLap) {
            this.lastKnockoutLap = this.playerCar.physics.lap;
            const botEntries = currentLeaderboard.filter(e => e.botRef);
            const lastBotEntry = botEntries[botEntries.length - 1];
            if (lastBotEntry && lastBotEntry.botRef) {
              const eliminatedBot = lastBotEntry.botRef;
              this.bots = this.bots.filter(b => b !== eliminatedBot);
              this.ui.showToast(`☠️ ELIMINATED: ${eliminatedBot.rival.name}`);
              eliminatedBot.destroy();
            }
          }
        }

        if (this.mode === 'TIME_ATTACK' && this.state === 'RACING') {
          this.ghostManager.recordFrame(this.playerCar.physics);
          const currLapTime = (performance.now() - this.playerCar.physics.lapStartTime) / 1000;
          this.ghostManager.updatePlayback(currLapTime);
        }

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

        if (this.state === 'RACING') {
          this.checkAchievements(this.playerCar.physics, 0);
        }

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

      if ((this.mode !== 'MP' && this.mode !== 'TIME_ATTACK') && this.state === 'RACING') {
        this.bots.forEach(b => b.update(simDt, this.playerCar, this.bots, this.particles));
      }

      if (this.mode === 'MP') {
        this.remotePlayers.forEach(p => p.update(dt, null, this.particles, null));
      }

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
      if (this.playerCar?.physics) {
        const speedRatio = Math.min(1.0, (this.playerCar.physics.speed || 0) / 112);
        this.renderer?.setSpeedEffect?.(speedRatio, this.playerCar.physics.isNitroActive, this.playerCar.physics.nitroMode);

        // Date Petals, Twilight Fireflies & Candlelight Gazebo Arrival Event
        this.fxSpawnTimer += dt;
        const isDecorated = this.mode === 'DATE_DRIVE' || (this.coupleProfile?.dateMode && this.coupleProfile.dateMode !== 'off');
        if (this.fxSpawnTimer > 0.16) {
          this.fxSpawnTimer = 0;
          if (isDecorated) {
            this.particles.emitPetal(this.playerCar.mesh.position);
          }
          if (this.track?.preset?.isNight || this.track?.preset?.isFog || this.track?.preset?.id === 'city_sunset' || isDecorated) {
            this.particles.emitFirefly(this.playerCar.mesh.position);
          }
        }
      }
      const modeLabelMap = { ...modeLabels, DATE_DRIVE: `❤️ DATE: ${this.coupleProfile.partner1.toUpperCase()} ♥ ${this.coupleProfile.partner2.toUpperCase()}` };
      this.ui.updateHUD(this.playerCar?.physics, this.network.ping, leaderboard, modeLabelMap[this.mode] || 'RACE', Math.round(this.fpsEstimate));
      this.minimap.render(this.playerCar, allOpponents);
    }

    this.particles.update(simDt, this.renderer.camera.position);
    this.renderer.render();
  }
}

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

function launchVelocityRush() {
  if (!window.gameApp) {
    try {
      console.log('⚡ Initializing S3D Drive Master Engine...');
      window.gameApp = new GameApp();
      console.log('✅ S3D Drive Engine initialized successfully!');
      document.getElementById('s3d-error-banner')?.remove();
      document.getElementById('debug-error-box')?.remove();
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
        }).catch(() => { });
      } catch (e) { }

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
