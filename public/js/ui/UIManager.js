/**
 * Velocity Rush: Neon Rebellion - Master UI Manager
 * Handles 5 Game Modes, Telemetry Dashboard, Replay Player, Photo Mode,
 * Rival Dialogues, Knockout Timers, and Boss HUD.
 */
import { CAR_CONFIGS } from '../engine/CarBuilder.js';
import { UPGRADE_TIERS, ACHIEVEMENTS, CAREER_CUPS } from '../systems/CareerManager.js';
import { TRACK_PRESETS } from '../engine/Track.js';

export class UIManager {
  constructor(careerManager) {
    this.career = careerManager;

    this.selectedCarIndex = 0;
    this.selectedColor = '#00f0ff';
    this.selectedTrackId = 'neon_city';
    this.selectedWeather = 'clear';
    this.playerName = 'Rebel ' + Math.floor(100 + Math.random() * 900);

    this.visualMods = { rimStyle: 0, tint: 0, underglowMode: 'pulse' };

    // Callbacks
    this.onCarSelect = null;
    this.onColorSelect = null;
    this.onVisualModChange = null;
    this.onStartRace = null;
    this.onCreateMultiplayerRoom = null;
    this.onJoinMultiplayerRoom = null;
    this.onLeaveRoom = null;
    this.onToggleReady = null;
    this.onStartMultiplayerRace = null;
    this.onSendChat = null;
    this.onToggleMute = null;
    this.onCamSwitch = null;
    this.onCycleRadio = null;
    this.onRestartRace = null;
    this.onReturnToGarage = null;
    this.onOpenReplay = null;
    this.onOpenPhotoMode = null;
    this.onToggleVoice = null;

    this.cacheDOMElements();
    this.bindEvents();
    this.updateCarShowroomInfo();
    this.updateCreditsDisplay();
  }

  cacheDOMElements() {
    // Screens & Modals
    this.screenGarage = document.getElementById('screen-garage');
    this.screenLobby = document.getElementById('screen-lobby');
    this.screenHUD = document.getElementById('screen-hud');
    this.screenPause = document.getElementById('screen-pause');
    this.screenResults = document.getElementById('screen-results');
    this.modalTuning = document.getElementById('modal-tuning');
    this.modalCareer = document.getElementById('modal-career');
    this.modalAchievements = document.getElementById('modal-achievements');
    this.modalMultiplayer = document.getElementById('modal-multiplayer');
    this.modalTelemetry = document.getElementById('modal-telemetry');
    this.modalVoiceGuide = document.getElementById('modal-voice-guide');
    this.panelReplayControls = document.getElementById('panel-replay-controls');
    this.panelPhotoMode = document.getElementById('panel-photo-mode');

    // Voice Driving Controls
    this.btnVoiceGarage = document.getElementById('btn-toggle-voice-garage');
    this.btnVoiceHud = document.getElementById('hud-btn-voice');
    this.hudVoicePill = document.getElementById('hud-voice-pill');
    this.hudVoiceTitle = document.getElementById('hud-voice-title');
    this.hudVoiceDesc = document.getElementById('hud-voice-desc');

    // Credits
    this.creditsDisplay = document.getElementById('player-credits-val');

    // Garage
    this.carNameEl = document.getElementById('garage-car-name');
    this.carTypeEl = document.getElementById('garage-car-type');
    this.carDescEl = document.getElementById('garage-car-desc');
    this.statSpeedEl = document.getElementById('stat-speed');
    this.statAccelEl = document.getElementById('stat-accel');
    this.statHandlingEl = document.getElementById('stat-handling');
    this.statNitroEl = document.getElementById('stat-nitro');
    this.playerNameInput = document.getElementById('player-name-input');
    if (this.playerNameInput) this.playerNameInput.value = this.playerName;

    this.trackSelect = document.getElementById('garage-track-select');

    // HUD
    this.hudSpeedNumber = document.getElementById('hud-speed-val');
    this.hudGear = document.getElementById('hud-gear-val');
    this.hudRpmBar = document.getElementById('hud-rpm-bar');
    this.hudNitroBar = document.getElementById('hud-nitro-bar');
    this.hudLapCurrent = document.getElementById('hud-lap-val');
    this.hudLapTotal = document.getElementById('hud-lap-total');
    this.hudCurrentTime = document.getElementById('hud-time-current');
    this.hudBestTime = document.getElementById('hud-time-best');
    this.hudPositionNumber = document.getElementById('hud-pos-val');
    this.hudTotalRacers = document.getElementById('hud-pos-total');
    this.hudLeaderboardList = document.getElementById('hud-leaderboard-list');
    this.hudDriftBox = document.getElementById('hud-drift-box');
    this.hudDriftScore = document.getElementById('hud-drift-score');
    this.hudDriftCombo = document.getElementById('hud-drift-combo');
    this.hudWrongWay = document.getElementById('hud-wrong-way');
    this.hudCountdown = document.getElementById('hud-countdown');
    this.hudCountdownText = document.getElementById('hud-countdown-text');
    this.hudRadioStation = document.getElementById('hud-radio-name');

    // Special Mode HUD Elements
    this.hudModeBadge = document.getElementById('hud-mode-badge');
    this.hudKnockoutBox = document.getElementById('hud-knockout-box');
    this.hudKnockoutTimer = document.getElementById('hud-knockout-timer');
    this.hudRivalBanter = document.getElementById('hud-rival-banter');
    this.hudRivalName = document.getElementById('hud-rival-name');
    this.hudRivalText = document.getElementById('hud-rival-text');

    // Chat
    this.chatMessagesList = document.getElementById('chat-messages-list');
    this.chatInput = document.getElementById('chat-input');

    // Lobby
    this.lobbyRoomCode = document.getElementById('lobby-room-code');
    this.lobbyRoomName = document.getElementById('lobby-room-name');
    this.lobbyPlayerList = document.getElementById('lobby-player-list');
    this.btnLobbyReady = document.getElementById('btn-lobby-ready');
    this.btnLobbyStart = document.getElementById('btn-lobby-start');

    // Results
    this.resultsPodiumList = document.getElementById('results-podium-list');
    this.resultsBestLap = document.getElementById('results-best-lap');
    this.resultsTotalTime = document.getElementById('results-total-time');
    this.resultsCashPrize = document.getElementById('results-cash-prize');
  }

