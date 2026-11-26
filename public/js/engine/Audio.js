/**
 * Velocity Rush 3D - Audio Engine with Multi-Station Radio & Weather FX
 * Pre-allocated noise buffers & clean pause/idle silencing.
 */

export const RADIO_STATIONS = [
  { id: 'cyberwave', name: '📻 Midnight Synthwave', genre: 'Dark Synthwave', tempo: 126 },
  { id: 'sunset', name: '📻 Golden Sunset Dreams', genre: 'Chill Outrun', tempo: 108 },
  { id: 'dnb', name: '📻 Apex Pulse Bass', genre: 'Fast Neurofunk', tempo: 168 },
  { id: 'romance', name: '🕯️ Velvet Date Acoustic', genre: 'Warm Lo-Fi Acoustic', tempo: 84 }
];

export const LIVE_RADIO_STREAMS = [
  {
    id: 'in_big_fm',
    name: '🔴 BIG 92.7 FM India',
    genre: 'Hindi Bollywood Hits • BIG FM',
    tempo: 112,
    isLive: true,
    streamUrl: 'https://stream.zeno.fm/dbstwo3dvhhtv',
    fallbackUrl: 'https://funasia.streamguys1.com/live4'
  },
  {
    id: 'in_red_fm',
    name: '🔴 RED FM 93.5 / Desi Live',
    genre: 'Bajaate Raho • Hindi & Punjabi FM',
    tempo: 120,
    isLive: true,
    streamUrl: 'https://22253.live.streamtheworld.com/RED_FMAAC.aac',
    fallbackUrl: 'https://ice24.securenetsystems.net/CKYE'
  },
  {
    id: 'in_mirchi_983',
    name: '🔴 Radio Mirchi 98.3 Top 20',
    genre: 'Mirchi Hot Bollywood Chartbusters',
    tempo: 118,
    isLive: true,
    streamUrl: 'https://drive.uber.radio/uber/bollywoodnow/icecast.audio',
    fallbackUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/SFO_HIN_PSTAAC.aac'
  },
  {
    id: 'in_mirchi_love',
    name: '🔴 Mirchi / Bollywood Love FM',
    genre: 'Romantic Hindi & Date Night Hits',
    tempo: 88,
    isLive: true,
    streamUrl: 'https://drive.uber.radio/uber/bollywoodlove/icecast.audio',
    fallbackUrl: 'https://stream.zeno.fm/143d7gty24zuv'
  },
  {
    id: 'in_radio_city',
    name: '🔴 Radio City 91.1 Hindi',
    genre: 'Rag Rag Mein Daude City FM',
    tempo: 114,
    isLive: true,
    streamUrl: 'https://stream.zeno.fm/pxc55r5uyc9uv',
    fallbackUrl: 'https://prclive1.listenon.in/'
  },
  {
    id: 'in_fever_fm',
    name: '🔴 Fever 104 FM / Asian Fever',
    genre: 'Desi Pop & Club Beats',
    tempo: 122,
    isLive: true,
    streamUrl: 'https://radio.canstream.co.uk:8115/live.mp3',
    fallbackUrl: 'https://stream.oye.radio/listen/oye_radio/radio.mp3'
  },
  {
    id: 'in_dil_se',
    name: '🔴 Radio Hungama Bollywood Dil Se',
    genre: 'Soulful Romantic & Melodies',
    tempo: 92,
    isLive: true,
    streamUrl: 'https://stream.zeno.fm/143d7gty24zuv',
    fallbackUrl: 'https://azuracast.vibesounds.in:8010/radio.mp3'
  },
  {
    id: 'in_bollywood_2010s',
    name: '🔴 Bollywood 2010s & Highway Mix',
    genre: 'Arijit, Pritam & Superhit Drive',
    tempo: 108,
    isLive: true,
    streamUrl: 'https://drive.uber.radio/uber/bollywood2010s/icecast.audio',
    fallbackUrl: 'https://drive.uber.radio/uber/bollywood2000s/icecast.audio'
  },
  {
    id: 'in_hindi_gold',
    name: '🔴 Hindi Gold & Purane Gaane',
    genre: 'Evergreen Kishore, Rafi & 90s FM',
    tempo: 96,
    isLive: true,
    streamUrl: 'https://azuracast.vibesounds.in:8010/radio.mp3',
    fallbackUrl: 'https://stream.zeno.fm/6n6ewddtad0uv'
  },
  {
    id: 'in_oye_radio',
    name: '🔴 Oye India FM • Free Top 100',
    genre: '24x7 Hindi & Punjabi Party FM',
    tempo: 124,
    isLive: true,
    streamUrl: 'https://stream.oye.radio/listen/oye_radio/radio.mp3',
    fallbackUrl: 'https://stream.zeno.fm/a5h7vfret68uv'
  },
  {
    id: 'live_groovesalad',
    name: '🔴 Chill Drive Ambient FM',
    genre: 'Global Night Cruise Downtempo',
    tempo: 98,
    isLive: true,
    streamUrl: 'https://ice2.somafm.com/groovesalad-128-mp3',
    fallbackUrl: 'https://ice4.somafm.com/groovesalad-128-mp3'
  }
];

