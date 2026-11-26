/**
 * S3D Drive - Voice Recognition & Speech Driving Control Engine
 * Supports real-time continuous voice navigation in English & Hindi with clean debouncing.
 */

export class VoiceControlManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSupported = false;
    this.currentCommand = null;
    this.lastRecognizedText = '';
    this.lastCommandKey = '';
    this.lastCommandTime = 0;

    this.voiceState = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false,
      nitro: false,
      changeCam: false,
      reset: false
    };

    this.steerTimer = null;
    this.throttleTimer = null;
    this.nitroTimer = null;
    this.brakeTimer = null;
    this.handbrakeTimer = null;

    this.onCommandRecognized = null;
    this.onStateChange = null;
    this.onError = null;
    this.onStartRaceVoice = null;

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.isSupported = false;
      return;
    }

    this.isSupported = true;
    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 3;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStateChange) this.onStateChange(true);
      };

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript.toLowerCase().trim();
          this.lastRecognizedText = transcript;
          this.processVoiceCommand(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          this.isListening = false;
          if (this.onStateChange) this.onStateChange(false);
          if (this.onError) this.onError('Microphone access blocked. Please allow mic permissions in your browser.');
        } else if (event.error === 'audio-capture') {
          this.isListening = false;
          if (this.onStateChange) this.onStateChange(false);
          if (this.onError) this.onError('No microphone device detected.');
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          setTimeout(() => {
            if (!this.isListening) return;
            try {
              this.recognition.start();
            } catch (e) {}
          }, 150);
        } else if (this.onStateChange) {
          this.onStateChange(false);
        }
      };
    } catch (e) {
      console.warn('Failed to initialize SpeechRecognition:', e);
      this.isSupported = false;
    }
  }

  toggleListening() {
    if (!this.isSupported) {
      if (this.onError) {
        this.onError('Voice Control requires Chrome or Edge (Web Speech API).');
      }
      return false;
    }

    if (this.isListening) this.stop();
    else this.start();
    return this.isListening;
  }

  start() {
    if (!this.recognition || this.isListening) return;
    try {
      this.isListening = true;
      this.recognition.start();
      if (this.onStateChange) this.onStateChange(true);
    } catch (e) {
      console.warn('SpeechRecognition start warning:', e);
    }
  }

  stop() {
    if (!this.recognition) return;
    this.isListening = false;
    this.resetVoiceInputs();
    try {
      this.recognition.stop();
    } catch (e) {}
    if (this.onStateChange) this.onStateChange(false);
  }

  resetVoiceInputs() {
    this.voiceState.throttle = 0;
    this.voiceState.brake = 0;
    this.voiceState.steer = 0;
    this.voiceState.handbrake = false;
    this.voiceState.nitro = false;
    this.voiceState.changeCam = false;
    this.voiceState.reset = false;
    this.currentCommand = null;
  }

  consumeAction(actionName) {
    if (actionName === 'changeCam') this.voiceState.changeCam = false;
    else if (actionName === 'reset') this.voiceState.reset = false;
  }

  shouldThrottleCommand(cmdKey, cooldownMs = 450) {
    const now = performance.now();
    if (this.lastCommandKey === cmdKey && now - this.lastCommandTime < cooldownMs) {
      return true;
    }
    this.lastCommandKey = cmdKey;
    this.lastCommandTime = now;
    return false;
  }

  processVoiceCommand(phrase) {
    const text = phrase.toLowerCase();

    if (
      text.includes('left') || text.includes('baayein') || text.includes('baaye') ||
      text.includes('baye') || text.includes('ulta') || text.includes('left mud')
    ) {
      if (this.shouldThrottleCommand('left', 400)) return;
      this.applySteer(-0.75, 1600, 'LEFT ◀', 'TURN LEFT', '◀');
      return;
    }

    if (
      text.includes('right') || text.includes('daayein') || text.includes('daaye') ||
      text.includes('daye') || (text.includes('sidha') && text.includes('right')) || text.includes('right mud')
    ) {
      if (this.shouldThrottleCommand('right', 400)) return;
      this.applySteer(0.75, 1600, 'RIGHT ▶', 'TURN RIGHT', '▶');
      return;
    }

    if (
      text.includes('straight') || text.includes('center') || text.includes('seedha') ||
      text.includes('sidha') || text.includes('seedhe') || text.includes('samne') || text.includes('middle')
    ) {
      if (this.shouldThrottleCommand('straight', 400)) return;
      this.voiceState.steer = 0;
      if (this.steerTimer) clearTimeout(this.steerTimer);
      this.triggerFeedback('STRAIGHT ⬆', 'CENTER STEERING', '⬆');
      return;
    }

    if (
      text.includes('nitro') || text.includes('boost') || text.includes('warp') ||
      text.includes('nos') || text.includes('turbo') || text.includes('super fast') ||
      text.includes('tez') || text.includes('dhamaka')
    ) {
      if (this.shouldThrottleCommand('nitro', 600)) return;
      this.applyNitro(2500);
      return;
    }

    if (
      text.includes('go') || text.includes('speed') || text.includes('run') ||
      text.includes('accelerate') || text.includes('drive') || text.includes('forward') ||
      text.includes('ahead') || text.includes('fast') || text.includes('gas') ||
      text.includes('chal') || text.includes('chalo') || text.includes('chalao') ||
      text.includes('bhaga') || text.includes('bhagao') || text.includes('aage') ||
      text.includes('doud') || text.includes('start') || text.includes('race') ||
      text.includes('play') || text.includes('khelo') || text.includes('shuru')
    ) {
      if (this.shouldThrottleCommand('throttle', 500)) return;
      this.applyThrottle(1.0, 3500);
      if (this.onStartRaceVoice) this.onStartRaceVoice();
      return;
    }

    if (
      text.includes('stop') || text.includes('brake') || text.includes('halt') ||
      text.includes('slow') || text.includes('ruk') || text.includes('ruko') ||
      text.includes('rok') || text.includes('roko') || text.includes('dheere') || text.includes('thahar')
    ) {
      if (this.shouldThrottleCommand('brake', 500)) return;
      this.applyBrake(1.0, 2000);
      return;
    }

    if (
      text.includes('drift') || text.includes('handbrake') || text.includes('skid') ||
      text.includes('slide') || text.includes('fisal')
    ) {
      if (this.shouldThrottleCommand('drift', 600)) return;
      this.applyDrift(1800);
      return;
    }

    if (
      text.includes('reverse') || text.includes('back') || text.includes('backward') ||
      text.includes('peeche') || text.includes('piche') || text.includes('ulta chalo')
    ) {
      if (this.shouldThrottleCommand('reverse', 600)) return;
      this.applyReverse(2400);
      return;
    }

    if (
      text.includes('reset') || text.includes('respawn') || text.includes('recover') ||
      text.includes('theek karo') || text.includes('restart position')
    ) {
      if (this.shouldThrottleCommand('reset', 900)) return;
      this.voiceState.reset = true;
      this.triggerFeedback('RESET 🔄', 'CAR RESET TO TRACK', '🔄');
      return;
    }

    if (
      text.includes('camera') || text.includes('view') || text.includes('cam') ||
      text.includes('cockpit') || text.includes('nazaara')
    ) {
      if (this.shouldThrottleCommand('camera', 900)) return;
      this.voiceState.changeCam = true;
      this.triggerFeedback('CAMERA 🎥', 'CHANGE VIEW', '🎥');
    }
  }

  applyThrottle(val = 1.0, durationMs = 3500) {
    this.voiceState.throttle = val;
    this.voiceState.brake = 0;
    if (this.throttleTimer) clearTimeout(this.throttleTimer);
    this.throttleTimer = setTimeout(() => {
      this.voiceState.throttle = 0;
    }, durationMs);
    this.triggerFeedback('SPEED ⚡', 'ACCELERATING', '⚡');
  }

  applySteer(dir = -0.75, durationMs = 1600, title = 'LEFT ◀', desc = 'TURN LEFT', icon = '◀') {
    this.voiceState.steer = dir;
    if (this.voiceState.throttle <= 0) {
      this.voiceState.throttle = 0.85;
      if (this.throttleTimer) clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => { this.voiceState.throttle = 0; }, durationMs + 1000);
    }

    if (this.steerTimer) clearTimeout(this.steerTimer);
    this.steerTimer = setTimeout(() => {
      this.voiceState.steer = 0;
    }, durationMs);

    this.triggerFeedback(title, desc, icon);
  }

  applyNitro(durationMs = 2500) {
    this.voiceState.nitro = true;
    this.voiceState.throttle = 1.0;
    if (this.nitroTimer) clearTimeout(this.nitroTimer);
    this.nitroTimer = setTimeout(() => {
      this.voiceState.nitro = false;
    }, durationMs);

    if (this.throttleTimer) clearTimeout(this.throttleTimer);
    this.throttleTimer = setTimeout(() => { this.voiceState.throttle = 0; }, durationMs + 1500);

    this.triggerFeedback('NITRO WARP 🔥', 'MAX BOOST SURGE', '🔥');
  }

  applyBrake(val = 1.0, durationMs = 2000) {
    this.voiceState.brake = val;
    this.voiceState.throttle = 0;
    this.voiceState.nitro = false;
    if (this.throttleTimer) clearTimeout(this.throttleTimer);
    if (this.brakeTimer) clearTimeout(this.brakeTimer);
    this.brakeTimer = setTimeout(() => {
      this.voiceState.brake = 0;
    }, durationMs);
    this.triggerFeedback('BRAKE 🛑', 'DECELERATING / STOP', '🛑');
  }

  applyDrift(durationMs = 1800) {
    this.voiceState.handbrake = true;
    if (this.voiceState.steer === 0) this.voiceState.steer = (Math.random() > 0.5 ? 0.75 : -0.75);
    this.voiceState.throttle = 0.9;
    if (this.handbrakeTimer) clearTimeout(this.handbrakeTimer);
    this.handbrakeTimer = setTimeout(() => {
      this.voiceState.handbrake = false;
    }, durationMs);
    this.triggerFeedback('DRIFT 🌀', 'HANDBRAKE DRIFT', '🌀');
  }

  applyReverse(durationMs = 2400) {
    this.voiceState.throttle = 0;
    this.voiceState.brake = 1.0;
    if (this.brakeTimer) clearTimeout(this.brakeTimer);
    this.brakeTimer = setTimeout(() => {
      this.voiceState.brake = 0;
    }, durationMs);
    this.triggerFeedback('REVERSE ⏪', 'BACKWARD REVERSE', '⏪');
  }

  triggerFeedback(title, desc, icon) {
    this.currentCommand = { title, desc, icon, time: Date.now() };
    if (this.onCommandRecognized) {
      this.onCommandRecognized(title, desc, icon, this.lastRecognizedText);
    }
  }

  getState() {
    return {
      throttle: this.voiceState.throttle,
      brake: this.voiceState.brake,
      steer: this.voiceState.steer,
      handbrake: this.voiceState.handbrake,
      nitro: this.voiceState.nitro,
      changeCam: this.voiceState.changeCam,
      reset: this.voiceState.reset
    };
  }
}
