/**
 * Velocity Rush 3D - Universal Input & Customized Driving Profile Controller
 * Supports Keyboard (WASD/Arrows, E/Q Shifting, Space Handbrake, Shift/N Nitro),
 * Gamepad API, Touch Controls, Voice Control, and full Steering Mode customization.
 */

export const GRAPHICS_PRESETS = {
  ultra: {
    id: 'ultra',
    shadowQuality: 'ultra',
    bloomMode: 'cinematic',
    speedFxEnabled: true,
    headlightsEnabled: true,
    resolutionScale: 1.75,
    exposure: 1.18
  },
  high: {
    id: 'high',
    shadowQuality: 'ultra',
    bloomMode: 'subtle',
    speedFxEnabled: true,
    headlightsEnabled: true,
    resolutionScale: 1.5,
    exposure: 1.14
  },
  medium: {
    id: 'medium',
    shadowQuality: 'standard',
    bloomMode: 'subtle',
    speedFxEnabled: true,
    headlightsEnabled: true,
    resolutionScale: 1.0,
    exposure: 1.12
  },
  low: {
    id: 'low',
    shadowQuality: 'off',
    bloomMode: 'off',
    speedFxEnabled: false,
    headlightsEnabled: false,
    resolutionScale: 0.85,
    exposure: 1.1
  }
};

export const DEFAULT_SYSTEM_SETTINGS = {
  graphicsPreset: 'high',
  shadowQuality: 'ultra',
  bloomMode: 'cinematic',
  speedFxEnabled: true,
  headlightsEnabled: true,
  exposure: 1.15,
  resolutionScale: 1.5,
  fovScale: 'normal', // 'off' | 'normal' | 'intense'
  cameraDistance: 'medium', // 'close' | 'medium' | 'wide'
  fpsCounter: false,
  masterVolume: 0.75,
  engineVolume: 0.85,
  musicVolume: 0.35,
  sfxVolume: 0.85,
  speedUnit: 'kmh', // 'kmh' | 'mph'
  hudStyle: 'pro', // 'pro' | 'minimal'
  showMinimap: true,
  touchVisibility: 'auto' // 'auto' | 'always' | 'off'
};

export const STEERING_PRESETS = {
  arcade: {
    id: 'arcade',
    name: 'ARCADE EASY',
    steerSensitivity: 1.0,
    steerResponse: 1.0,
    steerLinearity: 'smooth',
    stabilityAssist: 0.85,
    handbrakeMode: 'drift'
  },
  sport: {
    id: 'sport',
    name: 'SPORT BALANCED',
    steerSensitivity: 1.15,
    steerResponse: 1.25,
    steerLinearity: 'balanced',
    stabilityAssist: 0.50,
    handbrakeMode: 'drift'
  },
  drift: {
    id: 'drift',
    name: 'DRIFT PRO',
    steerSensitivity: 1.30,
    steerResponse: 1.40,
    steerLinearity: 'balanced',
    stabilityAssist: 0.25,
    handbrakeMode: 'lock'
  },
  sim: {
    id: 'sim',
    name: 'SIMULATION',
    steerSensitivity: 1.0,
    steerResponse: 1.60,
    steerLinearity: 'direct',
    stabilityAssist: 0.0,
    handbrakeMode: 'lock'
  }
};

export class InputManager {
  constructor(voiceManager = null, gestureManager = null) {
    this.voiceManager = voiceManager;
    this.gestureManager = gestureManager;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      handbrake: false,
      nitro: false,
      horn: false
    };

