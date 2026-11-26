/**
 * Velocity Rush: Neon Rebellion - Master UI Manager
 * Handles Game Modes, Settings (Sensitivity & Graphics), Telemetry, Replay, Photo Mode,
 * Rival Dialogues, Knockout Timers, and Boss HUD.
 */
import { CAR_CONFIGS, NITRO_MODES } from '../engine/CarBuilder.js';
import { STEERING_PRESETS, GRAPHICS_PRESETS } from '../engine/Input.js';
import { UPGRADE_TIERS, ACHIEVEMENTS, CAREER_CUPS } from '../systems/CareerManager.js';
import { RADIO_STATIONS, LIVE_RADIO_STREAMS } from '../engine/Audio.js';
import { PURE_VEG_VENUES, getVenueById } from '../systems/DateExperience.js';

export class UIManager {
  constructor(careerManager) {
    this.career = careerManager;

    this.escapeHtml = (val) => String(val ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    this.safeColor = (val, fallback = '#00f0ff') => (
      typeof val === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(val.trim()) ? val.trim() : fallback
    );

    this.selectedCarIndex = 0;
    this.selectedColor = CAR_CONFIGS[0]?.defaultColor || '#ff0022';
    this.selectedTrackId = 'city_live';
    this.selectedWeather = 'clear';
    this.selectedDateVenueId = 'shah_rasoi';
    this.selectedMenuCategory = 'All';
    this._renderedCafeMenuKey = null;
    this.playerName = 'Rebel ' + Math.floor(100 + Math.random() * 900);

    this.visualMods = {
      rimStyle: 0,
      tint: 0,
      underglowMode: 'pulse',
      paintFinish: 'metallic',
      spoilerStyle: 0,
      aeroKit: 0,
      headlightStyle: 0,
      caliperColor: 0
    };

    // Callbacks
    this.onCarSelect = null;
    this.onColorSelect = null;
    this.onVisualModChange = null;
    this.onTrackSelect = null;
    this.onImportCustomGlb = null;
    this.onStartRace = null;
    this.onCreateMultiplayerRoom = null;
    this.onJoinMultiplayerRoom = null;
    this.onLeaveRoom = null;
    this.onToggleReady = null;
    this.onStartMultiplayerRace = null;
    this.onSendChat = null;
    this.onToggleMute = null;
    this.onToggleSfxMute = null;
    this.onToggleMusicMute = null;
    this.onCamSwitch = null;
    this.onCycleRadio = null;
    this.onRestartRace = null;
    this.onReturnToGarage = null;
    this.onOpenReplay = null;
    this.onExitReplay = null;
    this.onOpenPhotoMode = null;
    this.onExitPhotoMode = null;
    this.onToggleVoice = null;
    this.onToggleGestureCam = null;
    this.onTogglePause = null;
    this.onSensitivityChange = null;
    this.onQualityChange = null;
    this.onSteeringPresetSelect = null;
    this.onDrivingProfileChange = null;
    this.onGraphicsPresetSelect = null;
    this.onSystemSettingsChange = null;
    this.onResetSettings = null;
    this.onCoupleProfileChange = null;
    this.onStartDateCruise = null;
    this.onCycleClimate = null;
    this.onUploadDeviceMusic = null;
    this.onPlayLocalTrack = null;
    this.onRemoveLocalTrack = null;
    this.onClearLocalMusic = null;
    this.onPlayLiveStation = null;
    this.onPlaySynthStation = null;
    this.onPlayCustomStreamUrl = null;
    this.onMusicPlayPause = null;
    this.onMusicNext = null;
    this.onMusicPrev = null;
    this.onMusicSeek = null;
    this.onRequestMusicState = null;
    this.onShiftUp = null;
    this.onShiftDown = null;
    this.onHornStart = null;
    this.onHornStop = null;
    this.onToggleIndicator = null;
    this.lastDrivingProfile = null;
    this.lastSystemSettings = null;

    this.cacheDOMElements();
    this.bindEvents();
    this.applyCarDefaultColor();
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
    this.modalSettings = document.getElementById('modal-settings');
    this.modalDate = document.getElementById('modal-date');
    this.modalMusic = document.getElementById('modal-music');
    this.musicStatusBadge = document.getElementById('music-status-badge');
    this.musicNowTitle = document.getElementById('music-now-title');
    this.musicNowSub = document.getElementById('music-now-sub');
    this.musicTimeLabel = document.getElementById('music-time-label');
    this.musicSeekSlider = document.getElementById('music-seek-slider');
    this.musicPlaylistList = document.getElementById('music-playlist-list');
    this.musicLiveGrid = document.getElementById('music-live-stations-grid');
    this.musicIndiaGrid = document.getElementById('music-india-dir-grid');
    this.musicIndiaSearch = document.getElementById('music-india-search');
    this.musicSynthGrid = document.getElementById('music-synth-stations-grid');
    this.inputDeviceMusic = document.getElementById('input-device-music');
    this.musicCustomStreamUrl = document.getElementById('music-custom-stream-url');
    this.musicDropzone = document.getElementById('music-dropzone');
    this.dateName1 = document.getElementById('date-name-1');
    this.dateName2 = document.getElementById('date-name-2');
    this.dateDecorSelect = document.getElementById('date-decor-select');
    this.dateCharsSelect = document.getElementById('date-chars-select');
    this.dateBoardPreview = document.getElementById('date-board-preview');
    this.dateVenueCards = document.getElementById('date-venue-cards');
    this.hudDateNavPill = document.getElementById('hud-date-nav-pill');
    this.hudDateVenueLabel = document.getElementById('hud-date-venue-label');
    this.hudDateDistLabel = document.getElementById('hud-date-dist-label');
    this.hudDateVenueSelect = document.getElementById('hud-date-venue-select');
    this.btnHudParkCafe = document.getElementById('btn-hud-park-cafe');
    this.panelDateCafe = document.getElementById('panel-date-cafe');
    this.dateCutsceneBanner = document.getElementById('date-cutscene-banner');
    this.dateCutsceneText = document.getElementById('date-cutscene-text');
    this.btnDateSkipWalk = document.getElementById('btn-date-skip-walk');
    this.dateCafeStudio = document.getElementById('date-cafe-studio');
    this.cafeStudioTitle = document.getElementById('cafe-studio-title');
    this.cafeStudioFavBadge = document.getElementById('cafe-studio-fav-badge');
    this.cafeStudioSub = document.getElementById('cafe-studio-sub');
    this.btnDateBackCar = document.getElementById('btn-date-back-car');
    this.btnDateReturnTable = document.getElementById('btn-date-return-table');
    this.dateHomeCard = document.getElementById('date-home-card');
    this.dateHomeSub = document.getElementById('date-home-sub');
    this.dateLyricBubble = document.getElementById('date-lyric-bubble');
    this.dateLyricSong = document.getElementById('date-lyric-song');
    this.dateLyricLine = document.getElementById('date-lyric-line');
    this.cafeOrderedCount = document.getElementById('cafe-ordered-count');
    this.dateCafeMenuGrid = document.getElementById('date-cafe-menu-grid');
    this.garageClimateBadge = document.getElementById('garage-climate-badge');
    this.hudClimatePill = document.getElementById('hud-climate-pill');
    this.cinemaBars = document.getElementById('cinema-bars');
    this.panelReplayControls = document.getElementById('panel-replay-controls');
    this.panelPhotoMode = document.getElementById('panel-photo-mode');

    // Voice & Finger Gesture Driving Controls
    this.btnVoiceGarage = document.getElementById('btn-toggle-voice-garage');
    this.btnVoiceHud = document.getElementById('hud-btn-voice');
    this.btnGestureGarage = document.getElementById('btn-toggle-gesture-garage');
    this.btnGestureHud = document.getElementById('hud-btn-gesture');
    this.gestureCamBox = document.getElementById('gesture-cam-box');
    this.gestureVideo = document.getElementById('gesture-video');
    this.gestureCanvas = document.getElementById('gesture-canvas');
    this.gestureCamLabel = document.getElementById('gesture-cam-label');
    this.fingerSwipeReticle = document.getElementById('finger-swipe-reticle');
    this.fingerSwipeKnob = document.getElementById('finger-swipe-knob');
    this.hudVoicePill = document.getElementById('hud-voice-pill');
    this.hudVoiceTitle = document.getElementById('hud-voice-title');
    this.hudVoiceDesc = document.getElementById('hud-voice-desc');

    // Settings Controls synced uniformly via [data-profile-*] & [data-quality-input]

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
    this.hudSpeedUnit = document.getElementById('hud-speed-unit');
    this.hudGear = document.getElementById('hud-gear-val');
    this.hudBtnShiftDown = document.getElementById('hud-btn-shift-down');
    this.hudBtnShiftUp = document.getElementById('hud-btn-shift-up');
    this.hudTransMode = document.getElementById('hud-trans-mode');
    this.hudRpmBar = document.getElementById('hud-rpm-bar');
    this.hudRpmLeds = document.getElementById('hud-rpm-leds');
    this.hudBoostVal = document.getElementById('hud-boost-val');
    this.hudGForceVal = document.getElementById('hud-gforce-val');
    this.hudLampAbs = document.getElementById('hud-lamp-abs');
    this.hudLampTcs = document.getElementById('hud-lamp-tcs');
    this.hudLampErs = document.getElementById('hud-lamp-ers');
    this.hudBtnIndLeft = document.getElementById('hud-btn-ind-left');
    this.hudBtnIndRight = document.getElementById('hud-btn-ind-right');
    this.hudBtnHazard = document.getElementById('hud-btn-hazard');
    this.hudBtnHorn = document.getElementById('hud-btn-horn');
    this.hudNitroBar = document.getElementById('hud-nitro-bar');
    this.hudNitroModeLabel = document.getElementById('hud-nitro-mode-label');
    this.hudHandbrakePill = document.getElementById('hud-handbrake-pill');
    this.hudSpeedlines = document.getElementById('hud-speedlines');
    this.hudFpsPill = document.getElementById('hud-fps-pill');
    this.hudStartLights = document.getElementById('hud-start-lights');
    this.touchLayer = document.querySelector('.touch-controls-layer');
    this.radarBox = document.querySelector('.radar-box');
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
    this.chatDrawer = document.getElementById('chat-drawer');
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

  syncDrivingProfileUI(profile) {
    if (!profile || typeof profile !== 'object') return;
    this.lastDrivingProfile = { ...profile };

    document.querySelectorAll('[data-steering-preset]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.steeringPreset === profile.steeringMode);
    });

    const presetName = STEERING_PRESETS[profile.steeringMode]?.name || 'CUSTOM';
    document.querySelectorAll('[data-profile-display]').forEach((el) => {
      const key = el.dataset.profileDisplay;
      if (key === 'steeringBadge') el.textContent = presetName;
      else if (key === 'steerSensitivity') el.textContent = `${Number(profile.steerSensitivity).toFixed(2)}x`;
      else if (key === 'voiceSensitivity') el.textContent = `${Number(profile.voiceSensitivity ?? 1.0).toFixed(2)}x`;
      else if (key === 'gestureSensitivity') el.textContent = `${Number(profile.gestureSensitivity ?? 1.0).toFixed(2)}x`;
      else if (key === 'steerResponse') el.textContent = `${Number(profile.steerResponse).toFixed(2)}x`;
      else if (key === 'stabilityAssist') el.textContent = `${Math.round(Number(profile.stabilityAssist) * 100)}%`;
    });

    document.querySelectorAll('[data-profile-input]').forEach((el) => {
      const key = el.dataset.profileInput;
      if (key === 'stabilityAssist') {
        el.value = String(Math.round(Number(profile.stabilityAssist) * 100));
      } else if (profile[key] !== undefined) {
        el.value = String(profile[key]);
      }
    });

    if (this.hudTransMode) {
      const isManual = profile.transmissionMode === 'manual';
      this.hudTransMode.textContent = isManual ? 'MANUAL' : 'AUTO';
      this.hudTransMode.classList.toggle('manual', isManual);
    }

    if (this.hudNitroModeLabel) {
      const shortNames = { plasma: 'PLASMA', twin_overboost: 'TWIN-STAGE', hyper_warp: 'HYPER-WARP' };
      this.hudNitroModeLabel.textContent = shortNames[profile.nitroMode] || 'NITRO';
    }
  }

  syncSystemSettingsUI(settings) {
    if (!settings || typeof settings !== 'object') return;
    this.lastSystemSettings = { ...settings };

    document.querySelectorAll('[data-graphics-preset]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.graphicsPreset === settings.graphicsPreset);
    });

    document.querySelectorAll('[data-system-display]').forEach((el) => {
      const key = el.dataset.systemDisplay;
      if (key === 'graphicsBadge') {
        el.textContent = GRAPHICS_PRESETS[settings.graphicsPreset]?.id.toUpperCase() || (settings.graphicsPreset || 'CUSTOM').toUpperCase();
      } else if (key === 'exposure') {
        el.textContent = Number(settings.exposure || 1.15).toFixed(2);
      } else if (key.endsWith('Volume')) {
        el.textContent = `${Math.round(Number(settings[key] ?? 0.75) * 100)}%`;
      }
    });

    document.querySelectorAll('[data-system-input]').forEach((el) => {
      const key = el.dataset.systemInput;
      if (settings[key] === undefined) return;
      if (key.endsWith('Volume')) {
        el.value = String(Math.round(Number(settings[key]) * 100));
      } else {
        el.value = String(settings[key]);
      }
    });

    if (this.hudFpsPill) this.hudFpsPill.classList.toggle('hidden', !settings.fpsCounter);
    if (this.hudSpeedUnit) this.hudSpeedUnit.textContent = settings.speedUnit === 'mph' ? 'MPH' : 'KM/H';
    if (this.screenHUD) this.screenHUD.classList.toggle('hud-minimal', settings.hudStyle === 'minimal');
    if (this.radarBox) this.radarBox.classList.toggle('hidden', settings.showMinimap === false);
    if (this.touchLayer) {
      this.touchLayer.classList.toggle('force-on', settings.touchVisibility === 'always');
      this.touchLayer.classList.toggle('force-off', settings.touchVisibility === 'off');
    }
    if (!settings.speedFxEnabled && this.hudSpeedlines) {
      this.hudSpeedlines.style.opacity = '0';
    }
  }