  bindEvents() {
    // Car Selection
    document.getElementById('btn-prev-car')?.addEventListener('click', () => {
      this.selectedCarIndex = (this.selectedCarIndex - 1 + CAR_CONFIGS.length) % CAR_CONFIGS.length;
      this.updateCarShowroomInfo();
      if (this.onCarSelect) this.onCarSelect(this.selectedCarIndex);
    });

    document.getElementById('btn-next-car')?.addEventListener('click', () => {
      this.selectedCarIndex = (this.selectedCarIndex + 1) % CAR_CONFIGS.length;
      this.updateCarShowroomInfo();
      if (this.onCarSelect) this.onCarSelect(this.selectedCarIndex);
    });

    // Customizer
    document.querySelectorAll('.color-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedColor = chip.dataset.color;
        if (this.onColorSelect) this.onColorSelect(this.selectedColor);
      });
    });

    document.querySelectorAll('.rim-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.rim-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.visualMods.rimStyle = parseInt(chip.dataset.rim);
        if (this.onVisualModChange) this.onVisualModChange(this.visualMods);
      });
    });

    document.querySelectorAll('.underglow-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.underglow-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.visualMods.underglowMode = chip.dataset.mode;
        if (this.onVisualModChange) this.onVisualModChange(this.visualMods);
      });
    });

    this.playerNameInput?.addEventListener('input', (e) => {
      this.playerName = (e.target.value || 'Rebel').trim().substring(0, 16);
    });

    this.trackSelect?.addEventListener('change', (e) => {
      this.selectedTrackId = e.target.value;
    });

    // --- 5 Game Mode Launchers ---
    document.getElementById('btn-mode-gp')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'GP', trackId: this.selectedTrackId, laps: 3 });
    });

    document.getElementById('btn-mode-drift')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'DRIFT_ARENA', trackId: 'industrial_core', laps: 3 });
    });

    document.getElementById('btn-mode-time-attack')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'TIME_ATTACK', trackId: this.selectedTrackId, laps: 5 });
    });

    document.getElementById('btn-mode-knockout')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'KNOCKOUT', trackId: this.selectedTrackId, laps: 5 });
    });

    document.getElementById('btn-mode-boss')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'BOSS_BATTLE', trackId: 'space_ring', laps: 3, isBoss: true });
    });

    document.getElementById('btn-mode-mp')?.addEventListener('click', () => {
      this.modalMultiplayer?.classList.remove('hidden');
    });

    // Modals & Voice Controls
    document.getElementById('btn-open-tuning')?.addEventListener('click', () => this.openTuningModal());
    document.getElementById('btn-open-career')?.addEventListener('click', () => this.openCareerModal());
    document.getElementById('btn-open-achievements')?.addEventListener('click', () => this.openAchievementsModal());
    document.getElementById('btn-open-voice-guide')?.addEventListener('click', () => {
      this.modalVoiceGuide?.classList.remove('hidden');
    });

    document.getElementById('btn-self-test')?.addEventListener('click', () => {
      const hasSpeech = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
      this.showToast(`🟢 SYSTEM STATUS: 3D Engine: OK | Voice Control: ${hasSpeech ? 'READY' : 'KEYBOARD ONLY'} | Press ENTER to Race!`);
    });

    // Voice Mic Toggles
    const handleVoiceToggle = () => {
      if (this.onToggleVoice) this.onToggleVoice();
    };
    this.btnVoiceGarage?.addEventListener('click', handleVoiceToggle);
    this.btnVoiceHud?.addEventListener('click', handleVoiceToggle);

    document.querySelectorAll('.btn-close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.modalTuning?.classList.add('hidden');
        this.modalCareer?.classList.add('hidden');
        this.modalAchievements?.classList.add('hidden');
        this.modalMultiplayer?.classList.add('hidden');
        this.modalTelemetry?.classList.add('hidden');
        this.modalVoiceGuide?.classList.add('hidden');
      });
    });

    // Multiplayer Room Actions
    document.getElementById('btn-mp-create')?.addEventListener('click', () => {
      const roomName = document.getElementById('mp-room-name')?.value || `${this.playerName}'s GP`;
      const laps = parseInt(document.getElementById('mp-laps-select')?.value || '3');
      if (this.onCreateMultiplayerRoom) {
        this.onCreateMultiplayerRoom({
          name: roomName,
          laps,
          trackId: this.selectedTrackId,
          playerName: this.playerName,
          carIndex: this.selectedCarIndex,
          carColor: this.selectedColor
        });
      }
    });

    document.getElementById('btn-mp-join')?.addEventListener('click', () => {
      const code = (document.getElementById('mp-join-code')?.value || '').trim().toUpperCase();
      if (code && this.onJoinMultiplayerRoom) {
        this.onJoinMultiplayerRoom(code, {
          playerName: this.playerName,
          carIndex: this.selectedCarIndex,
          carColor: this.selectedColor
        });
      }
    });

    this.btnLobbyReady?.addEventListener('click', () => {
      const isReady = this.btnLobbyReady.classList.toggle('ready');
      this.btnLobbyReady.textContent = isReady ? 'READY!' : 'SET READY';
      if (this.onToggleReady) this.onToggleReady(isReady);
    });

    this.btnLobbyStart?.addEventListener('click', () => {
      if (this.onStartMultiplayerRace) this.onStartMultiplayerRace();
    });

    document.getElementById('btn-leave-lobby')?.addEventListener('click', () => {
      if (this.onLeaveRoom) this.onLeaveRoom();
      this.showScreen('garage');
    });

    // Chat
    document.getElementById('btn-send-chat')?.addEventListener('click', () => this.submitChat());
    this.chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.submitChat();
    });

    // HUD Top Controls
    document.getElementById('hud-btn-cam')?.addEventListener('click', () => {
      if (this.onCamSwitch) this.onCamSwitch();
    });

    document.getElementById('hud-btn-radio')?.addEventListener('click', () => {
      if (this.onCycleRadio) {
        const station = this.onCycleRadio();
        if (this.hudRadioStation) this.hudRadioStation.textContent = station.name;
      }
    });

    document.getElementById('hud-btn-mute')?.addEventListener('click', () => {
      if (this.onToggleMute) {
        const isMuted = this.onToggleMute();
        const icon = document.getElementById('mute-icon');
        if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
      }
    });

    document.getElementById('hud-btn-pause')?.addEventListener('click', () => this.togglePause(true));
    document.getElementById('btn-pause-resume')?.addEventListener('click', () => this.togglePause(false));
    document.getElementById('btn-pause-restart')?.addEventListener('click', () => {
      this.togglePause(false);
      if (this.onRestartRace) this.onRestartRace();
    });
    document.getElementById('btn-pause-quit')?.addEventListener('click', () => {
      this.togglePause(false);
      if (this.onReturnToGarage) this.onReturnToGarage();
    });

    // Results Actions (Replay, Telemetry, Rematch)
    document.getElementById('btn-results-replay')?.addEventListener('click', () => {
      this.screenResults?.classList.add('hidden');
      if (this.onOpenReplay) this.onOpenReplay();
    });

    document.getElementById('btn-results-telemetry')?.addEventListener('click', () => {
      this.modalTelemetry?.classList.remove('hidden');
    });

    document.getElementById('btn-results-rematch')?.addEventListener('click', () => {
      this.screenResults?.classList.add('hidden');
      if (this.onRestartRace) this.onRestartRace();
    });

    document.getElementById('btn-results-garage')?.addEventListener('click', () => {
      this.screenResults?.classList.add('hidden');
      if (this.onReturnToGarage) this.onReturnToGarage();
    });

    // Replay Controls
    document.getElementById('btn-replay-playpause')?.addEventListener('click', () => {
      if (window.gameApp?.replay) {
        window.gameApp.replay.isPlaying = !window.gameApp.replay.isPlaying;
      }
    });
    document.getElementById('btn-replay-speed-slow')?.addEventListener('click', () => {
      window.gameApp?.replay?.setSpeed(0.5);
    });
    document.getElementById('btn-replay-speed-norm')?.addEventListener('click', () => {
      window.gameApp?.replay?.setSpeed(1.0);
    });
    document.getElementById('btn-replay-speed-fast')?.addEventListener('click', () => {
      window.gameApp?.replay?.setSpeed(2.0);
    });
    document.getElementById('btn-replay-cam')?.addEventListener('click', () => {
      window.gameApp?.replay?.cycleAngle();
    });
    document.getElementById('btn-replay-photo')?.addEventListener('click', () => {
      if (this.onOpenPhotoMode) this.onOpenPhotoMode();
    });
    document.getElementById('btn-replay-exit')?.addEventListener('click', () => {
      this.panelReplayControls?.classList.add('hidden');
      this.screenResults?.classList.remove('hidden');
    });

    // Photo Mode Controls
    document.getElementById('btn-photo-capture')?.addEventListener('click', () => {
      window.gameApp?.photoMode?.captureScreenshot();
    });
    document.getElementById('photo-fov-slider')?.addEventListener('input', (e) => {
      window.gameApp?.photoMode?.setFov(parseFloat(e.target.value));
    });
    document.getElementById('btn-photo-exit')?.addEventListener('click', () => {
      this.panelPhotoMode?.classList.add('hidden');
      window.gameApp?.photoMode?.exit();
      this.panelReplayControls?.classList.remove('hidden');
    });

    if (this.career) {
      this.career.onCreditsChanged = () => this.updateCreditsDisplay();
      this.career.onAchievementUnlocked = (ach) => this.showToast(`🏆 UNLOCKED: ${ach.title} (+$${ach.reward.toLocaleString()})`);
    }
  }

  showRivalBanter(rivalName, color, text) {
    if (!this.hudRivalBanter) return;
    if (this.hudRivalName) {
      this.hudRivalName.textContent = rivalName;
      this.hudRivalName.style.color = color;
    }
    if (this.hudRivalText) this.hudRivalText.textContent = `"${text}"`;

    this.hudRivalBanter.classList.remove('hidden');
    setTimeout(() => {
      this.hudRivalBanter?.classList.add('hidden');
    }, 4500);
  }

  updateCreditsDisplay() {
    if (this.creditsDisplay && this.career) {
      this.creditsDisplay.textContent = `$${this.career.getCredits().toLocaleString()}`;
    }
  }

  updateCarShowroomInfo() {
    const config = CAR_CONFIGS[this.selectedCarIndex % CAR_CONFIGS.length];
    if (this.carNameEl) this.carNameEl.textContent = config.name;
    if (this.carTypeEl) this.carTypeEl.textContent = config.type.toUpperCase();
    if (this.carDescEl) this.carDescEl.textContent = config.description;

    const carUpgrades = this.career ? this.career.getCarUpgrades(config.id) : { engine: 1, turbo: 1, tires: 1, nitro: 1 };
    const engineBoost = (carUpgrades.engine - 1) * 4;
    const accelBoost = (carUpgrades.turbo - 1) * 3;
    const handlingBoost = (carUpgrades.tires - 1) * 3;
    const nitroBoost = (carUpgrades.nitro - 1) * 4;

    if (this.statSpeedEl) this.statSpeedEl.style.width = `${Math.min(100, config.stats.topSpeed + engineBoost)}%`;
    if (this.statAccelEl) this.statAccelEl.style.width = `${Math.min(100, config.stats.accel + accelBoost)}%`;
    if (this.statHandlingEl) this.statHandlingEl.style.width = `${Math.min(100, config.stats.handling + handlingBoost)}%`;
    if (this.statNitroEl) this.statNitroEl.style.width = `${Math.min(100, config.stats.nitro + nitroBoost)}%`;
  }

  openTuningModal() {
    this.modalTuning?.classList.remove('hidden');
    this.renderTuningCards();
  }

  renderTuningCards() {
    const carConfig = CAR_CONFIGS[this.selectedCarIndex % CAR_CONFIGS.length];
    const upgrades = this.career.getCarUpgrades(carConfig.id);
    const container = document.getElementById('tuning-cards-container');
    if (!container) return;

    container.innerHTML = '';
    const categories = ['engine', 'turbo', 'tires', 'nitro'];

    categories.forEach((cat) => {
      const currentTier = upgrades[cat] || 1;
      const tierList = UPGRADE_TIERS[cat];
      const currentConfig = tierList[currentTier - 1];
      const nextConfig = tierList[currentTier];

      const card = document.createElement('div');
      card.className = 'tuning-upgrade-card glass-panel';
      const isMax = (currentTier >= 4);

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:'Orbitron'; font-weight:800; font-size:15px; color:var(--primary-neon);">${cat.toUpperCase()}</span>
          <span style="font-size:12px; font-weight:700; color:${isMax ? 'var(--accent-green)' : 'var(--accent-gold)'};">TIER ${currentTier}/4</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin:4px 0;">${currentConfig.name}</div>
        <div class="stat-track" style="margin: 6px 0;">
          <div class="stat-fill" style="width: ${(currentTier / 4) * 100}%;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
          ${isMax ? '<span style="color:var(--accent-green); font-weight:700;">MAX LEVEL</span>' : `<span style="font-family:'Orbitron'; font-weight:700; color:#fff;">$${nextConfig.cost.toLocaleString()}</span>`}
          <button class="cyber-btn cyber-btn-primary ${isMax ? 'disabled' : ''}" style="padding:6px 14px; font-size:11px;" ${isMax ? 'disabled' : ''}>
            ${isMax ? 'MAXED' : 'UPGRADE'}
          </button>
        </div>
      `;

      if (!isMax) {
        card.querySelector('button').addEventListener('click', () => {
          if (this.career.upgradeCarComponent(carConfig.id, cat)) {
            this.renderTuningCards();
            this.updateCarShowroomInfo();
          } else {
            alert('Not enough credits!');
          }
        });
      }
      container.appendChild(card);
    });
  }

  openCareerModal() {
    this.modalCareer?.classList.remove('hidden');
    const container = document.getElementById('career-cups-container');
    if (!container) return;

    container.innerHTML = '';
    CAREER_CUPS.forEach((cup) => {
      const card = document.createElement('div');
      card.className = 'career-cup-card glass-panel';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:'Orbitron'; font-weight:800; font-size:17px; color:#fff;">${cup.name}</span>
          <span style="font-size:12px; font-weight:700; color:var(--accent-gold);">${cup.tier.toUpperCase()} TIER</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin: 4px 0;">${cup.races.length} Stages • Prize: $${cup.prizeMoney.toLocaleString()}</div>
        <button class="cyber-btn cyber-btn-primary" style="width:100%; padding:8px; font-size:12px; margin-top:6px;">ENTER CUP</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        this.modalCareer?.classList.add('hidden');
        if (this.onStartRace) {
          const firstRace = cup.races[0];
          this.onStartRace({
            mode: 'CAREER',
            trackId: firstRace.track,
            weather: firstRace.weather,
            laps: firstRace.laps,
            careerCup: cup,
            careerStageIndex: 0
          });
        }
      });
      container.appendChild(card);
    });
  }

  openAchievementsModal() {
    this.modalAchievements?.classList.remove('hidden');
    const container = document.getElementById('achievements-list-container');
    if (!container) return;

    container.innerHTML = '';
    ACHIEVEMENTS.forEach((ach) => {
      const isUnlocked = this.career.data.unlockedAchievements.includes(ach.id);
      const card = document.createElement('div');
      card.className = `achievement-card glass-panel ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div style="font-size: 24px;">${ach.icon}</div>
        <div style="flex:1;">
          <div style="font-family:'Orbitron'; font-weight:700; font-size:14px; color:${isUnlocked ? 'var(--primary-neon)' : '#888'};">${ach.title}</div>
          <div style="font-size:11px; color:var(--text-muted);">${ach.desc}</div>
        </div>
        <div style="font-family:'Orbitron'; font-size:12px; font-weight:700; color:var(--accent-gold);">
          ${isUnlocked ? 'COMPLETED' : `+$${ach.reward.toLocaleString()}`}
        </div>
      `;
      container.appendChild(card);
    });
  }

  populateTelemetryModal(summary) {
    if (!summary) return;
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setTxt('tel-top-speed', `${summary.topSpeed || 0} KM/H`);
    setTxt('tel-avg-speed', `${summary.avgSpeed || 0} KM/H`);
    setTxt('tel-drift-dist', `${summary.driftDistanceMeters || 0} m`);
    setTxt('tel-nitro-count', `${summary.nitroUsed || 0} (${summary.nitroTimeSec || 0}s)`);
    setTxt('tel-overtakes', summary.overtakes || 0);
    setTxt('tel-air-time', `${summary.airTimeSec || 0}s`);
    setTxt('tel-clean-acc', summary.cleanDrivingAccuracy || '100%');
  }

  showScreen(screenName) {
    this.screenGarage?.classList.add('hidden');
    this.screenLobby?.classList.add('hidden');
    this.screenHUD?.classList.add('hidden');
    this.screenPause?.classList.add('hidden');
    this.screenResults?.classList.add('hidden');
    this.panelReplayControls?.classList.add('hidden');
    this.panelPhotoMode?.classList.add('hidden');

    switch (screenName) {
      case 'garage': this.screenGarage?.classList.remove('hidden'); break;
      case 'lobby': this.screenLobby?.classList.remove('hidden'); break;
      case 'hud': this.screenHUD?.classList.remove('hidden'); break;
      case 'results': this.screenResults?.classList.remove('hidden'); break;
      case 'replay': this.panelReplayControls?.classList.remove('hidden'); break;
      case 'photo': this.panelPhotoMode?.classList.remove('hidden'); break;
    }
  }

  renderLobby(room, myId) {
    if (!room) return;
    this.showScreen('lobby');
    if (this.lobbyRoomCode) this.lobbyRoomCode.textContent = room.code;
    if (this.lobbyRoomName) this.lobbyRoomName.textContent = room.name;

    const isHost = (room.hostId === myId);
    if (this.btnLobbyStart) this.btnLobbyStart.style.display = isHost ? 'block' : 'none';

    if (this.lobbyPlayerList) {
      this.lobbyPlayerList.innerHTML = '';
      room.players.forEach((p) => {
        const row = document.createElement('div');
        row.className = `lobby-player-card ${p.id === myId ? 'me' : ''}`;
        const carCfg = CAR_CONFIGS[p.carIndex % CAR_CONFIGS.length];
        row.innerHTML = `
          <div class="player-info">
            <span class="player-dot" style="background:${p.carColor}; box-shadow: 0 0 10px ${p.carColor}"></span>
            <span class="player-name">${p.name} ${p.isHost ? '👑' : ''} ${p.id === myId ? '(You)' : ''}</span>
          </div>
          <div class="player-car-tag">${carCfg.name}</div>
          <div class="player-status ${p.ready ? 'ready' : 'waiting'}">${p.ready ? 'READY' : 'WAITING'}</div>
        `;
        this.lobbyPlayerList.appendChild(row);
      });
    }
  }

  submitChat() {
    if (!this.chatInput) return;
    const text = this.chatInput.value.trim();
    if (text.length > 0) {
      if (this.onSendChat) this.onSendChat(text);
      this.chatInput.value = '';
    }
  }

  addChatMessage(msg) {
    if (!this.chatMessagesList) return;
    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = `
      <span class="chat-time">${msg.time || ''}</span>
      <span class="chat-sender" style="color: ${msg.senderColor || '#00f0ff'}">${msg.senderName}:</span>
      <span class="chat-text">${msg.text}</span>
    `;
    this.chatMessagesList.appendChild(div);
    this.chatMessagesList.scrollTop = this.chatMessagesList.scrollHeight;
  }

  updateHUD(physics, ping, leaderboard = [], modeName = 'GRAND PRIX') {
    if (!physics) return;

    if (this.hudModeBadge) this.hudModeBadge.textContent = modeName;
    if (this.hudSpeedNumber) this.hudSpeedNumber.textContent = physics.speedKmh;
    if (this.hudGear) this.hudGear.textContent = physics.gear;

    if (this.hudRpmBar) {
      const rpmPercent = Math.min(100, (physics.rpm / physics.maxRpm) * 100);
      this.hudRpmBar.style.width = `${rpmPercent}%`;
      if (rpmPercent > 85) this.hudRpmBar.classList.add('redline');
      else this.hudRpmBar.classList.remove('redline');
    }

    if (this.hudNitroBar) {
      const nitroPercent = (physics.nitroAmount / physics.nitroMax) * 100;
      this.hudNitroBar.style.width = `${nitroPercent}%`;
      if (physics.isNitroActive) this.hudNitroBar.classList.add('active-surge');
      else this.hudNitroBar.classList.remove('active-surge');
    }

    if (this.hudLapCurrent) this.hudLapCurrent.textContent = Math.min(physics.totalLaps, physics.lap);
    if (this.hudLapTotal) this.hudLapTotal.textContent = physics.totalLaps;

    const now = performance.now();
    const currLapTimeSec = physics.lapStartTime ? (now - physics.lapStartTime) / 1000 : 0;
    if (this.hudCurrentTime) this.hudCurrentTime.textContent = this.formatTime(currLapTimeSec);
    if (this.hudBestTime) this.hudBestTime.textContent = physics.bestLapTime ? this.formatTime(physics.bestLapTime) : '--:--.--';

    if (this.hudLeaderboardList && leaderboard.length > 0) {
      this.hudLeaderboardList.innerHTML = '';
      leaderboard.slice(0, 6).forEach((entry, idx) => {
        const item = document.createElement('div');
        item.className = `lb-item ${entry.isMe ? 'lb-me' : ''}`;
        item.innerHTML = `
          <span class="lb-pos">${idx + 1}</span>
          <span class="lb-name" style="color:${entry.color}">${entry.name}</span>
          <span class="lb-gap">${entry.gap || ''}</span>
        `;
        this.hudLeaderboardList.appendChild(item);

        if (entry.isMe && this.hudPositionNumber) {
          this.hudPositionNumber.textContent = idx + 1;
        }
      });
      if (this.hudTotalRacers) this.hudTotalRacers.textContent = leaderboard.length;
    }

    if (this.hudDriftBox) {
      if (physics.isDrifting && physics.driftScore > 0) {
        this.hudDriftBox.classList.remove('hidden');
        if (this.hudDriftScore) this.hudDriftScore.textContent = physics.driftScore.toLocaleString();
        if (this.hudDriftCombo) this.hudDriftCombo.textContent = `x${physics.driftCombo.toFixed(1)}`;
      } else if (physics.driftTime <= 0) {
        this.hudDriftBox.classList.add('hidden');
      }
    }

    if (this.hudWrongWay) {
      if (physics.wrongWay) this.hudWrongWay.classList.remove('hidden');
      else this.hudWrongWay.classList.add('hidden');
    }
  }

  showCountdown(numberOrText) {
    if (!this.hudCountdown) return;
    this.hudCountdown.classList.remove('hidden');
    if (this.hudCountdownText) {
      this.hudCountdownText.textContent = numberOrText;
      this.hudCountdownText.className = `countdown-${numberOrText.toString().toLowerCase()}`;
    }
    if (numberOrText === 'GO!' || numberOrText === 'GO') {
      setTimeout(() => {
        this.hudCountdown?.classList.add('hidden');
      }, 1200);
    }
  }

  showPodiumResults(podiumData, myTotalTime, myBestLap, cashEarned = 0) {
    this.showScreen('results');
    if (this.resultsBestLap) this.resultsBestLap.textContent = myBestLap ? this.formatTime(myBestLap) : '--:--.--';
    if (this.resultsTotalTime) this.resultsTotalTime.textContent = myTotalTime ? this.formatTime(myTotalTime) : '--:--.--';
    if (this.resultsCashPrize) this.resultsCashPrize.textContent = `+$${cashEarned.toLocaleString()}`;

    if (this.resultsPodiumList) {
      this.resultsPodiumList.innerHTML = '';
      podiumData.forEach((racer, idx) => {
        const row = document.createElement('div');
        row.className = `podium-card rank-${idx + 1}`;
        row.innerHTML = `
          <div class="podium-rank">${idx === 0 ? '🥇 1st' : (idx === 1 ? '🥈 2nd' : (idx === 2 ? '🥉 3rd' : `${idx + 1}th`))}</div>
          <div class="podium-name" style="color: ${racer.carColor || '#00f0ff'}">${racer.name}</div>
          <div class="podium-time">${racer.totalTime ? this.formatTime(racer.totalTime) : 'DNF'}</div>
        `;
        this.resultsPodiumList.appendChild(row);
      });
    }
  }

  showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'hud-toast-banner glass-panel';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  togglePause(show) {
    if (show) this.screenPause?.classList.remove('hidden');
    else this.screenPause?.classList.add('hidden');
  }

  updateVoiceMicUI(isListening) {
    if (this.btnVoiceGarage) {
      this.btnVoiceGarage.textContent = isListening ? '🎙️ MIC: ACTIVE' : '🎙️ MIC: OFF';
      if (isListening) this.btnVoiceGarage.classList.add('listening');
      else this.btnVoiceGarage.classList.remove('listening');
    }
    if (this.btnVoiceHud) {
      if (isListening) this.btnVoiceHud.classList.add('listening');
      else this.btnVoiceHud.classList.remove('listening');
    }
    if (isListening) {
      this.showToast('🎙️ VOICE DRIVING: LISTENING (Speak "Go", "Left", "Right", "Nitro", etc.)');
    } else {
      this.showToast('🎙️ VOICE DRIVING: MUTED');
    }
  }

  showVoiceFeedback(title, desc, icon, rawText) {
    if (!this.hudVoicePill) return;

    if (this.hudVoiceTitle) this.hudVoiceTitle.textContent = `${icon || '🎙️'} ${title}`;
    if (this.hudVoiceDesc) this.hudVoiceDesc.textContent = rawText ? `"${rawText.toUpperCase()}"` : desc;

    this.hudVoicePill.classList.remove('hidden');

    if (this.voicePillTimer) clearTimeout(this.voicePillTimer);
    this.voicePillTimer = setTimeout(() => {
      this.hudVoicePill?.classList.add('hidden');
    }, 1800);
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds) || seconds <= 0) return '00:00.00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds * 100) % 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }
}