export const ENGINE_SOUND_PROFILES = {
  ferrari_458: {
    label: '4.5L Flat-Plane F136 V8',
    baseHz: 52, maxHz: 238, harmonics: [1.0, 2.0, 3.0, 4.0],
    // Warm resonant flat-plane Italian V8 baritone-tenor (rolled off above 1.4 kHz, zero harsh fuzz)
    periodicAmps: [0, 1.0, 0.72, 0.25, 0.42, 0.14, 0.08],
    subWeight: 0.24, mainWeight: 0.48, harmWeight: 0.30, biteWeight: 0.12,
    drive: 0.85, bodyPeakHz: 580, bodyPeakQ: 1.4, filterBase: 360, filterSpan: 1150,
    valveRpm: 0.58, valveBoostHz: 780, valveBoostGain: 0.08,
    exhaustNoiseGain: 0.09, exhaustNoiseHz: 210,
    intakeGain: 0.05, intakeFreq: 850,
    turboGain: 0.0, bovMode: 'none', evGain: 0.0, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.18, idleRoughness: 0.08, crankPulsesPerRev: 4
  },
  lamborghini_aventador: {
    label: '6.5L L539 NA V12 Flagship',
    baseHz: 46, maxHz: 262, harmonics: [0.5, 1.0, 1.5, 2.5],
    // Rich V12 choir centered in musical 180-1100 Hz resonance without shrill screech
    periodicAmps: [0, 0.92, 0.66, 0.84, 0.36, 0.22, 0.14],
    subWeight: 0.38, mainWeight: 0.50, harmWeight: 0.32, biteWeight: 0.14,
    drive: 1.05, bodyPeakHz: 520, bodyPeakQ: 1.5, filterBase: 320, filterSpan: 1220,
    valveRpm: 0.55, valveBoostHz: 820, valveBoostGain: 0.10,
    exhaustNoiseGain: 0.11, exhaustNoiseHz: 185,
    intakeGain: 0.06, intakeFreq: 760,
    turboGain: 0.0, bovMode: 'none', evGain: 0.0, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.22, idleRoughness: 0.11, crankPulsesPerRev: 6
  },
  bugatti_hyperion: {
    label: '8.0L Quad-Turbo W16 Monster',
    baseHz: 32, maxHz: 182, harmonics: [0.5, 1.0, 1.25, 2.0],
    // Silky massive W16 turbine chest bass + soft air boost rush (no high-pitch sine whistle)
    periodicAmps: [0, 1.0, 0.78, 0.36, 0.18, 0.07],
    subWeight: 0.62, mainWeight: 0.52, harmWeight: 0.20, biteWeight: 0.08,
    drive: 0.80, bodyPeakHz: 290, bodyPeakQ: 1.3, filterBase: 240, filterSpan: 820,
    valveRpm: 0.65, valveBoostHz: 480, valveBoostGain: 0.05,
    exhaustNoiseGain: 0.13, exhaustNoiseHz: 130,
    intakeGain: 0.05, intakeFreq: 680,
    turboGain: 0.045, turboFreqBase: 760, turboFreqSpan: 580, bovMode: 'whoosh',
    evGain: 0.0, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.16, idleRoughness: 0.09, crankPulsesPerRev: 8
  },
  rolls_royce_spectre: {
    label: 'Whisper Dual-Motor Luxury EV',
    baseHz: 46, maxHz: 124, harmonics: [1.0, 2.0, 3.0, 4.0],
    // Whisper-smooth warm luxury electric turbine glide
    periodicAmps: [0, 1.0, 0.16, 0.02],
    subWeight: 0.16, mainWeight: 0.20, harmWeight: 0.05, biteWeight: 0.0,
    drive: 0.25, bodyPeakHz: 340, bodyPeakQ: 0.7, filterBase: 210, filterSpan: 380,
    valveRpm: 1.5, valveBoostHz: 340, valveBoostGain: 0.0,
    exhaustNoiseGain: 0.01, exhaustNoiseHz: 100,
    intakeGain: 0.005, intakeFreq: 420,
    turboGain: 0.0, bovMode: 'none', evGain: 0.04, evFreqBase: 220, evFreqSpan: 240,
    dieselTickGain: 0.0,
    overrunPop: false, shiftPopGain: 0.02, idleRoughness: 0.0, wave1: 'sine', wave2: 'triangle', crankPulsesPerRev: 2
  },
  mclaren_p1: {
    label: '3.8L M838T Twin-Turbo V8 Hybrid',
    baseHz: 44, maxHz: 216, harmonics: [0.5, 1.0, 1.5, 2.0],
    // Deep turbine-muffled V8 punch + soft warm turbo air + mild KERS hum
    periodicAmps: [0, 0.96, 0.64, 0.46, 0.24, 0.10],
    subWeight: 0.36, mainWeight: 0.48, harmWeight: 0.26, biteWeight: 0.11,
    drive: 0.90, bodyPeakHz: 490, bodyPeakQ: 1.4, filterBase: 310, filterSpan: 1020,
    valveRpm: 0.60, valveBoostHz: 700, valveBoostGain: 0.07,
    exhaustNoiseGain: 0.11, exhaustNoiseHz: 175,
    intakeGain: 0.05, intakeFreq: 720,
    turboGain: 0.04, turboFreqBase: 820, turboFreqSpan: 560, bovMode: 'whoosh',
    evGain: 0.03, evFreqBase: 260, evFreqSpan: 340, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.18, idleRoughness: 0.09, crankPulsesPerRev: 4
  },
  mahindra_thar: {
    label: '2.2L mHawk CRDe Turbo-Diesel 4x4',
    baseHz: 25, maxHz: 112, harmonics: [0.5, 1.0, 1.5, 2.0],
    // Deep warm 4x4 diesel compression thrum + gentle low-pass puff (zero harsh high-frequency hiss)
    periodicAmps: [0, 0.95, 0.68, 0.38, 0.18, 0.07],
    subWeight: 0.66, mainWeight: 0.46, harmWeight: 0.20, biteWeight: 0.10,
    drive: 1.10, bodyPeakHz: 205, bodyPeakQ: 1.5, filterBase: 175, filterSpan: 480,
    valveRpm: 1.5, valveBoostHz: 300, valveBoostGain: 0.0,
    exhaustNoiseGain: 0.14, exhaustNoiseHz: 115,
    intakeGain: 0.04, intakeFreq: 380,
    turboGain: 0.035, turboFreqBase: 680, turboFreqSpan: 450, bovMode: 'diesel',
    evGain: 0.0, dieselTickGain: 0.05,
    overrunPop: false, shiftPopGain: 0.08, idleRoughness: 0.24, wave1: 'triangle', wave2: 'sawtooth', crankPulsesPerRev: 2
  },
  mahindra_scorpio: {
    label: '2.2L Big Daddy SUV Torque',
    baseHz: 28, maxHz: 130, harmonics: [0.5, 1.0, 1.5, 2.0],
    periodicAmps: [0, 0.96, 0.65, 0.34, 0.16, 0.06],
    subWeight: 0.56, mainWeight: 0.46, harmWeight: 0.20, biteWeight: 0.09,
    drive: 0.95, bodyPeakHz: 245, bodyPeakQ: 1.4, filterBase: 200, filterSpan: 560,
    valveRpm: 1.5, valveBoostHz: 340, valveBoostGain: 0.0,
    exhaustNoiseGain: 0.12, exhaustNoiseHz: 135,
    intakeGain: 0.04, intakeFreq: 440,
    turboGain: 0.03, turboFreqBase: 720, turboFreqSpan: 480, bovMode: 'whoosh',
    evGain: 0.0, dieselTickGain: 0.03,
    overrunPop: false, shiftPopGain: 0.07, idleRoughness: 0.16, crankPulsesPerRev: 2
  },
  tata_safari: {
    label: '2.0L Kryotec Refined SUV Purr',
    baseHz: 31, maxHz: 142, harmonics: [0.5, 1.0, 2.0, 3.0],
    periodicAmps: [0, 0.98, 0.52, 0.22, 0.09],
    subWeight: 0.48, mainWeight: 0.44, harmWeight: 0.16, biteWeight: 0.06,
    drive: 0.72, bodyPeakHz: 285, bodyPeakQ: 1.2, filterBase: 225, filterSpan: 640,
    valveRpm: 1.5, valveBoostHz: 380, valveBoostGain: 0.0,
    exhaustNoiseGain: 0.10, exhaustNoiseHz: 145,
    intakeGain: 0.035, intakeFreq: 480,
    turboGain: 0.028, turboFreqBase: 760, turboFreqSpan: 480, bovMode: 'whoosh',
    evGain: 0.0, dieselTickGain: 0.015,
    overrunPop: false, shiftPopGain: 0.06, idleRoughness: 0.10, crankPulsesPerRev: 2
  },
  phantom_drift: {
    label: '3.8L VR38 V6 Twin-Turbo',
    baseHz: 40, maxHz: 198, harmonics: [0.5, 1.0, 1.5, 2.0],
    // Warm hollow VR38 V6 baritone + warm mid-band wastegate BOV flutter
    periodicAmps: [0, 0.88, 0.48, 0.76, 0.24, 0.30, 0.10],
    subWeight: 0.46, mainWeight: 0.48, harmWeight: 0.28, biteWeight: 0.12,
    drive: 0.98, bodyPeakHz: 470, bodyPeakQ: 1.5, filterBase: 300, filterSpan: 960,
    valveRpm: 0.56, valveBoostHz: 680, valveBoostGain: 0.08,
    exhaustNoiseGain: 0.12, exhaustNoiseHz: 170,
    intakeGain: 0.055, intakeFreq: 720,
    turboGain: 0.045, turboFreqBase: 800, turboFreqSpan: 580, bovMode: 'flutter',
    evGain: 0.0, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.20, idleRoughness: 0.11, crankPulsesPerRev: 3
  },
  formula_pulse: {
    label: 'Formula V10/GP Musical Scream',
    baseHz: 76, maxHz: 335, harmonics: [1.0, 1.5, 2.0, 3.0],
    // Clean, non-shrill musical Formula engine sweep rolled smoothly below 1.45 kHz
    periodicAmps: [0, 0.88, 0.48, 0.78, 0.26, 0.24, 0.08],
    subWeight: 0.18, mainWeight: 0.52, harmWeight: 0.34, biteWeight: 0.14,
    drive: 0.78, bodyPeakHz: 820, bodyPeakQ: 1.6, filterBase: 460, filterSpan: 1380,
    valveRpm: 0.48, valveBoostHz: 1050, valveBoostGain: 0.09,
    exhaustNoiseGain: 0.08, exhaustNoiseHz: 290,
    intakeGain: 0.055, intakeFreq: 980,
    turboGain: 0.025, turboFreqBase: 920, turboFreqSpan: 520, bovMode: 'none',
    evGain: 0.03, evFreqBase: 320, evFreqSpan: 360, dieselTickGain: 0.0,
    overrunPop: true, shiftPopGain: 0.16, idleRoughness: 0.05, crankPulsesPerRev: 5
  }
};

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.isSfxMuted = false;
    this.isMusicMuted = false;
    this.isMuted = false;
    this.isPaused = false;
    this.volumes = {
      master: 0.75,
      engine: 0.85,
      music: 0.32,
      sfx: 0.85
    };
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;

    this.activeCarId = 'ferrari_458';
    this.engineProfile = ENGINE_SOUND_PROFILES.ferrari_458;
    this.engineSubOsc = null;
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineBiteOsc = null;
    this.subOscGain = null;
    this.mainOscGain = null;
    this.harmOscGain = null;
    this.biteOscGain = null;
    this.engineShaper = null;
    this.engineBodyFilter = null;
    this.engineFilter = null;
    this.engineValveFilter = null;
    this.engineValveGain = null;
    this.engineGain = null;
    this.exhaustNoiseFilter = null;
    this.exhaustNoiseGain = null;
    this.dieselTickFilter = null;
    this.dieselTickGain = null;
    this.intakeFilter = null;
    this.intakeGain = null;
    this.turboOsc = null;
    this.turboGain = null;
    this.evOsc = null;
    this.evGain = null;
    this.windFilter = null;
    this.windGain = null;
    this.hornNodes = null;
    this.hornActive = false;
    this.hornPulseTimer = null;
    this.indicatorMode = 'off';
    this.indicatorTimer = 0;
    this.indicatorPhaseOn = false;
    this.bovNoiseBuffer = null;
    this.wasThrottleActive = false;
    this.turboSpool = 0;
    this.lastPopTime = 0;
    this.lastBovTime = 0;
    this.prevRpmForPop = 0;

    this.skidGain = null;
    this.skidFilter = null;
    this.nitroGain = null;
    this.rainGain = null;

    this.snareBuffer = null;
    this.hihatBuffer = null;

    this.currentStationIndex = 0;
    this.musicPlaying = false;
    this.musicStep = 0;
    this.musicInterval = null;

    // Live FM Streams + Direct Local Device Audio Player (Strictly Mutually Exclusive!)
    this.sourceMode = 'synth'; // 'synth' | 'live' | 'local' | 'custom_url'
    this.activeLiveStation = null;
    this.indiaDirectory = [];
    this.localTracks = [];
    this.localIndex = 0;
    this.customStreamUrl = '';
    this.streamStatus = 'Built-in Synth Radio Ready';
    this.onMusicStateChange = null;
    this.playbackToken = 0;
    this.liveAudio = this.createLiveAudioElement();
    this.localAudio = this.createLocalAudioElement();

    this.initialized = false;
  }

  getActiveMediaElement() {
    if (this.sourceMode === 'local') return this.localAudio;
    if (this.sourceMode === 'live' || this.sourceMode === 'custom_url') return this.liveAudio;
    return null;
  }

  createLiveAudioElement() {
    if (typeof window === 'undefined' || typeof window.Audio !== 'function') return null;
    const el = new window.Audio();
    el.preload = 'none';
    el.addEventListener('playing', () => {
      if (this.sourceMode !== 'live' && this.sourceMode !== 'custom_url') {
        try { el.pause(); el.removeAttribute('src'); } catch (e) { }
        return;
      }
      this.streamStatus = '🟢 LIVE FM CONNECTED';
      this.emitMusicState();
    });
    el.addEventListener('error', () => {
      if (this.sourceMode !== 'live' && this.sourceMode !== 'custom_url') return;
      const tokenSnapshot = this.playbackToken;
      if (this.sourceMode === 'live' && this.activeLiveStation) {
        if (this.activeLiveStation.fallbackUrl && el.src !== this.activeLiveStation.fallbackUrl) {
          this.streamStatus = '🔄 Trying Backup Indian FM Mirror...';
          this.emitMusicState();
          el.src = this.activeLiveStation.fallbackUrl;
          el.play().catch(() => {
            if (tokenSnapshot === this.playbackToken) this.fallbackLiveToSynth(tokenSnapshot);
          });
          return;
        }
        this.fallbackLiveToSynth(tokenSnapshot);
      } else if (this.sourceMode === 'custom_url') {
        this.streamStatus = '⚠️ Custom URL offline/blocked — Synth Backup';
        this.fallbackLiveToSynth(tokenSnapshot);
      }
    });
    return el;
  }

  createLocalAudioElement() {
    if (typeof window === 'undefined' || typeof window.Audio !== 'function') return null;
    const el = new window.Audio();
    el.preload = 'metadata';
    el.addEventListener('ended', () => {
      if (this.sourceMode === 'local' && this.localTracks.length > 0) {
        this.playLocalTrack((this.localIndex + 1) % this.localTracks.length);
      }
    });
    el.addEventListener('playing', () => {
      if (this.sourceMode !== 'local') {
        try { el.pause(); } catch (e) { }
        return;
      }
      // Guarantee FM & Synth never stay active while device music plays
      this.stopLiveElement();
      this.stopSynthLoop();
      this.streamStatus = '🎵 PLAYING FROM DEVICE (FM OFF)';
      this.emitMusicState();
    });
    el.addEventListener('timeupdate', () => {
      if (this.sourceMode === 'local') this.emitMusicState();
    });
    return el;
  }

  fallbackLiveToSynth(tokenSnapshot = this.playbackToken) {
    // NEVER hijack device playback with synth backup if user switched to local songs!
    if (tokenSnapshot !== this.playbackToken || this.sourceMode === 'local') return;
    this.streamStatus = '⚠️ Live FM offline/blocked — Synth Radio Backup';
    this.stopLiveElement();
    this.musicPlaying = false;
    if (this.ctx) {
      this.startSynthMusic(this.activeLiveStation || RADIO_STATIONS[this.currentStationIndex]);
    }
    this.emitMusicState();
  }

  syncMediaVolume() {
    const vol = this.isMusicMuted ? 0 : Math.max(0, Math.min(1, this.volumes.master * this.volumes.music));
    if (this.liveAudio) this.liveAudio.volume = vol;
    if (this.localAudio) this.localAudio.volume = vol;
  }

  emitMusicState() {
    if (typeof this.onMusicStateChange === 'function') {
      this.onMusicStateChange(this.getMusicState());
    }
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volumes.master;
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.isSfxMuted ? 0 : this.volumes.sfx;
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.isMusicMuted ? 0 : this.volumes.music;
      this.musicGain.connect(this.masterGain);

      this.initEngineSynth();
      this.initSkidSynth();
      this.initNitroSynth();
      this.initRainSynth();
      this.initDrumBuffers();

      this.initialized = true;
    } catch (e) {
      console.warn('Audio initialization error:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => { });
    }
  }

  initDrumBuffers() {
    if (!this.ctx) return;
    const snareLen = Math.floor(this.ctx.sampleRate * 0.1);
    this.snareBuffer = this.ctx.createBuffer(1, snareLen, this.ctx.sampleRate);
    const snareData = this.snareBuffer.getChannelData(0);
    for (let i = 0; i < snareLen; i++) {
      snareData[i] = (Math.random() * 2 - 1) * (1 - i / snareLen);
    }

    const hihatLen = Math.floor(this.ctx.sampleRate * 0.04);
    this.hihatBuffer = this.ctx.createBuffer(1, hihatLen, this.ctx.sampleRate);
    const hihatData = this.hihatBuffer.getChannelData(0);
    for (let i = 0; i < hihatLen; i++) {
      hihatData[i] = Math.random() * 2 - 1;
    }
  }

  makeExhaustCurve(drive = 0.85) {
    const n = 256;
    const curve = new Float32Array(n);
    const k = Math.max(0.25, drive * 2.2);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      // Soft warm tube tanh curve with zero harsh high-frequency clipping buzz
      curve[i] = Math.tanh(k * (x + 0.04 * x * x)) / Math.tanh(k);
    }
    return curve;
  }

  initEngineSynth() {
    if (!this.ctx) return;
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.value = 0.0;

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 450;
    this.engineFilter.Q.value = 1.4;

    this.engineBodyFilter = this.ctx.createBiquadFilter();
    this.engineBodyFilter.type = 'peaking';
    this.engineBodyFilter.frequency.value = this.engineProfile.bodyPeakHz || 750;
    this.engineBodyFilter.Q.value = this.engineProfile.bodyPeakQ || 2.0;
    this.engineBodyFilter.gain.value = 6.5;

    this.engineValveFilter = this.ctx.createBiquadFilter();
    this.engineValveFilter.type = 'bandpass';
    this.engineValveFilter.frequency.value = 1400;
    this.engineValveFilter.Q.value = 1.6;
    this.engineValveGain = this.ctx.createGain();
    this.engineValveGain.gain.value = 0.0;

    this.engineShaper = this.ctx.createWaveShaper();
    this.engineShaper.curve = this.makeExhaustCurve(this.engineProfile.drive || 2.6);
    this.engineShaper.oversample = '2x';

    this.engineSubOsc = this.ctx.createOscillator();
    this.engineSubOsc.type = 'triangle';
    this.engineSubOsc.frequency.value = 35;

    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = this.engineProfile.wave1 || 'sawtooth';
    this.engineOsc1.frequency.value = 55;

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = this.engineProfile.wave2 || 'sawtooth';
    this.engineOsc2.frequency.value = 110;

    this.engineBiteOsc = this.ctx.createOscillator();
    this.engineBiteOsc.type = 'triangle';
    this.engineBiteOsc.frequency.value = 165;

    this.subOscGain = this.ctx.createGain();
    this.mainOscGain = this.ctx.createGain();
    this.harmOscGain = this.ctx.createGain();
    this.biteOscGain = this.ctx.createGain();

    this.engineSubOsc.connect(this.subOscGain);
    this.engineOsc1.connect(this.mainOscGain);
    this.engineOsc2.connect(this.harmOscGain);
    this.engineBiteOsc.connect(this.biteOscGain);

    this.subOscGain.connect(this.engineShaper);
    this.mainOscGain.connect(this.engineShaper);
    this.harmOscGain.connect(this.engineShaper);
    this.biteOscGain.connect(this.engineShaper);

    this.engineShaper.connect(this.engineBodyFilter);
    this.engineBodyFilter.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    // Parallel sports exhaust valve resonance path (opens at high RPM under throttle)
    this.engineShaper.connect(this.engineValveFilter);
    this.engineValveFilter.connect(this.engineValveGain);
    this.engineValveGain.connect(this.sfxGain);
    this.engineGain.connect(this.sfxGain);

    // Warm exhaust combustion puff + intake airbox + CRDe diesel injector clatter + high-speed wind noise
    const noiseLen = Math.floor(this.ctx.sampleRate * 1.5);
    const noiseBuf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const nData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) nData[i] = Math.random() * 2 - 1;
    this.bovNoiseBuffer = noiseBuf;

    const intakeSrc = this.ctx.createBufferSource();
    intakeSrc.buffer = noiseBuf;
    intakeSrc.loop = true;
    this.intakeFilter = this.ctx.createBiquadFilter();
    this.intakeFilter.type = 'bandpass';
    this.intakeFilter.frequency.value = 1000;
    this.intakeFilter.Q.value = 1.6;
    this.intakeGain = this.ctx.createGain();
    this.intakeGain.gain.value = 0.0;
    intakeSrc.connect(this.intakeFilter);
    this.intakeFilter.connect(this.intakeGain);
    this.intakeGain.connect(this.sfxGain);

    const exhaustNoiseSrc = this.ctx.createBufferSource();
    exhaustNoiseSrc.buffer = noiseBuf;
    exhaustNoiseSrc.loop = true;
    this.exhaustNoiseFilter = this.ctx.createBiquadFilter();
    this.exhaustNoiseFilter.type = 'bandpass';
    this.exhaustNoiseFilter.frequency.value = 190;
    this.exhaustNoiseFilter.Q.value = 1.1;
    this.exhaustNoiseGain = this.ctx.createGain();
    this.exhaustNoiseGain.gain.value = 0.0;
    exhaustNoiseSrc.connect(this.exhaustNoiseFilter);
    this.exhaustNoiseFilter.connect(this.exhaustNoiseGain);
    this.exhaustNoiseGain.connect(this.sfxGain);

    const dieselSrc = this.ctx.createBufferSource();
    dieselSrc.buffer = noiseBuf;
    dieselSrc.loop = true;
    this.dieselTickFilter = this.ctx.createBiquadFilter();
    this.dieselTickFilter.type = 'bandpass';
    this.dieselTickFilter.frequency.value = 460;
    this.dieselTickFilter.Q.value = 1.8;
    this.dieselTickGain = this.ctx.createGain();
    this.dieselTickGain.gain.value = 0.0;
    dieselSrc.connect(this.dieselTickFilter);
    this.dieselTickFilter.connect(this.dieselTickGain);
    this.dieselTickGain.connect(this.sfxGain);

    const windSrc = this.ctx.createBufferSource();
    windSrc.buffer = noiseBuf;
    windSrc.loop = true;
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 480;
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.0;
    windSrc.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.sfxGain);

    // Filtered soft turbo air spool (warm rush, ZERO piercing sine whistle!) + gentle EV hum
    const turboAirSrc = this.ctx.createBufferSource();
    turboAirSrc.buffer = noiseBuf;
    turboAirSrc.loop = true;
    this.turboOsc = this.ctx.createBiquadFilter(); // bandpass frequency sweeper for soft turbo rush
    this.turboOsc.type = 'bandpass';
    this.turboOsc.frequency.value = 820;
    this.turboOsc.Q.value = 2.6;
    this.turboGain = this.ctx.createGain();
    this.turboGain.gain.value = 0.0;
    turboAirSrc.connect(this.turboOsc);
    this.turboOsc.connect(this.turboGain);
    this.turboGain.connect(this.sfxGain);

    this.evOsc = this.ctx.createOscillator();
    this.evOsc.type = 'sine';
    this.evOsc.frequency.value = 240;
    this.evGain = this.ctx.createGain();
    this.evGain.gain.value = 0.0;
    this.evOsc.connect(this.evGain);
    this.evGain.connect(this.sfxGain);

    this.engineSubOsc.start();
    this.engineOsc1.start();
    this.engineOsc2.start();
    this.engineBiteOsc.start();
    intakeSrc.start();
    exhaustNoiseSrc.start();
    dieselSrc.start();
    windSrc.start();
    turboAirSrc.start();
    this.evOsc.start();

    this.applyEngineProfileNodes();
  }

  setCarProfile(carId = 'ferrari_458') {
    const resolved = ENGINE_SOUND_PROFILES[carId] || ENGINE_SOUND_PROFILES.ferrari_458;
    this.activeCarId = ENGINE_SOUND_PROFILES[carId] ? carId : 'ferrari_458';
    this.engineProfile = resolved;
    this.turboSpool = 0;
    this.applyEngineProfileNodes();
    return this.engineProfile;
  }

  getCarProfile() {
    return this.engineProfile;
  }

  applyEngineProfileNodes() {
    if (!this.ctx || !this.engineProfile) return;
    const p = this.engineProfile;
    const now = this.ctx.currentTime;
    try {
      if (typeof this.ctx.createPeriodicWave === 'function' && Array.isArray(p.periodicAmps) && p.periodicAmps.length > 1) {
        const real = new Float32Array(p.periodicAmps.length);
        const imag = new Float32Array(p.periodicAmps);
        const wave = this.ctx.createPeriodicWave(real, imag, { disableNormalization: false });
        if (this.engineOsc1?.setPeriodicWave) this.engineOsc1.setPeriodicWave(wave);
        if (this.engineOsc2?.setPeriodicWave && !p.wave2) this.engineOsc2.setPeriodicWave(wave);
      } else {
        if (this.engineOsc1) this.engineOsc1.type = p.wave1 || 'sawtooth';
        if (this.engineOsc2) this.engineOsc2.type = p.wave2 || 'sawtooth';
      }
      if (this.engineShaper) this.engineShaper.curve = this.makeExhaustCurve(p.drive || 2.6);
      if (this.engineBodyFilter) {
        this.engineBodyFilter.frequency.setTargetAtTime(p.bodyPeakHz || 750, now, 0.04);
        this.engineBodyFilter.Q.setTargetAtTime(p.bodyPeakQ || 2.0, now, 0.04);
      }
      if (this.engineValveFilter) {
        this.engineValveFilter.frequency.setTargetAtTime(p.valveBoostHz || 1200, now, 0.04);
      }
      if (this.exhaustNoiseFilter) {
        this.exhaustNoiseFilter.frequency.setTargetAtTime(p.exhaustNoiseHz || 190, now, 0.04);
      }
      if (this.subOscGain) this.subOscGain.gain.setTargetAtTime(p.subWeight ?? 0.35, now, 0.04);
      if (this.mainOscGain) this.mainOscGain.gain.setTargetAtTime(p.mainWeight ?? 0.45, now, 0.04);
      if (this.harmOscGain) this.harmOscGain.gain.setTargetAtTime(p.harmWeight ?? 0.30, now, 0.04);
      if (this.biteOscGain) this.biteOscGain.gain.setTargetAtTime(p.biteWeight ?? 0.22, now, 0.04);
    } catch (e) { }
  }

  playBlowOffValve(mode = 'whoosh') {
    if (!this.initialized || !this.bovNoiseBuffer || this.isSfxMuted || mode === 'none') return;
    const nowMs = performance.now();
    if (nowMs - this.lastBovTime < 280) return;
    this.lastBovTime = nowMs;
    try {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.bovNoiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = mode === 'flutter' ? 2.4 : 1.3;
      bp.frequency.setValueAtTime(mode === 'flutter' ? 1250 : 1050, now);
      bp.frequency.exponentialRampToValueAtTime(mode === 'diesel' ? 460 : 620, now + 0.24);

      const g = this.ctx.createGain();
      const baseVol = 0.09 * this.volumes.engine;
      if (mode === 'flutter') {
        g.gain.setValueAtTime(0.001, now);
        [0.01, 0.07, 0.14, 0.21].forEach((off, idx) => {
          const peak = baseVol * Math.pow(0.72, idx);
          g.gain.linearRampToValueAtTime(peak, now + off);
          g.gain.exponentialRampToValueAtTime(0.005, now + off + 0.045);
        });
      } else {
        g.gain.setValueAtTime(baseVol, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      }
      src.connect(bp);
      bp.connect(g);
      g.connect(this.sfxGain);
      src.start(now);
      src.stop(now + 0.28);
    } catch (e) { }
  }

  playExhaustPop() {
    if (!this.initialized || !this.bovNoiseBuffer || this.isSfxMuted) return;
    const nowMs = performance.now();
    if (nowMs - this.lastPopTime < 140) return;
    this.lastPopTime = nowMs;
    try {
      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.bovNoiseBuffer;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(520 + Math.random() * 420, now);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime((this.engineProfile?.shiftPopGain || 0.2) * this.volumes.engine, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
      src.connect(lp);
      lp.connect(g);
      g.connect(this.sfxGain);
      src.start(now);
      src.stop(now + 0.09);
    } catch (e) { }
  }

  playRevPreview(carId = this.activeCarId) {
    this.setCarProfile(carId);
    if (!this.initialized || !this.ctx || this.isSfxMuted) return;
    this.resume();
    try {
      const now = this.ctx.currentTime;
      const p = this.engineProfile;
      const hs = p.harmonics || [0.5, 1, 2, 3];
      const baseLow = p.baseHz * 1.15;
      const revPeak = p.baseHz + (p.maxHz - p.baseHz) * 0.72;
      const oscPairs = [
        [this.engineSubOsc, hs[0]],
        [this.engineOsc1, hs[1]],
        [this.engineOsc2, hs[2]],
        [this.engineBiteOsc, hs[3]]
      ];
      oscPairs.forEach(([osc, mult]) => {
        if (!osc) return;
        osc.frequency.setValueAtTime(Math.max(18, baseLow * mult), now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(24, revPeak * mult), now + 0.18);
        osc.frequency.exponentialRampToValueAtTime(Math.max(18, baseLow * mult), now + 0.52);
      });
      if (this.engineFilter) {
        this.engineFilter.frequency.setValueAtTime(p.filterBase, now);
        this.engineFilter.frequency.exponentialRampToValueAtTime(p.filterBase + p.filterSpan * 0.78, now + 0.18);
        this.engineFilter.frequency.exponentialRampToValueAtTime(p.filterBase, now + 0.52);
      }
      if (this.engineGain) {
        this.engineGain.gain.setValueAtTime(0.001, now);
        this.engineGain.gain.linearRampToValueAtTime(0.28 * this.volumes.engine, now + 0.14);
        this.engineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      }
      if (this.exhaustNoiseGain) {
        this.exhaustNoiseGain.gain.setValueAtTime(0.001, now);
        this.exhaustNoiseGain.gain.linearRampToValueAtTime((p.exhaustNoiseGain || 0.12) * 0.65 * this.volumes.engine, now + 0.14);
        this.exhaustNoiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
      }
      if (this.dieselTickGain && (p.dieselTickGain || 0) > 0) {
        this.dieselTickGain.gain.setValueAtTime(p.dieselTickGain * 0.6 * this.volumes.engine, now);
        this.dieselTickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.50);
      }
      if (p.turboGain > 0.12) {
        setTimeout(() => this.playBlowOffValve(p.bovMode), 200);
      } else if (p.overrunPop) {
        setTimeout(() => this.playExhaustPop(), 220);
      }
    } catch (e) { }
  }

  setVolumes({ master, engine, music, sfx } = {}) {
    if (master !== undefined) this.volumes.master = Math.max(0, Math.min(1, Number(master)));
    if (engine !== undefined) this.volumes.engine = Math.max(0, Math.min(1, Number(engine)));
    if (music !== undefined) this.volumes.music = Math.max(0, Math.min(1, Number(music)));
    if (sfx !== undefined) this.volumes.sfx = Math.max(0, Math.min(1, Number(sfx)));
    if (this.masterGain) this.masterGain.gain.value = this.volumes.master;
    if (this.musicGain) this.musicGain.gain.value = this.isMusicMuted ? 0 : this.volumes.music;
    if (this.sfxGain) this.sfxGain.gain.value = this.isSfxMuted ? 0 : this.volumes.sfx;
    this.syncMediaVolume();
  }

  updateEngine(rpmRatio, throttle, speedRatio, carId = null, boostPsi = 0) {
    if (carId && carId !== this.activeCarId) {
      this.setCarProfile(carId);
    }
    if (!this.initialized || !this.engineOsc1 || this.isSfxMuted || this.isPaused) return;

    const p = this.engineProfile || ENGINE_SOUND_PROFILES.ferrari_458;
    const clampedRPM = Math.max(0.08, Math.min(1.05, rpmRatio || 0.12));
    const thrOn = typeof throttle === 'number' ? throttle > 0.08 : !!throttle;
    const thrAmt = typeof throttle === 'number' ? Math.max(0, Math.min(1, throttle)) : (thrOn ? 1 : 0);

    // Real cylinder firing pulsation & crank chug modulation (audible diesel chug / V8 burble at idle/low RPM)
    const nowMs = performance.now();
    const pulsesPerSec = Math.max(8, ((950 + clampedRPM * 7200) / 60) * ((p.crankPulsesPerRev || 4) * 0.5));
    const pulseWave = Math.sin((nowMs * 0.001) * pulsesPerSec * Math.PI * 0.35);
    const camJitter = p.idleRoughness
      ? pulseWave * p.idleRoughness * (1 - Math.min(0.82, clampedRPM)) * 5.2
      : 0;
    const coreHz = p.baseHz + Math.pow(clampedRPM, 1.04) * (p.maxHz - p.baseHz) + camJitter;
    const hs = p.harmonics || [0.5, 1.0, 2.0, 3.0];

    const now = this.ctx.currentTime;
    if (this.engineSubOsc) this.engineSubOsc.frequency.setTargetAtTime(Math.max(18, coreHz * hs[0]), now, 0.04);
    this.engineOsc1.frequency.setTargetAtTime(Math.max(24, coreHz * hs[1]), now, 0.04);
    if (this.engineOsc2) this.engineOsc2.frequency.setTargetAtTime(Math.max(36, coreHz * hs[2]), now, 0.04);
    if (this.engineBiteOsc) this.engineBiteOsc.frequency.setTargetAtTime(Math.max(48, coreHz * hs[3]), now, 0.04);

    const targetCutoff = p.filterBase + clampedRPM * p.filterSpan + thrAmt * 920;
    const baseGain = p.evGain > 0.03 ? 0.045 : 0.075;
    const pulseAm = 1.0 + (p.idleRoughness || 0) * 0.28 * pulseWave * (1 - Math.min(0.75, clampedRPM));
    const targetGain = (baseGain + thrAmt * 0.14 + Math.min(0.06, (speedRatio || 0) * 0.06)) * pulseAm * this.volumes.engine;

    this.engineFilter.frequency.setTargetAtTime(targetCutoff, now, 0.04);
    this.engineGain.gain.setTargetAtTime(Math.max(0.01, targetGain), now, 0.04);

    // Active Exhaust Valve Flip (snaps open above valveRpm under load for Ferrari/Lambo/F1 roar)
    if (this.engineValveGain) {
      const valveOpen = (p.valveBoostGain || 0) > 0 && clampedRPM > (p.valveRpm || 0.6) && thrOn;
      const vGain = valveOpen ? p.valveBoostGain * thrAmt * ((clampedRPM - p.valveRpm) / 0.45) * this.volumes.engine : 0.0;
      this.engineValveGain.gain.setTargetAtTime(Math.min(0.32, vGain), now, 0.06);
    }

    // Mechanical exhaust turbulence grain + direct-injection diesel clatter (Thar/Scorpio/Safari)
    if (this.exhaustNoiseGain && this.exhaustNoiseFilter) {
      const exhNoiseLvl = (p.exhaustNoiseGain || 0.14) * (0.35 + thrAmt * 0.65) * (0.35 + 0.65 * clampedRPM) * pulseAm * this.volumes.engine;
      this.exhaustNoiseFilter.frequency.setTargetAtTime((p.exhaustNoiseHz || 190) * (0.75 + clampedRPM * 1.15), now, 0.05);
      this.exhaustNoiseGain.gain.setTargetAtTime(Math.max(0, exhNoiseLvl), now, 0.05);
    }
    if (this.dieselTickGain) {
      const dieselLvl = (p.dieselTickGain || 0) > 0
        ? p.dieselTickGain * (0.45 + 0.55 * (1 - Math.min(0.65, clampedRPM))) * (0.7 + 0.3 * Math.max(0, pulseWave)) * this.volumes.engine
        : 0;
      this.dieselTickGain.gain.setTargetAtTime(dieselLvl, now, 0.04);
    }

    // Intake air rush
    if (this.intakeGain && this.intakeFilter) {
      const intakeLvl = (p.intakeGain || 0.1) * (0.18 + thrAmt * 0.82) * Math.min(1, 0.25 + clampedRPM) * this.volumes.engine;
      this.intakeFilter.frequency.setTargetAtTime((p.intakeFreq || 1000) * (0.65 + clampedRPM * 0.85), now, 0.05);
      this.intakeGain.gain.setTargetAtTime(intakeLvl, now, 0.05);
    }

    // Turbo spool & Blow-Off Valve lift-off flutter
    const boostNorm = Math.max(thrAmt * clampedRPM, Math.min(1, (boostPsi || 0) / 22));
    if (p.turboGain > 0) {
      this.turboSpool = this.turboSpool + (boostNorm - this.turboSpool) * 0.14;
      if (this.turboOsc && this.turboGain) {
        const tFreq = (p.turboFreqBase || 1900) + this.turboSpool * (p.turboFreqSpan || 3600);
        this.turboOsc.frequency.setTargetAtTime(tFreq, now, 0.05);
        this.turboGain.gain.setTargetAtTime(p.turboGain * Math.pow(this.turboSpool, 1.35) * 0.45 * this.volumes.engine, now, 0.06);
      }
      if (this.wasThrottleActive && !thrOn && this.turboSpool > 0.36 && p.bovMode !== 'none') {
        this.playBlowOffValve(p.bovMode);
      }
    } else if (this.turboGain) {
      this.turboGain.gain.setTargetAtTime(0, now, 0.05);
    }

    // Electric / Hybrid MGU-K whine & Racing Straight-Cut Gearbox Whine & High-Speed Wind
    if (this.evOsc && this.evGain) {
      if (p.evGain > 0) {
        const evHz = (p.evFreqBase || 420) + Math.min(1.5, speedRatio || 0) * (p.evFreqSpan || 1400);
        this.evOsc.frequency.setTargetAtTime(evHz, now, 0.04);
        this.evGain.gain.setTargetAtTime(p.evGain * (0.25 + Math.min(0.75, (speedRatio || 0) * 0.85)) * 0.45 * this.volumes.engine, now, 0.05);
      } else {
        this.evGain.gain.setTargetAtTime(0, now, 0.05);
      }
    }
    if (this.windGain && this.windFilter) {
      const spd = Math.max(0, Math.min(1.2, speedRatio || 0));
      const windLvl = Math.pow(spd, 1.7) * 0.14 * this.volumes.engine;
      this.windFilter.frequency.setTargetAtTime(420 + spd * 1150, now, 0.06);
      this.windGain.gain.setTargetAtTime(windLvl, now, 0.06);
    }

    // High-RPM throttle lift-off overrun exhaust crackle
    if (p.overrunPop && this.wasThrottleActive && !thrOn && clampedRPM > 0.48) {
      this.playExhaustPop();
    }
    this.wasThrottleActive = thrOn;
    this.prevRpmForPop = clampedRPM;
  }

  silenceDrivingLoops() {
    this.stopHorn();
    if (!this.initialized || !this.ctx) return;
    const now = this.ctx.currentTime;
    [
      this.engineGain, this.engineValveGain, this.exhaustNoiseGain, this.dieselTickGain,
      this.intakeGain, this.turboGain, this.evGain,
      this.windGain, this.skidGain, this.nitroGain
    ].forEach((node) => {
      if (node) node.gain.setTargetAtTime(0.0, now, 0.05);
    });
  }

  setPaused(paused) {
    this.isPaused = !!paused;
    const activeEl = this.getActiveMediaElement();
    if (this.isPaused) {
      this.silenceDrivingLoops();
      if (activeEl && !activeEl.paused) {
        activeEl.pause();
      }
    } else if (this.musicPlaying && activeEl && activeEl.paused) {
      activeEl.play().catch(() => { });
    }
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
    this.skidFilter.frequency.value = 720;
    this.skidFilter.Q.value = 1.2;

    this.skidGain = this.ctx.createGain();
    this.skidGain.gain.value = 0.0;

    noise.connect(this.skidFilter);
    this.skidFilter.connect(this.skidGain);
    this.skidGain.connect(this.sfxGain);
    noise.start();
  }

  updateSkid(skidIntensity) {
    if (!this.initialized || !this.skidGain || this.isSfxMuted || this.isPaused) return;
    const now = this.ctx.currentTime;
    this.skidGain.gain.setTargetAtTime(Math.min(0.20, Math.max(0.0, skidIntensity * 0.22)), now, 0.05);
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
    if (!this.initialized || !this.nitroGain || this.isSfxMuted || this.isPaused) return;
    this.nitroGain.gain.setTargetAtTime(active ? 0.32 : 0.0, this.ctx.currentTime, 0.08);
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
    this.rainGain.gain.setTargetAtTime(weather === 'rain' ? 0.2 : 0.0, this.ctx.currentTime, 0.5);
  }

  playCrash(intensity = 1.0) {
    if (!this.initialized || this.isSfxMuted) return;
    const lvl = Math.min(1.0, Math.max(0.25, intensity));
    try {
      const now = this.ctx.currentTime;
      // 1. Deep heavy bodywork chassis thud
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(115, now);
      sub.frequency.exponentialRampToValueAtTime(28, now + 0.34);
      subGain.gain.setValueAtTime(0.45 * lvl, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      sub.connect(subGain);
      subGain.connect(this.sfxGain);
      sub.start(now);
      sub.stop(now + 0.42);

      // 2. Crisp metal crunch + debris scatter burst
      if (this.bovNoiseBuffer) {
        const crunch = this.ctx.createBufferSource();
        crunch.buffer = this.bovNoiseBuffer;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.Q.value = 0.9;
        bp.frequency.setValueAtTime(980, now);
        bp.frequency.exponentialRampToValueAtTime(220, now + 0.42);
        const cg = this.ctx.createGain();
        cg.gain.setValueAtTime(0.42 * lvl, now);
        cg.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
        crunch.connect(bp);
        bp.connect(cg);
        cg.connect(this.sfxGain);
        crunch.start(now);
        crunch.stop(now + 0.46);
      }
    } catch (e) { }
  }

  playShift(isDownshift = false) {
    if (!this.initialized || this.isSfxMuted) return;
    const p = this.engineProfile || ENGINE_SOUND_PROFILES.ferrari_458;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const startHz = isDownshift ? Math.min(180, p.baseHz * 3.2) : Math.min(130, p.baseHz * 2.2);
      const endHz = isDownshift ? 72 : 52;
      osc.frequency.setValueAtTime(Math.max(45, startHz), now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(35, endHz), now + 0.08);
      const shiftVol = p.evGain > 0.03 ? 0.025 : (0.10 * this.volumes.engine);
      gain.gain.setValueAtTime(shiftVol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.1);

      if (p.bovMode && p.bovMode !== 'none' && !isDownshift && this.turboSpool > 0.28) {
        this.playBlowOffValve(p.bovMode);
      } else if (p.overrunPop && isDownshift) {
        this.playExhaustPop();
      }
    } catch (e) { }
  }

  playBeep(type = 'short') {
    if (!this.initialized || this.isSfxMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'countdown_low') {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.28, now);
      } else if (type === 'countdown_high') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.4, now);
      } else if (type === 'checkpoint') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.22, now);
      } else if (type === 'lap_complete') {
        osc.frequency.setValueAtTime(1046.50, now);
        gain.gain.setValueAtTime(0.35, now);
      } else {
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.15, now);
      }
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) { }
  }

  getHornFrequencies() {
    const id = this.activeCarId || 'ferrari_458';
    if (id.includes('thar') || id.includes('scorpio') || id.includes('safari')) {
      return [330, 415]; // Deep SUV dual-shell horn
    }
    if (id.includes('rolls_royce')) {
      return [370, 466]; // Warm dignified grand-tourer chord
    }
    if (id.includes('phantom')) {
      return [400, 495]; // Crisp JDM dual-disc horn
    }
    return [420, 525]; // Italian/European GT dual-tone Fiamm horn
  }

  startHorn() {
    if (this.hornPulseTimer) {
      clearTimeout(this.hornPulseTimer);
      this.hornPulseTimer = null;
    }
    if (!this.initialized) this.init();
    if (!this.ctx || !this.sfxGain || this.isSfxMuted || this.isPaused || this.hornActive) return;
    if (this.ctx.state === 'suspended') this.ctx.resume?.().catch?.(() => { });
    try {
      const now = this.ctx.currentTime;
      const [f1, f2] = this.getHornFrequencies();
      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      const oscSub = this.ctx.createOscillator();
      const lp = this.ctx.createBiquadFilter();
      const masterHornGain = this.ctx.createGain();

      oscA.type = 'sawtooth';
      oscB.type = 'sawtooth';
      oscSub.type = 'triangle';
      oscA.frequency.setValueAtTime(f1, now);
      oscB.frequency.setValueAtTime(f2, now);
      oscSub.frequency.setValueAtTime(f1 * 0.5, now);

      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(1650, now);
      lp.Q.value = 1.15;

      masterHornGain.gain.setValueAtTime(0.001, now);
      masterHornGain.gain.exponentialRampToValueAtTime(0.21, now + 0.018);

      oscA.connect(lp);
      oscB.connect(lp);
      oscSub.connect(lp);
      lp.connect(masterHornGain);
      masterHornGain.connect(this.sfxGain);

      oscA.start(now);
      oscB.start(now);
      oscSub.start(now);

      this.hornActive = true;
      this.hornNodes = { oscA, oscB, oscSub, masterHornGain };
    } catch (e) { }
  }

  stopHorn() {
    if (this.hornPulseTimer) {
      clearTimeout(this.hornPulseTimer);
      this.hornPulseTimer = null;
    }
    if (!this.hornNodes) {
      this.hornActive = false;
      return;
    }
    const { oscA, oscB, oscSub, masterHornGain } = this.hornNodes;
    this.hornNodes = null;
    this.hornActive = false;
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      masterHornGain.gain.cancelScheduledValues(now);
      masterHornGain.gain.setValueAtTime(Math.max(0.001, masterHornGain.gain.value || 0.15), now);
      masterHornGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.065);
      const stopAt = now + 0.075;
      oscA.stop(stopAt);
      oscB.stop(stopAt);
      oscSub.stop(stopAt);
    } catch (e) { }
  }

  playHornPulse(durationMs = 240) {
    this.startHorn();
    this.hornPulseTimer = setTimeout(() => {
      this.hornPulseTimer = null;
      this.stopHorn();
    }, Math.max(90, durationMs));
  }

  playIndicatorTick(phaseOn = true) {
    if (!this.initialized || !this.ctx || !this.sfxGain || this.isSfxMuted || this.isPaused) return;
    if (this.ctx.state === 'suspended') this.ctx.resume?.().catch?.(() => { });
    try {
      const now = this.ctx.currentTime;
      // Layer 1: Warm mechanical solenoid relay body click
      const relayOsc = this.ctx.createOscillator();
      const relayGain = this.ctx.createGain();
      relayOsc.type = 'triangle';
      relayOsc.frequency.setValueAtTime(phaseOn ? 1120 : 840, now);
      relayOsc.frequency.exponentialRampToValueAtTime(phaseOn ? 390 : 280, now + 0.018);
      relayGain.gain.setValueAtTime(phaseOn ? 0.22 : 0.16, now);
      relayGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
      relayOsc.connect(relayGain);
      relayGain.connect(this.sfxGain);
      relayOsc.start(now);
      relayOsc.stop(now + 0.026);

      // Layer 2: Tactile dash switch snap transient
      if (this.bovNoiseBuffer) {
        const snap = this.ctx.createBufferSource();
        snap.buffer = this.bovNoiseBuffer;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = phaseOn ? 1650 : 1220;
        bp.Q.value = 1.6;
        const sg = this.ctx.createGain();
        sg.gain.setValueAtTime(phaseOn ? 0.13 : 0.09, now);
        sg.gain.exponentialRampToValueAtTime(0.001, now + 0.014);
        snap.connect(bp);
        bp.connect(sg);
        sg.connect(this.sfxGain);
        snap.start(now);
        snap.stop(now + 0.018);
      }
    } catch (e) { }
  }

  setIndicatorMode(mode = 'off') {
    const valid = (mode === 'left' || mode === 'right' || mode === 'hazard') ? mode : 'off';
    this.indicatorMode = valid;
    this.indicatorTimer = 0;
    if (valid === 'off') {
      this.indicatorPhaseOn = false;
      return false;
    }
    this.indicatorPhaseOn = true;
    if (!this.initialized) this.init();
    this.playIndicatorTick(true);
    return true;
  }

  updateIndicatorFx(dt) {
    if (this.indicatorMode === 'off' || this.isPaused) {
      this.indicatorPhaseOn = false;
      return { mode: this.indicatorMode, phaseOn: false };
    }
    this.indicatorTimer += dt;
    if (this.indicatorTimer >= 0.40) {
      this.indicatorTimer -= 0.40;
      this.indicatorPhaseOn = !this.indicatorPhaseOn;
      this.playIndicatorTick(this.indicatorPhaseOn);
    }
    return { mode: this.indicatorMode, phaseOn: this.indicatorPhaseOn };
  }

  hasCustomMusicActive() {
    return this.sourceMode === 'local' || this.sourceMode === 'live' || this.sourceMode === 'custom_url';
  }

  stopLiveElement() {
    if (!this.liveAudio) return;
    try {
      this.liveAudio.pause();
      this.liveAudio.removeAttribute('src');
      if (typeof this.liveAudio.load === 'function') this.liveAudio.load();
    } catch (e) { }
  }

  stopLocalElement() {
    if (!this.localAudio) return;
    try {
      this.localAudio.pause();
      this.localAudio.removeAttribute('src');
      if (typeof this.localAudio.load === 'function') this.localAudio.load();
    } catch (e) { }
  }

  stopAllMusicChannels() {
    this.playbackToken++;
    this.musicPlaying = false;
    this.stopSynthLoop();
    this.stopLiveElement();
    this.stopLocalElement();
    this.activeLiveStation = null;
  }

  stopMediaElement(clearSrc = true) {
    if (clearSrc) {
      this.stopLiveElement();
      this.stopLocalElement();
    } else {
      try { this.liveAudio?.pause(); } catch (e) { }
      try { this.localAudio?.pause(); } catch (e) { }
    }
  }

  stopSynthLoop() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  setIndiaDirectory(stations = []) {
    this.indiaDirectory = Array.isArray(stations) ? stations : [];
  }

  addLocalFiles(fileList) {
    if (!fileList || !fileList.length) return this.localTracks;
    const prevLen = this.localTracks.length;
    const files = Array.from(fileList).filter((f) => {
      const n = (f.name || '').toLowerCase();
      return (f.type && f.type.startsWith('audio/')) || /\.(mp3|wav|ogg|m4a|aac|flac|webm|opus)$/.test(n);
    });
    files.forEach((file) => {
      const url = typeof URL !== 'undefined' && URL.createObjectURL ? URL.createObjectURL(file) : `file://${file.name}`;
      const sizeMb = file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'Local';
      this.localTracks.push({
        id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: (file.name || 'Track').replace(/\.[^.]+$/, ''),
        sizeLabel: sizeMb,
        url,
        isLocal: true
      });
    });
    if (this.localTracks.length > prevLen) {
      this.playLocalTrack(prevLen);
    }
    this.emitMusicState();
    return this.localTracks;
  }

  removeLocalTrack(index) {
    if (index < 0 || index >= this.localTracks.length) return;
    const [removed] = this.localTracks.splice(index, 1);
    if (removed?.url && typeof URL !== 'undefined' && URL.revokeObjectURL) {
      try { URL.revokeObjectURL(removed.url); } catch (e) { }
    }
    if (this.sourceMode === 'local') {
      if (this.localTracks.length === 0) {
        this.stopAllMusicChannels();
        this.sourceMode = 'synth';
        this.streamStatus = 'Built-in Synth Radio';
      } else {
        this.localIndex = Math.min(this.localIndex, this.localTracks.length - 1);
        this.playLocalTrack(this.localIndex);
      }
    }
    this.emitMusicState();
  }

  clearLocalPlaylist() {
    this.localTracks.forEach((t) => {
      if (t?.url && typeof URL !== 'undefined' && URL.revokeObjectURL) {
        try { URL.revokeObjectURL(t.url); } catch (e) { }
      }
    });
    this.localTracks = [];
    this.localIndex = 0;
    if (this.sourceMode === 'local') {
      this.stopAllMusicChannels();
      this.sourceMode = 'synth';
      this.streamStatus = 'Built-in Synth Radio';
    }
    this.emitMusicState();
  }

  playLocalTrack(index = 0) {
    if (!this.localTracks.length) return null;
    this.localIndex = ((index % this.localTracks.length) + this.localTracks.length) % this.localTracks.length;
    const track = this.localTracks[this.localIndex];
    this.init();
    this.resume();
    // Hard-stop any Live FM stream AND Synth loop immediately before playing Device Audio!
    this.stopAllMusicChannels();
    this.sourceMode = 'local';
    this.musicPlaying = true;
    this.streamStatus = '🎵 PLAYING FROM DEVICE (FM OFF)';
    const tok = this.playbackToken;
    if (this.localAudio) {
      this.localAudio.src = track.url;
      this.syncMediaVolume();
      this.localAudio.play().catch((err) => {
        if (tok === this.playbackToken) {
          this.streamStatus = 'Click Play to start device audio';
          console.warn('Local audio play deferred:', err);
        }
      });
    }
    this.emitMusicState();
    return { id: track.id, name: `📁 ${track.name}`, genre: 'Device Audio File' };
  }

  playLiveStation(stationOrId) {
    const station = typeof stationOrId === 'string'
      ? (LIVE_RADIO_STREAMS.find((s) => s.id === stationOrId) || this.indiaDirectory.find((s) => s.id === stationOrId))
      : stationOrId;
    if (!station || !station.streamUrl) return null;

    this.init();
    this.resume();
    // Stop device music & synth loop cleanly before tuning Live FM
    this.stopAllMusicChannels();
    this.sourceMode = 'live';
    this.activeLiveStation = station;
    this.musicPlaying = true;
    this.streamStatus = '📡 CONNECTING TO INDIAN LIVE FM...';
    const tok = this.playbackToken;
    if (this.liveAudio) {
      this.liveAudio.src = station.streamUrl;
      this.syncMediaVolume();
      this.liveAudio.play().catch(() => {
        if (tok !== this.playbackToken || this.sourceMode !== 'live') return;
        if (station.fallbackUrl) {
          this.liveAudio.src = station.fallbackUrl;
          this.liveAudio.play().catch(() => this.fallbackLiveToSynth(tok));
        } else {
          this.fallbackLiveToSynth(tok);
        }
      });
    } else if (this.ctx) {
      this.startSynthMusic(station);
    }
    this.emitMusicState();
    return station;
  }

  playCustomStreamUrl(url, label = '🔴 CUSTOM LIVE RADIO') {
    const cleanUrl = (url || '').trim();
    if (!cleanUrl) return null;
    try {
      const parsed = new URL(cleanUrl);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    } catch (e) {
      return null;
    }
    this.init();
    this.resume();
    this.stopAllMusicChannels();
    this.sourceMode = 'custom_url';
    this.customStreamUrl = cleanUrl;
    this.activeLiveStation = { id: 'custom_url', name: label, genre: cleanUrl, tempo: 110, isLive: true };
    this.musicPlaying = true;
    this.streamStatus = '📡 TUNING STREAM URL...';
    const tok = this.playbackToken;
    if (this.liveAudio) {
      this.liveAudio.src = cleanUrl;
      this.syncMediaVolume();
      this.liveAudio.play().catch(() => this.fallbackLiveToSynth(tok));
    }
    this.emitMusicState();
    return this.activeLiveStation;
  }

  togglePlayback() {
    if (!this.musicPlaying) {
      this.startMusic();
      return true;
    }
    const activeEl = this.getActiveMediaElement();
    if (activeEl) {
      if (activeEl.paused) {
        activeEl.play().catch(() => { });
        this.emitMusicState();
        return true;
      }
      activeEl.pause();
      this.streamStatus = '⏸ PAUSED';
      this.emitMusicState();
      return false;
    }
    this.stopMusic();
    return false;
  }

  nextTrack() {
    if (this.sourceMode === 'local' && this.localTracks.length > 0) {
      return this.playLocalTrack((this.localIndex + 1) % this.localTracks.length);
    }
    return this.cycleStation();
  }

  prevTrack() {
    if (this.sourceMode === 'local' && this.localTracks.length > 0) {
      return this.playLocalTrack((this.localIndex - 1 + this.localTracks.length) % this.localTracks.length);
    }
    const all = [...RADIO_STATIONS, ...LIVE_RADIO_STREAMS];
    const currId = this.getCurrentStation()?.id;
    const idx = Math.max(0, all.findIndex((s) => s.id === currId));
    const prev = all[(idx - 1 + all.length) % all.length];
    return prev.isLive ? this.playLiveStation(prev) : this.setStationById(prev.id);
  }

  seekLocal(fraction01) {
    if (this.sourceMode !== 'local' || !this.localAudio || !this.localAudio.duration) return;
    this.localAudio.currentTime = Math.max(0, Math.min(1, fraction01)) * this.localAudio.duration;
    this.emitMusicState();
  }

  getMusicState() {
    if (this.sourceMode === 'local' && this.localTracks[this.localIndex]) {
      const tr = this.localTracks[this.localIndex];
      const isLocalPaused = this.localAudio ? this.localAudio.paused : true;
      return {
        sourceMode: 'local',
        isPlaying: this.musicPlaying && !isLocalPaused,
        statusLabel: this.streamStatus,
        title: `📁 ${tr.name}`,
        subtitle: `Device Audio • Track ${this.localIndex + 1}/${this.localTracks.length} (${tr.sizeLabel})`,
        activeId: tr.id,
        localTracks: this.localTracks,
        localIndex: this.localIndex,
        currentTime: this.localAudio?.currentTime || 0,
        duration: this.localAudio?.duration || 0
      };
    }
    if ((this.sourceMode === 'live' || this.sourceMode === 'custom_url') && this.activeLiveStation) {
      const isLivePaused = this.liveAudio ? this.liveAudio.paused : true;
      return {
        sourceMode: this.sourceMode,
        isPlaying: this.musicPlaying && (!this.liveAudio || !isLivePaused || !!this.musicInterval),
        statusLabel: this.streamStatus,
        title: this.activeLiveStation.name,
        subtitle: this.activeLiveStation.genre,
        activeId: this.activeLiveStation.id,
        localTracks: this.localTracks,
        localIndex: this.localIndex,
        currentTime: 0,
        duration: 0
      };
    }
    const st = RADIO_STATIONS[this.currentStationIndex];
    return {
      sourceMode: 'synth',
      isPlaying: this.musicPlaying,
      statusLabel: this.musicPlaying ? '🎹 SYNTH RADIO ACTIVE' : 'RADIO STANDBY',
      title: st.name,
      subtitle: st.genre,
      activeId: st.id,
      localTracks: this.localTracks,
      localIndex: this.localIndex,
      currentTime: 0,
      duration: 0
    };
  }

  cycleStation() {
    const combined = [...LIVE_RADIO_STREAMS, ...RADIO_STATIONS];
    if (this.sourceMode === 'local' && this.localTracks.length > 0 && this.localIndex < this.localTracks.length - 1) {
      return this.playLocalTrack(this.localIndex + 1);
    }
    const currId = (this.sourceMode === 'live' && this.activeLiveStation)
      ? this.activeLiveStation.id
      : RADIO_STATIONS[this.currentStationIndex].id;
    const currPos = combined.findIndex((s) => s.id === currId);
    const next = combined[(currPos + 1) % combined.length];
    return next.isLive ? this.playLiveStation(next) : this.setStationById(next.id);
  }

  setStationById(stationId) {
    const liveMatch = LIVE_RADIO_STREAMS.find((s) => s.id === stationId) || this.indiaDirectory.find((s) => s.id === stationId);
    if (liveMatch) {
      return this.playLiveStation(liveMatch);
    }
    const idx = RADIO_STATIONS.findIndex((s) => s.id === stationId);
    if (idx < 0) return null;
    const wasPlaying = this.musicPlaying;
    this.stopAllMusicChannels();
    this.sourceMode = 'synth';
    this.currentStationIndex = idx;
    this.streamStatus = '🎹 SYNTH RADIO ACTIVE';
    if (wasPlaying) {
      this.startSynthMusic(RADIO_STATIONS[this.currentStationIndex]);
    }
    this.emitMusicState();
    return RADIO_STATIONS[this.currentStationIndex];
  }

  getCurrentStation() {
    if (this.sourceMode === 'local' && this.localTracks[this.localIndex]) {
      return { id: this.localTracks[this.localIndex].id, name: `📁 ${this.localTracks[this.localIndex].name}` };
    }
    if ((this.sourceMode === 'live' || this.sourceMode === 'custom_url') && this.activeLiveStation) {
      return this.activeLiveStation;
    }
    return RADIO_STATIONS[this.currentStationIndex];
  }

  startMusic() {
    if (this.sourceMode === 'local' && this.localTracks.length > 0) {
      this.stopLiveElement();
      this.stopSynthLoop();
      if (this.localAudio && this.localAudio.paused) {
        this.musicPlaying = true;
        this.syncMediaVolume();
        this.localAudio.play().catch(() => { });
        this.emitMusicState();
      } else if (!this.musicPlaying) {
        this.playLocalTrack(this.localIndex);
      }
      return;
    }
    if (this.sourceMode === 'live' && this.activeLiveStation) {
      this.stopLocalElement();
      this.stopSynthLoop();
      if (this.liveAudio && this.liveAudio.paused) {
        const tok = this.playbackToken;
        this.musicPlaying = true;
        this.syncMediaVolume();
        this.liveAudio.play().catch(() => this.fallbackLiveToSynth(tok));
        this.emitMusicState();
      }
      return;
    }
    this.startSynthMusic(RADIO_STATIONS[this.currentStationIndex]);
  }

  startSynthMusic(station = RADIO_STATIONS[this.currentStationIndex]) {
    if (this.musicPlaying || !this.ctx) return;
    this.musicPlaying = true;
    this.musicStep = 0;

    const stepDuration = 60 / (station?.tempo || 120) / 4;
    const isRomance = station?.id === 'romance' || station?.id === 'live_lush';

    const chords = isRomance
      ? [
        [261.63, 329.63, 392.00, 493.88],
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 349.23],
        [196.00, 246.94, 293.66, 392.00]
      ]
      : [
        [130.81, 155.56, 196.00],
        [116.54, 138.59, 174.61],
        [103.83, 123.47, 155.56],
        [116.54, 138.59, 174.61]
      ];
    const bassNotes = isRomance ? [130.81, 110.00, 87.31, 98.00] : [65.41, 58.27, 51.91, 58.27];
    const leadNotes = [261.63, 311.13, 392.00, 466.16, 523.25];

    this.musicInterval = setInterval(() => {
      if (!this.musicPlaying || this.isMusicMuted || this.isPaused) return;
      const now = this.ctx.currentTime;
      const bar = Math.floor(this.musicStep / 16) % 4;
      const stepInBar = this.musicStep % 16;

      if (isRomance) {
        if (stepInBar === 0 || stepInBar === 8) this.playChord(chords[bar], now, stepDuration * 8);
        if (stepInBar % 4 === 0) this.playBassNote(bassNotes[bar], now, stepDuration * 3.5);
        if (stepInBar === 0 || stepInBar === 10) this.playKick(now);
      } else {
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
      }

      this.musicStep++;
    }, stepDuration * 1000);
    this.emitMusicState();
  }

  stopMusic() {
    this.musicPlaying = false;
    this.stopSynthLoop();
    this.stopMediaElement(false);
    this.silenceDrivingLoops();
    this.emitMusicState();
  }

  playBassNote(freq, time, dur) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, time);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + dur);
  }

  playChord(freqs, time, dur) {
    freqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 2, time);
      gain.gain.setValueAtTime(0.07, time);
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
    gain.gain.setValueAtTime(0.08, time);
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
    gain.gain.setValueAtTime(0.38, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    osc.connect(gain);
    gain.connect(this.musicGain);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  playSnare(time) {
    if (!this.snareBuffer) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.snareBuffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.24, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
    noise.connect(gain);
    gain.connect(this.musicGain);
    noise.start(time);
  }

  playHiHat(time) {
    if (!this.hihatBuffer) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.hihatBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6500;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.11, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);
    noise.start(time);
  }

  toggleSfxMute() {
    this.isSfxMuted = !this.isSfxMuted;
    this.isMuted = this.isSfxMuted && this.isMusicMuted;
    if (this.sfxGain) this.sfxGain.gain.value = this.isSfxMuted ? 0 : this.volumes.sfx;
    if (this.isSfxMuted) this.silenceDrivingLoops();
    return this.isSfxMuted;
  }

  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;
    this.isMuted = this.isSfxMuted && this.isMusicMuted;
    if (this.musicGain) this.musicGain.gain.value = this.isMusicMuted ? 0 : this.volumes.music;
    this.syncMediaVolume();
    this.emitMusicState();
    return this.isMusicMuted;
  }

  toggleMute() {
    const nextMuted = !(this.isSfxMuted && this.isMusicMuted);
    this.isSfxMuted = nextMuted;
    this.isMusicMuted = nextMuted;
    this.isMuted = nextMuted;
    if (this.sfxGain) this.sfxGain.gain.value = this.isSfxMuted ? 0 : this.volumes.sfx;
    if (this.musicGain) this.musicGain.gain.value = this.isMusicMuted ? 0 : this.volumes.music;
    this.syncMediaVolume();
    if (this.isSfxMuted) this.silenceDrivingLoops();
    this.emitMusicState();
    return this.isMuted;
  }

  playDoorLatch() {
    if (!this.ctx || this.isSfxMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.09);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playCelebrateChime() {
    if (!this.ctx || this.isSfxMuted) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const t = now + i * 0.065;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.46);
    });
  }

  playRomanticDuetSong(song) {
    this.stopRomanticDuetSong();
    if (!this.ctx || !song) return;
    let step = 0;
    const chords = song.chords || [[261.63, 329.63, 392.00]];
    const melody = song.melody || [523.25, 587.33, 659.25, 587.33];
    const playStep = () => {
      if (!this.ctx || this.isMusicMuted || this.isPaused) return;
      const now = this.ctx.currentTime;
      const bar = Math.floor(step / 4) % chords.length;
      if (step % 4 === 0) {
        chords[bar].forEach((f) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.055, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(now);
          osc.stop(now + 1.55);
        });
      }
      const melFreq = melody[step % melody.length];
      const mOsc = this.ctx.createOscillator();
      const mGain = this.ctx.createGain();
      mOsc.type = 'triangle';
      mOsc.frequency.setValueAtTime(melFreq, now);
      mGain.gain.setValueAtTime(0.075, now);
      mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      mOsc.connect(mGain);
      mGain.connect(this.musicGain);
      mOsc.start(now);
      mOsc.stop(now + 0.58);
      step++;
    };
    playStep();
    this.duetSongTimer = setInterval(playStep, 440);
  }

  stopRomanticDuetSong() {
    if (this.duetSongTimer) {
      clearInterval(this.duetSongTimer);
      this.duetSongTimer = null;
    }
  }
}
