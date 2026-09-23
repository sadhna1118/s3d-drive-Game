/**
 * Velocity Rush 3D - Audio Engine with Multi-Station Radio & Weather FX
 */

export const RADIO_STATIONS = [
  { id: 'cyberwave', name: '📻 Cyberwave 2077', genre: 'Dark Synthwave', tempo: 126 },
  { id: 'sunset', name: '📻 Neon Sunset Dreams', genre: 'Chill Outrun', tempo: 108 },
  { id: 'dnb', name: '📻 Apex Drum & Bass', genre: 'Fast Neurofunk', tempo: 168 }
];

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;

    // Engine Audio Nodes
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineGain = null;
    this.engineFilter = null;

    // Skid & Nitro Nodes
    this.skidGain = null;
    this.skidFilter = null;
    this.nitroGain = null;

    // Rain Audio
    this.rainGain = null;

    // Radio State
    this.currentStationIndex = 0;
    this.musicPlaying = false;
    this.musicStep = 0;
    this.musicInterval = null;

    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.9;
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.35;
      this.musicGain.connect(this.masterGain);

      this.initEngineSynth();
      this.initSkidSynth();
      this.initNitroSynth();
      this.initRainSynth();

      this.initialized = true;
    } catch (e) {
      console.warn('Audio initialization error:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initEngineSynth() {
    if (!this.ctx) return;
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.value = 0.001;

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 450;

    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.value = 55;

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.value = 110;

    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.sfxGain);

    this.engineOsc1.start();
    this.engineOsc2.start();
  }

  updateEngine(rpmRatio, throttle, speedRatio) {
    if (!this.initialized || !this.engineOsc1 || this.isMuted) return;
    const clampedRPM = Math.max(0.1, Math.min(1.0, rpmRatio));
    const targetFreq1 = 45 + clampedRPM * 240;
    const targetFreq2 = targetFreq1 * 1.5;
    const targetCutoff = 300 + clampedRPM * 2200 + (throttle ? 600 : 0);
    const targetGain = 0.15 + (throttle ? 0.25 : 0.08) + speedRatio * 0.12;

    const now = this.ctx.currentTime;
    this.engineOsc1.frequency.setTargetAtTime(targetFreq1, now, 0.05);
    this.engineOsc2.frequency.setTargetAtTime(targetFreq2, now, 0.05);
    this.engineFilter.frequency.setTargetAtTime(targetCutoff, now, 0.05);
    this.engineGain.gain.setTargetAtTime(targetGain, now, 0.04);
  }

  initSkidSynth() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    this.skidFilter = this.ctx.createBiquadFilter();
    this.skidFilter.type = 'bandpass';
    this.skidFilter.frequency.value = 1400;

    this.skidGain = this.ctx.createGain();
    this.skidGain.gain.value = 0.0;

    noise.connect(this.skidFilter);
    this.skidFilter.connect(this.skidGain);
    this.skidGain.connect(this.sfxGain);
    noise.start();
  }

  updateSkid(skidIntensity) {
    if (!this.initialized || !this.skidGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    this.skidGain.gain.setTargetAtTime(Math.min(0.45, Math.max(0.0, skidIntensity * 0.5)), now, 0.05);
  }

  initNitroSynth() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.8;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    this.nitroGain = this.ctx.createGain();
    this.nitroGain.gain.value = 0.0;

    noise.connect(filter);
    filter.connect(this.nitroGain);
    this.nitroGain.connect(this.sfxGain);
    noise.start();
  }

  updateNitro(active) {
    if (!this.initialized || !this.nitroGain || this.isMuted) return;
    this.nitroGain.gain.setTargetAtTime(active ? 0.35 : 0.0, this.ctx.currentTime, 0.08);
  }

  initRainSynth() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0.0;

    noise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.sfxGain);
    noise.start();
  }

  setWeatherAudio(weather) {
    if (!this.initialized || !this.rainGain) return;
    this.rainGain.gain.setTargetAtTime(weather === 'rain' ? 0.22 : 0.0, this.ctx.currentTime, 0.5);
  }

  playCrash(intensity = 1.0) {
    if (!this.initialized || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(Math.min(0.7, 0.2 + intensity * 0.4), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playBeep(type = 'short') {
    if (!this.initialized || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'countdown_low') {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.3, now);
      } else if (type === 'countdown_high') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.45, now);
      } else if (type === 'checkpoint') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.25, now);
      } else if (type === 'lap_complete') {
        osc.frequency.setValueAtTime(1046.50, now);
        gain.gain.setValueAtTime(0.4, now);
      } else {
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.15, now);
      }
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // --- Multi-Station Radio Synthesizer ---
  cycleStation() {
    this.currentStationIndex = (this.currentStationIndex + 1) % RADIO_STATIONS.length;
    if (this.musicPlaying) {
      this.stopMusic();
      this.startMusic();
    }
    return RADIO_STATIONS[this.currentStationIndex];
  }

  getCurrentStation() {
    return RADIO_STATIONS[this.currentStationIndex];
  }

  startMusic() {
    if (this.musicPlaying || !this.ctx) return;
    this.musicPlaying = true;
    this.musicStep = 0;

    const station = RADIO_STATIONS[this.currentStationIndex];
    const stepDuration = 60 / station.tempo / 4;

    const chords = [
      [130.81, 155.56, 196.00],
      [116.54, 138.59, 174.61],
      [103.83, 123.47, 155.56],
      [116.54, 138.59, 174.61]
    ];
    const bassNotes = [65.41, 58.27, 51.91, 58.27];
    const leadNotes = [261.63, 311.13, 392.00, 466.16, 523.25];

    this.musicInterval = setInterval(() => {
      if (!this.musicPlaying || this.isMuted) return;
      const now = this.ctx.currentTime;
      const bar = Math.floor(this.musicStep / 16) % 4;
      const stepInBar = this.musicStep % 16;

      if (stepInBar % 2 === 0) {
        this.playBassNote(bassNotes[bar], now, stepDuration * 1.6);
      }
      if (stepInBar === 0) {
        this.playChord(chords[bar], now, stepDuration * 14);
      }
      if (stepInBar % 4 === 0 || stepInBar % 4 === 2) {
        const leadIdx = (stepInBar * 3 + bar) % leadNotes.length;
        this.playLeadNote(leadNotes[leadIdx], now, stepDuration * 0.8);
      }
      if (stepInBar % 4 === 0) this.playKick(now);
      if (stepInBar % 4 === 2) this.playHiHat(now);
      if (stepInBar === 4 || stepInBar === 12) this.playSnare(now);

      this.musicStep++;
    }, stepDuration * 1000);
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  playBassNote(freq, time, dur) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, time);
    gain.gain.setValueAtTime(0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + dur);
  }

  playChord(freqs, time, dur) {
    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 2, time);
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + dur);
    });
  }

  playLeadNote(freq, time, dur) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.09, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + dur);
  }

  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    osc.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  playSnare(time) {
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
    noise.connect(gain);
    gain.connect(this.musicGain);
    noise.start(time);
  }

  playHiHat(time) {
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6500;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    noise.start(time);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) this.masterGain.gain.value = this.isMuted ? 0 : 0.8;
    return this.isMuted;
  }
}
