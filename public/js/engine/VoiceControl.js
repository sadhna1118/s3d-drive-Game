/**
 * S3D Drive - Voice Recognition & Speech Driving Control Engine
 * Supports real-time continuous voice navigation in English & Hindi.
 */

export class VoiceControlManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSupported = false;
    this.currentCommand = null;
    this.lastRecognizedText = '';

    // Active voice control states
    this.voiceState = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false,
      nitro: false,
      changeCam: false,
      reset: false
    };

    // Timers for natural voice command hold duration
    this.steerTimer = null;
    this.throttleTimer = null;
    this.nitroTimer = null;
    this.brakeTimer = null;
    this.handbrakeTimer = null;

    // Callbacks
    this.onCommandRecognized = null; // (command, rawText, icon)
    this.onStateChange = null;       // (isListening)
    this.onError = null;

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web Speech Recognition API is not supported in this browser.');
      this.isSupported = false;
      return;
    }

    this.isSupported = true;
    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 3;
      this.recognition.lang = 'en-US'; // Multilingual recognition matches phonetically across languages

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
        console.warn('Voice recognition error:', event.error);
        if (event.error === 'not-allowed') {
          this.isListening = false;
          if (this.onStateChange) this.onStateChange(false);
          if (this.onError) this.onError('Microphone access blocked. Please allow mic permissions in your browser.');
        }
      };

      this.recognition.onend = () => {
        // Auto restart if user didn't explicitly toggle off
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch (e) {
            // Already started or busy
          }
        } else {
          if (this.onStateChange) this.onStateChange(false);
        }
      };
    } catch (e) {
      console.warn('Failed to initialize SpeechRecognition:', e);
      this.isSupported = false;
    }
  }

  toggleListening() {
    if (!this.isSupported) {
      alert('Voice Control is not supported in this browser. Please use Google Chrome, Microsoft Edge, or a Web Speech API-compatible browser.');
      return false;
    }

    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
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
    } catch (e) {
      // Ignored
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  resetVoiceInputs() {
    this.voiceState.throttle = 0;
    this.voiceState.brake = 0;
    this.voiceState.steer = 0;
    this.voiceState.handbrake = false;
    this.voiceState.nitro = false;
    this.currentCommand = null;
  }

  processVoiceCommand(phrase) {
    const text = phrase.toLowerCase();

    // 1. LEFT (English & Hindi)
    if (
      text.includes('left') ||
      text.includes('baayein') ||
      text.includes('baaye') ||
      text.includes('baye') ||
      text.includes('ulta') ||
      text.includes('turn left') ||
      text.includes('take left') ||
      text.includes('left mud')
    ) {
      this.applySteer(-1.0, 1800, 'LEFT ◀', 'TURN LEFT', '◀');
      return;
    }

    // 2. RIGHT (English & Hindi)
    if (
      text.includes('right') ||
      text.includes('daayein') ||
      text.includes('daaye') ||
      text.includes('daye') ||
      text.includes('sidha') && text.includes('right') ||
      text.includes('turn right') ||
      text.includes('take right') ||
      text.includes('right mud')
    ) {
      this.applySteer(1.0, 1800, 'RIGHT ▶', 'TURN RIGHT', '▶');
      return;
    }

    // 3. STRAIGHT / CENTER
    if (
      text.includes('straight') ||
      text.includes('center') ||
      text.includes('seedha') ||
      text.includes('sidha') ||
      text.includes('seedhe') ||
      text.includes('samne') ||
      text.includes('middle')
    ) {
      this.voiceState.steer = 0;
      if (this.steerTimer) clearTimeout(this.steerTimer);
      this.triggerFeedback('STRAIGHT ⬆', 'CENTER STEERING', '⬆');
      return;
    }

    // 4. NITRO / BOOST / FAST (English & Hindi)
    if (
      text.includes('nitro') ||
      text.includes('boost') ||
      text.includes('warp') ||
      text.includes('nos') ||
      text.includes('turbo') ||
      text.includes('super fast') ||
      text.includes('tez') ||
      text.includes('dhamaka')
    ) {
      this.applyNitro(2500);
      return;
    }

    // 5. ACCELERATE / GO / SPEED / CHAL / START (English & Hindi)
    if (
      text.includes('go') ||
      text.includes('speed') ||
      text.includes('run') ||
      text.includes('accelerate') ||
      text.includes('drive') ||
      text.includes('forward') ||
      text.includes('ahead') ||
      text.includes('fast') ||
      text.includes('gas') ||
      text.includes('chal') ||
      text.includes('chalo') ||
      text.includes('chalao') ||
      text.includes('bhaga') ||
      text.includes('bhagao') ||
      text.includes('aage') ||
      text.includes('doud') ||
      text.includes('start') ||
      text.includes('race') ||
      text.includes('play') ||
      text.includes('khelo') ||
      text.includes('shuru')
    ) {
      this.applyThrottle(1.0, 3500);
      if (this.onStartRaceVoice) this.onStartRaceVoice();
      return;
    }

    // 6. BRAKE / STOP / SLOW (English & Hindi)
    if (
      text.includes('stop') ||
      text.includes('brake') ||
      text.includes('halt') ||
      text.includes('slow') ||
      text.includes('ruk') ||
      text.includes('ruko') ||
      text.includes('rok') ||
      text.includes('roko') ||
      text.includes('dheere') ||
      text.includes('thahar')
    ) {
      this.applyBrake(1.0, 2000);
      return;
    }

    // 7. DRIFT / HANDBRAKE (English & Hindi)
    if (
      text.includes('drift') ||
      text.includes('handbrake') ||
      text.includes('skid') ||
      text.includes('slide') ||
      text.includes('fisal')
    ) {
      this.applyDrift(2000);
      return;
    }

    // 8. REVERSE / BACK (English & Hindi)
    if (
      text.includes('reverse') ||
      text.includes('back') ||
      text.includes('backward') ||
      text.includes('peeche') ||
      text.includes('piche') ||
      text.includes('ulta chalo')
    ) {
      this.applyReverse(2500);
      return;
    }

    // 9. RESET CAR / RESPAWN
    if (
      text.includes('reset') ||
      text.includes('respawn') ||
      text.includes('recover') ||
      text.includes('theek karo') ||
      text.includes('restart position')
    ) {
      this.voiceState.reset = true;
      setTimeout(() => { this.voiceState.reset = false; }, 200);
      this.triggerFeedback('RESET 🔄', 'CAR RESET TO TRACK', '🔄');
      return;
    }

    // 10. CHANGE CAMERA VIEW
    if (
      text.includes('camera') ||
      text.includes('view') ||
      text.includes('cam') ||
      text.includes('cockpit') ||
      text.includes('nazaara')
    ) {
      this.voiceState.changeCam = true;
      setTimeout(() => { this.voiceState.changeCam = false; }, 200);
      this.triggerFeedback('CAMERA 🎥', 'CHANGE VIEW', '🎥');
      return;
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

  applySteer(dir = -1.0, durationMs = 1800, title = 'LEFT ◀', desc = 'TURN LEFT', icon = '◀') {
    this.voiceState.steer = dir;
    // Keep baseline throttle while turning so car doesn't stall
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

  applyDrift(durationMs = 2000) {
    this.voiceState.handbrake = true;
    if (this.voiceState.steer === 0) this.voiceState.steer = (Math.random() > 0.5 ? 1 : -1);
    this.voiceState.throttle = 0.9;
    if (this.handbrakeTimer) clearTimeout(this.handbrakeTimer);
    this.handbrakeTimer = setTimeout(() => {
      this.voiceState.handbrake = false;
    }, durationMs);
    this.triggerFeedback('DRIFT 🌀', 'HANDBRAKE DRIFT', '🌀');
  }

  applyReverse(durationMs = 2500) {
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