    this.touchInput = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false,
      nitro: false,
      horn: false
    };

    this.filteredKeyboardSteer = 0;
    this.filteredVoiceSteer = 0;
    this.filteredGestureSteer = 0;
    this.lastUpdateTime = performance.now();
    this.prevGamepadShiftUp = false;
    this.prevGamepadShiftDown = false;

    this.drivingProfile = {
      steeringMode: 'arcade',
      steerSensitivity: 1.0,
      voiceSensitivity: 1.0,
      gestureSensitivity: 1.0,
      steerResponse: 1.0,
      steerLinearity: 'smooth',
      stabilityAssist: 0.85,
      transmissionMode: 'auto', // 'auto' | 'manual'
      manualExplicit: false,
      nitroMode: 'twin_overboost', // 'plasma' | 'twin_overboost' | 'hyper_warp'
      handbrakeMode: 'drift', // 'drift' | 'lock' | 'sharp'
      // Electronic & Equipment Setup
      absEnabled: true,
      tcsEnabled: true,
      brakeBias: 'balanced', // 'front' | 'balanced' | 'rear'
      aeroTrim: 'balanced', // 'low_drag' | 'balanced' | 'high_downforce'
      finalDrive: 'balanced' // 'accel' | 'balanced' | 'top_speed'
    };

    this.systemSettings = { ...DEFAULT_SYSTEM_SETTINGS };

    this.loadDrivingProfile();
    this.loadSystemSettings();

    this.onCamChange = null;
    this.onResetCar = null;
    this.onTogglePause = null;
    this.onShiftUp = null;
    this.onShiftDown = null;
    this.onToggleSfxMute = null;
    this.onToggleMusicMute = null;
    this.onHornStart = null;
    this.onHornStop = null;
    this.onToggleIndicator = null;
    this.onToggleGestureCam = null;

    this.voiceManager?.setSensitivity?.(this.drivingProfile.voiceSensitivity);
    this.gestureManager?.setSensitivity?.(this.drivingProfile.gestureSensitivity);

    this.initKeyboard();
    this.initTouchControls();
  }

  loadDrivingProfile() {
    try {
      const raw = localStorage.getItem('s3d_driving_profile_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.drivingProfile = { ...this.drivingProfile, ...parsed };
          // Recover players accidentally trapped in Manual mode (e.g. brushing Q/E near W) back to Auto
          if (this.drivingProfile.transmissionMode === 'manual' && parsed.manualExplicit !== true) {
            this.drivingProfile.transmissionMode = 'auto';
            this.drivingProfile.manualExplicit = false;
            this.saveDrivingProfile();
          }
        }
      }
      const legacySens = parseFloat(localStorage.getItem('s3d_steer_sensitivity'));
      if (!raw && !isNaN(legacySens) && legacySens >= 0.4 && legacySens <= 1.8) {
        this.drivingProfile.steerSensitivity = legacySens;
      }
    } catch (e) {}
  }

  saveDrivingProfile() {
    try {
      localStorage.setItem('s3d_driving_profile_v1', JSON.stringify(this.drivingProfile));
      localStorage.setItem('s3d_steer_sensitivity', String(this.drivingProfile.steerSensitivity));
    } catch (e) {}
  }

  loadSystemSettings() {
    try {
      const raw = localStorage.getItem('s3d_system_settings_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.systemSettings = { ...DEFAULT_SYSTEM_SETTINGS, ...parsed };
        }
      } else {
        const legacyQ = localStorage.getItem('s3d_graphics_quality');
        if (legacyQ === 'balanced') {
          this.applyGraphicsPreset('medium');
        }
      }
    } catch (e) {}
  }

  saveSystemSettings() {
    try {
      localStorage.setItem('s3d_system_settings_v1', JSON.stringify(this.systemSettings));
    } catch (e) {}
  }

  applyGraphicsPreset(presetId) {
    const preset = GRAPHICS_PRESETS[presetId];
    if (!preset) return this.getSystemSettings();
    this.systemSettings = {
      ...this.systemSettings,
      graphicsPreset: preset.id,
      shadowQuality: preset.shadowQuality,
      bloomMode: preset.bloomMode,
      speedFxEnabled: preset.speedFxEnabled,
      headlightsEnabled: preset.headlightsEnabled,
      resolutionScale: preset.resolutionScale,
      exposure: preset.exposure
    };
    this.saveSystemSettings();
    return this.getSystemSettings();
  }

  updateSystemSettings(partial = {}) {
    const gfxKeys = ['shadowQuality', 'bloomMode', 'speedFxEnabled', 'headlightsEnabled', 'resolutionScale', 'exposure'];
    const touchedGfx = gfxKeys.some((k) => partial[k] !== undefined && partial[k] !== this.systemSettings[k]);
    this.systemSettings = { ...this.systemSettings, ...partial };
    this.systemSettings.exposure = Math.max(0.75, Math.min(1.6, Number(this.systemSettings.exposure) || 1.15));
    this.systemSettings.resolutionScale = Math.max(0.5, Math.min(2.0, Number(this.systemSettings.resolutionScale) || 1.5));
    if (touchedGfx && !partial.graphicsPreset) {
      this.systemSettings.graphicsPreset = 'custom';
    }
    this.saveSystemSettings();
    return this.getSystemSettings();
  }

  getSystemSettings() {
    return { ...this.systemSettings };
  }

  resetAllSettings() {
    this.drivingProfile = {
      steeringMode: 'arcade',
      steerSensitivity: 1.0,
      voiceSensitivity: 1.0,
      gestureSensitivity: 1.0,
      steerResponse: 1.0,
      steerLinearity: 'smooth',
      stabilityAssist: 0.85,
      transmissionMode: 'auto',
      manualExplicit: false,
      nitroMode: 'twin_overboost',
      handbrakeMode: 'drift',
      absEnabled: true,
      tcsEnabled: true,
      brakeBias: 'balanced',
      aeroTrim: 'balanced',
      finalDrive: 'balanced'
    };
    this.systemSettings = { ...DEFAULT_SYSTEM_SETTINGS };
    this.voiceManager?.setSensitivity?.(1.0);
    this.gestureManager?.setSensitivity?.(1.0);
    this.saveDrivingProfile();
    this.saveSystemSettings();
    return { driving: this.getDrivingProfile(), system: this.getSystemSettings() };
  }

  applySteeringPreset(presetId) {
    const preset = STEERING_PRESETS[presetId];
    if (!preset) return this.drivingProfile;
    this.drivingProfile.steeringMode = preset.id;
    this.drivingProfile.steerSensitivity = preset.steerSensitivity;
    this.drivingProfile.voiceSensitivity = Math.max(0.75, Math.min(1.4, preset.steerSensitivity));
    this.drivingProfile.gestureSensitivity = Math.max(0.75, Math.min(1.4, preset.steerSensitivity));
    this.drivingProfile.steerResponse = preset.steerResponse;
    this.drivingProfile.steerLinearity = preset.steerLinearity;
    this.drivingProfile.stabilityAssist = preset.stabilityAssist;
    this.drivingProfile.handbrakeMode = preset.handbrakeMode;
    this.voiceManager?.setSensitivity?.(this.drivingProfile.voiceSensitivity);
    this.gestureManager?.setSensitivity?.(this.drivingProfile.gestureSensitivity);
    this.saveDrivingProfile();
    return { ...this.drivingProfile };
  }

  updateDrivingProfile(partial = {}, markCustomIfSteeringChanged = true) {
    const steeringKeys = ['steerSensitivity', 'steerResponse', 'steerLinearity', 'stabilityAssist', 'handbrakeMode'];
    const touchedSteering = steeringKeys.some((k) => partial[k] !== undefined && partial[k] !== this.drivingProfile[k]);
    this.drivingProfile = { ...this.drivingProfile, ...partial };
    this.drivingProfile.steerSensitivity = Math.max(0.4, Math.min(1.8, Number(this.drivingProfile.steerSensitivity) || 1.0));
    this.drivingProfile.voiceSensitivity = Math.max(0.4, Math.min(1.8, Number(this.drivingProfile.voiceSensitivity) || 1.0));
    this.drivingProfile.gestureSensitivity = Math.max(0.4, Math.min(2.0, Number(this.drivingProfile.gestureSensitivity) || 1.0));
    this.drivingProfile.steerResponse = Math.max(0.5, Math.min(2.0, Number(this.drivingProfile.steerResponse) || 1.0));
    this.drivingProfile.stabilityAssist = Math.max(0, Math.min(1, Number(this.drivingProfile.stabilityAssist) ?? 0.85));
    this.voiceManager?.setSensitivity?.(this.drivingProfile.voiceSensitivity);
    this.gestureManager?.setSensitivity?.(this.drivingProfile.gestureSensitivity);
    if (markCustomIfSteeringChanged && touchedSteering && !partial.steeringMode) {
      this.drivingProfile.steeringMode = 'custom';
    }
    this.saveDrivingProfile();
    return { ...this.drivingProfile };
  }

  getDrivingProfile() {
    return { ...this.drivingProfile };
  }

  setVoiceManager(vm) {
    this.voiceManager = vm;
    this.voiceManager?.setSensitivity?.(this.drivingProfile.voiceSensitivity);
  }

  setGestureManager(gm) {
    this.gestureManager = gm;
    this.gestureManager?.setSensitivity?.(this.drivingProfile.gestureSensitivity);
  }

  setSteerSensitivity(val) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      this.updateDrivingProfile({ steerSensitivity: num });
    }
  }

  getSteerSensitivity() {
    return this.drivingProfile.steerSensitivity;
  }

  resetTransientKeys() {
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.handbrake = false;
    this.keys.nitro = false;
    if (this.keys.horn) {
      this.keys.horn = false;
      this.onHornStop?.();
    }
    this.filteredKeyboardSteer = 0;
  }

  initKeyboard() {
    const nonTextInputTypes = new Set(['range', 'checkbox', 'radio', 'button', 'submit', 'reset', 'color', 'file']);
    const isTypingTarget = (el) => {
      if (!el) return false;
      if (el.isContentEditable || el.tagName === 'TEXTAREA') return true;
      if (el.tagName === 'INPUT') {
        const inputType = (el.type || 'text').toLowerCase();
        return !nonTextInputTypes.has(inputType);
      }
      return false;
    };

    window.addEventListener('keydown', (e) => {
      const activeEl = typeof document !== 'undefined' ? document.activeElement : null;
      if (isTypingTarget(activeEl)) return;

      const inActiveDrive = typeof window !== 'undefined' &&
        (window.gameApp?.state === 'RACING' || window.gameApp?.state === 'COUNTDOWN') &&
        !window.gameApp?.isPaused;
      if (
        (inActiveDrive || !activeEl || (activeEl.tagName !== 'SELECT' && activeEl.tagName !== 'BUTTON')) &&
        (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'Space')
      ) {
        e.preventDefault?.();
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'Space':
          this.keys.handbrake = true;
          if (!e.repeat) e.preventDefault();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          this.keys.nitro = true;
          break;
        case 'KeyE':
        case 'PageUp':
          if (!e.repeat && this.onShiftUp) this.onShiftUp();
          break;
        case 'KeyQ':
        case 'PageDown':
          if (!e.repeat && this.onShiftDown) this.onShiftDown();
          break;
        case 'KeyC':
          if (!e.repeat && this.onCamChange) this.onCamChange();
          break;
        case 'KeyR':
          if (!e.repeat && this.onResetCar) this.onResetCar();
          break;
        case 'KeyM':
          if (!e.repeat && this.onToggleSfxMute) this.onToggleSfxMute();
          break;
        case 'KeyB':
          if (!e.repeat && this.onToggleMusicMute) this.onToggleMusicMute();
          break;
        case 'KeyH':
          if (!e.repeat && !this.keys.horn) {
            this.keys.horn = true;
            this.onHornStart?.();
          }
          break;
        case 'KeyZ':
        case 'BracketLeft':
          if (!e.repeat && this.onToggleIndicator) this.onToggleIndicator('left');
          break;
        case 'KeyX':
        case 'BracketRight':
          if (!e.repeat && this.onToggleIndicator) this.onToggleIndicator('right');
          break;
        case 'KeyF':
          if (!e.repeat && this.onToggleIndicator) this.onToggleIndicator('hazard');
          break;
        case 'KeyG':
          if (!e.repeat && this.onToggleGestureCam) this.onToggleGestureCam();
          break;
        case 'Escape':
          if (!e.repeat && this.onTogglePause) this.onTogglePause();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'Space':
          this.keys.handbrake = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          this.keys.nitro = false;
          break;
        case 'KeyH':
          if (this.keys.horn) {
            this.keys.horn = false;
            this.onHornStop?.();
          }
          break;
      }
    });

    window.addEventListener('blur', () => this.resetTransientKeys());
  }

  initTouchControls() {
    const btnGas = document.getElementById('touch-gas');
    const btnBrake = document.getElementById('touch-brake');
    const btnLeft = document.getElementById('touch-left');
    const btnRight = document.getElementById('touch-right');
    const btnNitro = document.getElementById('touch-nitro');
    const btnHandbrake = document.getElementById('touch-handbrake');

    const bindTouch = (elem, onStart, onEnd) => {
      if (!elem) return;
      elem.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); }, { passive: false });
      elem.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); }, { passive: false });
      elem.addEventListener('touchcancel', () => onEnd());
      elem.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(); });
      elem.addEventListener('mouseup', (e) => { e.preventDefault(); onEnd(); });
      elem.addEventListener('mouseleave', () => onEnd());
    };

    bindTouch(btnGas, () => { this.touchInput.throttle = 1; }, () => { this.touchInput.throttle = 0; });
    bindTouch(btnBrake, () => { this.touchInput.brake = 1; }, () => { this.touchInput.brake = 0; });
    bindTouch(btnLeft, () => { this.touchInput.steer = -1; }, () => { if (this.touchInput.steer < 0) this.touchInput.steer = 0; });
    bindTouch(btnRight, () => { this.touchInput.steer = 1; }, () => { if (this.touchInput.steer > 0) this.touchInput.steer = 0; });
    bindTouch(btnNitro, () => { this.touchInput.nitro = true; }, () => { this.touchInput.nitro = false; });
    bindTouch(btnHandbrake, () => { this.touchInput.handbrake = true; }, () => { this.touchInput.handbrake = false; });
  }

  applyLinearityCurve(val) {
    const abs = Math.abs(val);
    const sign = Math.sign(val);
    if (this.drivingProfile.steerLinearity === 'smooth') {
      return sign * Math.pow(abs, 1.45);
    }
    if (this.drivingProfile.steerLinearity === 'balanced') {
      return sign * Math.pow(abs, 1.15);
    }
    return val;
  }

  pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0];
    if (!gp) return null;

    const deadzone = 0.14;
    let steer = gp.axes[0] || 0;
    if (Math.abs(steer) < deadzone) steer = 0;
    else {
      const sign = Math.sign(steer);
      const norm = (Math.abs(steer) - deadzone) / (1 - deadzone);
      steer = sign * Math.pow(norm, 1.25);
    }

    const throttle = (gp.buttons[7] ? gp.buttons[7].value : 0) || (gp.buttons[0]?.pressed ? 1 : 0);
    const brake = (gp.buttons[6] ? gp.buttons[6].value : 0) || (gp.buttons[1]?.pressed ? 1 : 0);
    const handbrake = !!gp.buttons[2]?.pressed;
    const nitro = !!gp.buttons[3]?.pressed;

    // Paddle shifts on RB (button 5) and LB (button 4)
    const rbPressed = !!gp.buttons[5]?.pressed;
    const lbPressed = !!gp.buttons[4]?.pressed;
    if (rbPressed && !this.prevGamepadShiftUp && this.onShiftUp) this.onShiftUp();
    if (lbPressed && !this.prevGamepadShiftDown && this.onShiftDown) this.onShiftDown();
    this.prevGamepadShiftUp = rbPressed;
    this.prevGamepadShiftDown = lbPressed;

    return { throttle, brake, steer, handbrake, nitro };
  }

  getState() {
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - this.lastUpdateTime) / 1000));
    this.lastUpdateTime = now;

    const prof = this.drivingProfile;
    const rawKeySteer = (this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0);
    if (rawKeySteer !== 0) {
      const reversingDir = (this.filteredKeyboardSteer * rawKeySteer) < 0;
      const rampRate = (reversingDir ? 10.5 : 5.4) * prof.steerResponse * prof.steerSensitivity;
      const step = rampRate * dt;
      if (this.filteredKeyboardSteer < rawKeySteer) {
        this.filteredKeyboardSteer = Math.min(rawKeySteer, this.filteredKeyboardSteer + step);
      } else {
        this.filteredKeyboardSteer = Math.max(rawKeySteer, this.filteredKeyboardSteer - step);
      }
    } else {
      const returnStep = (9.5 * prof.steerResponse) * dt;
      if (Math.abs(this.filteredKeyboardSteer) <= returnStep) {
        this.filteredKeyboardSteer = 0;
      } else {
        this.filteredKeyboardSteer -= Math.sign(this.filteredKeyboardSteer) * returnStep;
      }
    }

    const voice = this.voiceManager ? this.voiceManager.getState() : {
      throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false, changeCam: false, reset: false, horn: false, indicator: null
    };
    const gesture = this.gestureManager ? this.gestureManager.getState() : {
      active: false, throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false
    };

    if (voice.changeCam) {
      this.voiceManager?.consumeAction?.('changeCam');
      if (this.onCamChange) this.onCamChange();
    }
    if (voice.reset) {
      this.voiceManager?.consumeAction?.('reset');
      if (this.onResetCar) this.onResetCar();
    }
    if (voice.indicator) {
      const side = voice.indicator;
      this.voiceManager?.consumeAction?.('indicator');
      this.onToggleIndicator?.(side);
    }
    if (voice.horn) {
      this.voiceManager?.consumeAction?.('horn');
      this.onHornStart?.();
      setTimeout(() => { if (!this.keys.horn) this.onHornStop?.(); }, 350);
    }

    // Calibrated Voice & Finger Gesture Steering Smoothing + Sensitivity Curves
    const voiceSens = (prof.voiceSensitivity || 1.0) * (0.72 + 0.28 * (prof.steerSensitivity || 1.0));
    const voiceTarget = Math.max(-1, Math.min(1, (voice.steer || 0) * voiceSens));
    this.filteredVoiceSteer += (voiceTarget - this.filteredVoiceSteer) * (1 - Math.exp(-6.5 * prof.steerResponse * dt));
    if (Math.abs(this.filteredVoiceSteer) < 0.01 && voiceTarget === 0) this.filteredVoiceSteer = 0;

    const gestureSens = (prof.gestureSensitivity || 1.0) * (0.72 + 0.28 * (prof.steerSensitivity || 1.0));
    const gestureTarget = Math.max(-1, Math.min(1, (gesture.steer || 0) * gestureSens));
    this.filteredGestureSteer += (gestureTarget - this.filteredGestureSteer) * (1 - Math.exp(-11.5 * prof.steerResponse * dt));
    if (Math.abs(this.filteredGestureSteer) < 0.01 && gestureTarget === 0) this.filteredGestureSteer = 0;

    const gp = this.pollGamepad();
    let steer = this.applyLinearityCurve(this.filteredKeyboardSteer);
    if (this.touchInput.steer !== 0) steer = this.applyLinearityCurve(this.touchInput.steer);
    if (gp && gp.steer !== 0) steer = this.applyLinearityCurve(gp.steer * prof.steerSensitivity);
    if (steer === 0 && gesture.active && this.filteredGestureSteer !== 0) {
      steer = this.applyLinearityCurve(this.filteredGestureSteer);
    }
    if (steer === 0 && this.filteredVoiceSteer !== 0) {
      steer = this.applyLinearityCurve(this.filteredVoiceSteer);
    }

    return {
      throttle: Math.max(gp ? gp.throttle : 0, this.touchInput.throttle, this.keys.forward ? 1 : 0, voice.throttle, gesture.throttle || 0),
      brake: Math.max(gp ? gp.brake : 0, this.touchInput.brake, this.keys.backward ? 1 : 0, voice.brake, gesture.brake || 0),
      steer: Math.max(-1, Math.min(1, steer)),
      handbrake: (gp ? gp.handbrake : false) || this.touchInput.handbrake || this.keys.handbrake || voice.handbrake || !!gesture.handbrake,
      nitro: (gp ? gp.nitro : false) || this.touchInput.nitro || this.keys.nitro || voice.nitro || !!gesture.nitro,
      horn: !!(this.touchInput.horn || this.keys.horn),
      steerSensitivity: prof.steerSensitivity,
      voiceSensitivity: prof.voiceSensitivity || 1.0,
      gestureSensitivity: prof.gestureSensitivity || 1.0,
      stabilityAssist: prof.stabilityAssist,
      transmissionMode: prof.transmissionMode,
      nitroMode: prof.nitroMode,
      handbrakeMode: prof.handbrakeMode,
      absEnabled: prof.absEnabled !== false,
      tcsEnabled: prof.tcsEnabled !== false,
      brakeBias: prof.brakeBias || 'balanced',
      aeroTrim: prof.aeroTrim || 'balanced',
      finalDrive: prof.finalDrive || 'balanced'
    };
  }
}