  syncSettingsUI(sensitivityOrProfile, quality) {
    if (sensitivityOrProfile && typeof sensitivityOrProfile === 'object') {
      this.syncDrivingProfileUI(sensitivityOrProfile);
    } else if (sensitivityOrProfile !== undefined) {
      const sens = Number(sensitivityOrProfile);
      this.syncDrivingProfileUI({
        ...(this.lastDrivingProfile || { steeringMode: 'arcade', steerResponse: 1.0, steerLinearity: 'smooth', stabilityAssist: 0.85, transmissionMode: 'auto', nitroMode: 'twin_overboost', handbrakeMode: 'drift' }),
        steerSensitivity: isNaN(sens) ? 1.0 : sens
      });
    }
    if (quality) {
      document.querySelectorAll('[data-quality-input]').forEach((sel) => {
        sel.value = quality;
      });
    }
  }

  hasOpenModal() {
    return !!document.querySelector('.modal-overlay:not(.hidden)');
  }

  closeAllModals() {
    this.modalTuning?.classList.add('hidden');
    this.modalCareer?.classList.add('hidden');
    this.modalAchievements?.classList.add('hidden');
    this.modalMultiplayer?.classList.add('hidden');
    this.modalTelemetry?.classList.add('hidden');
    this.modalVoiceGuide?.classList.add('hidden');
    this.modalSettings?.classList.add('hidden');
    this.modalDate?.classList.add('hidden');
  }

