/**
 * Velocity Rush 3D - Luxury, Supercar, Hypercar & 4x4 Automotive Builder
 * Combines Real GLB Models (Ferrari 458, Lamborghini Aventador + Custom GLB Import),
 * Textured Luxury & Hypercars (Rolls-Royce Spectre, Bugatti Chiron Pur Sport, McLaren P1 GTR),
 * Textured 4x4 SUVs (Mahindra Thar, Mahindra Scorpio-N, Tata Safari), and Racing Classes.
 */
import { GLBCarLoader } from './GLBCarLoader.js';

export const NITRO_MODES = {
  plasma: {
    id: 'plasma',
    name: 'PLASMA SURGE',
    desc: 'Balanced blue plasma boost (+26 km/h)',
    powerMult: 1.38,
    topSpeedBonus: 26,
    drainRate: 22,
    rechargeRate: 6.0,
    launchBurst: 3.5,
    flameColor: 0x00f0ff,
    fovBonus: 12
  },
  twin_overboost: {
    id: 'twin_overboost',
    name: 'TWIN-STAGE OVERBOOST',
    desc: 'High-torque dual-stage boost (+42 km/h)',
    powerMult: 1.58,
    topSpeedBonus: 42,
    drainRate: 27,
    rechargeRate: 7.0,
    launchBurst: 6.8,
    flameColor: 0xffaa00,
    fovBonus: 15
  },
  hyper_warp: {
    id: 'hyper_warp',
    name: 'QUANTUM HYPER-WARP',
    desc: 'Extreme 399 km/h warp overdrive (+58 km/h)',
    powerMult: 1.88,
    topSpeedBonus: 58,
    drainRate: 34,
    rechargeRate: 8.5,
    launchBurst: 10.5,
    flameColor: 0xff00aa,
    fovBonus: 19
  }
};

export const CAR_CONFIGS = [
  {
    id: 'ferrari_458',
    name: 'Ferrari 458 Italia',
    classTier: 'SUPERCAR',
    type: 'SUPERCAR • Real 3D GLB',
    description: 'High-detail real 3D Ferrari 458 Italia model with naturally aspirated V8 speed & razor cornering.',
    defaultColor: '#ff0022',
    glbPath: 'assets/models/ferrari.glb',
    glbOptions: {
      targetLength: 4.5,
      yawOffset: Math.PI,
      bodyMaterialNames: ['Body_Color'],
      glassMaterialNames: ['Glass_Gray'],
      tailMaterialNames: ['Taillight_Glass'],
      wheelSpec: [
        { spinNode: 'wheel_fl', isFront: true, isRight: false },
        { spinNode: 'wheel_fr', isFront: true, isRight: true },
        { spinNode: 'wheel_rl', isFront: false, isRight: false },
        { spinNode: 'wheel_rr', isFront: false, isRight: true }
      ]
    },
    exhaustPositions: [[-0.14, 0.22, -2.18], [0, 0.22, -2.18], [0.14, 0.22, -2.18]],
    stats: { topSpeed: 93, accel: 92, handling: 94, nitro: 90 },
    physics: { maxSpeed: 318, accelPower: 158, handling: 3.18, driftGrip: 0.92, weight: 1380 }
  },
  {
    id: 'lamborghini_aventador',
    name: 'Lamborghini Aventador',
    classTier: 'HYPERCAR',
    type: 'HYPERCAR • Real 3D GLB',
    description: 'Authentic 3D Lamborghini Aventador V12 flagship GLB model with carbon aero & brutal launch.',
    defaultColor: '#ffaa00',
    glbPath: 'assets/models/lamborghini.glb',
    glbOptions: {
      targetLength: 4.55,
      yawOffset: Math.PI / 2,
      bodyMaterialNames: ['Mt_Body', 'Mt_MirrorCover'],
      glassMaterialNames: ['Mt_WindScreens', 'Mt_Glass_Translucent'],
      tailMaterialNames: ['Mt_Tail_Light', 'Mt_Light_Emissive'],
      wheelSpec: [
        { steerNode: 'Obj_WheelHub_FL', spinNode: 'Obj_DiscRotor_FL', isFront: true, isRight: false },
        { steerNode: 'Obj_WheelHub_FR', spinNode: 'Obj_DiscRotor_FR', isFront: true, isRight: true },
        { steerNode: 'Obj_WheelHub_RL', spinNode: 'Obj_DiscRotor_RL', isFront: false, isRight: false },
        { steerNode: 'Obj_WheelHub_RR', spinNode: 'Obj_DiscRotor_RR', isFront: false, isRight: true }
      ]
    },
    exhaustPositions: [[-0.16, 0.25, -2.2], [0.16, 0.25, -2.2]],
    stats: { topSpeed: 98, accel: 97, handling: 89, nitro: 94 },
    physics: { maxSpeed: 332, accelPower: 168, handling: 3.05, driftGrip: 0.91, weight: 1575 }
  },
  {
    id: 'bugatti_hyperion',
    name: 'Bugatti Chiron Pur Sport',
    classTier: 'HYPERCAR',
    type: 'HYPERCAR • W16 Quad-Turbo (399 km/h)',
    description: '8.0L quad-turbo W16 hypercar engineered up to 399 km/h with iconic C-line arc & horseshoe grille.',
    defaultColor: '#0088ff',
    optionalGlbPath: 'assets/models/bugatti.glb',
    stats: { topSpeed: 100, accel: 99, handling: 90, nitro: 98 },
    physics: { maxSpeed: 344, accelPower: 178, handling: 3.12, driftGrip: 0.92, weight: 1890 }
  },
  {
    id: 'rolls_royce_spectre',
    name: 'Rolls-Royce Spectre',
    classTier: 'LUXURY',
    type: 'LUXURY • Ultra-Luxury Coupe',
    description: 'Bespoke ultra-luxury grand tourer featuring illuminated Pantheon chrome grille, split crystal LEDs & satin hood.',
    defaultColor: '#ffffff',
    optionalGlbPath: 'assets/models/rolls_royce.glb',
    stats: { topSpeed: 88, accel: 89, handling: 88, nitro: 88 },
    physics: { maxSpeed: 292, accelPower: 148, handling: 2.95, driftGrip: 0.93, weight: 2150 }
  },
  {
    id: 'mclaren_p1',
    name: 'McLaren P1 GTR',
    classTier: 'HYPERCAR',
    type: 'HYPERCAR • Hybrid Track Weapon (399 km/h)',
    description: 'Shrink-wrapped teardrop glass canopy, roof snorkel, carbon door tunnels & 399 km/h hybrid overdrive.',
    defaultColor: '#ff3300',
    optionalGlbPath: 'assets/models/mclaren.glb',
    stats: { topSpeed: 98, accel: 98, handling: 97, nitro: 96 },
    physics: { maxSpeed: 338, accelPower: 174, handling: 3.28, driftGrip: 0.92, weight: 1395 }
  },
  {
    id: 'mahindra_thar',
    name: 'Mahindra Thar 4x4',
    classTier: '4x4 SUV',
    type: '4x4 SUV • Off-Road Legend',
    description: 'Iconic boxy 4x4 SUV with 7-slot grille, round LED halos, spare wheel tailgate & chunky A/T tires.',
    defaultColor: '#ff3300',
    optionalGlbPath: 'assets/models/thar.glb',
    stats: { topSpeed: 76, accel: 84, handling: 91, nitro: 86 },
    physics: { maxSpeed: 235, accelPower: 136, handling: 3.1, driftGrip: 0.94, weight: 1750 }
  },
  {
    id: 'mahindra_scorpio',
    name: 'Mahindra Scorpio-N',
    classTier: 'SUV',
    type: 'SUV • Big Daddy Muscle',
    description: 'Commanding upright Indian SUV with twin-tooth chrome grille, twin-pod LEDs & high-torque stance.',
    defaultColor: '#ffffff',
    optionalGlbPath: 'assets/models/scorpio.glb',
    stats: { topSpeed: 82, accel: 86, handling: 87, nitro: 85 },
    physics: { maxSpeed: 248, accelPower: 142, handling: 2.95, driftGrip: 0.92, weight: 1850 }
  },
  {
    id: 'tata_safari',
    name: 'Tata Safari',
    classTier: 'SUV',
    type: 'SUV • Flagship Adventure',
    description: 'Modern flagship SUV featuring signature eyebrow LED DRLs, panoramic glass roof & connected tailbar.',
    defaultColor: '#00f0ff',
    optionalGlbPath: 'assets/models/safari.glb',
    stats: { topSpeed: 83, accel: 85, handling: 89, nitro: 86 },
    physics: { maxSpeed: 254, accelPower: 144, handling: 3.0, driftGrip: 0.93, weight: 1820 }
  },
  {
    id: 'phantom_drift',
    name: 'Phantom GT-R',
    classTier: 'SUPERCAR',
    type: 'SUPERCAR • Widebody Drift',
    description: 'Twin-turbo widebody beast with sculpted fender flares, quad halo LEDs & balanced drift geometry.',
    defaultColor: '#ffaa00',
    stats: { topSpeed: 91, accel: 90, handling: 98, nitro: 92 },
    physics: { maxSpeed: 312, accelPower: 154, handling: 3.3, driftGrip: 0.96, weight: 1320 }
  },
  {
    id: 'formula_pulse',
    name: 'Pulse F1-Grand',
    classTier: 'FORMULA',
    type: 'FORMULA • Ground-Effect GP (399 km/h)',
    description: 'Ultra-lightweight ground-effect formula racer with titanium halo & 399 km/h aero trim.',
    defaultColor: '#00ff88',
    stats: { topSpeed: 99, accel: 100, handling: 99, nitro: 92 },
    physics: { maxSpeed: 342, accelPower: 182, handling: 3.38, driftGrip: 0.92, weight: 880 }
  }
];

export const TINT_COLORS = [
  { name: 'Smoked Dark', color: 0x051525, opacity: 0.82 },
  { name: 'Chameleon Cyan', color: 0x004466, opacity: 0.85 },
  { name: 'Gold Mirror', color: 0x443311, opacity: 0.82 },
  { name: 'Crystal Clear', color: 0x223344, opacity: 0.45 }
];

export const PAINT_FINISHES = {
  metallic: { metalness: 0.82, roughness: 0.16, clearcoat: 1.0, clearcoatRoughness: 0.06, envMapIntensity: 1.85 },
  gloss: { metalness: 0.24, roughness: 0.08, clearcoat: 1.0, clearcoatRoughness: 0.03, envMapIntensity: 1.75 },
  matte: { metalness: 0.34, roughness: 0.62, clearcoat: 0.08, clearcoatRoughness: 0.55, envMapIntensity: 1.05 },
  chrome: { metalness: 0.98, roughness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.02, envMapIntensity: 2.3 }
};

export const HEADLIGHT_SPECS = [
  { name: 'Xenon White', color: 0xf8fbff },
  { name: 'Laser Ice', color: 0x70f4ff },
  { name: 'GT3 Amber', color: 0xffc83d }
];

export const CALIPER_COLORS = [0xe01122, 0xffaa00, 0x00d8ff, 0x22ff66];

let _sharedShadowTexture = null;
let _sharedCarbonMaps = null;
let _sharedRotorMaps = null;
let _sharedTireMaps = null;
let _sharedPlateTexture = null;
let _sharedDashTexture = null;
let _sharedUnderglowTex = null;

function getContactShadowTexture() {
  if (_sharedShadowTexture) return _sharedShadowTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 128, 18, 64, 128, 62);
  grad.addColorStop(0.0, 'rgba(0, 0, 0, 0.84)');
  grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.44)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 256);
  _sharedShadowTexture = new THREE.CanvasTexture(canvas);
  return _sharedShadowTexture;
}

function getCarbonMaps() {
  if (_sharedCarbonMaps) return _sharedCarbonMaps;
  const cDiff = document.createElement('canvas');
  cDiff.width = 128;
  cDiff.height = 128;
  const dCtx = cDiff.getContext('2d');
  dCtx.fillStyle = '#14171c';
  dCtx.fillRect(0, 0, 128, 128);

  const cBump = document.createElement('canvas');
  cBump.width = 128;
  cBump.height = 128;
  const bCtx = cBump.getContext('2d');
  bCtx.fillStyle = '#505050';
  bCtx.fillRect(0, 0, 128, 128);

  for (let y = 0; y < 128; y += 8) {
    for (let x = 0; x < 128; x += 8) {
      const diag = ((x + y) / 8) % 2 === 0;
      dCtx.fillStyle = diag ? '#252a34' : '#0f1116';
      dCtx.fillRect(x, y, 7, 4);
      dCtx.fillStyle = diag ? '#1a1e26' : '#2c323e';
      dCtx.fillRect(x, y + 4, 4, 4);
      bCtx.fillStyle = diag ? '#b8b8b8' : '#707070';
      bCtx.fillRect(x, y, 7, 4);
      bCtx.fillStyle = diag ? '#787878' : '#c0c0c0';
      bCtx.fillRect(x, y + 4, 4, 4);
    }
  }
  const map = new THREE.CanvasTexture(cDiff);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(8, 8);
  if (THREE.sRGBEncoding) map.encoding = THREE.sRGBEncoding;

  const bumpMap = new THREE.CanvasTexture(cBump);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(8, 8);
  _sharedCarbonMaps = { map, bumpMap };
  return _sharedCarbonMaps;
}

function getBrakeRotorMaps() {
  if (_sharedRotorMaps) return _sharedRotorMaps;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8b95a3';
  ctx.fillRect(0, 0, 256, 256);

  const grad = ctx.createRadialGradient(128, 128, 36, 128, 128, 124);
  grad.addColorStop(0.0, '#363b42');
  grad.addColorStop(0.32, '#a8b2bf');
  grad.addColorStop(0.75, '#8994a2');
  grad.addColorStop(1.0, '#5a6370');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 124, 0, Math.PI * 2);
  ctx.fill();

  // Concentric brushed machining rings & cross-drilled cooling holes
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 1.5;
  for (let r = 46; r <= 116; r += 8) {
    ctx.beginPath();
    ctx.arc(128, 128, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#1f2329';
  for (let a = 0; a < 14; a++) {
    const baseA = (a / 14) * Math.PI * 2;
    for (let k = 0; k < 3; k++) {
      const ang = baseA + k * 0.11;
      const rad = 58 + k * 22;
      ctx.beginPath();
      ctx.arc(128 + Math.cos(ang) * rad, 128 + Math.sin(ang) * rad, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const map = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) map.encoding = THREE.sRGBEncoding;
  _sharedRotorMaps = { map };
  return _sharedRotorMaps;
}

function getTireTreadTexture() {
  if (_sharedTireMaps) return _sharedTireMaps;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#14161b';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#090b0f';
  ctx.lineWidth = 5;
  for (let y = 0; y < 256; y += 22) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(106, y + 12);
    ctx.lineTo(106, y + 18);
    ctx.moveTo(240, y);
    ctx.lineTo(150, y + 12);
    ctx.lineTo(150, y + 18);
    ctx.stroke();
  }
  ctx.fillStyle = '#090b0f';
  ctx.fillRect(114, 0, 10, 256);
  ctx.fillRect(134, 0, 10, 256);

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(1, 6);
  if (THREE.sRGBEncoding) map.encoding = THREE.sRGBEncoding;
  _sharedTireMaps = { map };
  return _sharedTireMaps;
}

function getPlateTexture() {
  if (_sharedPlateTexture) return _sharedPlateTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e8edf3';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, 250, 58);
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(6, 6, 30, 52);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('IND', 21, 36);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('DL 01 VR 399', 146, 34);
  _sharedPlateTexture = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) _sharedPlateTexture.encoding = THREE.sRGBEncoding;
  return _sharedPlateTexture;
}

function getClusterTexture() {
  if (_sharedDashTexture) return _sharedDashTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(46, 34, 22, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = '#ff3864';
  ctx.beginPath(); ctx.arc(210, 34, 22, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#0b1e36';
  ctx.fillRect(92, 12, 72, 40);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(92, 12, 72, 40);
  _sharedDashTexture = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) _sharedDashTexture.encoding = THREE.sRGBEncoding;
  return _sharedDashTexture;
}

function getUnderglowTexture() {
  if (_sharedUnderglowTex) return _sharedUnderglowTex;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 128, 12, 64, 128, 62);
  grad.addColorStop(0.0, 'rgba(255,255,255,0.65)');
  grad.addColorStop(0.45, 'rgba(255,255,255,0.28)');
  grad.addColorStop(1.0, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 256);
  _sharedUnderglowTex = new THREE.CanvasTexture(canvas);
  return _sharedUnderglowTex;
}

export class CarBuilder {
  static customGlbOverrides = new Map();

  static setCustomGlbForCar(carId, blobUrl) {
    if (carId && blobUrl) {
      this.customGlbOverrides.set(carId, blobUrl);
    }
  }

  static preloadRealModels() {
    if (!GLBCarLoader.isSupported()) return;
    const urls = CAR_CONFIGS.map((c) => c.glbPath).filter(Boolean);
    GLBCarLoader.preload(urls);
  }

  static createCar(carIndex = 0, hexColor = '#00f0ff', visualMods = {}, enableSpotlights = true, forceProcedural = false) {
    const safeIdx = Math.abs(parseInt(carIndex) || 0) % CAR_CONFIGS.length;
    const config = CAR_CONFIGS[safeIdx] || CAR_CONFIGS[0];
    const group = new THREE.Group();
    group.name = `car_${config.id || 'default'}`;

    const rimStyle = Math.abs(parseInt(visualMods?.rimStyle) || 0) % 3;
    const safeTintIdx = Math.abs(parseInt(visualMods?.tint) || 0) % TINT_COLORS.length;
    const tintConfig = TINT_COLORS[safeTintIdx] || TINT_COLORS[0];
    const finishKey = PAINT_FINISHES[visualMods?.paintFinish] ? visualMods.paintFinish : 'metallic';
    const finishCfg = PAINT_FINISHES[finishKey];
    const spoilerStyle = Math.abs(parseInt(visualMods?.spoilerStyle) || 0) % 4;
    const aeroKit = Math.abs(parseInt(visualMods?.aeroKit) || 0) % 3;
    const hlIdx = Math.abs(parseInt(visualMods?.headlightStyle) || 0) % HEADLIGHT_SPECS.length;
    const hlColor = (HEADLIGHT_SPECS[hlIdx] || HEADLIGHT_SPECS[0]).color;
    const caliperIdx = Math.abs(parseInt(visualMods?.caliperColor) || 0) % CALIPER_COLORS.length;
    const dateMode = visualMods?.dateMode || 'off'; // 'off' | 'romance' | 'candlelight' | 'elegant'
    const coupleNames = visualMods?.coupleNames || { partner1: 'Aarav', partner2: 'Meera' };
    const rawChars = visualMods?.showCharacters;
    const characterMode = rawChars === 'couple'
      ? 'couple'
      : ((rawChars === false || rawChars === 'false' || rawChars === 'none') ? 'none' : 'driver_only');
    const showCharacters = characterMode !== 'none';

    const bodyColor = new THREE.Color(hexColor || config.defaultColor || '#00f0ff');
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: bodyColor,
      metalness: finishCfg.metalness,
      roughness: finishCfg.roughness,
      clearcoat: finishCfg.clearcoat,
      clearcoatRoughness: finishCfg.clearcoatRoughness,
      envMapIntensity: finishCfg.envMapIntensity
    });

    const carbonMaps = getCarbonMaps();
    const carbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x20252e,
      map: carbonMaps.map,
      bumpMap: carbonMaps.bumpMap,
      bumpScale: 0.012,
      metalness: 0.42,
      roughness: 0.30,
      clearcoat: 0.75,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.35
    });

    const darkInteriorMat = new THREE.MeshStandardMaterial({
      color: 0x0b0e14,
      metalness: 0.18,
      roughness: 0.82
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: showCharacters ? 0xdbeafe : tintConfig.color,
      metalness: showCharacters ? 0.06 : 0.78,
      roughness: 0.035,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: showCharacters ? 0.22 : tintConfig.opacity,
      depthWrite: !showCharacters,
      envMapIntensity: showCharacters ? 1.15 : 2.05
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f7fb,
      metalness: 0.98,
      roughness: 0.05,
      envMapIntensity: 1.85
    });

    const glowColor = new THREE.Color(hexColor || config.defaultColor || '#00f0ff');
    const underglowMaterial = new THREE.MeshBasicMaterial({
      color: glowColor,
      map: getUnderglowTexture(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });

    const accentMaterial = new THREE.MeshBasicMaterial({ color: glowColor.clone() });
    const headlampLensMat = new THREE.MeshBasicMaterial({ color: hlColor });
    const taillampMat = new THREE.MeshBasicMaterial({ color: 0xd8002b });
    const orangeIndicatorMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const indLeftMat = new THREE.MeshBasicMaterial({ color: 0x3b2100 });
    const indRightMat = new THREE.MeshBasicMaterial({ color: 0x3b2100 });
    const indGlowLeftMat = new THREE.MeshBasicMaterial({ color: 0xff9d00, transparent: true, opacity: 0.0, depthWrite: false });
    const indGlowRightMat = new THREE.MeshBasicMaterial({ color: 0xff9d00, transparent: true, opacity: 0.0, depthWrite: false });

    const wheels = [];
    const exhaustPipes = [];
    const nitroCones = [];
    const rotorMaterials = [];
    const caliperMaterials = [];
    const spotlights = [];
    const headlightBeams = [];
    const glbPaintMaterials = [];
    const glbGlassMaterials = [];
    const glbTailMaterials = [];

    const modelSubGroup = new THREE.Group();
    group.add(modelSubGroup);

    const buildProceduralFallback = () => {
      switch (config.id) {
        case 'bugatti_hyperion':
          this.buildBugattiChiron(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'rolls_royce_spectre':
          this.buildRollsRoyceSpectre(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'mclaren_p1':
          this.buildMcLarenP1(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'mahindra_thar':
          this.buildMahindraThar(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
          break;
        case 'mahindra_scorpio':
          this.buildMahindraScorpio(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'tata_safari':
          this.buildTataSafari(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'lamborghini_aventador':
          this.buildApexCyber(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'phantom_drift':
          this.buildPhantomDrift(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
        case 'formula_pulse':
          this.buildFormulaPulse(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
          break;
        case 'ferrari_458':
        default:
          this.buildHyperionGT(modelSubGroup, bodyMaterial, carbonMaterial, darkInteriorMat, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, accentMaterial, wheels, exhaustPipes, rimStyle);
          break;
      }
    };

    const customBlobUrl = this.customGlbOverrides.get(config.id);
    const activeGlbUrl = customBlobUrl || config.glbPath;
    let isBrakingState = false;
    let currentHexState = hexColor || config.defaultColor || '#00f0ff';
    let currentTintState = safeTintIdx;

    if (!forceProcedural && activeGlbUrl && GLBCarLoader.isSupported()) {
      buildProceduralFallback();

      const rigOpts = customBlobUrl
        ? { targetLength: config.id.includes('thar') || config.id.includes('scorpio') || config.id.includes('safari') ? 4.35 : 4.55 }
        : (config.glbOptions || { targetLength: 4.5 });

      GLBCarLoader.loadRiggedCar(activeGlbUrl, rigOpts)
        .then((rigged) => {
          while (modelSubGroup.children.length > 0) {
            modelSubGroup.remove(modelSubGroup.children[0]);
          }
          wheels.length = 0;
          rigged.wheels.forEach((w) => wheels.push(w));

          glbPaintMaterials.length = 0;
          rigged.paintMaterials.forEach((m) => glbPaintMaterials.push(m));
          glbGlassMaterials.length = 0;
          rigged.glassMaterials.forEach((m) => glbGlassMaterials.push(m));
          glbTailMaterials.length = 0;
          rigged.tailMaterials.forEach((m) => glbTailMaterials.push(m));

          const col = new THREE.Color(currentHexState);
          glbPaintMaterials.forEach((m) => {
            m.color.copy(col);
            if ('metalness' in m) m.metalness = finishCfg.metalness;
            if ('roughness' in m) m.roughness = finishCfg.roughness;
            if ('clearcoat' in m) m.clearcoat = finishCfg.clearcoat;
            if ('clearcoatRoughness' in m) m.clearcoatRoughness = finishCfg.clearcoatRoughness;
            if ('envMapIntensity' in m) m.envMapIntensity = finishCfg.envMapIntensity;
            m.needsUpdate = true;
          });
          const tc = TINT_COLORS[currentTintState] || TINT_COLORS[0];
          glbGlassMaterials.forEach((m) => {
            m.color.setHex(showCharacters ? 0xdbeafe : tc.color);
            m.transparent = true;
            m.opacity = showCharacters ? 0.20 : tc.opacity;
            m.depthWrite = !showCharacters;
          });

          modelSubGroup.add(rigged.group);
        })
        .catch((err) => {
          console.warn(`GLB load fallback to sculpted model for ${config.id}:`, err);
        });
    } else {
      buildProceduralFallback();
    }

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.75, 5.25),
      new THREE.MeshBasicMaterial({
        map: getContactShadowTexture(),
        transparent: true,
        opacity: 0.92,
        depthWrite: false
      })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.02;
    group.add(contactShadow);

    // Subtle Ground Spill Underglow + Tucked Underbody Emitter Strips (no exposed side pipes)
    const underglowWash = new THREE.Mesh(
      new THREE.PlaneGeometry(2.65, 4.95),
      underglowMaterial
    );
    underglowWash.rotation.x = -Math.PI / 2;
    underglowWash.position.y = 0.023;
    group.add(underglowWash);

    const sideStripGeo = new THREE.CylinderGeometry(0.011, 0.011, 2.35, 6);
    sideStripGeo.rotateX(Math.PI / 2);
    [-0.72, 0.72].forEach((ux) => {
      const strip = new THREE.Mesh(sideStripGeo, accentMaterial);
      strip.position.set(ux, 0.075, 0);
      group.add(strip);
    });

    if (config.exhaustPositions && exhaustPipes.length === 0) {
      config.exhaustPositions.forEach((p) => exhaustPipes.push(new THREE.Vector3(p[0], p[1], p[2])));
    }

    const flameGeo = new THREE.ConeGeometry(0.11, 0.85, 10);
    flameGeo.rotateX(-Math.PI / 2);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.92,
      depthWrite: false
    });
    exhaustPipes.forEach((pipeOffset) => {
      const cone = new THREE.Mesh(flameGeo, flameMat);
      cone.position.copy(pipeOffset).add(new THREE.Vector3(0, 0, -0.38));
      cone.visible = false;
      group.add(cone);
      nitroCones.push(cone);
    });

    const aeroEquipGroup = new THREE.Group();
    this.buildEquipmentAero(aeroEquipGroup, carbonMaterial, accentMaterial, config, { spoilerStyle, aeroKit });
    group.add(aeroEquipGroup);

    // Flush Corner Turn-Signal / Hazard Indicator Lenses & Amber Blink Halos
    const isSuvClass = config.id.includes('thar') || config.id.includes('scorpio') || config.id.includes('safari');
    const isF1Class = config.id === 'formula_pulse';
    const indX = isF1Class ? 0.36 : 0.84;
    const indY = isSuvClass ? 0.62 : (isF1Class ? 0.36 : 0.44);
    const indZ = isSuvClass ? 2.02 : (isF1Class ? 1.85 : 2.08);
    const indHalosLeft = [];
    const indHalosRight = [];
    const indLensGeo = new THREE.BoxGeometry(0.16, 0.055, 0.07);
    const indHaloGeo = new THREE.SphereGeometry(0.15, 8, 8);
    [[-indX, indLeftMat, indGlowLeftMat, indHalosLeft], [indX, indRightMat, indGlowRightMat, indHalosRight]].forEach(([cx, lensMat, haloMat, haloList]) => {
      [-indZ, indZ].forEach((cz) => {
        const lens = new THREE.Mesh(indLensGeo, lensMat);
        lens.position.set(cx, indY, cz);
        group.add(lens);
        const halo = new THREE.Mesh(indHaloGeo, haloMat);
        halo.position.set(cx, indY, cz + Math.sign(cz) * 0.04);
        halo.visible = false;
        group.add(halo);
        haloList.push(halo);
      });
    });

    const dateAnimState = { candleFlames: [], fairyBulbs: [], steeringRig: null, partnerHead: null };
    if (showCharacters) {
      this.buildCoupleCharacters(group, config, dateAnimState, characterMode);
    }
    if (dateMode && dateMode !== 'off') {
      this.buildDateCarDecorations(group, config, dateMode, coupleNames, dateAnimState);
    }

    const beamMat = new THREE.MeshBasicMaterial({
      color: hlColor,
      transparent: true,
      opacity: 0.11,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const beamGeo = new THREE.ConeGeometry(0.30, 0.72, 12, 1, true);
    beamGeo.rotateX(Math.PI / 2);

    if (enableSpotlights) {
      const leftLight = new THREE.SpotLight(hlColor, 1.6, 62, Math.PI / 5.0, 0.44);
      leftLight.position.set(-0.62, 0.52, 1.9);
      leftLight.target.position.set(-0.62, 0, 14);
      group.add(leftLight, leftLight.target);

      const rightLight = new THREE.SpotLight(hlColor, 1.6, 62, Math.PI / 5.0, 0.44);
      rightLight.position.set(0.62, 0.52, 1.9);
      rightLight.target.position.set(0.62, 0, 14);
      group.add(rightLight, rightLight.target);
      spotlights.push(leftLight, rightLight);

      [-0.62, 0.62].forEach((bx) => {
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(bx, 0.44, 2.26);
        group.add(beam);
        headlightBeams.push(beam);
      });
    }

    const collectBrakeMeshes = () => {
      rotorMaterials.length = 0;
      caliperMaterials.length = 0;
      group.traverse((child) => {
        if (!child.isMesh) return;
        if (child.name === 'brake_rotor' && child.material) {
          rotorMaterials.push(child.material);
        } else if (child.name === 'brake_caliper' && child.material) {
          child.material.color.setHex(CALIPER_COLORS[caliperIdx]);
          caliperMaterials.push(child.material);
        }
        if (child !== contactShadow && child.material !== underglowMaterial && !nitroCones.includes(child) && !headlightBeams.includes(child)) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    };
    collectBrakeMeshes();

    let underglowTimer = 0;
    const underglowMode = visualMods?.underglowMode || 'pulse';

    return {
      mesh: group,
      wheels,
      exhaustPipes,
      nitroCones,
      flameMat,
      bodyMaterial,
      underglowMaterial,
      glassMaterial,
      taillampMat,
      config,
      updateColor: (newHex) => {
        currentHexState = newHex;
        const col = new THREE.Color(newHex);
        bodyMaterial.color.copy(col);
        underglowMaterial.color.copy(col);
        accentMaterial.color.copy(col);
        glbPaintMaterials.forEach((m) => m.color.copy(col));
      },
      updatePaintFinish: (nextFinishId) => {
        const f = PAINT_FINISHES[nextFinishId] || PAINT_FINISHES.metallic;
        [bodyMaterial, ...glbPaintMaterials].forEach((m) => {
          if ('metalness' in m) m.metalness = f.metalness;
          if ('roughness' in m) m.roughness = f.roughness;
          if ('clearcoat' in m) m.clearcoat = f.clearcoat;
          if ('clearcoatRoughness' in m) m.clearcoatRoughness = f.clearcoatRoughness;
          if ('envMapIntensity' in m) m.envMapIntensity = f.envMapIntensity;
          m.needsUpdate = true;
        });
      },
      updateTint: (tintIdx) => {
        currentTintState = Math.abs(parseInt(tintIdx) || 0) % TINT_COLORS.length;
        const tc = TINT_COLORS[currentTintState] || TINT_COLORS[0];
        glassMaterial.color.setHex(tc.color);
        glassMaterial.opacity = tc.opacity;
        glbGlassMaterials.forEach((m) => {
          m.color.setHex(tc.color);
          m.opacity = tc.opacity;
        });
      },
      setBrakeLight: (isBraking) => {
        if (isBraking === isBrakingState) return;
        isBrakingState = isBraking;
        taillampMat.color.setHex(isBraking ? 0xff2a48 : 0xb80022);
        glbTailMaterials.forEach((m) => {
          if (m.emissive) m.emissive.setHex(isBraking ? 0xff1122 : 0x220000);
        });
      },
      setBrakeHeat: (heat01 = 0) => {
        const h = Math.max(0, Math.min(1, heat01));
        rotorMaterials.forEach((m) => {
          if (m.emissive) {
            m.emissive.setHex(0xff3800);
            m.emissiveIntensity = h * 1.45;
          }
        });
      },
      setHeadlightsEnabled: (enabled) => {
        const on = enabled !== false;
        spotlights.forEach((s) => { s.visible = on; });
        headlightBeams.forEach((b) => { b.visible = on; });
      },
      setIndicatorVisual: (mode = 'off', phaseOn = false) => {
        const leftLit = !!phaseOn && (mode === 'left' || mode === 'hazard');
        const rightLit = !!phaseOn && (mode === 'right' || mode === 'hazard');
        indLeftMat.color.setHex(leftLit ? 0xffae00 : 0x3b2100);
        indRightMat.color.setHex(rightLit ? 0xffae00 : 0x3b2100);
        indGlowLeftMat.opacity = leftLit ? 0.45 : 0.0;
        indGlowRightMat.opacity = rightLit ? 0.45 : 0.0;
        indHalosLeft.forEach((h) => { h.visible = leftLit; });
        indHalosRight.forEach((h) => { h.visible = rightLit; });
      },
      setNitroVisual: (active, nitroModeId = 'plasma') => {
        const modeCfg = NITRO_MODES[nitroModeId] || NITRO_MODES.plasma;
        flameMat.color.setHex(modeCfg.flameColor);
        const baseScale = nitroModeId === 'hyper_warp' ? 1.55 : (nitroModeId === 'twin_overboost' ? 1.25 : 1.0);
        const flicker = (0.85 + Math.random() * 0.45) * baseScale;
        nitroCones.forEach((cone) => {
          cone.visible = !!active;
          if (active) cone.scale.set(baseScale * 0.9, baseScale * 0.9, flicker);
          else cone.scale.set(1, 1, 1);
        });
      },
      updateUnderglowAnimation: (dt) => {
        underglowTimer += dt;
        if (underglowMode === 'pulse') {
          underglowMaterial.opacity = 0.45 + Math.sin(underglowTimer * 4) * 0.38;
        } else if (underglowMode === 'rainbow') {
          underglowMaterial.color.setHSL((underglowTimer * 0.2) % 1.0, 1.0, 0.5);
        }
      },
      updateDateAnimations: (dt, steeringAngle = 0) => {
        const t = performance.now() * 0.008;
        for (let i = 0; i < dateAnimState.candleFlames.length; i++) {
          const cf = dateAnimState.candleFlames[i];
          const s = 0.86 + Math.sin(t + i * 2.1) * 0.16;
          cf.scale.set(0.95, s * 1.15, 0.95);
        }
        for (let i = 0; i < dateAnimState.fairyBulbs.length; i++) {
          const fb = dateAnimState.fairyBulbs[i];
          const pulse = 0.72 + Math.sin(t * 0.65 + i * 0.9) * 0.28;
          fb.scale.setScalar(pulse);
        }
        if (dateAnimState.steeringRig) {
          dateAnimState.steeringRig.rotation.z = -steeringAngle * 2.1;
        }
        if (dateAnimState.partnerHead) {
          dateAnimState.partnerHead.rotation.y = 0.18 + Math.sin(t * 0.18) * 0.12 - steeringAngle * 0.4;
        }
      },
      setCrewSeatedVisible: (showDriver = true, showPartner = true) => {
        if (dateAnimState.driverCrewRoot) dateAnimState.driverCrewRoot.visible = !!showDriver;
        if (dateAnimState.partnerCrewRoot) dateAnimState.partnerCrewRoot.visible = !!showPartner;
      },
      characterMode,
      hasPartner: !!dateAnimState.partnerHead
    };
  }

  static createHeart3DGeometry(scale = 0.14, depth = 0.04) {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25 * scale);
    s.bezierCurveTo(0, 0.72 * scale, -0.82 * scale, 0.72 * scale, -0.82 * scale, 0.15 * scale);
    s.bezierCurveTo(-0.82 * scale, -0.35 * scale, -0.2 * scale, -0.75 * scale, 0, -1.05 * scale);
    s.bezierCurveTo(0.2 * scale, -0.75 * scale, 0.82 * scale, -0.35 * scale, 0.82 * scale, 0.15 * scale);
    s.bezierCurveTo(0.82 * scale, 0.72 * scale, 0, 0.72 * scale, 0, 0.25 * scale);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: depth * 0.22,
      bevelSize: depth * 0.18,
      bevelSegments: 2
    });
    geo.center();
    return geo;
  }

  static create3DRose(petalMat, calyxMat, scale = 1.0) {
    const rose = new THREE.Group();
    const core = new THREE.Mesh(new THREE.ConeGeometry(0.032 * scale, 0.055 * scale, 7), petalMat);
    core.position.y = 0.03 * scale;
    rose.add(core);
    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.034 * scale, 7, 6), petalMat);
      petal.scale.set(0.95, 1.35, 0.45);
      petal.position.set(Math.cos(ang) * 0.032 * scale, 0.025 * scale, Math.sin(ang) * 0.032 * scale);
      petal.rotation.y = -ang + Math.PI / 2;
      petal.rotation.x = 0.36;
      rose.add(petal);
    }
    const calyx = new THREE.Mesh(new THREE.ConeGeometry(0.035 * scale, 0.03 * scale, 5), calyxMat);
    calyx.rotation.x = Math.PI;
    calyx.position.y = 0.004 * scale;
    rose.add(calyx);
    return rose;
  }

  static build3DGrille(type, chromeMat, darkMat, accentMat) {
    const g = new THREE.Group();
    if (type === 'rolls') {
      const surround = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.62, 0.09), chromeMat);
      const cavity = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.52, 0.07), darkMat);
      cavity.position.z = 0.022;
      g.add(surround, cavity);
      for (let i = -6; i <= 6; i++) {
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.50, 8), chromeMat);
        bar.position.set(i * 0.072, 0, 0.056);
        g.add(bar);
      }
      const badge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.025), chromeMat);
      badge.position.set(0, 0.28, 0.058);
      g.add(badge);
    } else if (type === 'bugatti') {
      const cavity = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.06, 20), darkMat);
      cavity.rotateX(Math.PI / 2);
      cavity.scale.set(1.18, 1.0, 0.85);
      const horse = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.034, 10, 24, Math.PI * 1.48), chromeMat);
      horse.rotation.z = -Math.PI * 0.24;
      horse.position.z = 0.015;
      const ebOval = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.025, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.4, roughness: 0.25 }));
      ebOval.rotateX(Math.PI / 2);
      ebOval.scale.set(1.35, 1.0, 0.78);
      ebOval.position.set(0, 0.14, 0.038);
      g.add(cavity, horse, ebOval);
      for (let r = -2; r <= 2; r++) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.014, 0.03), darkMat);
        louver.position.set(0, r * 0.065, 0.032);
        g.add(louver);
      }
    } else if (type === 'thar') {
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.52, 0.09), darkMat);
      const trimFrame = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.54, 0.04), chromeMat);
      trimFrame.position.z = -0.02;
      g.add(trimFrame, bezel);
      for (let s = -3; s <= 3; s++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.36, 0.05), chromeMat);
        slot.position.set(s * 0.145, 0, 0.046);
        const core = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.32, 0.06), darkMat);
        core.position.set(s * 0.145, 0, 0.048);
        g.add(slot, core);
      }
    } else if (type === 'scorpio') {
      const shell = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.46, 0.08), darkMat);
      const outer = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.50, 0.04), chromeMat);
      outer.position.z = -0.015;
      g.add(outer, shell);
      for (let s = -2.5; s <= 2.5; s += 1) {
        const fang = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.34, 0.06), chromeMat);
        fang.position.set(s * 0.19, 0, 0.045);
        g.add(fang);
      }
      const emblem = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.025), chromeMat);
      emblem.position.set(0, 0.02, 0.058);
      g.add(emblem);
    } else {
      const shell = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.42, 0.08), darkMat);
      g.add(shell);
      for (let r = -1; r <= 1; r++) {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.032, 0.06), chromeMat);
        slat.position.set(0, r * 0.11, 0.045);
        g.add(slat);
      }
    }
    return g;
  }

  static buildCoupleCharacters(group, config, animState, characterMode = 'couple') {
    const isThar = config.id === 'mahindra_thar';
    const isSuv = isThar || config.id.includes('scorpio') || config.id.includes('safari');
    const isRolls = config.id === 'rolls_royce_spectre';
    const isFormula = config.id === 'formula_pulse';

    const seatY = isThar ? 0.94 : (isSuv ? 0.88 : (isRolls ? 0.64 : 0.35));
    const seatZ = isThar ? -0.18 : (isSuv ? -0.24 : (isRolls ? -0.34 : -0.06));
    const xSep = isSuv ? 0.36 : (isRolls ? 0.34 : 0.28);

    const skinMatA = new THREE.MeshPhysicalMaterial({ color: 0xd99b72, roughness: 0.48, metalness: 0.02, clearcoat: 0.08 });
    const skinMatB = new THREE.MeshPhysicalMaterial({ color: 0xe2a882, roughness: 0.46, metalness: 0.02, clearcoat: 0.08 });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xb94a58, roughness: 0.42 });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const eyeIrisMat = new THREE.MeshBasicMaterial({ color: 0x1e130c });
    const hairDarkMat = new THREE.MeshStandardMaterial({ color: 0x161212, roughness: 0.65 });
    const blazerMat = new THREE.MeshStandardMaterial({ color: 0x162238, roughness: 0.55, metalness: 0.08 });
    const shirtWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.4 });
    const partnerDressMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.42, metalness: 0.14 });
    const stoleMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.55 });
    const goldAccMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.88, roughness: 0.18 });
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x1b1518, roughness: 0.72 });
    const steerMat = new THREE.MeshStandardMaterial({ color: 0x11151c, roughness: 0.35 });

    // Subtle Warm Interior Cabin Dome Light so characters are vividly lit inside luxury roofs
    if (!isFormula) {
      const cabinGlow = new THREE.PointLight(0xffdfb0, 1.35, 3.0);
      cabinGlow.position.set(0, seatY + 0.52, seatZ + 0.12);
      group.add(cabinGlow);
    }

    const addBucketSeat = (parent) => {
      if (isFormula) return;
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.10, 0.44), seatMat);
      cushion.position.set(0, 0.04, 0.06);
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.48, 0.11), seatMat);
      backrest.position.set(0, 0.30, -0.15);
      backrest.rotation.x = -0.16;
      const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.09), seatMat);
      headrest.position.set(0, 0.58, -0.19);
      parent.add(cushion, backrest, headrest);
    };

    const createRealisticPerson = (xPos, isPartner) => {
      const personRoot = new THREE.Group();
      personRoot.name = isPartner ? 'cabin_partner' : 'cabin_driver';
      personRoot.position.set(xPos, seatY, seatZ);
      if (isPartner) animState.partnerCrewRoot = personRoot;
      else animState.driverCrewRoot = personRoot;
      const skinM = isPartner ? skinMatB : skinMatA;

      addBucketSeat(personRoot);

      // Seated Legs / Thighs
      const clothLegMat = isPartner ? partnerDressMat : blazerMat;
      [-0.085, 0.085].forEach((lx) => {
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.052, 0.34, 8), clothLegMat);
        thigh.rotateX(Math.PI / 2 - 0.12);
        thigh.position.set(lx, 0.09, 0.16);
        personRoot.add(thigh);
      });

      // Anatomical Tapered Torso + Tailored Collar / Dress Neckline
      const outfitM = isPartner ? partnerDressMat : blazerMat;
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.12, 0.36, 12), outfitM);
      torso.scale.set(1.18, 1.0, 0.72);
      torso.position.y = 0.25;
      personRoot.add(torso);

      if (isPartner) {
        const stole = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.028, 6, 16, Math.PI * 1.15), stoleMat);
        stole.rotation.x = Math.PI / 2 + 0.18;
        stole.position.set(0, 0.40, 0.01);
        const necklace = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.008, 6, 14), goldAccMat);
        necklace.rotation.x = Math.PI / 2 + 0.25;
        necklace.position.set(0, 0.43, 0.025);
        personRoot.add(stole, necklace);
      } else {
        const shirtV = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.18, 4), shirtWhiteMat);
        shirtV.rotation.x = Math.PI;
        shirtV.position.set(0, 0.34, 0.082);
        const tie = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.16, 0.02), tieMat);
        tie.position.set(0, 0.31, 0.096);
        personRoot.add(shirtV, tie);
      }

      // Neck & Anatomical Sculpted Head + Jaw + Detailed Facial Features
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.056, 0.09, 10), skinM);
      neck.position.y = 0.46;
      personRoot.add(neck);

      const head = new THREE.Group();
      head.position.set(0, 0.56, 0.01);
      const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 14), skinM);
      cranium.scale.set(0.90, 1.08, 0.96);
      const chin = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 10), skinM);
      chin.scale.set(0.88, 0.85, 0.88);
      chin.position.set(0, -0.052, 0.032);
      head.add(cranium, chin);

      // Sculpted Ears
      [-0.096, 0.096].forEach((ex) => {
        const ear = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), skinM);
        ear.scale.set(0.45, 1.25, 0.8);
        ear.position.set(ex, -0.005, -0.01);
        head.add(ear);
        if (isPartner) {
          const earring = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 6), goldAccMat);
          earring.position.set(ex * 1.03, -0.035, -0.005);
          head.add(earring);
        }
      });

      // Nose, Eyes (Sclera + Iris), Brows & Smiling Lips
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.042, 6), skinM);
      nose.rotateX(Math.PI / 2 - 0.15);
      nose.position.set(0, -0.008, 0.104);
      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.012, 0.018), lipMat);
      mouth.position.set(0, -0.052, 0.092);
      head.add(nose, mouth);

      [-0.036, 0.036].forEach((ex) => {
        const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), eyeWhiteMat);
        sclera.position.set(ex, 0.018, 0.092);
        const iris = new THREE.Mesh(new THREE.SphereGeometry(0.009, 8, 8), eyeIrisMat);
        iris.position.set(ex, 0.018, 0.101);
        const brow = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.008, 0.012), hairDarkMat);
        brow.position.set(ex, 0.040, 0.096);
        head.add(sclera, iris, brow);
      });

      // Volumetric Realistic Hair (Zero Cubes!)
      const crownHair = new THREE.Mesh(new THREE.SphereGeometry(0.112, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), hairDarkMat);
      crownHair.scale.set(0.92, 1.06, 0.98);
      crownHair.position.set(0, 0.022, -0.014);
      crownHair.rotation.x = -0.18;
      head.add(crownHair);

      if (isPartner) {
        [-1, 1].forEach((hs) => {
          const wave = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.034, 0.28, 10), hairDarkMat);
          wave.position.set(hs * 0.088, -0.09, -0.035);
          wave.rotation.z = hs * 0.16;
          wave.rotation.x = 0.1;
          head.add(wave);
        });
        const backFlow = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.076, 0.30, 12), hairDarkMat);
        backFlow.scale.set(1.05, 1.0, 0.55);
        backFlow.position.set(0, -0.10, -0.072);
        const hairRose = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), partnerDressMat);
        hairRose.position.set(0.098, 0.03, -0.015);
        head.add(backFlow, hairRose);
        animState.partnerHead = head;
      } else {
        const quiff = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), hairDarkMat);
        quiff.scale.set(1.25, 0.65, 1.0);
        quiff.position.set(0, 0.096, 0.032);
        head.add(quiff);
      }
      personRoot.add(head);

      // Articulated Shoulders, Upper Arms, Forearms & Molded Hands
      [-1, 1].forEach((side) => {
        const sx = side * 0.17;
        const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.052, 8, 8), outfitM);
        shoulder.position.set(sx, 0.39, 0);
        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.036, 0.22, 8), outfitM);
        upperArm.position.set(sx, 0.31, 0.07);
        upperArm.rotation.x = isPartner && side < 0 ? -0.55 : -0.82;
        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.22, 8), isPartner ? skinM : outfitM);
        forearm.position.set(sx * 0.85, 0.25, 0.24);
        forearm.rotation.x = isPartner ? -1.25 : -1.42;
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), skinM);
        hand.scale.set(0.95, 0.72, 1.25);
        hand.position.set(sx * 0.78, isPartner ? 0.23 : 0.30, isPartner ? 0.34 : 0.36);
        personRoot.add(shoulder, upperArm, forearm, hand);
      });

      group.add(personRoot);
    };

    if (isFormula) {
      createRealisticPerson(0, false);
      return;
    }

    // Left-hand Driver always seated at wheel; Partner or clean empty passenger bucket seat by mode
    createRealisticPerson(xSep, false);
    if (characterMode === 'couple') {
      createRealisticPerson(-xSep, true);
    } else {
      const emptySeatRoot = new THREE.Group();
      emptySeatRoot.position.set(-xSep, seatY, seatZ);
      addBucketSeat(emptySeatRoot);
      group.add(emptySeatRoot);
    }

    const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.020, 8, 18), steerMat);
    wheelRim.position.set(xSep, seatY + 0.33, seatZ + 0.36);
    wheelRim.rotation.x = -0.35;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 0.02), steerMat);
    wheelRim.add(spoke);
    group.add(wheelRim);
    animState.steeringRig = wheelRim;
  }

  static buildDateCarDecorations(group, config, dateMode, coupleNames = { partner1: 'Aarav', partner2: 'Meera' }, animState) {
    const isSuv = config.id.includes('thar') || config.id.includes('scorpio') || config.id.includes('safari');
    const isFormula = config.id === 'formula_pulse';
    const hoodY = isSuv ? 1.18 : 0.62;
    const deckY = isSuv ? 1.58 : 0.94;
    const roofY = isSuv ? 1.82 : 1.16;

    const decorGroup = new THREE.Group();
    const redRoseMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.42 });
    const pinkRoseMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.45 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.68 });
    const satinRibbonMat = new THREE.MeshStandardMaterial({ color: 0xfef2f2, roughness: 0.25, metalness: 0.15 });
    const candleWaxMat = new THREE.MeshStandardMaterial({ color: 0xfff8e7, roughness: 0.4 });
    const lanternGlassMat = new THREE.MeshPhysicalMaterial({ color: 0xfff5e6, roughness: 0.1, transparent: true, opacity: 0.36 });
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
    const rubyHeartMat = new THREE.MeshStandardMaterial({ color: 0xff2a6d, emissive: 0x7a092c, emissiveIntensity: 0.6, roughness: 0.25, metalness: 0.3 });
    const fairyMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.2 });

    // 1. Sculpted 3D Multi-Petal Rose Bouquet Crest, Twin Satin Bow & Hood V-Ribbon
    if (!isFormula) {
      const noseZ = isSuv ? 1.72 : 1.78;
      const pillarZ = isSuv ? 0.62 : 0.68;
      const bouqCenter = new THREE.Group();
      bouqCenter.position.set(0, hoodY + 0.08, noseZ - 0.15);
      for (let i = 0; i < 9; i++) {
        const ang = (i / 9) * Math.PI * 2;
        const rose3D = this.create3DRose(i % 2 === 0 ? redRoseMat : pinkRoseMat, leafMat, 1.35);
        rose3D.position.set(Math.cos(ang) * 0.13, (i % 3) * 0.025, Math.sin(ang) * 0.11);
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.055), leafMat);
        leaf.position.set(Math.cos(ang) * 0.19, 0.01, Math.sin(ang) * 0.16);
        leaf.rotation.y = -ang;
        bouqCenter.add(rose3D, leaf);
      }
      // 3D Satin Bow Loops beside Bouquet
      [-1, 1].forEach((bs) => {
        const bowLoop = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.018, 6, 14), satinRibbonMat);
        bowLoop.rotation.x = Math.PI / 2;
        bowLoop.position.set(bs * 0.09, 0.04, 0.14);
        bouqCenter.add(bowLoop);
      });
      decorGroup.add(bouqCenter);

      [-1, 1].forEach((side) => {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.022, 1.25), satinRibbonMat);
        rib.position.set(side * 0.34, hoodY + 0.06, (noseZ + pillarZ) * 0.5);
        rib.rotation.y = side * 0.42;
        rib.rotation.x = isSuv ? -0.06 : -0.14;
        decorGroup.add(rib);

        // Side Mirror 3D Sculpted Rose Cluster
        const mirrorRose = this.create3DRose(redRoseMat, leafMat, 1.15);
        mirrorRose.position.set(side * 0.94, hoodY + 0.27, pillarZ - 0.15);
        decorGroup.add(mirrorRose);
      });
    }

    // 2. Warm Fairy Lights Garland around Roofline & Rear Deck
    if (dateMode === 'romance' || dateMode === 'candlelight') {
      const bulbGeo = new THREE.SphereGeometry(0.036, 8, 8);
      for (let i = 0; i < 14; i++) {
        const frac = i / 13;
        const side = i % 2 === 0 ? -1 : 1;
        const bulb = new THREE.Mesh(bulbGeo, fairyMat);
        bulb.position.set(side * 0.58, roofY - 0.06, 0.3 - frac * 1.9);
        decorGroup.add(bulb);
        animState.fairyBulbs.push(bulb);
      }
    }

    // 3. 3D Hurricane Glass Lantern Pillar Candles (Rear Deck / Hood Cowl)
    if (!isFormula) {
      const candleOffsets = isSuv
        ? [[-0.56, hoodY + 0.06, 1.05], [0.56, hoodY + 0.06, 1.05], [-0.48, deckY + 0.08, -1.78], [0.48, deckY + 0.08, -1.78]]
        : [[-0.48, deckY + 0.04, -1.35], [0.48, deckY + 0.04, -1.35], [-0.54, hoodY + 0.06, 0.95], [0.54, hoodY + 0.06, 0.95]];

      candleOffsets.forEach(([cx, cy, cz]) => {
        const brassRim = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.076, 0.025, 12), goldMat);
        brassRim.position.set(cx, cy + 0.012, cz);
        const glassTube = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.21, 12, 1, true), lanternGlassMat);
        glassTube.position.set(cx, cy + 0.11, cz);
        const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.050, 0.14, 10), candleWaxMat);
        jar.position.set(cx, cy + 0.08, cz);
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.034, 0.105, 8), flameMat);
        flame.position.set(cx, cy + 0.19, cz);
        decorGroup.add(brassRim, glassTube, jar, flame);
        animState.candleFlames.push(flame);
      });
    }

    // 4. 3D Beveled Custom Couple Heart Name Board Cassette + Sculpted 3D Ruby Hearts
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, isSuv ? 1.50 : deckY + 0.26, isSuv ? -1.92 : -1.65);

    const n1 = (coupleNames?.partner1 || 'Aarav').trim().slice(0, 14).toUpperCase();
    const n2 = (coupleNames?.partner2 || 'Meera').trim().slice(0, 14).toUpperCase();

    const hCanvas = document.createElement('canvas');
    hCanvas.width = 512; hCanvas.height = 192;
    const hCtx = hCanvas.getContext('2d');
    const hGrad = hCtx.createLinearGradient(0, 0, 512, 192);
    hGrad.addColorStop(0, '#36071c');
    hGrad.addColorStop(0.5, '#660e34');
    hGrad.addColorStop(1, '#36071c');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 512, 192);
    hCtx.strokeStyle = '#ff6b9d';
    hCtx.lineWidth = 10;
    hCtx.strokeRect(8, 8, 496, 176);
    hCtx.fillStyle = '#ffd166';
    hCtx.font = 'bold 24px Rajdhani, sans-serif';
    hCtx.textAlign = 'center';
    hCtx.fillText('♥ S3D DATE DRIVE ♥', 256, 48);
    hCtx.fillStyle = '#ffffff';
    hCtx.font = 'bold 38px Orbitron, sans-serif';
    hCtx.fillText(`${n1} ♥ ${n2}`, 256, 114);
    hCtx.fillStyle = '#fecdd3';
    hCtx.font = 'bold 20px Rajdhani, sans-serif';
    hCtx.fillText('FOREVER TOGETHER', 256, 160);

    const heartTex = new THREE.CanvasTexture(hCanvas);
    if (THREE.sRGBEncoding) heartTex.encoding = THREE.sRGBEncoding;

    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.50, 0.58, 0.08), goldMat);
    const faceMat = new THREE.MeshStandardMaterial({ map: heartTex, roughness: 0.35, metalness: 0.12 });
    const tablet = new THREE.Mesh(
      new THREE.BoxGeometry(1.42, 0.50, 0.11),
      [goldMat, goldMat, goldMat, goldMat, faceMat, faceMat]
    );

    // Sculpted 3D Extruded Ruby Hearts Flanking & Crowning the Nameplate
    const heartGeoSmall = this.createHeart3DGeometry(0.11, 0.045);
    [-0.82, 0.82].forEach((hx) => {
      const hSculpt = new THREE.Mesh(heartGeoSmall, rubyHeartMat);
      hSculpt.position.set(hx, 0.02, 0);
      boardGroup.add(hSculpt);
    });

    const stanchL = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.028, 0.28, 8), goldMat);
    stanchL.position.set(-0.45, -0.25, 0);
    const stanchR = stanchL.clone();
    stanchR.position.x = 0.45;

    boardGroup.add(frame, tablet, stanchL, stanchR);
    decorGroup.add(boardGroup);
    group.add(decorGroup);
  }

  static buildEquipmentAero(equipGroup, carbonMat, accentMat, config, { spoilerStyle = 0, aeroKit = 0 } = {}) {
    const isSuv = config.id.includes('thar') || config.id.includes('scorpio') || config.id.includes('safari');
    const isFormula = config.id === 'formula_pulse';
    const deckY = isSuv ? 1.56 : 0.92;
    const deckZ = isSuv ? -1.85 : -2.02;

    if (!isFormula && spoilerStyle > 0 && spoilerStyle < 3) {
      if (spoilerStyle === 1) {
        // Sleek Carbon GT Lip / High Deck Wing
        const lipWing = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.055, 0.28), carbonMat);
        lipWing.position.set(0, deckY + 0.14, deckZ);
        [-0.55, 0.55].forEach((px) => {
          const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.18), carbonMat);
          pylon.position.set(px, deckY + 0.06, deckZ);
          equipGroup.add(pylon);
        });
        equipGroup.add(lipWing);
      } else if (spoilerStyle === 2) {
        // GT3 Swan-Neck Endurance Wing with Endplates
        const wingY = deckY + (isSuv ? 0.22 : 0.38);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.05, 0.36), carbonMat);
        blade.position.set(0, wingY, deckZ - 0.04);
        blade.rotation.x = 0.09;
        equipGroup.add(blade);

        [-0.48, 0.48].forEach((px) => {
          const swan = new THREE.Mesh(new THREE.BoxGeometry(0.045, wingY - deckY + 0.14, 0.18), carbonMat);
          swan.position.set(px, (wingY + deckY) * 0.5, deckZ + 0.02);
          equipGroup.add(swan);
        });

        [-0.99, 0.99].forEach((ex) => {
          const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.28, 0.44), carbonMat);
          endplate.position.set(ex, wingY - 0.03, deckZ - 0.04);
          const trim = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.04, 0.40), accentMat);
          trim.position.set(ex, wingY + 0.08, deckZ - 0.04);
          equipGroup.add(endplate, trim);
        });
      }
    }

    if (!isFormula && aeroKit > 0) {
      const splitY = isSuv ? 0.26 : 0.10;
      const frontZ = isSuv ? 2.10 : 2.18;
      const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.045, 0.36), carbonMat);
      splitter.position.set(0, splitY, frontZ);
      const lipTrim = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.018, 0.06), accentMat);
      lipTrim.position.set(0, splitY + 0.02, frontZ + 0.16);
      equipGroup.add(splitter, lipTrim);

      if (aeroKit === 2) {
        // Time-Attack Side Skirts & Front Dive-Plane Canards
        [-1, 1].forEach((side) => {
          const canard = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.26), carbonMat);
          canard.position.set(side * 0.96, splitY + 0.14, frontZ - 0.18);
          canard.rotation.z = side * 0.22;
          const proSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 2.05), carbonMat);
          proSkirt.position.set(side * 0.98, splitY + 0.02, 0);
          equipGroup.add(canard, proSkirt);
        });
      }
    }
  }

  // =========================================
  // GRAPHICAL TEXTURE & GEOMETRY HELPERS
  // =========================================
  static createSculptedProfile(shape, width, bevelSize = 0.06, bevelThickness = 0.1, curveSegments = 12) {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: width,
      bevelEnabled: bevelSize > 0 && bevelThickness > 0,
      bevelSize,
      bevelThickness,
      bevelSegments: 4,
      curveSegments
    });
    geo.translate(0, 0, -width / 2);
    geo.rotateY(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Generates an organic multi-section 3D automotive shell along Z with nose taper,
   * door waist pinch, arched fenders, crowned hood/deck, and recessed wheel-well clearance.
   */
  static createLoftedShell(sections, archSpec = null) {
    // Each station defines a 12-point clockwise ring around (X, Y):
    // 0: centerCrown, 1: upperCrownR, 2: beltR, 3: shoulderR, 4: lowerR, 5: rockerR,
    // 6: centerBot, 7: rockerL, 8: lowerL, 9: shoulderL, 10: beltL, 11: upperCrownL
    const ringPts = 12;
    const rings = sections.map((s) => {
      let sideScale = 1.0;
      if (archSpec) {
        const dzF = Math.abs(s.z - archSpec.frontZ);
        const dzR = Math.abs(s.z - archSpec.rearZ);
        const minDz = Math.min(dzF, dzR);
        const archHalf = (archSpec.wheelR || 0.39) * 1.02;
        if (minDz < archHalf) {
          const factor = Math.sqrt(Math.max(0, 1 - (minDz / archHalf) ** 2));
          sideScale = 1.0 - factor * (archSpec.pinch || 0.16);
        }
      }
      const w = s.halfW;
      const wShoulder = w * sideScale;
      const wLower = w * (0.95 * sideScale);
      const wRocker = w * (0.80 * sideScale);
      const wBelt = w * (0.90 - (s.tumble || 0.06) * 0.4);
      const wCrown = w * (0.46 - (s.tumble || 0.06));
      const yUpper = s.beltY + (s.centerY - s.beltY) * 0.68;

      return [
        [0, s.centerY],
        [wCrown, yUpper],
        [wBelt, s.beltY],
        [wShoulder, s.shoulderY],
        [wLower, s.lowerY],
        [wRocker, s.botY],
        [0, s.botY],
        [-wRocker, s.botY],
        [-wLower, s.lowerY],
        [-wShoulder, s.shoulderY],
        [-wBelt, s.beltY],
        [-wCrown, yUpper]
      ];
    });

    const positions = [];
    const uvs = [];
    const indices = [];
    const zMin = sections[0].z;
    const zSpan = Math.max(0.1, sections[sections.length - 1].z - zMin);

    for (let i = 0; i < sections.length; i++) {
      const z = sections[i].z;
      const vCoord = (z - zMin) / zSpan;
      for (let k = 0; k < ringPts; k++) {
        positions.push(rings[i][k][0], rings[i][k][1], z);
        uvs.push(k / ringPts, vCoord);
      }
    }

    for (let i = 0; i < sections.length - 1; i++) {
      const r0 = i * ringPts;
      const r1 = (i + 1) * ringPts;
      for (let k = 0; k < ringPts; k++) {
        const nk = (k + 1) % ringPts;
        const a = r0 + k;
        const b = r0 + nk;
        const c = r1 + k;
        const d = r1 + nk;
        // Outward winding when ring progresses clockwise in (X, Y)
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    // Close rear (-Z) and front (+Z) end caps
    const first = sections[0];
    const rearCenterIdx = positions.length / 3;
    positions.push(0, (first.botY + first.centerY) * 0.5, first.z);
    uvs.push(0.5, 0);
    for (let k = 0; k < ringPts; k++) {
      const nk = (k + 1) % ringPts;
      indices.push(rearCenterIdx, k, nk);
    }

    const last = sections[sections.length - 1];
    const lastBase = (sections.length - 1) * ringPts;
    const frontCenterIdx = positions.length / 3;
    positions.push(0, (last.botY + last.centerY) * 0.5, last.z);
    uvs.push(0.5, 1);
    for (let k = 0; k < ringPts; k++) {
      const nk = (k + 1) % ringPts;
      indices.push(frontCenterIdx, lastBase + nk, lastBase + k);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  /**
   * Builds a sculpted automotive greenhouse with solid painted roof, sloped A/B/C pillars,
   * dark ceramic glass trim, curved windshield & rear window, and side glass.
   */
  static addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, spec) {
    const {
      frontCowlZ = 0.85,
      windTopZ = 0.25,
      roofRearZ = -0.78,
      rearDeckZ = -1.42,
      beltY = 0.64,
      roofY = 1.06,
      beltHalfW = 0.72,
      roofHalfW = 0.54,
      roofMat = bodyMat,
      pillarMat = darkMat
    } = spec;

    // 1. Crowned Painted / Carbon Roof Skin
    const roofGeo = this.createLoftedShell([
      { z: rearDeckZ + (roofRearZ - rearDeckZ) * 0.18, halfW: beltHalfW * 0.82, botY: beltY + 0.14, lowerY: beltY + 0.16, shoulderY: beltY + 0.18, beltY: beltY + 0.19, centerY: beltY + 0.20, tumble: 0.08 },
      { z: roofRearZ, halfW: roofHalfW + 0.03, botY: roofY - 0.04, lowerY: roofY - 0.03, shoulderY: roofY - 0.01, beltY: roofY, centerY: roofY + 0.035, tumble: 0.06 },
      { z: (roofRearZ + windTopZ) * 0.5, halfW: roofHalfW + 0.04, botY: roofY - 0.035, lowerY: roofY - 0.02, shoulderY: roofY, beltY: roofY + 0.01, centerY: roofY + 0.045, tumble: 0.06 },
      { z: windTopZ, halfW: roofHalfW, botY: roofY - 0.045, lowerY: roofY - 0.03, shoulderY: roofY - 0.01, beltY: roofY - 0.005, centerY: roofY + 0.025, tumble: 0.06 }
    ]);
    group.add(new THREE.Mesh(roofGeo, roofMat));

    // 2. Inset Tinted Glass Greenhouse Core
    const glassGeo = this.createLoftedShell([
      { z: rearDeckZ, halfW: beltHalfW * 0.90, botY: beltY - 0.02, lowerY: beltY, shoulderY: beltY + 0.02, beltY: beltY + 0.04, centerY: beltY + 0.06, tumble: 0.10 },
      { z: roofRearZ, halfW: roofHalfW - 0.01, botY: beltY - 0.02, lowerY: beltY + 0.14, shoulderY: roofY - 0.05, beltY: roofY - 0.02, centerY: roofY + 0.01, tumble: 0.08 },
      { z: windTopZ, halfW: roofHalfW - 0.02, botY: beltY - 0.02, lowerY: beltY + 0.14, shoulderY: roofY - 0.05, beltY: roofY - 0.025, centerY: roofY, tumble: 0.08 },
      { z: frontCowlZ, halfW: beltHalfW * 0.92, botY: beltY - 0.04, lowerY: beltY - 0.02, shoulderY: beltY, beltY: beltY + 0.02, centerY: beltY + 0.04, tumble: 0.10 }
    ]);
    group.add(new THREE.Mesh(glassGeo, glassMat));

    // 3. Structural A / B / C Pillars framing the glass
    const addPillar = (x0, y0, z0, x1, y1, z1, thick = 0.055, mat = pillarMat) => {
      const p0 = new THREE.Vector3(x0, y0, z0);
      const p1 = new THREE.Vector3(x1, y1, z1);
      const len = p0.distanceTo(p1);
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(thick, len, thick * 1.1), mat);
      pillar.position.copy(p0).lerp(p1, 0.5);
      pillar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p1.clone().sub(p0).normalize());
      group.add(pillar);
    };

    [-1, 1].forEach((side) => {
      // Sloped A-pillars
      addPillar(side * beltHalfW * 0.91, beltY, frontCowlZ, side * roofHalfW, roofY - 0.01, windTopZ, 0.052, bodyMat);
      // B-pillar behind front seats
      addPillar(side * beltHalfW * 0.92, beltY + 0.01, -0.22, side * (roofHalfW + 0.01), roofY - 0.01, -0.26, 0.058, pillarMat);
      // Swept C-pillars
      addPillar(side * beltHalfW * 0.90, beltY + 0.01, rearDeckZ + 0.12, side * roofHalfW, roofY - 0.01, roofRearZ, 0.072, bodyMat);
      // Door window horizontal weatherstrip trim
      const sillLen = Math.max(0.4, frontCowlZ - rearDeckZ);
      const sill = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.026, sillLen * 0.85), darkMat);
      sill.position.set(side * beltHalfW * 0.94, beltY + 0.01, (frontCowlZ + rearDeckZ) * 0.5);
      group.add(sill);
    });
  }

  /**
   * Detailed cockpit interior (tub, dual sport/luxury bolstered seats, dashboard + glowing digital gauges).
   */
  static buildDetailedInterior(group, darkMat, accentMat, seatY = 0.36, seatZ = -0.08, xSep = 0.28, trimColor = 0x1e2430) {
    const dashMat = new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.72, metalness: 0.2 });
    const leatherMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.56, metalness: 0.14 });
    const clusterMat = new THREE.MeshBasicMaterial({ map: getClusterTexture() });

    const tub = new THREE.Mesh(new THREE.BoxGeometry(xSep * 2 + 0.44, 0.24, 1.38), darkMat);
    tub.position.set(0, seatY - 0.10, seatZ + 0.22);
    const consoleTunnel = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 1.25), dashMat);
    consoleTunnel.position.set(0, seatY + 0.06, seatZ + 0.25);
    const dashCowl = new THREE.Mesh(new THREE.BoxGeometry(xSep * 2 + 0.42, 0.18, 0.34), dashMat);
    dashCowl.position.set(0, seatY + 0.24, seatZ + 0.68);
    const cluster = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.11), clusterMat);
    cluster.position.set(0, seatY + 0.26, seatZ + 0.50);
    cluster.rotation.y = Math.PI;
    group.add(tub, consoleTunnel, dashCowl, cluster);

    [-xSep, xSep].forEach((sx) => {
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.09, 0.36), leatherMat);
      cushion.position.set(sx, seatY - 0.02, seatZ);
      const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.42, 0.09), leatherMat);
      seatBack.position.set(sx, seatY + 0.19, seatZ - 0.17);
      seatBack.rotation.x = -0.18;
      const headRest = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.13, 0.08), leatherMat);
      headRest.position.set(sx, seatY + 0.45, seatZ - 0.22);
      [-1, 1].forEach((bs) => {
        const bolster = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.32, 0.12), leatherMat);
        bolster.position.set(sx + bs * 0.15, seatY + 0.16, seatZ - 0.13);
        bolster.rotation.x = -0.18;
        group.add(bolster);
      });
      group.add(cushion, seatBack, headRest);
    });
  }

  /**
   * Realistic 3D multi-layered projector LED headlight with dark bezel, chrome reflector, optic lens & glass cover.
   */
  static buildProjectorHeadlight(group, x, y, z, width, height, headMat, chromeMat, darkMat, accentMat, drlPos = 'bottom', yaw = 0) {
    const hlGroup = new THREE.Group();
    hlGroup.position.set(x, y, z);
    hlGroup.rotation.y = yaw;

    const housing = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.12), darkMat);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(height * 0.36, height * 0.24, 0.07, 16), chromeMat);
    bowl.rotateX(Math.PI / 2);
    bowl.position.set(0, 0, 0.03);

    const projector = new THREE.Mesh(new THREE.SphereGeometry(height * 0.26, 14, 12), headMat);
    projector.scale.set(1.0, 1.0, 0.55);
    projector.position.set(0, 0, 0.052);

    const glassCover = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.96, height * 0.94, 0.02),
      new THREE.MeshPhysicalMaterial({ color: 0xeaf4ff, transparent: true, opacity: 0.26, roughness: 0.03, clearcoat: 1.0 })
    );
    glassCover.position.set(0, 0, 0.072);

    const drlY = drlPos === 'top' ? height * 0.42 : -height * 0.40;
    const drl = new THREE.Mesh(new THREE.BoxGeometry(width * 0.94, 0.026, 0.04), accentMat || headMat);
    drl.position.set(0, drlY, 0.062);

    hlGroup.add(housing, bowl, projector, drl, glassCover);
    group.add(hlGroup);
    return hlGroup;
  }

  /**
   * Realistic recessed smoked taillight assembly with dark housing & translucent ruby lens.
   */
  static buildTaillightCluster(group, x, y, z, width, height, tailMat, darkMat, chromeMat = null) {
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(width + 0.04, height + 0.03, 0.08), darkMat);
    bezel.position.set(x, y, z + 0.01);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.055), tailMat);
    lens.position.set(x, y, z - 0.018);
    group.add(bezel, lens);
    if (chromeMat) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.88, 0.016, 0.03), chromeMat);
      strip.position.set(x, y, z - 0.042);
      group.add(strip);
    }
  }

  /**
   * Exterior automotive details: Indian DL 01 VR 549 HSRP plates, flush door handles, door seams, side vents & wipers.
   */
  static addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, opts = {}) {
    const { halfW = 0.94, frontZ = 2.18, rearZ = -2.18, plateRearY = 0.44, plateFrontY = 0.24, handleY = 0.64, cowlY = 0.66, cowlZ = 0.84, includeFrontPlate = true } = opts;

    const plateMat = new THREE.MeshStandardMaterial({ map: getPlateTexture(), roughness: 0.35, metalness: 0.25 });
    const plateGeo = new THREE.BoxGeometry(0.44, 0.105, 0.018);

    const rearPlate = new THREE.Mesh(plateGeo, plateMat);
    rearPlate.position.set(0, plateRearY, rearZ - 0.02);
    rearPlate.rotation.y = Math.PI;
    group.add(rearPlate);

    if (includeFrontPlate) {
      const frontPlate = new THREE.Mesh(plateGeo, plateMat);
      frontPlate.position.set(0, plateFrontY, frontZ + 0.02);
      group.add(frontPlate);
    }

    // Flush door handles + vertical door shutline creases + side aero vents
    [-1, 1].forEach((side) => {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.026, 0.16), chromeMat);
      handle.position.set(side * (halfW - 0.02), handleY, -0.24);
      const frontSeam = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.38, 0.015), darkMat);
      frontSeam.position.set(side * (halfW - 0.025), handleY - 0.12, 0.68);
      const rearSeam = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.38, 0.015), darkMat);
      rearSeam.position.set(side * (halfW - 0.025), handleY - 0.12, -0.52);
      const sideVent = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.24), darkMat);
      sideVent.position.set(side * (halfW - 0.03), handleY - 0.14, 0.78);
      group.add(handle, frontSeam, rearSeam, sideVent);
    });

    // Twin windshield wipers resting cleanly at base cowl
    [-0.24, 0.26].forEach((wx) => {
      const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.016, 0.018), darkMat);
      wiper.position.set(wx, cowlY + 0.015, cowlZ + 0.04);
      wiper.rotation.y = 0.08;
      group.add(wiper);
    });
  }

  static makeGrilleTexture(style = 'thar') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0c0e14';
    ctx.fillRect(0, 0, 512, 192);

    if (style === 'thar') {
      for (let i = 0; i < 7; i++) {
        const x = 112 + i * 44;
        ctx.fillStyle = '#252a35';
        ctx.fillRect(x - 3, 18, 30, 156);
        ctx.fillStyle = '#07090d';
        ctx.fillRect(x, 22, 24, 148);
      }
      ctx.strokeStyle = '#d8dee9';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(58, 96, 36, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(454, 96, 36, 0, Math.PI * 2); ctx.stroke();
    } else if (style === 'scorpio') {
      ctx.fillStyle = '#11151d';
      ctx.fillRect(72, 24, 368, 144);
      for (let i = 0; i < 6; i++) {
        const x = 96 + i * 56;
        ctx.fillStyle = '#dce3ee';
        ctx.fillRect(x, 30, 14, 132);
        ctx.fillStyle = '#788496';
        ctx.fillRect(x + 14, 30, 6, 132);
      }
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 5;
      ctx.strokeRect(72, 24, 368, 144);
    } else if (style === 'safari') {
      ctx.fillStyle = '#0d121a';
      ctx.fillRect(60, 26, 392, 140);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 10; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? '#cbd5e1' : '#64748b';
          ctx.fillRect(82 + col * 36 + (row % 2) * 14, 38 + row * 30, 22, 10);
        }
      }
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(226, 86, 60, 16);
    } else if (style === 'bugatti') {
      ctx.fillStyle = '#080a0f';
      ctx.fillRect(0, 0, 512, 192);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(156, 184);
      ctx.lineTo(156, 84);
      ctx.arc(256, 84, 100, Math.PI, 0, false);
      ctx.lineTo(356, 184);
      ctx.stroke();
      ctx.fillStyle = '#1e293b';
      for (let y = 32; y < 176; y += 16) {
        for (let x = 172; x < 340; x += 18) {
          ctx.fillRect(x + (y % 32 === 0 ? 6 : 0), y, 8, 8);
        }
      }
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.ellipse(256, 46, 22, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'rolls') {
      ctx.fillStyle = '#0b0e14';
      ctx.fillRect(108, 12, 296, 168);
      for (let i = 0; i < 16; i++) {
        const x = 122 + i * 17;
        const grad = ctx.createLinearGradient(x, 0, x + 10, 0);
        grad.addColorStop(0, '#94a3b8');
        grad.addColorStop(0.5, '#f8fafc');
        grad.addColorStop(1, '#64748b');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 20, 10, 152);
      }
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 8;
      ctx.strokeRect(108, 12, 296, 168);
    }

    const tex = new THREE.CanvasTexture(canvas);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  static addWheelArches(group, trackHalfWidth, frontZ, rearZ, wheelR, flareMat, linerMat, flareWidth = 0.18) {
    const archRadius = wheelR + 0.055;
    const archGeo = new THREE.TorusGeometry(archRadius, flareWidth * 0.42, 10, 24, Math.PI * 1.06);
    archGeo.rotateY(Math.PI / 2);

    const tubGeo = new THREE.CylinderGeometry(archRadius - 0.015, archRadius - 0.015, 0.36, 18, 1, false, 0, Math.PI);
    tubGeo.rotateZ(Math.PI / 2);
    tubGeo.rotateX(Math.PI / 2);
    const wellBackGeo = new THREE.CircleGeometry(archRadius - 0.02, 18, 0, Math.PI);
    wellBackGeo.rotateY(Math.PI / 2);

    [frontZ, rearZ].forEach((zPos) => {
      [-1, 1].forEach((side) => {
        const flare = new THREE.Mesh(archGeo, flareMat);
        flare.position.set(side * (trackHalfWidth - 0.015), wheelR, zPos);
        flare.scale.set(0.88, 1.04, 1.06);
        group.add(flare);

        const liner = new THREE.Mesh(tubGeo, linerMat);
        liner.position.set(side * (trackHalfWidth - 0.14), wheelR, zPos);
        const backPlate = new THREE.Mesh(wellBackGeo, linerMat);
        backPlate.position.set(side * (trackHalfWidth - 0.31), wheelR, zPos);
        if (side < 0) backPlate.rotation.y += Math.PI;
        group.add(liner, backPlate);
      });
    });
  }

  static addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, positions, yPos, zPos, width = 1.75) {
    const diffuserBase = new THREE.Mesh(new THREE.BoxGeometry(width, 0.15, 0.44), carbonMat);
    diffuserBase.position.set(0, 0.14, zPos + 0.08);
    group.add(diffuserBase);

    const finGeo = new THREE.BoxGeometry(0.032, 0.17, 0.38);
    [-0.58, -0.22, 0.22, 0.58].forEach((fx) => {
      const fin = new THREE.Mesh(finGeo, carbonMat);
      fin.position.set(fx * (width / 1.75), 0.15, zPos - 0.04);
      group.add(fin);
    });

    const pipeOuterGeo = new THREE.CylinderGeometry(0.068, 0.074, 0.18, 16);
    pipeOuterGeo.rotateX(Math.PI / 2);
    const pipeCoreGeo = new THREE.CylinderGeometry(0.050, 0.050, 0.19, 14);
    pipeCoreGeo.rotateX(Math.PI / 2);

    positions.forEach((px) => {
      const outer = new THREE.Mesh(pipeOuterGeo, chromeMat);
      outer.position.set(px, yPos, zPos - 0.06);
      const bore = new THREE.Mesh(pipeCoreGeo, darkMat);
      bore.position.set(px, yPos, zPos - 0.072);
      group.add(outer, bore);
    });
  }

  static addSideSkirtsAndMirrors(group, bodyMat, carbonMat, halfW, mirrorY, mirrorZ) {
    const skirtGeo = new THREE.BoxGeometry(0.14, 0.065, 1.84);
    const bladeGeo = new THREE.BoxGeometry(0.035, 0.10, 0.38);
    const mirrorGlassMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, metalness: 0.98, roughness: 0.04 });

    [-1, 1].forEach((side) => {
      const skirt = new THREE.Mesh(skirtGeo, carbonMat);
      skirt.position.set(side * (halfW - 0.02), 0.13, 0);
      group.add(skirt);

      const blade = new THREE.Mesh(bladeGeo, carbonMat);
      blade.position.set(side * (halfW + 0.015), 0.16, -0.78);
      group.add(blade);

      const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, 0.055), carbonMat);
      stalk.position.set(side * (halfW - 0.13), mirrorY - 0.02, mirrorZ);
      stalk.rotation.z = side * 0.28;

      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.088, 12, 10), bodyMat);
      cap.scale.set(1.38, 0.68, 0.92);
      cap.position.set(side * (halfW - 0.02), mirrorY + 0.01, mirrorZ - 0.01);

      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.065, 0.015), mirrorGlassMat);
      lens.position.set(side * (halfW - 0.02), mirrorY + 0.01, mirrorZ - 0.07);
      group.add(stalk, cap, lens);
    });
  }

  // =========================================
  // REALISTIC WHEELS, DRILLED ROTORS & TIRES
  // =========================================
  static createRealisticWheel(radius = 0.38, width = 0.3, rimStyle = 0, isOffroad = false) {
    const wheelGroup = new THREE.Group();
    const treadMaps = getTireTreadTexture();

    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 36);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x16181e,
      map: treadMaps.map,
      roughness: isOffroad ? 0.92 : 0.80,
      metalness: 0.06
    });
    const tire = new THREE.Mesh(tireGeo, tireMat);
    wheelGroup.add(tire);

    const sidewallMat = new THREE.MeshStandardMaterial({ color: 0x14161c, roughness: 0.85, metalness: 0.05 });
    const sidewallGeo = new THREE.TorusGeometry(radius * 0.89, radius * (isOffroad ? 0.12 : 0.095), 10, 32);
    const sidewallL = new THREE.Mesh(sidewallGeo, sidewallMat);
    sidewallL.rotation.y = Math.PI / 2;
    sidewallL.position.x = -width * 0.44;
    const sidewallR = sidewallL.clone();
    sidewallR.position.x = width * 0.44;
    wheelGroup.add(sidewallL, sidewallR);

    if (isOffroad) {
      const treadGeo = new THREE.BoxGeometry(width * 0.96, 0.036, 0.092);
      for (let t = 0; t < 18; t++) {
        const ang = (t / 18) * Math.PI * 2;
        const lug = new THREE.Mesh(treadGeo, sidewallMat);
        lug.position.set(0, Math.cos(ang) * radius, Math.sin(ang) * radius);
        lug.rotation.x = -ang;
        wheelGroup.add(lug);
      }
    } else {
      const stripeMat = new THREE.MeshStandardMaterial({
        color: rimStyle === 1 ? 0x00e5ff : (rimStyle === 2 ? 0xfbbf24 : 0xdc2626),
        roughness: 0.3,
        metalness: 0.6
      });
      const stripe = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.79, 0.006, 6, 36), stripeMat);
      stripe.rotation.y = Math.PI / 2;
      stripe.position.x = -width * 0.505;
      wheelGroup.add(stripe);
    }

    const rimScale = isOffroad ? 0.62 : 0.78;
    const rotorMaps = getBrakeRotorMaps();
    const rotorGeo = new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, width * 0.24, 28);
    rotorGeo.rotateZ(Math.PI / 2);
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0xa6b0be,
      map: rotorMaps.map,
      metalness: 0.92,
      roughness: 0.26,
      envMapIntensity: 1.5
    });
    const rotor = new THREE.Mesh(rotorGeo, rotorMat);
    rotor.name = 'brake_rotor';
    wheelGroup.add(rotor);

    const caliperMat = new THREE.MeshPhysicalMaterial({
      color: rimStyle === 1 ? 0x00d8ff : 0xe01122,
      metalness: 0.55,
      roughness: 0.22,
      clearcoat: 0.9
    });
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(width * 0.44, radius * 0.42, radius * 0.30), caliperMat);
    caliper.name = 'brake_caliper';
    caliper.position.set(-width * 0.05, radius * 0.32, 0.10);
    wheelGroup.add(caliper);

    const rimMat = new THREE.MeshStandardMaterial({
      color: isOffroad ? 0x22262f : ((rimStyle === 1) ? 0xc8d8e8 : (rimStyle === 2 ? 0xd4a938 : 0xe2e8f0)),
      metalness: 0.96,
      roughness: isOffroad ? 0.28 : 0.09,
      envMapIntensity: 1.85
    });

    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x0f1218, metalness: 0.8, roughness: 0.35 });
    const innerBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * rimScale * 0.96, radius * rimScale * 0.96, width * 0.94, 28, 1, true),
      barrelMat
    );
    innerBarrel.rotateZ(Math.PI / 2);
    wheelGroup.add(innerBarrel);

    const rimLip = new THREE.Mesh(
      new THREE.TorusGeometry(radius * rimScale, 0.018, 10, 34),
      rimMat
    );
    rimLip.rotation.y = Math.PI / 2;
    rimLip.position.x = -width * 0.49;
    wheelGroup.add(rimLip);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.19, radius * 0.21, width * 1.03, 18), rimMat);
    hub.rotateZ(Math.PI / 2);
    wheelGroup.add(hub);

    // 5 Chrome Lug Bolts around center hub
    const lugGeo = new THREE.CylinderGeometry(0.012, 0.012, width * 1.05, 6);
    lugGeo.rotateZ(Math.PI / 2);
    for (let l = 0; l < 5; l++) {
      const a = (l / 5) * Math.PI * 2;
      const lug = new THREE.Mesh(lugGeo, rimMat);
      lug.position.set(0, Math.cos(a) * radius * 0.12, Math.sin(a) * radius * 0.12);
      wheelGroup.add(lug);
    }

    // Concave Forged Y-Spoke / Multi-Spoke Geometry
    const spokePairs = (rimStyle === 1) ? 7 : (rimStyle === 2 ? 10 : 5);
    const spokeLen = radius * rimScale * 0.92;
    for (let s = 0; s < spokePairs; s++) {
      const baseAng = (s / spokePairs) * Math.PI * 2;
      [-0.14, 0.14].forEach((offsetAng) => {
        const ang = baseAng + offsetAng;
        const spoke = new THREE.Mesh(
          new THREE.BoxGeometry(0.024, spokeLen, isOffroad ? 0.045 : 0.026),
          rimMat
        );
        spoke.position.set(-width * 0.36, Math.cos(ang) * spokeLen * 0.48, Math.sin(ang) * spokeLen * 0.48);
        spoke.rotation.x = -ang;
        spoke.rotation.z = -0.14; // Dish concavity into center hub
        wheelGroup.add(spoke);
      });
    }

    return { group: wheelGroup, tire };
  }

  // =========================================
  // BUGATTI CHIRON PUR SPORT (SCULPTED W16 HYPERCAR)
  // =========================================
  static buildBugattiChiron(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.38;
    const rearZ = -1.36;
    const wheelR = 0.39;

    const chironShell = this.createLoftedShell([
      { z: -2.28, halfW: 0.84, botY: 0.19, lowerY: 0.34, shoulderY: 0.50, beltY: 0.56, centerY: 0.58, tumble: 0.07 },
      { z: -1.78, halfW: 0.96, botY: 0.15, lowerY: 0.36, shoulderY: 0.58, beltY: 0.65, centerY: 0.68, tumble: 0.06 },
      { z: -1.25, halfW: 1.01, botY: 0.14, lowerY: 0.38, shoulderY: 0.61, beltY: 0.69, centerY: 0.72, tumble: 0.06 },
      { z: -0.25, halfW: 0.92, botY: 0.13, lowerY: 0.34, shoulderY: 0.55, beltY: 0.65, centerY: 0.68, tumble: 0.08 },
      { z: 0.82,  halfW: 0.94, botY: 0.13, lowerY: 0.34, shoulderY: 0.56, beltY: 0.63, centerY: 0.66, tumble: 0.08 },
      { z: 1.44,  halfW: 0.97, botY: 0.14, lowerY: 0.34, shoulderY: 0.54, beltY: 0.59, centerY: 0.62, tumble: 0.09 },
      { z: 2.02,  halfW: 0.86, botY: 0.13, lowerY: 0.28, shoulderY: 0.42, beltY: 0.46, centerY: 0.48, tumble: 0.11 },
      { z: 2.28,  halfW: 0.72, botY: 0.14, lowerY: 0.22, shoulderY: 0.32, beltY: 0.36, centerY: 0.38, tumble: 0.14 }
    ], { frontZ, rearZ, wheelR, pinch: 0.18 });
    group.add(new THREE.Mesh(chironShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.34, -0.06, 0.28, 0x161b24);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 0.86, windTopZ: 0.24, roofRearZ: -0.68, rearDeckZ: -1.32,
      beltY: 0.64, roofY: 1.07, beltHalfW: 0.76, roofHalfW: 0.54, roofMat: carbonMat
    });

    // Two-Tone Chiron Satin Carbon C-Line Signature Side Intakes
    [-0.94, 0.94].forEach((cx) => {
      const cArc = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.032, 10, 26, Math.PI * 1.15), chromeMat);
      cArc.rotation.y = Math.PI / 2;
      cArc.rotation.z = Math.PI * 0.42;
      cArc.position.set(cx, 0.61, -0.08);
      const intakeBacking = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.32), darkMat);
      intakeBacking.position.set(cx * 0.94, 0.52, -0.45);
      group.add(cArc, intakeBacking);
    });

    const grille = this.build3DGrille('bugatti', chromeMat, darkMat, accentMat);
    grille.position.set(0, 0.28, 2.27);
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.045, 0.48), carbonMat);
    splitter.position.set(0, 0.11, 2.08);
    group.add(grille, splitter);

    // Quad-Projector Chiron LED Headlight Clusters
    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.66, 0.42, 2.15, 0.36, 0.10, headMat, chromeMat, darkMat, headMat, 'bottom', side * 0.16);
    });

    // Exposed W16 Carbon Engine Spine + Pur Sport Swan Wing + Full-Width Taillight Blade
    const engineDeck = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.05, 0.92), carbonMat);
    engineDeck.position.set(0, 0.71, -1.52);
    const rearWing = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.045, 0.40), carbonMat);
    rearWing.position.set(0, 0.98, -2.06);
    rearWing.rotation.x = -0.09;
    [-0.60, 0.60].forEach((px) => {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.40, 0.16), carbonMat);
      pylon.position.set(px, 0.77, -2.02);
      group.add(pylon);
    });
    this.buildTaillightCluster(group, 0, 0.50, -2.26, 1.72, 0.055, tailMat, darkMat, chromeMat);
    group.add(engineDeck, rearWing);

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.94, frontZ: 2.22, rearZ: -2.26, plateRearY: 0.38, plateFrontY: 0.20, handleY: 0.62, cowlY: 0.65, cowlZ: 0.86, includeFrontPlate: false });
    this.addWheelArches(group, 0.99, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.17);
    this.addSideSkirtsAndMirrors(group, carbonMat, carbonMat, 0.95, 0.68, 0.62);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.24, -0.08, 0.08, 0.24], 0.25, -2.22, 1.82);
    exhausts.push(new THREE.Vector3(-0.16, 0.25, -2.28), new THREE.Vector3(0.16, 0.25, -2.28));
    this.attachRealisticWheels(group, wheels, 0.99, frontZ, rearZ, wheelR, rimStyle);
  }

  // =========================================
  // ROLLS-ROYCE SPECTRE (SCULPTED ULTRA-LUXURY COUPE)
  // =========================================
  static buildRollsRoyceSpectre(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.44;
    const rearZ = -1.40;
    const wheelR = 0.41;

    const rrShell = this.createLoftedShell([
      { z: -2.26, halfW: 0.86, botY: 0.23, lowerY: 0.42, shoulderY: 0.62, beltY: 0.74, centerY: 0.78, tumble: 0.05 },
      { z: -1.78, halfW: 0.96, botY: 0.21, lowerY: 0.44, shoulderY: 0.68, beltY: 0.82, centerY: 0.86, tumble: 0.05 },
      { z: -1.25, halfW: 0.98, botY: 0.20, lowerY: 0.46, shoulderY: 0.72, beltY: 0.87, centerY: 0.90, tumble: 0.05 },
      { z: 0.10,  halfW: 0.96, botY: 0.20, lowerY: 0.46, shoulderY: 0.72, beltY: 0.88, centerY: 0.91, tumble: 0.05 },
      { z: 0.92,  halfW: 0.96, botY: 0.20, lowerY: 0.46, shoulderY: 0.72, beltY: 0.88, centerY: 0.92, tumble: 0.05 },
      { z: 1.56,  halfW: 0.94, botY: 0.20, lowerY: 0.46, shoulderY: 0.70, beltY: 0.86, centerY: 0.90, tumble: 0.06 },
      { z: 2.15,  halfW: 0.86, botY: 0.21, lowerY: 0.44, shoulderY: 0.68, beltY: 0.82, centerY: 0.86, tumble: 0.07 },
      { z: 2.32,  halfW: 0.76, botY: 0.22, lowerY: 0.42, shoulderY: 0.64, beltY: 0.78, centerY: 0.82, tumble: 0.08 }
    ], { frontZ, rearZ, wheelR, pinch: 0.14 });
    group.add(new THREE.Mesh(rrShell, bodyMat));

    const hoodSatin = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.025, 1.38), chromeMat);
    hoodSatin.position.set(0, 0.91, 1.52);
    group.add(hoodSatin);

    this.buildDetailedInterior(group, darkMat, accentMat, 0.62, -0.34, 0.34, 0x3a2016);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, chromeMat, {
      frontCowlZ: 0.76, windTopZ: 0.22, roofRearZ: -0.95, rearDeckZ: -1.78,
      beltY: 0.87, roofY: 1.38, beltHalfW: 0.82, roofHalfW: 0.64, roofMat: chromeMat, pillarMat: chromeMat
    });

    const grille = this.build3DGrille('rolls', chromeMat, darkMat, accentMat);
    grille.position.set(0, 0.56, 2.31);
    const ornamentBase = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.046, 0.075, 12), chromeMat);
    ornamentBase.position.set(0, 0.88, 2.24);
    const ornamentWing = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.055, 0.035), chromeMat);
    ornamentWing.position.set(0, 0.94, 2.22);
    group.add(grille, ornamentBase, ornamentWing);

    [-1, 1].forEach((side) => {
      const drl = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.035, 0.06), headMat);
      drl.position.set(side * 0.70, 0.76, 2.26);
      this.buildProjectorHeadlight(group, side * 0.69, 0.54, 2.26, 0.32, 0.11, headMat, chromeMat, darkMat, headMat, 'top', side * 0.08);
    });

    [-0.78, 0.78].forEach((tx) => {
      this.buildTaillightCluster(group, tx, 0.62, -2.25, 0.15, 0.32, tailMat, darkMat, chromeMat);
    });

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.96, frontZ: 2.30, rearZ: -2.25, plateRearY: 0.42, plateFrontY: 0.25, handleY: 0.82, cowlY: 0.88, cowlZ: 0.78, includeFrontPlate: true });
    this.addWheelArches(group, 0.99, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.16);
    this.addSideSkirtsAndMirrors(group, chromeMat, carbonMat, 0.96, 0.92, 0.56);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.55, 0.55], 0.24, -2.22, 1.76);
    exhausts.push(new THREE.Vector3(-0.55, 0.24, -2.28), new THREE.Vector3(0.55, 0.24, -2.28));
    this.attachRealisticWheels(group, wheels, 0.99, frontZ, rearZ, wheelR, 2);
  }

  // =========================================
  // MCLAREN P1 GTR (SCULPTED HYBRID HYPERCAR)
  // =========================================
  static buildMcLarenP1(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.36;
    const rearZ = -1.34;
    const wheelR = 0.38;

    const p1Shell = this.createLoftedShell([
      { z: -2.22, halfW: 0.84, botY: 0.18, lowerY: 0.32, shoulderY: 0.48, beltY: 0.54, centerY: 0.56, tumble: 0.08 },
      { z: -1.68, halfW: 0.96, botY: 0.14, lowerY: 0.34, shoulderY: 0.56, beltY: 0.61, centerY: 0.64, tumble: 0.07 },
      { z: -1.10, halfW: 0.98, botY: 0.13, lowerY: 0.34, shoulderY: 0.57, beltY: 0.63, centerY: 0.66, tumble: 0.07 },
      { z: -0.15, halfW: 0.87, botY: 0.12, lowerY: 0.30, shoulderY: 0.50, beltY: 0.58, centerY: 0.61, tumble: 0.09 },
      { z: 0.86,  halfW: 0.91, botY: 0.12, lowerY: 0.30, shoulderY: 0.52, beltY: 0.59, centerY: 0.62, tumble: 0.09 },
      { z: 1.42,  halfW: 0.94, botY: 0.13, lowerY: 0.30, shoulderY: 0.51, beltY: 0.56, centerY: 0.59, tumble: 0.10 },
      { z: 1.98,  halfW: 0.82, botY: 0.12, lowerY: 0.25, shoulderY: 0.38, beltY: 0.42, centerY: 0.45, tumble: 0.13 },
      { z: 2.22,  halfW: 0.66, botY: 0.13, lowerY: 0.19, shoulderY: 0.28, beltY: 0.32, centerY: 0.34, tumble: 0.15 }
    ], { frontZ, rearZ, wheelR, pinch: 0.19 });
    group.add(new THREE.Mesh(p1Shell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.33, -0.06, 0.27, 0x151922);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, carbonMat, {
      frontCowlZ: 0.88, windTopZ: 0.24, roofRearZ: -0.62, rearDeckZ: -1.24,
      beltY: 0.59, roofY: 1.00, beltHalfW: 0.72, roofHalfW: 0.48, roofMat: carbonMat, pillarMat: carbonMat
    });

    const snorkel = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.72), carbonMat);
    snorkel.position.set(0, 1.02, -0.22);
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.045, 0.52), carbonMat);
    splitter.position.set(0, 0.105, 2.02);
    group.add(snorkel, splitter);

    // Carbon Door Aero Intake Ducts
    [-0.84, 0.84].forEach((sx) => {
      const channel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, 1.25), darkMat);
      channel.position.set(sx, 0.35, -0.15);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.95), carbonMat);
      blade.position.set(sx * 1.04, 0.36, -0.18);
      group.add(channel, blade);
    });

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.62, 0.39, 2.09, 0.34, 0.085, headMat, chromeMat, darkMat, accentMat, 'bottom', side * 0.24);
    });

    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.045, 0.40), carbonMat);
    wingBlade.position.set(0, 1.00, -2.02);
    wingBlade.rotation.x = -0.11;
    [-0.54, 0.54].forEach((px) => {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.44, 0.18), carbonMat);
      pylon.position.set(px, 0.76, -1.96);
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.46), bodyMat);
      endplate.position.set(px > 0 ? 0.97 : -0.97, 1.00, -2.02);
      group.add(pylon, endplate);
    });
    const tailHalo = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.024, 8, 22, Math.PI * 0.75), tailMat);
    tailHalo.rotation.z = Math.PI * 0.12;
    tailHalo.position.set(0, 0.25, -2.21);
    const rearMesh = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.24, 0.05), darkMat);
    rearMesh.position.set(0, 0.36, -2.20);
    group.add(wingBlade, tailHalo, rearMesh);

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.90, frontZ: 2.16, rearZ: -2.21, plateRearY: 0.45, plateFrontY: 0.18, handleY: 0.58, cowlY: 0.61, cowlZ: 0.88, includeFrontPlate: false });
    this.addWheelArches(group, 0.98, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.17);
    this.addSideSkirtsAndMirrors(group, bodyMat, carbonMat, 0.94, 0.66, 0.64);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [0], 0.34, -2.18, 1.80);
    exhausts.push(new THREE.Vector3(0, 0.34, -2.25));
    this.attachRealisticWheels(group, wheels, 0.98, frontZ, rearZ, wheelR, rimStyle);
  }

  // =========================================
  // MAHINDRA THAR 4x4, SCORPIO-N & TATA SAFARI (SCULPTED INDIAN SUVs)
  // =========================================
  static buildMahindraThar(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, orangeMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.32;
    const rearZ = -1.28;
    const wheelR = 0.44;

    const tharShell = this.createLoftedShell([
      { z: -1.92, halfW: 0.91, botY: 0.42, lowerY: 0.64, shoulderY: 0.88, beltY: 1.08, centerY: 1.11, tumble: 0.04 },
      { z: -1.32, halfW: 0.93, botY: 0.41, lowerY: 0.65, shoulderY: 0.90, beltY: 1.10, centerY: 1.13, tumble: 0.04 },
      { z: 0.38,  halfW: 0.93, botY: 0.40, lowerY: 0.64, shoulderY: 0.89, beltY: 1.09, centerY: 1.12, tumble: 0.04 },
      { z: 0.72,  halfW: 0.91, botY: 0.40, lowerY: 0.64, shoulderY: 0.88, beltY: 1.07, centerY: 1.11, tumble: 0.05 },
      { z: 1.32,  halfW: 0.88, botY: 0.40, lowerY: 0.63, shoulderY: 0.86, beltY: 1.05, centerY: 1.09, tumble: 0.05 },
      { z: 1.94,  halfW: 0.82, botY: 0.42, lowerY: 0.64, shoulderY: 0.85, beltY: 1.02, centerY: 1.05, tumble: 0.06 }
    ], { frontZ, rearZ, wheelR, pinch: 0.14 });
    group.add(new THREE.Mesh(tharShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, orangeMat, 0.92, -0.18, 0.36, 0x1c2029);

    // Open-Air 3D Tubular Roll-Cage + Panoramic Roof + Framed Sloped Windshield
    const cageGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.64, 10);
    [-0.76, 0.76].forEach((rx) => {
      [-1.72, -0.58, 0.36].forEach((rz) => {
        const post = new THREE.Mesh(cageGeo, carbonMat);
        post.position.set(rx, 1.40, rz);
        group.add(post);
      });
      const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.040, 2.15, 10), carbonMat);
      topRail.rotateX(Math.PI / 2);
      topRail.position.set(rx, 1.71, -0.68);
      group.add(topRail);
    });
    [-1.65, -0.62, 0.36].forEach((cz) => {
      const cross = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 1.54, 10), carbonMat);
      cross.rotateZ(Math.PI / 2);
      cross.position.set(0, 1.71, cz);
      group.add(cross);
    });
    const sunroofPanel = new THREE.Mesh(new THREE.BoxGeometry(1.50, 0.04, 1.12), glassMat);
    sunroofPanel.position.set(0, 1.71, -1.16);
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.58, 0.045), glassMat);
    windshield.position.set(0, 1.38, 0.48);
    windshield.rotation.x = 0.25;
    const windFrame = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.62, 0.05), darkMat);
    windFrame.position.set(0, 1.38, 0.465);
    windFrame.rotation.x = 0.25;
    // Keep windshield transparent inside frame by placing body pillars on sides
    [-0.75, 0.75].forEach((px) => {
      const aPil = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.64, 0.07), bodyMat);
      aPil.position.set(px, 1.38, 0.48);
      aPil.rotation.x = 0.25;
      group.add(aPil);
    });
    group.add(sunroofPanel, windshield);

    const grilleMesh = this.build3DGrille('thar', chromeMat, darkMat, orangeMat);
    grilleMesh.position.set(0, 0.78, 1.96);
    group.add(grilleMesh);

    // Classic Round Thar Projector Halos + Clear Lenses + Bonnet Latches
    [-0.59, 0.59].forEach((hx) => {
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.05, 18), darkMat);
      bezel.rotateX(Math.PI / 2);
      bezel.position.set(hx, 0.79, 1.96);
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.055, 18), headMat);
      lamp.rotateX(Math.PI / 2);
      lamp.position.set(hx, 0.79, 1.98);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.118, 0.014, 8, 22), headMat);
      halo.position.set(hx, 0.79, 2.01);
      const amber = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.055, 0.05), orangeMat);
      amber.position.set(hx * 1.44, 0.64, 1.72);
      const hoodLatch = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.04, 0.08), darkMat);
      hoodLatch.position.set(hx * 1.15, 1.07, 1.78);
      group.add(bezel, lamp, halo, amber, hoodLatch);
    });

    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.20, 0.32), carbonMat);
    frontBumper.position.set(0, 0.37, 1.96);
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.20, 0.26), carbonMat);
    rearBumper.position.set(0, 0.37, -1.94);

    [-0.45, 0.45].forEach((hx) => {
      const hook = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.12), orangeMat);
      hook.position.set(hx, 0.34, 2.13);
      group.add(hook);
    });

    [-0.95, 0.95].forEach((sx) => {
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.055, 1.42), carbonMat);
      step.position.set(sx, 0.32, 0.02);
      group.add(step);
    });

    const roofBar = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.085, 0.13), carbonMat);
    roofBar.position.set(0, 1.76, 0.36);
    const roofLeds = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.045, 0.04), headMat);
    roofLeds.position.set(0, 1.76, 0.43);
    group.add(frontBumper, rearBumper, roofBar, roofLeds);

    const spare = this.createRealisticWheel(0.41, 0.26, rimStyle, true);
    spare.group.rotation.y = Math.PI / 2;
    spare.group.position.set(0, 0.98, -2.04);
    group.add(spare.group);

    [-0.78, 0.78].forEach((tx) => {
      this.buildTaillightCluster(group, tx, 0.80, -1.94, 0.14, 0.25, tailMat, darkMat);
    });

    const exh = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 12), chromeMat);
    exh.rotateX(Math.PI / 2);
    exh.position.set(-0.58, 0.26, -1.98);
    group.add(exh);
    exhausts.push(new THREE.Vector3(-0.58, 0.26, -2.05));

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.92, frontZ: 1.98, rearZ: -1.94, plateRearY: 0.48, plateFrontY: 0.36, handleY: 0.96, cowlY: 1.11, cowlZ: 0.56, includeFrontPlate: true });
    this.addWheelArches(group, 1.0, frontZ, rearZ, wheelR, carbonMat, darkMat, 0.22);
    this.addSideSkirtsAndMirrors(group, carbonMat, carbonMat, 0.92, 1.24, 0.56);
    this.attachRealisticWheels(group, wheels, 1.0, frontZ, rearZ, wheelR, rimStyle, false, true);
  }

  static buildMahindraScorpio(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.38;
    const rearZ = -1.34;
    const wheelR = 0.41;

    const scorpioShell = this.createLoftedShell([
      { z: -2.06, halfW: 0.90, botY: 0.34, lowerY: 0.58, shoulderY: 0.84, beltY: 1.04, centerY: 1.07, tumble: 0.05 },
      { z: -1.38, halfW: 0.96, botY: 0.31, lowerY: 0.58, shoulderY: 0.86, beltY: 1.06, centerY: 1.09, tumble: 0.04 },
      { z: 0.68,  halfW: 0.96, botY: 0.30, lowerY: 0.58, shoulderY: 0.86, beltY: 1.06, centerY: 1.09, tumble: 0.04 },
      { z: 1.38,  halfW: 0.94, botY: 0.30, lowerY: 0.56, shoulderY: 0.84, beltY: 1.02, centerY: 1.06, tumble: 0.05 },
      { z: 1.98,  halfW: 0.88, botY: 0.31, lowerY: 0.54, shoulderY: 0.78, beltY: 0.95, centerY: 0.99, tumble: 0.07 },
      { z: 2.14,  halfW: 0.80, botY: 0.33, lowerY: 0.52, shoulderY: 0.74, beltY: 0.88, centerY: 0.92, tumble: 0.08 }
    ], { frontZ, rearZ, wheelR, pinch: 0.14 });
    group.add(new THREE.Mesh(scorpioShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.86, -0.24, 0.35, 0x241914);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 0.78, windTopZ: 0.32, roofRearZ: -1.56, rearDeckZ: -1.94,
      beltY: 1.05, roofY: 1.62, beltHalfW: 0.82, roofHalfW: 0.66, roofMat: bodyMat
    });

    [-0.64, 0.64].forEach((rx) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 1.82), chromeMat);
      rail.position.set(rx, 1.68, -0.68);
      group.add(rail);
    });

    const grilleMesh = this.build3DGrille('scorpio', chromeMat, darkMat, accentMat);
    grilleMesh.position.set(0, 0.76, 2.14);
    const frontSkid = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.14, 0.24), chromeMat);
    frontSkid.position.set(0, 0.27, 2.06);
    group.add(grilleMesh, frontSkid);

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.70, 0.82, 2.10, 0.32, 0.13, headMat, chromeMat, darkMat, headMat, 'bottom', side * 0.12);
      const cDrl = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.016, 6, 14, Math.PI * 1.4), accentMat);
      cDrl.position.set(side * 0.74, 0.52, 2.14);
      group.add(cDrl);
    });

    [-0.82, 0.82].forEach((tx) => {
      this.buildTaillightCluster(group, tx, 1.12, -2.06, 0.14, 0.52, tailMat, darkMat, chromeMat);
    });

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.95, frontZ: 2.12, rearZ: -2.06, plateRearY: 0.64, plateFrontY: 0.42, handleY: 0.94, cowlY: 1.06, cowlZ: 0.80, includeFrontPlate: true });
    this.addWheelArches(group, 1.0, frontZ, rearZ, wheelR, carbonMat, darkMat, 0.18);
    this.addSideSkirtsAndMirrors(group, bodyMat, carbonMat, 0.95, 1.12, 0.58);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.55, 0.55], 0.26, -2.06, 1.72);
    exhausts.push(new THREE.Vector3(-0.55, 0.26, -2.12), new THREE.Vector3(0.55, 0.26, -2.12));
    this.attachRealisticWheels(group, wheels, 1.0, frontZ, rearZ, wheelR, rimStyle, false, false);
  }

  static buildTataSafari(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.40;
    const rearZ = -1.36;
    const wheelR = 0.40;

    const safariShell = this.createLoftedShell([
      { z: -2.10, halfW: 0.88, botY: 0.32, lowerY: 0.56, shoulderY: 0.82, beltY: 1.02, centerY: 1.05, tumble: 0.05 },
      { z: -1.40, halfW: 0.95, botY: 0.29, lowerY: 0.56, shoulderY: 0.84, beltY: 1.04, centerY: 1.07, tumble: 0.05 },
      { z: 0.72,  halfW: 0.95, botY: 0.28, lowerY: 0.56, shoulderY: 0.84, beltY: 1.04, centerY: 1.07, tumble: 0.05 },
      { z: 1.40,  halfW: 0.93, botY: 0.28, lowerY: 0.54, shoulderY: 0.82, beltY: 1.00, centerY: 1.04, tumble: 0.06 },
      { z: 1.98,  halfW: 0.86, botY: 0.29, lowerY: 0.50, shoulderY: 0.75, beltY: 0.92, centerY: 0.96, tumble: 0.08 },
      { z: 2.14,  halfW: 0.76, botY: 0.31, lowerY: 0.48, shoulderY: 0.70, beltY: 0.84, centerY: 0.88, tumble: 0.09 }
    ], { frontZ, rearZ, wheelR, pinch: 0.14 });
    group.add(new THREE.Mesh(safariShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.84, -0.24, 0.35, 0x1e2532);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 0.82, windTopZ: 0.26, roofRearZ: -1.58, rearDeckZ: -1.96,
      beltY: 1.03, roofY: 1.59, beltHalfW: 0.82, roofHalfW: 0.66, roofMat: glassMat
    });

    [-0.62, 0.62].forEach((rx) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 1.80), chromeMat);
      rail.position.set(rx, 1.65, -0.74);
      group.add(rail);
    });

    const grilleMesh = this.build3DGrille('safari', chromeMat, darkMat, accentMat);
    grilleMesh.position.set(0, 0.65, 2.13);
    const drlStrip = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.04, 0.05), headMat);
    drlStrip.position.set(0, 0.89, 2.12);
    group.add(grilleMesh, drlStrip);

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.70, 0.60, 2.11, 0.24, 0.16, headMat, chromeMat, darkMat, headMat, 'top', side * 0.12);
    });

    this.buildTaillightCluster(group, 0, 1.00, -2.10, 1.68, 0.06, tailMat, darkMat, chromeMat);
    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.055, 0.26), carbonMat);
    spoiler.position.set(0, 1.60, -1.94);
    group.add(spoiler);

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.94, frontZ: 2.11, rearZ: -2.09, plateRearY: 0.66, plateFrontY: 0.38, handleY: 0.92, cowlY: 1.04, cowlZ: 0.82, includeFrontPlate: true });
    this.addWheelArches(group, 0.99, frontZ, rearZ, wheelR, carbonMat, darkMat, 0.16);
    this.addSideSkirtsAndMirrors(group, bodyMat, carbonMat, 0.94, 1.09, 0.58);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.56, 0.56], 0.26, -2.08, 1.72);
    exhausts.push(new THREE.Vector3(-0.56, 0.26, -2.14), new THREE.Vector3(0.56, 0.26, -2.14));
    this.attachRealisticWheels(group, wheels, 0.99, frontZ, rearZ, wheelR, rimStyle, false, false);
  }

  static buildHyperionGT(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.32;
    const rearZ = -1.32;
    const wheelR = 0.38;

    const gtShell = this.createLoftedShell([
      { z: -2.20, halfW: 0.82, botY: 0.19, lowerY: 0.34, shoulderY: 0.50, beltY: 0.56, centerY: 0.58, tumble: 0.08 },
      { z: -1.65, halfW: 0.94, botY: 0.14, lowerY: 0.35, shoulderY: 0.56, beltY: 0.62, centerY: 0.65, tumble: 0.07 },
      { z: -1.10, halfW: 0.95, botY: 0.13, lowerY: 0.34, shoulderY: 0.56, beltY: 0.63, centerY: 0.66, tumble: 0.07 },
      { z: 0.20,  halfW: 0.90, botY: 0.13, lowerY: 0.32, shoulderY: 0.53, beltY: 0.61, centerY: 0.64, tumble: 0.08 },
      { z: 0.88,  halfW: 0.92, botY: 0.13, lowerY: 0.32, shoulderY: 0.54, beltY: 0.60, centerY: 0.63, tumble: 0.08 },
      { z: 1.44,  halfW: 0.94, botY: 0.14, lowerY: 0.32, shoulderY: 0.52, beltY: 0.57, centerY: 0.60, tumble: 0.09 },
      { z: 1.98,  halfW: 0.82, botY: 0.14, lowerY: 0.27, shoulderY: 0.40, beltY: 0.44, centerY: 0.47, tumble: 0.12 },
      { z: 2.20,  halfW: 0.68, botY: 0.15, lowerY: 0.21, shoulderY: 0.31, beltY: 0.35, centerY: 0.37, tumble: 0.14 }
    ], { frontZ, rearZ, wheelR, pinch: 0.18 });
    group.add(new THREE.Mesh(gtShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.34, -0.06, 0.28, 0x1a1414);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 0.88, windTopZ: 0.22, roofRearZ: -0.68, rearDeckZ: -1.36,
      beltY: 0.61, roofY: 1.04, beltHalfW: 0.74, roofHalfW: 0.52, roofMat: bodyMat
    });

    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.045, 0.46), carbonMat);
    splitter.position.set(0, 0.11, 2.02);
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.045, 0.38), carbonMat);
    wingBlade.position.set(0, 1.00, -1.96);
    wingBlade.rotation.x = -0.1;
    group.add(splitter, wingBlade);

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.62, 0.45, 2.04, 0.28, 0.12, headMat, chromeMat, darkMat, accentMat, 'bottom', side * 0.18);
      const swanNeck = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.48, 0.14), carbonMat);
      swanNeck.position.set(side * 0.52, 0.78, -1.90);
      swanNeck.rotation.x = 0.22;
      group.add(swanNeck);
    });

    this.buildTaillightCluster(group, 0, 0.50, -2.18, 1.64, 0.055, tailMat, darkMat, chromeMat);
    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.91, frontZ: 2.15, rearZ: -2.18, plateRearY: 0.38, plateFrontY: 0.19, handleY: 0.58, cowlY: 0.62, cowlZ: 0.88, includeFrontPlate: false });
    this.addWheelArches(group, 0.94, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.16);
    this.addSideSkirtsAndMirrors(group, bodyMat, carbonMat, 0.91, 0.68, 0.62);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.14, 0.0, 0.14], 0.24, -2.14, 1.72);
    exhausts.push(new THREE.Vector3(-0.14, 0.24, -2.2), new THREE.Vector3(0.14, 0.24, -2.2));
    this.attachRealisticWheels(group, wheels, 0.94, frontZ, rearZ, wheelR, rimStyle);
  }

  static buildApexCyber(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.38;
    const rearZ = -1.38;
    const wheelR = 0.38;

    const lamboShell = this.createLoftedShell([
      { z: -2.24, halfW: 0.85, botY: 0.19, lowerY: 0.34, shoulderY: 0.50, beltY: 0.56, centerY: 0.58, tumble: 0.09 },
      { z: -1.68, halfW: 0.98, botY: 0.14, lowerY: 0.35, shoulderY: 0.57, beltY: 0.63, centerY: 0.66, tumble: 0.08 },
      { z: -1.10, halfW: 0.99, botY: 0.13, lowerY: 0.34, shoulderY: 0.57, beltY: 0.64, centerY: 0.67, tumble: 0.08 },
      { z: 0.15,  halfW: 0.92, botY: 0.13, lowerY: 0.32, shoulderY: 0.53, beltY: 0.61, centerY: 0.64, tumble: 0.09 },
      { z: 0.98,  halfW: 0.94, botY: 0.13, lowerY: 0.30, shoulderY: 0.49, beltY: 0.55, centerY: 0.58, tumble: 0.10 },
      { z: 1.52,  halfW: 0.94, botY: 0.13, lowerY: 0.28, shoulderY: 0.43, beltY: 0.47, centerY: 0.49, tumble: 0.11 },
      { z: 2.04,  halfW: 0.84, botY: 0.13, lowerY: 0.22, shoulderY: 0.33, beltY: 0.36, centerY: 0.38, tumble: 0.13 },
      { z: 2.26,  halfW: 0.70, botY: 0.14, lowerY: 0.19, shoulderY: 0.26, beltY: 0.28, centerY: 0.30, tumble: 0.15 }
    ], { frontZ, rearZ, wheelR, pinch: 0.18 });
    group.add(new THREE.Mesh(lamboShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.34, -0.06, 0.28, 0x181c24);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 1.06, windTopZ: 0.24, roofRearZ: -0.66, rearDeckZ: -1.32,
      beltY: 0.57, roofY: 0.98, beltHalfW: 0.72, roofHalfW: 0.50, roofMat: carbonMat
    });

    const dorsalFin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 1.35), carbonMat);
    dorsalFin.position.set(0, 0.84, -1.16);
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.045, 0.48), carbonMat);
    splitter.position.set(0, 0.11, 2.04);
    group.add(dorsalFin, splitter);

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.62, 0.35, 2.13, 0.34, 0.08, headMat, chromeMat, darkMat, headMat, 'top', side * 0.22);
    });

    this.buildTaillightCluster(group, 0, 0.48, -2.23, 1.78, 0.06, tailMat, darkMat, chromeMat);
    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.92, frontZ: 2.20, rearZ: -2.23, plateRearY: 0.37, plateFrontY: 0.17, handleY: 0.58, cowlY: 0.58, cowlZ: 1.06, includeFrontPlate: false });
    this.addWheelArches(group, 0.98, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.16);
    this.addSideSkirtsAndMirrors(group, bodyMat, carbonMat, 0.94, 0.65, 0.65);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.22, 0.22], 0.34, -2.18, 1.84);
    exhausts.push(new THREE.Vector3(-0.22, 0.34, -2.24), new THREE.Vector3(0.22, 0.34, -2.24));
    this.attachRealisticWheels(group, wheels, 0.98, frontZ, rearZ, wheelR, rimStyle);
  }

  static buildPhantomDrift(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, accentMat, wheels, exhausts, rimStyle) {
    const frontZ = 1.28;
    const rearZ = -1.28;
    const wheelR = 0.38;

    const gtrShell = this.createLoftedShell([
      { z: -2.12, halfW: 0.84, botY: 0.19, lowerY: 0.36, shoulderY: 0.54, beltY: 0.60, centerY: 0.62, tumble: 0.07 },
      { z: -1.55, halfW: 0.96, botY: 0.15, lowerY: 0.38, shoulderY: 0.58, beltY: 0.66, centerY: 0.68, tumble: 0.06 },
      { z: -0.95, halfW: 0.97, botY: 0.14, lowerY: 0.38, shoulderY: 0.58, beltY: 0.66, centerY: 0.68, tumble: 0.06 },
      { z: 0.15,  halfW: 0.92, botY: 0.14, lowerY: 0.36, shoulderY: 0.56, beltY: 0.64, centerY: 0.67, tumble: 0.07 },
      { z: 0.82,  halfW: 0.93, botY: 0.14, lowerY: 0.36, shoulderY: 0.55, beltY: 0.62, centerY: 0.65, tumble: 0.07 },
      { z: 1.42,  halfW: 0.94, botY: 0.14, lowerY: 0.35, shoulderY: 0.52, beltY: 0.58, centerY: 0.61, tumble: 0.08 },
      { z: 1.96,  halfW: 0.84, botY: 0.15, lowerY: 0.30, shoulderY: 0.42, beltY: 0.46, centerY: 0.49, tumble: 0.10 },
      { z: 2.14,  halfW: 0.72, botY: 0.16, lowerY: 0.26, shoulderY: 0.34, beltY: 0.38, centerY: 0.40, tumble: 0.12 }
    ], { frontZ, rearZ, wheelR, pinch: 0.18 });
    group.add(new THREE.Mesh(gtrShell, bodyMat));

    this.buildDetailedInterior(group, darkMat, accentMat, 0.36, -0.08, 0.28, 0x1a1820);
    this.addSculptedGreenhouse(group, bodyMat, glassMat, darkMat, {
      frontCowlZ: 0.76, windTopZ: 0.20, roofRearZ: -0.68, rearDeckZ: -1.36,
      beltY: 0.64, roofY: 1.06, beltHalfW: 0.75, roofHalfW: 0.55, roofMat: carbonMat
    });

    const hoodVent = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.025, 0.36), darkMat);
    hoodVent.position.set(0, 0.61, 1.38);
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.048, 0.46), carbonMat);
    splitter.position.set(0, 0.115, 2.00);
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.048, 0.40), carbonMat);
    wingBlade.position.set(0, 1.05, -1.88);
    wingBlade.rotation.x = -0.12;
    group.add(hoodVent, splitter, wingBlade);

    [-0.60, 0.60].forEach((px) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.44, 0.14), chromeMat);
      pillar.position.set(px, 0.80, -1.84);
      group.add(pillar);
    });

    [-1, 1].forEach((side) => {
      this.buildProjectorHeadlight(group, side * 0.62, 0.42, 2.08, 0.34, 0.10, headMat, chromeMat, darkMat, accentMat, 'bottom', side * 0.16);
    });

    for (let i = 0; i < 4; i++) {
      const isRight = i >= 2;
      const inner = (i % 2 === 1);
      const x = (isRight ? 1 : -1) * (inner ? 0.40 : 0.66);
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.098, 0.05, 18), darkMat);
      bezel.rotateX(Math.PI / 2);
      bezel.position.set(x, 0.50, -2.10);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.024, 10, 22), tailMat);
      ring.position.set(x, 0.50, -2.13);
      group.add(bezel, ring);
    }

    this.addExteriorTrimDetails(group, bodyMat, darkMat, chromeMat, { halfW: 0.92, frontZ: 2.11, rearZ: -2.11, plateRearY: 0.40, plateFrontY: 0.22, handleY: 0.62, cowlY: 0.64, cowlZ: 0.78, includeFrontPlate: false });
    this.addWheelArches(group, 0.98, frontZ, rearZ, wheelR, bodyMat, darkMat, 0.19);
    this.addSideSkirtsAndMirrors(group, carbonMat, carbonMat, 0.94, 0.68, 0.55);
    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [-0.56, -0.38, 0.38, 0.56], 0.22, -2.09, 1.80);
    exhausts.push(new THREE.Vector3(-0.47, 0.22, -2.16), new THREE.Vector3(0.47, 0.22, -2.16));
    this.attachRealisticWheels(group, wheels, 0.98, frontZ, rearZ, wheelR, rimStyle);
  }

  static buildFormulaPulse(group, bodyMat, carbonMat, darkMat, glassMat, chromeMat, headMat, tailMat, orangeMat, wheels, exhausts, rimStyle) {
    const monocoque = this.createLoftedShell([
      { z: -2.02, halfW: 0.14, botY: 0.16, lowerY: 0.24, shoulderY: 0.34, beltY: 0.42, centerY: 0.46, tumble: 0.08 },
      { z: -0.95, halfW: 0.26, botY: 0.13, lowerY: 0.24, shoulderY: 0.40, beltY: 0.56, centerY: 0.72, tumble: 0.06 },
      { z: -0.32, halfW: 0.30, botY: 0.12, lowerY: 0.24, shoulderY: 0.44, beltY: 0.62, centerY: 0.84, tumble: 0.06 },
      { z: 0.38,  halfW: 0.28, botY: 0.12, lowerY: 0.22, shoulderY: 0.42, beltY: 0.52, centerY: 0.54, tumble: 0.08 },
      { z: 1.45,  halfW: 0.22, botY: 0.13, lowerY: 0.20, shoulderY: 0.32, beltY: 0.38, centerY: 0.40, tumble: 0.10 },
      { z: 2.24,  halfW: 0.11, botY: 0.14, lowerY: 0.17, shoulderY: 0.20, beltY: 0.23, centerY: 0.25, tumble: 0.12 }
    ]);
    group.add(new THREE.Mesh(monocoque, bodyMat));

    const sharkFin = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.34, 1.05), carbonMat);
    sharkFin.position.set(0, 0.74, -1.08);
    group.add(sharkFin);

    // Sculpted Undercut Aero Sidepods + Radiator Intake Louvers
    [-1, 1].forEach((side) => {
      const sidepod = this.createLoftedShell([
        { z: -1.48, halfW: 0.18, botY: 0.13, lowerY: 0.18, shoulderY: 0.26, beltY: 0.32, centerY: 0.34, tumble: 0.08 },
        { z: -0.58, halfW: 0.30, botY: 0.13, lowerY: 0.22, shoulderY: 0.36, beltY: 0.44, centerY: 0.47, tumble: 0.06 },
        { z: 0.38,  halfW: 0.28, botY: 0.14, lowerY: 0.24, shoulderY: 0.38, beltY: 0.46, centerY: 0.48, tumble: 0.06 }
      ]);
      const podMesh = new THREE.Mesh(sidepod, bodyMat);
      podMesh.position.x = side * 0.46;
      const intakeDark = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.06), darkMat);
      intakeDark.position.set(side * 0.48, 0.32, 0.39);
      const floorEdge = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.03, 2.24), carbonMat);
      floorEdge.position.set(side * 0.56, 0.11, -0.35);
      const barge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.46), carbonMat);
      barge.position.set(side * 0.48, 0.24, 0.68);
      group.add(podMesh, intakeDark, floorEdge, barge);
    });

    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.032, 10, 24, Math.PI), carbonMat);
    halo.rotateX(Math.PI / 2);
    halo.position.set(0, 0.64, 0.10);
    const haloPillar = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.22, 0.045), carbonMat);
    haloPillar.position.set(0, 0.53, 0.45);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.165, 18, 18), new THREE.MeshPhysicalMaterial({ color: 0xffd000, metalness: 0.7, roughness: 0.12, clearcoat: 1.0 }));
    helmet.position.set(0, 0.56, -0.14);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.168, 14, 10, -0.8, 1.6, 0.85, 0.48), new THREE.MeshPhysicalMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.04, clearcoat: 1.0 }));
    visor.position.copy(helmet.position);
    group.add(halo, haloPillar, helmet, visor);

    // Multi-Element Carbon Front Wing + Endplates & Dual-Plane DRS Rear Wing
    const fWingMain = new THREE.Mesh(new THREE.BoxGeometry(2.16, 0.032, 0.42), carbonMat);
    fWingMain.position.set(0, 0.125, 2.08);
    const fWingUpper = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.022, 0.22), bodyMat);
    fWingUpper.position.set(0, 0.175, 1.98);
    fWingUpper.rotation.x = -0.14;
    [-1.08, 1.08].forEach((ex) => {
      const fEnd = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.52), carbonMat);
      fEnd.position.set(ex, 0.20, 2.04);
      group.add(fEnd);
    });
    const rWingMain = new THREE.Mesh(new THREE.BoxGeometry(1.70, 0.04, 0.34), carbonMat);
    rWingMain.position.set(0, 0.96, -1.86);
    const rWingDrs = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.025, 0.18), bodyMat);
    rWingDrs.position.set(0, 1.04, -1.94);
    rWingDrs.rotation.x = -0.18;
    [-0.85, 0.85].forEach((rx) => {
      const rEnd = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.32, 0.44), carbonMat);
      rEnd.position.set(rx, 0.94, -1.88);
      group.add(rEnd);
    });
    const rainBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.06), tailMat);
    rainBeacon.position.set(0, 0.28, -2.04);
    group.add(fWingMain, fWingUpper, rWingMain, rWingDrs, rainBeacon);

    this.addRearDiffuserAndExhausts(group, carbonMat, chromeMat, darkMat, [0], 0.44, -2.0, 1.15);
    exhausts.push(new THREE.Vector3(0, 0.44, -2.08));
    this.attachRealisticWheels(group, wheels, 1.12, 1.45, -1.45, 0.38, rimStyle, true);
  }

  static attachRealisticWheels(group, wheelArray, trackHalfWidth, frontZ, rearZ, radius, rimStyle = 0, hasSuspensionArms = false, isOffroad = false) {
    const wheelPositions = [
      { name: 'FL', x: -trackHalfWidth, y: radius, z: frontZ, isFront: true },
      { name: 'FR', x: trackHalfWidth, y: radius, z: frontZ, isFront: true },
      { name: 'RL', x: -trackHalfWidth, y: radius, z: rearZ, isFront: false },
      { name: 'RR', x: trackHalfWidth, y: radius, z: rearZ, isFront: false }
    ];

    const armMat = hasSuspensionArms
      ? new THREE.MeshStandardMaterial({ color: 0x22262e, metalness: 0.85, roughness: 0.3 })
      : null;

    wheelPositions.forEach((wp) => {
      const wheelObj = this.createRealisticWheel(radius, isOffroad ? 0.34 : 0.3, rimStyle, isOffroad);
      const steerPivot = new THREE.Group();
      steerPivot.position.set(wp.x, wp.y, wp.z);

      if (wp.x > 0) wheelObj.group.rotation.y = Math.PI;

      steerPivot.add(wheelObj.group);
      group.add(steerPivot);

      if (hasSuspensionArms && armMat) {
        const armUpper = new THREE.Mesh(
          new THREE.CylinderGeometry(0.016, 0.016, trackHalfWidth * 0.78, 8),
          armMat
        );
        armUpper.rotateZ(Math.PI / 2);
        armUpper.position.set(wp.x * 0.5, wp.y + 0.12, wp.z);
        const armLower = armUpper.clone();
        armLower.position.y = wp.y - 0.12;
        group.add(armUpper, armLower);
      }

      wheelArray.push({
        pivot: steerPivot,
        wheelMesh: wheelObj.group,
        isFront: wp.isFront,
        isRight: wp.x > 0,
        isGLB: false
      });
    });
  }
}

function chromeMaterialFix(mat) {
  return mat;
}