  syncCoupleProfileUI(profile) {
    if (!profile) return;
    if (this.dateName1) this.dateName1.value = profile.partner1 || 'Aarav';
    if (this.dateName2) this.dateName2.value = profile.partner2 || 'Meera';
    if (this.dateDecorSelect) this.dateDecorSelect.value = profile.dateMode || 'off';
    const rawC = profile.showCharacters;
    const charMode = rawC === 'couple'
      ? 'couple'
      : (rawC === false || rawC === 'false' || rawC === 'none' ? 'none' : 'driver_only');
    if (this.dateCharsSelect) this.dateCharsSelect.value = charMode;
    document.querySelectorAll('.crew-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.crew === charMode);
    });
    if (this.dateBoardPreview) {
      const n1 = (profile.partner1 || 'Aarav').trim().toUpperCase();
      const n2 = (profile.partner2 || 'Meera').trim().toUpperCase();
      this.dateBoardPreview.textContent = `♥ ${n1} ♥ ${n2} — S3D DATE BOARD ♥`;
    }
  }

  updateClimateBadge(preset) {
    if (!preset) return;
    const label = preset.timeLabel || (preset.name ? preset.name.replace(/^[^\w\u0900-\u097F]+/, '').split('(')[0].trim() : 'LIVE SKY');
    if (this.garageClimateBadge) this.garageClimateBadge.textContent = label.toUpperCase();
    if (this.hudClimatePill) this.hudClimatePill.textContent = `🌐 ${label.toUpperCase()}`;
  }

  setCinemaBarsVisible(visible) {
    if (!this.cinemaBars) return;
    this.cinemaBars.classList.toggle('hidden', !visible);
  }

  bindEvents() {
    // Car Selection
    document.getElementById('btn-prev-car')?.addEventListener('click', () => {
      this.selectedCarIndex = (this.selectedCarIndex - 1 + CAR_CONFIGS.length) % CAR_CONFIGS.length;
      this.applyCarDefaultColor();
      this.updateCarShowroomInfo();
      if (this.onCarSelect) this.onCarSelect(this.selectedCarIndex);
    });

    document.getElementById('btn-next-car')?.addEventListener('click', () => {
      this.selectedCarIndex = (this.selectedCarIndex + 1) % CAR_CONFIGS.length;
      this.applyCarDefaultColor();
      this.updateCarShowroomInfo();
      if (this.onCarSelect) this.onCarSelect(this.selectedCarIndex);
    });

    // Custom .GLB Car Model Import
    const importBtn = document.getElementById('btn-import-glb');
    const importInput = document.getElementById('input-import-glb');
    importBtn?.addEventListener('click', () => importInput?.click());
    importInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const blobUrl = URL.createObjectURL(file);
      const carConfig = CAR_CONFIGS[this.selectedCarIndex % CAR_CONFIGS.length];
      if (this.onImportCustomGlb) {
        this.onImportCustomGlb(carConfig.id, blobUrl, file.name);
      }
      importInput.value = '';
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

    const bindChipGroup = (selector, modKey, dataAttr, parseFn = (v) => v) => {
      const els = document.querySelectorAll(selector);
      els.forEach((chip) => {
        chip.addEventListener('click', () => {
          els.forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');
          this.visualMods[modKey] = parseFn(chip.dataset[dataAttr]);
          if (this.onVisualModChange) this.onVisualModChange(this.visualMods);
        });
      });
    };

    bindChipGroup('.rim-chip', 'rimStyle', 'rim', (v) => parseInt(v, 10));
    bindChipGroup('.underglow-chip', 'underglowMode', 'mode');
    bindChipGroup('.tint-chip', 'tint', 'tint', (v) => parseInt(v, 10));
    bindChipGroup('.finish-chip', 'paintFinish', 'finish');
    bindChipGroup('.spoiler-chip', 'spoilerStyle', 'spoiler', (v) => parseInt(v, 10));
    bindChipGroup('.aero-chip', 'aeroKit', 'aero', (v) => parseInt(v, 10));
    bindChipGroup('.headlight-chip', 'headlightStyle', 'headlight', (v) => parseInt(v, 10));
    bindChipGroup('.caliper-chip', 'caliperColor', 'caliper', (v) => parseInt(v, 10));

    this.playerNameInput?.addEventListener('input', (e) => {
      this.playerName = (e.target.value || 'Rebel').trim().substring(0, 16);
    });

    this.trackSelect?.addEventListener('change', (e) => {
      this.selectedTrackId = e.target.value;
      if (this.onTrackSelect) this.onTrackSelect(this.selectedTrackId);
    });

    // Pro Settings Tabs
    document.querySelectorAll('[data-settings-tab]').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        const target = tabBtn.dataset.settingsTab;
        document.querySelectorAll('[data-settings-tab]').forEach((b) => b.classList.toggle('active', b === tabBtn));
        document.querySelectorAll('[data-settings-pane]').forEach((pane) => {
          pane.classList.toggle('hidden', pane.dataset.settingsPane !== target);
        });
      });
    });

    // Driving Profile, Presets, Graphics, Audio, HUD & Paddles
    document.querySelectorAll('[data-steering-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.onSteeringPresetSelect) this.onSteeringPresetSelect(btn.dataset.steeringPreset);
      });
    });

    document.querySelectorAll('[data-profile-input]').forEach((el) => {
      const key = el.dataset.profileInput;
      const evtName = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evtName, (e) => {
        let val = e.target.value;
        if (key === 'stabilityAssist') val = parseFloat(val) / 100;
        else if (key === 'absEnabled' || key === 'tcsEnabled') val = (val === 'true');
        else if (el.type === 'range') val = parseFloat(val);
        if (this.onDrivingProfileChange) {
          const patch = key === 'transmissionMode'
            ? { [key]: val, manualExplicit: val === 'manual' }
            : { [key]: val };
          this.onDrivingProfileChange(patch);
        }
      });
    });

    document.querySelectorAll('[data-graphics-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.onGraphicsPresetSelect) this.onGraphicsPresetSelect(btn.dataset.graphicsPreset);
      });
    });

    document.querySelectorAll('[data-system-input]').forEach((el) => {
      const key = el.dataset.systemInput;
      const evtName = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evtName, (e) => {
        let val = e.target.value;
        if (key.endsWith('Volume')) val = parseFloat(val) / 100;
        else if (key === 'speedFxEnabled' || key === 'headlightsEnabled' || key === 'fpsCounter' || key === 'showMinimap') val = (val === 'true');
        else if (key === 'exposure' || key === 'resolutionScale') val = parseFloat(val);
        if (this.onSystemSettingsChange) this.onSystemSettingsChange({ [key]: val });
      });
    });

    document.getElementById('btn-pause-open-settings')?.addEventListener('click', () => {
      this.modalSettings?.classList.remove('hidden');
    });
    document.getElementById('btn-reset-settings')?.addEventListener('click', () => {
      if (this.onResetSettings) this.onResetSettings();
    });

    this.hudBtnShiftUp?.addEventListener('click', () => this.onShiftUp?.());
    this.hudBtnShiftDown?.addEventListener('click', () => this.onShiftDown?.());
    this.hudTransMode?.addEventListener('click', () => {
      const current = this.lastDrivingProfile?.transmissionMode || 'auto';
      const next = current === 'manual' ? 'auto' : 'manual';
      if (this.onDrivingProfileChange) {
        this.onDrivingProfileChange({ transmissionMode: next, manualExplicit: next === 'manual' });
      }
      this.hudTransMode?.blur?.();
    });

    // Game Mode Launchers
    document.getElementById('btn-mode-gp')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'GP', trackId: this.selectedTrackId, laps: 3 });
    });

    document.getElementById('btn-mode-drift')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'DRIFT_ARENA', trackId: 'city_sunset', laps: 3 });
    });

    document.getElementById('btn-mode-time-attack')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'TIME_ATTACK', trackId: this.selectedTrackId, laps: 5 });
    });

    document.getElementById('btn-mode-knockout')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'KNOCKOUT', trackId: this.selectedTrackId, laps: 5 });
    });

    document.getElementById('btn-mode-boss')?.addEventListener('click', () => {
      if (this.onStartRace) this.onStartRace({ mode: 'BOSS_BATTLE', trackId: 'city_night', laps: 3, isBoss: true });
    });

    // Personalized Couple Date Modal & Garage Cabin Crew Toggle
    this.renderDateVenueCards();
    const readDateForm = () => ({
      partner1: (this.dateName1?.value || 'Aarav').trim() || 'Aarav',
      partner2: (this.dateName2?.value || 'Meera').trim() || 'Meera',
      dateMode: this.dateDecorSelect?.value || 'romance',
      showCharacters: this.dateCharsSelect?.value || 'driver_only',
      venueId: this.selectedDateVenueId || 'shah_rasoi',
      crewExplicit: true
    });
    this.hudDateVenueSelect?.addEventListener('change', (e) => {
      this.selectedDateVenueId = e.target.value || 'shah_rasoi';
      this.renderDateVenueCards();
      this.onSelectDateVenue?.(this.selectedDateVenueId);
      e.target.blur?.();
    });
    this.btnHudParkCafe?.addEventListener('click', () => {
      this.onDateParkNow?.();
      this.btnHudParkCafe?.blur?.();
    });
    this.btnDateSkipWalk?.addEventListener('click', () => {
      this.onDateSkipWalk?.();
    });
    this.btnDateBackCar?.addEventListener('click', () => {
      this.onDateBackToCar?.();
    });
    this.btnDateReturnTable?.addEventListener('click', () => {
      this.onDateReturnToTable?.();
    });
    document.getElementById('btn-date-feed')?.addEventListener('click', () => {
      this.onDateFeed?.();
    });
    document.getElementById('btn-date-cut-cake')?.addEventListener('click', () => {
      this.onDateCutCake?.();
    });
    document.getElementById('btn-date-propose')?.addEventListener('click', () => {
      this.onDatePropose?.();
    });
    document.getElementById('btn-date-twirl')?.addEventListener('click', () => {
      this.onDateTwirl?.();
    });
    document.getElementById('btn-home-another-date')?.addEventListener('click', () => {
      this.onDateBackToCar?.();
    });
    document.getElementById('btn-home-back-garage')?.addEventListener('click', () => {
      this.onReturnToGarage?.();
    });
    document.querySelectorAll('.date-cat-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.selectedMenuCategory = chip.dataset.cat || 'All';
        document.querySelectorAll('.date-cat-chip').forEach((c) => c.classList.toggle('active', c === chip));
        this._renderedCafeMenuKey = null;
        const st = window.gameApp?.dateExperience;
        st?.emitUIState?.();
      });
    });
    document.getElementById('btn-date-celebrate')?.addEventListener('click', () => {
      this.onDateCelebrate?.();
    });
    document.getElementById('btn-date-sing')?.addEventListener('click', () => {
      this.onDateSing?.();
    });
    document.getElementById('btn-date-dance')?.addEventListener('click', () => {
      this.onDateDance?.();
    });
    document.querySelectorAll('.crew-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const mode = chip.dataset.crew || 'driver_only';
        document.querySelectorAll('.crew-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        if (this.dateCharsSelect) this.dateCharsSelect.value = mode;
        if (this.onCoupleProfileChange) this.onCoupleProfileChange({ showCharacters: mode, crewExplicit: true });
        const label = mode === 'driver_only' ? 'ONLY DRIVER MODE (SOLO)' : (mode === 'none' ? 'EMPTY CABIN' : 'COUPLE IN CAR');
        this.showToast(`👤 Garage Cabin: ${label}`);
      });
    });
    const openDateModal = () => this.modalDate?.classList.remove('hidden');
    document.getElementById('btn-open-date-setup')?.addEventListener('click', openDateModal);
    document.getElementById('btn-mode-date')?.addEventListener('click', openDateModal);

    [this.dateName1, this.dateName2].forEach((inp) => {
      inp?.addEventListener('input', () => {
        if (this.onCoupleProfileChange) this.onCoupleProfileChange(readDateForm());
      });
    });
    [this.dateDecorSelect, this.dateCharsSelect].forEach((sel) => {
      sel?.addEventListener('change', () => {
        if (this.onCoupleProfileChange) this.onCoupleProfileChange(readDateForm());
      });
    });
    document.getElementById('btn-save-date-setup')?.addEventListener('click', () => {
      if (this.onCoupleProfileChange) this.onCoupleProfileChange(readDateForm());
      this.modalDate?.classList.add('hidden');
      this.showToast('💐 Couple Date Car & Heart Board Updated!');
    });
    document.getElementById('btn-start-date-cruise')?.addEventListener('click', () => {
      this.modalDate?.classList.add('hidden');
      if (this.onStartDateCruise) this.onStartDateCruise(readDateForm());
    });
    document.getElementById('hud-btn-climate')?.addEventListener('click', () => {
      if (this.onCycleClimate) this.onCycleClimate();
    });

    document.getElementById('btn-mode-mp')?.addEventListener('click', () => {
      this.modalMultiplayer?.classList.remove('hidden');
    });

    // Modals & Voice Controls
    document.getElementById('btn-open-tuning')?.addEventListener('click', () => this.openTuningModal());
    document.getElementById('btn-open-career')?.addEventListener('click', () => this.openCareerModal());
    document.getElementById('btn-open-achievements')?.addEventListener('click', () => this.openAchievementsModal());
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      this.modalSettings?.classList.remove('hidden');
    });
    document.getElementById('btn-open-voice-guide')?.addEventListener('click', () => {
      this.modalVoiceGuide?.classList.remove('hidden');
    });

    document.getElementById('btn-self-test')?.addEventListener('click', () => {
      const hasSpeech = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
      this.showToast(`🟢 SYSTEM OK | 3D Clearcoat Engine Ready | Voice: ${hasSpeech ? 'SUPPORTED' : 'KEYBOARD ONLY'}`);
    });

    const handleVoiceToggle = () => {
      if (this.onToggleVoice) this.onToggleVoice();
    };
    this.btnVoiceGarage?.addEventListener('click', handleVoiceToggle);
    this.btnVoiceHud?.addEventListener('click', handleVoiceToggle);

    const handleGestureToggle = () => {
      this.onToggleGestureCam?.();
      this.btnGestureHud?.blur?.();
    };
    this.btnGestureGarage?.addEventListener('click', handleGestureToggle);
    this.btnGestureHud?.addEventListener('click', handleGestureToggle);

    document.querySelectorAll('.btn-close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        const parentModal = btn.closest('.modal-overlay');
        if (parentModal) parentModal.classList.add('hidden');
        else this.closeAllModals();
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

    document.getElementById('hud-btn-mute-sfx')?.addEventListener('click', () => {
      this.onToggleSfxMute?.();
    });
    document.getElementById('hud-btn-mute-music')?.addEventListener('click', () => {
      this.onToggleMusicMute?.();
    });
    document.getElementById('music-btn-mute-sfx')?.addEventListener('click', () => {
      this.onToggleSfxMute?.();
    });
    document.getElementById('music-btn-mute-music')?.addEventListener('click', () => {
      this.onToggleMusicMute?.();
    });

    this.hudBtnIndLeft?.addEventListener('click', () => {
      this.onToggleIndicator?.('left');
      this.hudBtnIndLeft?.blur?.();
    });
    this.hudBtnIndRight?.addEventListener('click', () => {
      this.onToggleIndicator?.('right');
      this.hudBtnIndRight?.blur?.();
    });
    this.hudBtnHazard?.addEventListener('click', () => {
      this.onToggleIndicator?.('hazard');
      this.hudBtnHazard?.blur?.();
    });
    if (this.hudBtnHorn) {
      const releaseHorn = () => {
        this.onHornStop?.();
        this.hudBtnHorn?.blur?.();
      };
      this.hudBtnHorn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.onHornStart?.();
      });
      this.hudBtnHorn.addEventListener('pointerup', releaseHorn);
      this.hudBtnHorn.addEventListener('pointercancel', releaseHorn);
      this.hudBtnHorn.addEventListener('mouseleave', releaseHorn);
    }

    document.getElementById('hud-btn-pause')?.addEventListener('click', () => {
      if (this.onTogglePause) this.onTogglePause(true);
      else this.togglePause(true);
    });
    document.getElementById('btn-pause-resume')?.addEventListener('click', () => {
      if (this.onTogglePause) this.onTogglePause(false);
      else this.togglePause(false);
    });
    document.getElementById('btn-pause-restart')?.addEventListener('click', () => {
      if (this.onTogglePause) this.onTogglePause(false);
      else this.togglePause(false);
      if (this.onRestartRace) this.onRestartRace();
    });
    document.getElementById('btn-pause-quit')?.addEventListener('click', () => {
      if (this.onTogglePause) this.onTogglePause(false);
      else this.togglePause(false);
      if (this.onReturnToGarage) this.onReturnToGarage();
    });

    // Results Actions
    document.getElementById('btn-results-replay')?.addEventListener('click', () => {
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
    document.getElementById('btn-replay-speed-slow')?.addEventListener('click', () => window.gameApp?.replay?.setSpeed(0.5));
    document.getElementById('btn-replay-speed-norm')?.addEventListener('click', () => window.gameApp?.replay?.setSpeed(1.0));
    document.getElementById('btn-replay-speed-fast')?.addEventListener('click', () => window.gameApp?.replay?.setSpeed(2.0));
    document.getElementById('btn-replay-cam')?.addEventListener('click', () => window.gameApp?.replay?.cycleAngle());
    document.getElementById('btn-replay-photo')?.addEventListener('click', () => {
      if (this.onOpenPhotoMode) this.onOpenPhotoMode();
    });
    document.getElementById('btn-replay-exit')?.addEventListener('click', () => {
      this.panelReplayControls?.classList.add('hidden');
      if (this.onExitReplay) this.onExitReplay();
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
      if (this.onExitPhotoMode) this.onExitPhotoMode();
      this.panelReplayControls?.classList.remove('hidden');
    });

    // Car Stereo: Live Internet Radio + Local Device Music Player Bindings
    const openMusic = () => this.openMusicModal();
    document.getElementById('btn-open-music-studio')?.addEventListener('click', openMusic);
    document.getElementById('hud-btn-open-music')?.addEventListener('click', openMusic);
    document.getElementById('btn-settings-open-music')?.addEventListener('click', () => {
      this.modalSettings?.classList.add('hidden');
      openMusic();
    });

    document.getElementById('btn-upload-device-music')?.addEventListener('click', () => {
      this.inputDeviceMusic?.click();
    });
    this.inputDeviceMusic?.addEventListener('change', (e) => {
      if (e.target.files?.length && this.onUploadDeviceMusic) {
        this.onUploadDeviceMusic(e.target.files);
        e.target.value = '';
      }
    });

    if (this.musicDropzone) {
      this.musicDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.musicDropzone.classList.add('dragover');
      });
      this.musicDropzone.addEventListener('dragleave', () => {
        this.musicDropzone.classList.remove('dragover');
      });
      this.musicDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.musicDropzone.classList.remove('dragover');
        if (e.dataTransfer?.files?.length && this.onUploadDeviceMusic) {
          this.onUploadDeviceMusic(e.dataTransfer.files);
        }
      });
    }

    document.getElementById('music-btn-clear-local')?.addEventListener('click', () => this.onClearLocalMusic?.());
    document.getElementById('btn-search-india-fm')?.addEventListener('click', () => {
      this.fetchIndianRadioDirectory(this.musicIndiaSearch?.value || '');
    });
    this.musicIndiaSearch?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.fetchIndianRadioDirectory(this.musicIndiaSearch.value || '');
    });
    document.getElementById('btn-play-custom-stream')?.addEventListener('click', () => {
      const url = (this.musicCustomStreamUrl?.value || '').trim();
      if (!url) {
        this.showToast('⚠️ Enter an HTTPS radio stream URL first!');
        return;
      }
      this.onPlayCustomStreamUrl?.(url);
    });
    document.getElementById('music-btn-playpause')?.addEventListener('click', () => this.onMusicPlayPause?.());
    document.getElementById('music-btn-next')?.addEventListener('click', () => this.onMusicNext?.());
    document.getElementById('music-btn-prev')?.addEventListener('click', () => this.onMusicPrev?.());
    this.musicSeekSlider?.addEventListener('input', (e) => {
      const frac = (Number(e.target.value) || 0) / 1000;
      this.onMusicSeek?.(frac);
    });

    if (this.career) {
      this.career.onCreditsChanged = () => this.updateCreditsDisplay();
      this.career.onAchievementUnlocked = (ach) => this.showToast(`🏆 UNLOCKED: ${ach.title} (+$${ach.reward.toLocaleString()})`);
    }
  }

  setChatVisible(visible) {
    if (!this.chatDrawer) return;
    if (visible) this.chatDrawer.classList.remove('hidden');
    else this.chatDrawer.classList.add('hidden');
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

  applyCarDefaultColor() {
    const config = CAR_CONFIGS[this.selectedCarIndex % CAR_CONFIGS.length];
    if (config?.defaultColor) {
      this.selectedColor = config.defaultColor;
      document.querySelectorAll('.color-chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.color?.toLowerCase() === this.selectedColor.toLowerCase());
      });
    }
  }

  updateCarShowroomInfo() {
    const config = CAR_CONFIGS[this.selectedCarIndex % CAR_CONFIGS.length];
    if (this.carNameEl) this.carNameEl.textContent = config.name;
    if (this.carTypeEl) {
      this.carTypeEl.textContent = config.type.toUpperCase();
      const tier = (config.classTier || '').toLowerCase();
      this.carTypeEl.className = `car-type-badge${tier ? ` tier-${tier}` : ''}`;
    }
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
    const labels = {
      engine: 'ENGINE BLOCK',
      turbo: 'FORCED INDUCTION',
      gearbox: 'RACING GEARBOX',
      suspension: 'COILOVER SUSPENSION',
      brakes: 'CARBON-CERAMIC BRAKES',
      chassis: 'WEIGHT CHASSIS',
      tires: 'TIRE COMPOUND',
      nitro: 'NITROUS / ERS'
    };
    const categories = Object.keys(UPGRADE_TIERS);

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
          <span style="font-family:'Orbitron'; font-weight:800; font-size:13px; color:var(--primary-neon);">${labels[cat] || cat.toUpperCase()}</span>
          <span style="font-size:11px; font-weight:700; color:${isMax ? 'var(--accent-green)' : 'var(--accent-gold)'};">TIER ${currentTier}/4</span>
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
            this.showToast('⚠️ Not enough credits!');
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
      const prog = this.career?.data?.careerProgress?.[cup.id];
      const badge = prog?.completed ? '✅ WON' : (cup.entryFee > 0 ? `Fee: $${cup.entryFee.toLocaleString()}` : 'FREE ENTRY');
      const card = document.createElement('div');
      card.className = 'career-cup-card glass-panel';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-family:'Orbitron'; font-weight:800; font-size:17px; color:#fff;">${cup.name}</span>
          <span style="font-size:12px; font-weight:700; color:var(--accent-gold);">${cup.tier.toUpperCase()} • ${badge}</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin: 4px 0;">${cup.races.length} Stages • Cup Bonus: $${cup.prizeMoney.toLocaleString()}</div>
        <button class="cyber-btn cyber-btn-primary" style="width:100%; padding:8px; font-size:12px; margin-top:6px;">ENTER CUP</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        if (cup.entryFee > 0 && !this.career.spendCredits(cup.entryFee)) {
          this.showToast(`⚠️ Need $${cup.entryFee.toLocaleString()} credits to enter ${cup.name}!`);
          return;
        }
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
    if (screenName !== 'hud') {
      this.hudDateNavPill?.classList.add('hidden');
      this.panelDateCafe?.classList.add('hidden');
    }

    switch (screenName) {
      case 'garage': this.screenGarage?.classList.remove('hidden'); break;
      case 'lobby': this.screenLobby?.classList.remove('hidden'); break;
      case 'hud':
        this.screenHUD?.classList.remove('hidden');
        if (typeof document !== 'undefined') document.activeElement?.blur?.();
        break;
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
        const safeCol = this.safeColor(p.carColor, '#00f0ff');
        const safeName = this.escapeHtml(p.name);
        row.innerHTML = `
          <div class="player-info">
            <span class="player-dot" style="background:${safeCol}; box-shadow: 0 0 10px ${safeCol}"></span>
            <span class="player-name">${safeName} ${p.isHost ? '👑' : ''} ${p.id === myId ? '(You)' : ''}</span>
          </div>
          <div class="player-car-tag">${this.escapeHtml(carCfg.name)}</div>
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
    if (!this.chatMessagesList || !msg) return;
    const div = document.createElement('div');
    div.className = 'chat-msg';
    const safeTime = this.escapeHtml(msg.time || '');
    const safeCol = this.safeColor(msg.senderColor, '#00f0ff');
    const safeSender = this.escapeHtml(msg.senderName || 'Racer');
    const safeText = this.escapeHtml(msg.text || '');
    div.innerHTML = `
      <span class="chat-time">${safeTime}</span>
      <span class="chat-sender" style="color: ${safeCol}">${safeSender}:</span>
      <span class="chat-text">${safeText}</span>
    `;
    this.chatMessagesList.appendChild(div);
    this.chatMessagesList.scrollTop = this.chatMessagesList.scrollHeight;
  }

  updateHUD(physics, ping, leaderboard = [], modeName = 'GRAND PRIX', fps = 60) {
    if (!physics) return;

    const unitMult = this.lastSystemSettings?.speedUnit === 'mph' ? 0.621371 : 1.0;
    const displaySpeed = Math.round(physics.speedKmh * unitMult);

    if (this.hudModeBadge) this.hudModeBadge.textContent = modeName;
    if (this.hudFpsPill && this.lastSystemSettings?.fpsCounter) {
      this.hudFpsPill.textContent = `${fps} FPS`;
    }
    if (this.hudSpeedNumber) this.hudSpeedNumber.textContent = displaySpeed;
    if (this.hudGear) {
      this.hudGear.textContent = physics.gear;
      this.hudGear.classList.toggle('shift-alert', !!(physics.shiftLight && !physics.revLimiter));
      this.hudGear.classList.toggle('redline-limiter', !!physics.revLimiter);
    }

    if (this.hudTransMode) {
      const isManual = physics.transmissionMode === 'manual';
      this.hudTransMode.textContent = isManual ? 'MANUAL' : 'AUTO';
      this.hudTransMode.classList.toggle('manual', isManual);
    }

    const rpmPercent = Math.min(100, (physics.rpm / physics.maxRpm) * 100);
    if (this.hudRpmBar) {
      this.hudRpmBar.style.width = `${rpmPercent}%`;
      if (rpmPercent > 85) this.hudRpmBar.classList.add('redline');
      else this.hudRpmBar.classList.remove('redline');
    }

    if (this.hudRpmLeds) {
      const leds = this.hudRpmLeds.children;
      const litCount = Math.round((rpmPercent / 100) * leds.length);
      for (let i = 0; i < leds.length; i++) {
        leds[i].className = 'rpm-led';
        if (i < litCount) {
          leds[i].classList.add(i < 5 ? 'lit-low' : (i < 8 ? 'lit-mid' : 'lit-high'));
        }
      }
    }

    if (this.hudBoostVal) this.hudBoostVal.textContent = `${(physics.boostPsi || 0).toFixed(1)} PSI`;
    if (this.hudGForceVal) this.hudGForceVal.textContent = `${(physics.lateralG || 0).toFixed(1)}G`;
    if (this.hudLampAbs) {
      this.hudLampAbs.classList.toggle('on', !!physics.absEnabled);
      this.hudLampAbs.classList.toggle('active', !!physics.absActive);
    }
    if (this.hudLampTcs) {
      this.hudLampTcs.classList.toggle('on', !!physics.tcsEnabled);
      this.hudLampTcs.classList.toggle('active', !!physics.tcsActive);
    }
    if (this.hudLampErs) {
      this.hudLampErs.classList.toggle('on', true);
      this.hudLampErs.classList.toggle('active', !!physics.isNitroActive);
    }

    if (this.hudSpeedlines) {
      if (this.lastSystemSettings?.speedFxEnabled !== false) {
        const lineAlpha = physics.isNitroActive ? 0.85 : Math.max(0, Math.min(0.65, (physics.speedKmh - 190) / 180));
        this.hudSpeedlines.style.opacity = lineAlpha.toFixed(2);
      } else {
        this.hudSpeedlines.style.opacity = '0';
      }
    }

    if (this.hudNitroBar) {
      const nitroPercent = (physics.nitroAmount / physics.nitroMax) * 100;
      this.hudNitroBar.style.width = `${nitroPercent}%`;
      this.hudNitroBar.classList.toggle('active-surge', !!physics.isNitroActive);
      this.hudNitroBar.classList.toggle('mode-plasma', physics.nitroMode === 'plasma');
      this.hudNitroBar.classList.toggle('mode-hyper_warp', physics.nitroMode === 'hyper_warp');
    }

    if (this.hudNitroModeLabel) {
      const shortNames = { plasma: 'PLASMA', twin_overboost: 'TWIN-STAGE', hyper_warp: 'HYPER-WARP' };
      this.hudNitroModeLabel.textContent = shortNames[physics.nitroMode] || (NITRO_MODES[physics.nitroMode]?.name || 'NITRO');
    }

    if (this.hudHandbrakePill) {
      if (physics.isLaunchReady) {
        this.hudHandbrakePill.classList.remove('hidden');
        this.hudHandbrakePill.classList.add('launch-ready');
        this.hudHandbrakePill.textContent = 'LAUNCH READY';
      } else if (physics.isHandbrakeActive && physics.launchControlCharge > 0.08) {
        this.hudHandbrakePill.classList.remove('hidden', 'launch-ready');
        this.hudHandbrakePill.textContent = `LAUNCH ${Math.round(physics.launchControlCharge * 100)}%`;
      } else if (physics.isHandbrakeActive) {
        this.hudHandbrakePill.classList.remove('hidden', 'launch-ready');
        this.hudHandbrakePill.textContent = 'H-BRAKE';
      } else {
        this.hudHandbrakePill.classList.add('hidden');
        this.hudHandbrakePill.classList.remove('launch-ready');
      }
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
        const safeCol = this.safeColor(entry.color, '#00f0ff');
        item.innerHTML = `
          <span class="lb-pos">${idx + 1}</span>
          <span class="lb-name" style="color:${safeCol}">${this.escapeHtml(entry.name)}</span>
          <span class="lb-gap">${this.escapeHtml(entry.gap || '')}</span>
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
      this.hudCountdownText.className = `countdown-${numberOrText.toString().toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }
    if (this.hudStartLights) {
      const bulbs = this.hudStartLights.querySelectorAll('.start-light-bulb');
      const txt = String(numberOrText).toUpperCase();
      bulbs.forEach((b, idx) => {
        b.classList.remove('lit', 'go');
        if (txt.includes('GO')) b.classList.add('go');
        else if (txt === '3' && idx < 2) b.classList.add('lit');
        else if (txt === '2' && idx < 4) b.classList.add('lit');
        else if (txt === '1') b.classList.add('lit');
      });
    }
    if (numberOrText === 'GO!' || numberOrText === 'GO') {
      setTimeout(() => {
        this.hudCountdown?.classList.add('hidden');
      }, 1100);
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
        const safeCol = this.safeColor(racer.carColor, '#00f0ff');
        row.innerHTML = `
          <div class="podium-rank">${idx === 0 ? '🥇 1st' : (idx === 1 ? '🥈 2nd' : (idx === 2 ? '🥉 3rd' : `${idx + 1}th`))}</div>
          <div class="podium-name" style="color: ${safeCol}">${this.escapeHtml(racer.name)}</div>
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

  updateGestureCamUI(isActive, statusLabel = 'OFF') {
    if (this.btnGestureGarage) {
      this.btnGestureGarage.textContent = isActive ? '🖐️ HAND: ON' : '🖐️ HAND: OFF';
      this.btnGestureGarage.classList.toggle('active', !!isActive);
    }
    if (this.btnGestureHud) {
      this.btnGestureHud.classList.toggle('active', !!isActive);
    }
    if (this.gestureCamBox) {
      this.gestureCamBox.classList.toggle('hidden', !isActive);
    }
    if (this.gestureCamLabel) {
      this.gestureCamLabel.textContent = isActive ? `🖐️ ${statusLabel}` : '🖐️ OFF';
    }
  }

  updateTouchSwipeVisual(active, ax, ay, cx, cy) {
    if (!this.fingerSwipeReticle || !this.fingerSwipeKnob) return;
    if (!active) {
      this.fingerSwipeReticle.classList.add('hidden');
      return;
    }
    this.fingerSwipeReticle.classList.remove('hidden');
    this.fingerSwipeReticle.style.left = `${ax}px`;
    this.fingerSwipeReticle.style.top = `${ay}px`;
    const maxR = 48;
    const dx = cx - ax;
    const dy = cy - ay;
    const dist = Math.hypot(dx, dy);
    const clampScale = dist > maxR ? maxR / dist : 1;
    this.fingerSwipeKnob.style.left = `${ax + dx * clampScale}px`;
    this.fingerSwipeKnob.style.top = `${ay + dy * clampScale}px`;
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

  formatTrackClock(seconds) {
    if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
    const s = Math.floor(seconds % 60);
    const m = Math.floor(seconds / 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  openMusicModal() {
    this.modalMusic?.classList.remove('hidden');
    const st = this.onRequestMusicState?.();
    this.syncMusicUI(st);
    if (!this.indiaStationsLoaded) {
      this.fetchIndianRadioDirectory('');
    }
  }

  async fetchIndianRadioDirectory(query = '') {
    if (!this.musicIndiaGrid) return;
    this.musicIndiaGrid.innerHTML = '<div style="font-size:11px; color:var(--text-muted); padding:6px;">📡 Loading live Indian FM directory...</div>';
    try {
      const resp = await fetch(`/api/radio/india?q=${encodeURIComponent(query.trim())}`);
      const data = await resp.json();
      const stations = Array.isArray(data?.stations) ? data.stations : [];
      this.indiaStationsLoaded = true;
      this.cachedIndiaStations = stations;
      window.gameApp?.audio?.setIndiaDirectory?.(stations);
      this.renderIndianDirectory(stations, this.onRequestMusicState?.()?.activeId);
    } catch (e) {
      this.musicIndiaGrid.innerHTML = '<div style="font-size:11px; color:var(--text-muted); padding:6px;">⚠️ Could not load extra directory — use presets above!</div>';
    }
  }

  renderIndianDirectory(stations = [], activeId = null) {
    if (!this.musicIndiaGrid) return;
    if (!stations.length) {
      this.musicIndiaGrid.innerHTML = '<div style="font-size:11px; color:var(--text-muted); padding:6px;">No matching live HTTPS MP3/AAC streams found. Try another keyword (e.g. Mirchi, Red, Big, Bollywood, Punjabi).</div>';
      return;
    }
    this.musicIndiaGrid.innerHTML = '';
    stations.forEach((st) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `music-station-btn${activeId === st.id ? ' active' : ''}`;
      btn.innerHTML = `<div>${this.escapeHtml(st.name)}</div><div style="font-size:10px; color:var(--text-muted); font-weight:500;">${this.escapeHtml(st.genre || 'Indian Live FM')}</div>`;
      btn.addEventListener('click', () => this.onPlayLiveStation?.(st));
      this.musicIndiaGrid.appendChild(btn);
    });
  }

  renderMusicStations(activeId) {
    if (this.musicLiveGrid) {
      this.musicLiveGrid.innerHTML = '';
      LIVE_RADIO_STREAMS.forEach((st) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `music-station-btn${activeId === st.id ? ' active' : ''}`;
        btn.innerHTML = `<div>${st.name}</div><div style="font-size:10px; color:var(--text-muted); font-weight:500;">${st.genre}</div>`;
        btn.addEventListener('click', () => this.onPlayLiveStation?.(st.id));
        this.musicLiveGrid.appendChild(btn);
      });
    }
    if (this.musicSynthGrid) {
      this.musicSynthGrid.innerHTML = '';
      RADIO_STATIONS.forEach((st) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `music-station-btn${activeId === st.id ? ' active' : ''}`;
        btn.innerHTML = `<div>${st.name}</div><div style="font-size:10px; color:var(--text-muted); font-weight:500;">${st.genre}</div>`;
        btn.addEventListener('click', () => this.onPlaySynthStation?.(st.id));
        this.musicSynthGrid.appendChild(btn);
      });
    }
  }

  syncMusicUI(state) {
    if (!state) return;
    if (this.hudRadioStation && state.title) {
      this.hudRadioStation.textContent = state.title;
    }
    if (this.musicStatusBadge) this.musicStatusBadge.textContent = state.statusLabel || 'RADIO';
    if (this.musicNowTitle) this.musicNowTitle.textContent = state.title || 'S3D Radio';
    if (this.musicNowSub) this.musicNowSub.textContent = state.subtitle || '';

    if (this.musicSeekSlider && this.musicTimeLabel) {
      if (state.sourceMode === 'local' && state.duration > 0) {
        this.musicSeekSlider.disabled = false;
        this.musicSeekSlider.value = String(Math.round((state.currentTime / state.duration) * 1000));
        this.musicTimeLabel.textContent = `${this.formatTrackClock(state.currentTime)} / ${this.formatTrackClock(state.duration)}`;
      } else {
        this.musicSeekSlider.disabled = true;
        this.musicSeekSlider.value = '0';
        this.musicTimeLabel.textContent = state.sourceMode === 'live' ? 'LIVE FM' : '--:--';
      }
    }

    if (this.musicPlaylistList) {
      const tracks = state.localTracks || [];
      if (!tracks.length) {
        this.musicPlaylistList.innerHTML = '<div style="font-size:11px; color:var(--text-muted); text-align:center; padding:6px;">No device songs uploaded yet — choose MP3/WAV/M4A files above!</div>';
      } else {
        this.musicPlaylistList.innerHTML = '';
        tracks.forEach((tr, idx) => {
          const isCurr = state.sourceMode === 'local' && state.localIndex === idx;
          const row = document.createElement('div');
          row.className = `music-track-item${isCurr ? ' active' : ''}`;
          row.innerHTML = `<span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${isCurr ? '▶ ' : ''}${this.escapeHtml(tr.name)} <small style="color:var(--text-muted);">(${this.escapeHtml(tr.sizeLabel)})</small></span><button type="button" class="cyber-btn cyber-btn-ghost" style="padding:1px 6px; font-size:10px;">✕</button>`;
          row.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
              e.stopPropagation();
              this.onRemoveLocalTrack?.(idx);
            } else {
              this.onPlayLocalTrack?.(idx);
            }
          });
          this.musicPlaylistList.appendChild(row);
        });
      }
    }

    this.renderMusicStations(state.activeId);
    if (this.cachedIndiaStations?.length) {
      this.renderIndianDirectory(this.cachedIndiaStations, state.activeId);
    }
  }

  syncAudioToggleUI(sfxMuted = false, musicMuted = false) {
    const hudSfx = document.getElementById('hud-btn-mute-sfx');
    const sfxIcon = document.getElementById('sfx-mute-icon');
    if (hudSfx) hudSfx.classList.toggle('is-muted', !!sfxMuted);
    if (sfxIcon) sfxIcon.textContent = sfxMuted ? '🏎️🔇' : '🏎️🔊';

    const hudMusic = document.getElementById('hud-btn-mute-music');
    const musicIcon = document.getElementById('music-mute-icon');
    if (hudMusic) hudMusic.classList.toggle('is-muted', !!musicMuted);
    if (musicIcon) musicIcon.textContent = musicMuted ? '🎵🔇' : '🎵🔊';

    const modalSfx = document.getElementById('music-btn-mute-sfx');
    if (modalSfx) {
      modalSfx.textContent = sfxMuted ? '🏎️ CAR SOUND: OFF' : '🏎️ CAR SOUND: ON';
      modalSfx.classList.toggle('is-muted', !!sfxMuted);
    }
    const modalMusic = document.getElementById('music-btn-mute-music');
    if (modalMusic) {
      modalMusic.textContent = musicMuted ? '🎵 MUSIC: OFF' : '🎵 MUSIC: ON';
      modalMusic.classList.toggle('is-muted', !!musicMuted);
    }
  }

  syncVehicleFxUI(indicatorMode = 'off', phaseOn = false, hornActive = false) {
    const leftActive = indicatorMode === 'left' || indicatorMode === 'hazard';
    const rightActive = indicatorMode === 'right' || indicatorMode === 'hazard';
    this.hudBtnIndLeft?.classList.toggle('lit', !!phaseOn && leftActive);
    this.hudBtnIndRight?.classList.toggle('lit', !!phaseOn && rightActive);
    this.hudBtnHazard?.classList.toggle('hazard-lit', !!phaseOn && indicatorMode === 'hazard');
    this.hudBtnHorn?.classList.toggle('active', !!hornActive);
  }

  renderDateVenueCards() {
    if (!this.dateVenueCards) return;
    this.dateVenueCards.innerHTML = '';
    PURE_VEG_VENUES.forEach((v) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `date-venue-card${this.selectedDateVenueId === v.id ? ' active' : ''}`;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
          <span style="font-family:'Orbitron'; font-size:12px; font-weight:800; color:${v.accentColor};">${this.escapeHtml(v.name)}</span>
          ${v.isFavorite ? '<span class="fav-heart-badge">★ FAVORITE ♥</span>' : '<span class="pure-veg-badge">PURE VEG</span>'}
        </div>
        <div style="font-size:10px; color:#4ade80; font-weight:700;">${this.escapeHtml(v.cuisineTag)}</div>
        <div style="font-size:10px; color:var(--text-muted); line-height:1.25;">${this.escapeHtml(v.tagline)}</div>
      `;
      card.addEventListener('click', () => {
        this.selectedDateVenueId = v.id;
        if (this.hudDateVenueSelect) this.hudDateVenueSelect.value = v.id;
        this.renderDateVenueCards();
        this.onSelectDateVenue?.(v.id);
      });
      this.dateVenueCards.appendChild(card);
    });
  }

  syncDateExperienceUI(state) {
    if (!state || !state.active) {
      this.hudDateNavPill?.classList.add('hidden');
      this.panelDateCafe?.classList.add('hidden');
      return;
    }

    const venue = state.venue || getVenueById(this.selectedDateVenueId);
    const couple = state.coupleNames || { partner1: 'Aarav', partner2: 'Meera' };
    const isDriving = state.phase === 'DRIVING' || state.phase === 'DRIVE_HOME';
    const isCutscene = state.phase === 'CUTSCENE_WALK' || state.phase === 'CUTSCENE_RETURN';
    const isCafe = state.phase === 'CAFE_DINING';
    const isHomeArrived = state.phase === 'HOME_ARRIVED';

    this.hudDateNavPill?.classList.toggle('hidden', !isDriving);
    if (isDriving) {
      if (this.hudDateVenueLabel) {
        this.hudDateVenueLabel.textContent = state.phase === 'DRIVE_HOME'
          ? '🏡 DRIVE HOME SWEET HOME ♥'
          : `❤️ ${venue.shortName.toUpperCase()}`;
      }
      if (this.hudDateDistLabel) {
        const arrow = Math.abs(state.headingDeg) < 25 ? '⬆' : (state.headingDeg > 0 ? '↗' : '↖');
        this.hudDateDistLabel.textContent = state.canPark ? `ARRIVED! (${state.distance}m)` : `${state.distance}m ${arrow}`;
      }
      if (this.btnHudParkCafe) {
        this.btnHudParkCafe.textContent = state.phase === 'DRIVE_HOME'
          ? '🏡 PARK AT HOME'
          : '🅿️ PARK & OPEN HER DOOR';
      }
      if (this.hudDateVenueSelect) {
        this.hudDateVenueSelect.classList.toggle('hidden', state.phase === 'DRIVE_HOME');
        if (state.phase !== 'DRIVE_HOME' && this.hudDateVenueSelect.value !== venue.id) {
          this.hudDateVenueSelect.value = venue.id;
        }
      }
    }

    this.panelDateCafe?.classList.toggle('hidden', !(isCutscene || isCafe || isHomeArrived));
    this.dateCutsceneBanner?.classList.toggle('hidden', !isCutscene);
    this.dateCafeStudio?.classList.toggle('hidden', !isCafe);
    this.dateHomeCard?.classList.toggle('hidden', !isHomeArrived);

    if (isCutscene && this.dateCutsceneText) {
      this.dateCutsceneText.textContent = state.phase === 'CUTSCENE_RETURN'
        ? `🚗 Returning to car — ${couple.partner1} seats ${couple.partner2} inside first before driving home...`
        : `💖 Arriving at ${venue.name} — ${couple.partner1} opens her car door & pulls out her chair first...`;
    }
    if (isHomeArrived && this.dateHomeSub) {
      this.dateHomeSub.textContent = `${couple.partner1} ♥ ${couple.partner2} drove safely home with sweet pure-veg date memories!`;
    }

    if (isCafe) {
      if (this.cafeStudioTitle) this.cafeStudioTitle.textContent = venue.shortName.toUpperCase();
      this.cafeStudioFavBadge?.classList.toggle('hidden', !venue.isFavorite);
      this.btnDateReturnTable?.classList.toggle('hidden', !(state.activityMode === 'propose' || state.activityMode === 'dance'));
      if (this.cafeStudioSub) {
        this.cafeStudioSub.textContent = state.activityMode === 'propose'
          ? `💍 "Will You Marry Me?" Proposing Corner • ${couple.partner1} ♥ ${couple.partner2}`
          : `${couple.partner1} ♥ ${couple.partner2} • ${venue.tagline}`;
      }
      if (this.cafeOrderedCount) {
        const count = Array.isArray(state.orderedDishes) ? state.orderedDishes.length : 0;
        this.cafeOrderedCount.textContent = `Served to Table: ${count} item${count === 1 ? '' : 's'}`;
      }

      if (this.dateLyricBubble) {
        if (state.lyric) {
          this.dateLyricBubble.classList.remove('hidden');
          if (this.dateLyricSong) this.dateLyricSong.textContent = state.lyric.songTitle;
          if (this.dateLyricLine) this.dateLyricLine.textContent = `${state.lyric.singerName}: ${state.lyric.text}`;
        } else {
          this.dateLyricBubble.classList.add('hidden');
        }
      }

      const menuKey = `${venue.id}::${this.selectedMenuCategory}`;
      if (this.dateCafeMenuGrid && this._renderedCafeMenuKey !== menuKey) {
        this._renderedCafeMenuKey = menuKey;
        this.dateCafeMenuGrid.innerHTML = '';
        const items = this.selectedMenuCategory === 'All'
          ? venue.menu
          : venue.menu.filter((d) => d.cat === this.selectedMenuCategory);
        items.forEach((dish) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'date-dish-btn';
          btn.innerHTML = `
            <span style="font-size:18px;">${dish.icon}</span>
            <div>
              <div style="color:#fff;">${this.escapeHtml(dish.name)}</div>
              <div style="font-size:9px; color:${dish.isMustCake ? '#ff8cb8' : '#4ade80'};">${this.escapeHtml(dish.cat)} • Pure Veg</div>
            </div>
          `;
          btn.addEventListener('click', () => this.onDateOrderDish?.(dish.id));
          this.dateCafeMenuGrid.appendChild(btn);
        });
      }
    }
  }
}
