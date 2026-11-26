/**
 * S3D Drive - Unified Real-Time Metro World & Weather/Climate System
 * Every climate & weather mode stays in the exact same emerald metropolis, central parklands,
 * ridge forests, iconic landmarks, elevated Metro corridor, and Romantic Date Pavilion.
 */

const CIRCUIT_WAYPOINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 180),
  new THREE.Vector3(60, 2, 280),
  new THREE.Vector3(160, 4, 320),
  new THREE.Vector3(260, 2, 280),
  new THREE.Vector3(300, 0, 180),
  new THREE.Vector3(320, 0, 60),
  new THREE.Vector3(360, 3, -60),
  new THREE.Vector3(320, 4, -160),
  new THREE.Vector3(240, 2, -220),
  new THREE.Vector3(140, 0, -260),
  new THREE.Vector3(0, 0, -280),
  new THREE.Vector3(-140, 3, -260),
  new THREE.Vector3(-240, 5, -180),
  new THREE.Vector3(-280, 4, -80),
  new THREE.Vector3(-250, 2, 20),
  new THREE.Vector3(-180, 0, 80),
  new THREE.Vector3(-100, 0, -20),
  new THREE.Vector3(-20, 0, -70),
  new THREE.Vector3(0, 0, -50)
];

export function getLiveWorldClimate(now = new Date()) {
  const hour = now.getHours() + now.getMinutes() / 60;
  // Morning mist (5:00 - 8:30)
  if (hour >= 5 && hour < 8.5) {
    return {
      timeLabel: 'DAWN MIST',
      skyColor: 0x3b537a,
      horizonColor: 0xf7b98f,
      fogColor: 0x9aaec2,
      fogDensity: 0.00175,
      ambientLight: 0x6f7c91,
      ambientIntensity: 0.72,
      dirLight: 0xffd39e,
      dirIntensity: 1.45,
      hemiSky: 0xffc79e,
      hemiGround: 0x263322,
      hemiIntensity: 0.95,
      sunDir: [0.75, 0.24, 0.52],
      sunColor: 0xffdca8,
      sunIntensity: 1.15,
      rimColor: 0xff9a66,
      fillColor: 0x80bfff,
      warmth: 0.16,
      isNight: false
    };
  }
  // Clear Metro Daylight (8:30 - 15:45)
  if (hour >= 8.5 && hour < 15.75) {
    return {
      timeLabel: 'CLEAR DAYLIGHT',
      skyColor: 0x2c6db5,
      horizonColor: 0xc2e2f7,
      fogColor: 0xa4c9e3,
      fogDensity: 0.00072,
      ambientLight: 0x8ea7c4,
      ambientIntensity: 0.82,
      dirLight: 0xfff5e0,
      dirIntensity: 1.95,
      hemiSky: 0xa8d8ff,
      hemiGround: 0x2c3c24,
      hemiIntensity: 1.05,
      sunDir: [0.35, 0.85, 0.40],
      sunColor: 0xfff8e6,
      sunIntensity: 1.25,
      rimColor: 0xffe0b2,
      fillColor: 0x99ccff,
      warmth: 0.06,
      isNight: false
    };
  }
  // Golden Sunset Hour (15:45 - 18:20) — cinematic autumn golden hour
  if (hour >= 15.75 && hour < 18.35) {
    return {
      timeLabel: 'GOLDEN HOUR',
      skyColor: 0x283661,
      horizonColor: 0xf5955d,
      fogColor: 0xc47e5e,
      fogDensity: 0.00095,
      ambientLight: 0x705860,
      ambientIntensity: 0.70,
      dirLight: 0xffc278,
      dirIntensity: 1.85,
      hemiSky: 0xffa66b,
      hemiGround: 0x222c1d,
      hemiIntensity: 0.95,
      sunDir: [-0.62, 0.23, 0.72],
      sunColor: 0xffc978,
      sunIntensity: 1.35,
      rimColor: 0xff8844,
      fillColor: 0x6b92d6,
      warmth: 0.24,
      isNight: false
    };
  }
  // Evening Twilight / Dusk (18:20 - 20:00)
  if (hour >= 18.35 && hour < 20.0) {
    return {
      timeLabel: 'TWILIGHT DUSK',
      skyColor: 0x16142e,
      horizonColor: 0xd96e52,
      fogColor: 0x3b2630,
      fogDensity: 0.00105,
      ambientLight: 0x5c4654,
      ambientIntensity: 0.65,
      dirLight: 0xffb37a,
      dirIntensity: 1.35,
      hemiSky: 0xe6845c,
      hemiGround: 0x1d261a,
      hemiIntensity: 0.85,
      sunDir: [-0.72, 0.14, 0.68],
      sunColor: 0xff9a52,
      sunIntensity: 0.95,
      rimColor: 0xff7b54,
      fillColor: 0x4c6cb8,
      warmth: 0.18,
      isNight: true
    };
  }
  // Midnight Illuminated City (20:00 - 5:00)
  return {
    timeLabel: 'NIGHTLIGHTS',
    skyColor: 0x080d1c,
    horizonColor: 0x1c253d,
    fogColor: 0x0c1322,
    fogDensity: 0.00105,
    ambientLight: 0x3a4a66,
    ambientIntensity: 0.60,
    dirLight: 0xc2d8ff,
    dirIntensity: 1.25,
    hemiSky: 0x4f6d9e,
    hemiGround: 0x121914,
    hemiIntensity: 0.78,
    sunDir: [0.35, 0.68, -0.55],
    sunColor: 0xe0eeff,
    sunIntensity: 0.55,
    rimColor: 0xffb347,
    fillColor: 0x5588cc,
    warmth: 0.10,
    isNight: true
  };
}

export const TRACK_PRESETS = {
  city_live: {
    id: 'city_live',
    name: '🌐 Live Real-Time Sky (Dynamic Clock)',
    description: 'Real-time synchronized skyline atmosphere across Emerald Boulevard, parkways & Ridge forests.',
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 1.0,
    isMetroCity: true,
    isLiveTime: true,
    points: CIRCUIT_WAYPOINTS
  },
  city_sunny: {
    id: 'city_sunny',
    name: '☀️ Sunny Metro Afternoon (Lush Parks & Clear Sky)',
    description: 'Crisp sunlit afternoon across Grand Arch lawns, Apex Plaza & Highland Ridge canopy.',
    skyColor: 0x2c6db5,
    horizonColor: 0xc4e4f7,
    fogColor: 0xa6cde6,
    fogDensity: 0.00068,
    ambientLight: 0x90aac7,
    ambientIntensity: 0.85,
    dirLight: 0xfff7e3,
    dirIntensity: 1.98,
    hemiSky: 0xa8d8ff,
    hemiGround: 0x2e4025,
    hemiIntensity: 1.08,
    sunDir: [0.36, 0.84, 0.41],
    sunColor: 0xfff9e8,
    sunIntensity: 1.25,
    rimColor: 0xffdfb0,
    fillColor: 0x9ed0ff,
    warmth: 0.05,
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 1.02,
    isMetroCity: true,
    points: CIRCUIT_WAYPOINTS
  },
  city_sunset: {
    id: 'city_sunset',
    name: '🌅 Golden Sunset (Scenic Park Evening)',
    description: 'Cinematic golden sunset glow over Grand Arch, Emerald Park & Bay Signature Bridge.',
    skyColor: 0x26325e,
    horizonColor: 0xf7945c,
    fogColor: 0xc27c5a,
    fogDensity: 0.00095,
    ambientLight: 0x70565c,
    ambientIntensity: 0.72,
    dirLight: 0xffbf70,
    dirIntensity: 1.85,
    hemiSky: 0xffa366,
    hemiGround: 0x21291b,
    hemiIntensity: 0.95,
    sunDir: [-0.64, 0.21, 0.73],
    sunColor: 0xffcb78,
    sunIntensity: 1.38,
    rimColor: 0xff8844,
    fillColor: 0x6a8fd4,
    warmth: 0.26,
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 1.0,
    isMetroCity: true,
    points: CIRCUIT_WAYPOINTS
  },
  city_monsoon: {
    id: 'city_monsoon',
    name: '🌧️ Monsoon Storm (Rain & Reflective Puddles)',
    description: 'Tropical monsoon downpour over emerald boulevards & wet parkways with shimmering puddles.',
    skyColor: 0x162233,
    horizonColor: 0x45586e,
    fogColor: 0x2b3b4e,
    fogDensity: 0.00145,
    ambientLight: 0x4f647d,
    ambientIntensity: 0.74,
    dirLight: 0xb8d8f5,
    dirIntensity: 1.25,
    hemiSky: 0x728da8,
    hemiGround: 0x17241a,
    hemiIntensity: 0.92,
    sunDir: [0.3, 0.65, 0.4],
    sunColor: 0xd0e6fa,
    sunIntensity: 0.35,
    rimColor: 0x77b5ee,
    fillColor: 0x5c7da3,
    warmth: 0.0,
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.03,
    gripMult: 0.90,
    isRain: true,
    isMetroCity: true,
    points: CIRCUIT_WAYPOINTS
  },
  city_fog: {
    id: 'city_fog',
    name: '🌫️ Winter Morning Fog (Forest Mist)',
    description: 'Atmospheric winter morning haze drifting through Ridge forest & Grand Arch.',
    skyColor: 0x5b6a7a,
    horizonColor: 0xbac3cc,
    fogColor: 0x9aa4af,
    fogDensity: 0.00235,
    ambientLight: 0x87929e,
    ambientIntensity: 0.80,
    dirLight: 0xffe4b8,
    dirIntensity: 1.35,
    hemiSky: 0xc2ccd6,
    hemiGround: 0x2d382a,
    hemiIntensity: 0.95,
    sunDir: [0.55, 0.30, 0.65],
    sunColor: 0xffe7bd,
    sunIntensity: 0.75,
    rimColor: 0xffd599,
    fillColor: 0x9cb0c4,
    warmth: 0.12,
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 0.95,
    isFog: true,
    isMetroCity: true,
    points: CIRCUIT_WAYPOINTS
  },
  city_night: {
    id: 'city_night',
    name: '🌙 Midnight Neon City (Floodlights & Candlelights)',
    description: 'Starlit night skyline with illuminated monuments, warm avenue lamps, Metro lights & park candles.',
    skyColor: 0x070b18,
    horizonColor: 0x182138,
    fogColor: 0x0b1220,
    fogDensity: 0.00105,
    ambientLight: 0x3b4b68,
    ambientIntensity: 0.62,
    dirLight: 0xc4dbff,
    dirIntensity: 1.25,
    hemiSky: 0x4f6d9e,
    hemiGround: 0x121a14,
    hemiIntensity: 0.80,
    sunDir: [0.32, 0.68, -0.58],
    sunColor: 0xe6f0ff,
    sunIntensity: 0.55,
    rimColor: 0xffb347,
    fillColor: 0x5588cc,
    warmth: 0.10,
    isNight: true,
    trackWidth: 24,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 1.0,
    isMetroCity: true,
    points: CIRCUIT_WAYPOINTS
  }
};

export function resolveWorldPreset(trackId = 'city_live') {
  const normalized = String(trackId || 'city_live').replace(/^[a-z]+_(live|sunny|sunset|monsoon|fog|night|gp)$/, 'city_$1');
  const aliasMap = {
    city_gp: 'city_live',
    neon_city: 'city_live',
    cyber_rain: 'city_monsoon',
    cyber_desert: 'city_sunset',
    industrial_core: 'city_fog',
    space_ring: 'city_night'
  };
  const key = TRACK_PRESETS[normalized] ? normalized : (aliasMap[normalized] || 'city_live');
  const base = TRACK_PRESETS[key] || TRACK_PRESETS.city_live;
  if (base.isLiveTime) {
    return { ...base, ...getLiveWorldClimate() };
  }
  return { ...base };
}

export class Track {
  constructor(scene) {
    this.scene = scene;
    this.trackId = 'city_live';
    this.weather = 'clear';
    this.preset = resolveWorldPreset('city_live');

    this.curve = null;
    this.trackMesh = null;
    this.checkpoints = [];
    this.boostPads = [];
    this.movingObstacles = [];
    this.candleFlames = [];
    this.parkCharacters = [];
    this.dateHeartBoardMesh = null;
    this.dateVenues = {};
    this.activeDateVenueId = 'shah_rasoi';
    this.dateBeaconGroup = null;
    this.dateSpotPos = new THREE.Vector3(-10, 0, 108);
    this.coupleNames = { partner1: 'Aarav', partner2: 'Meera' };
    this.metroTrain = null;
    this.metroPosX = -180;
    this.trackWidth = 24;
    this.totalLength = 0;
    this.samplePoints = [];
    this.gridSlots = [];
    this.environmentGroup = new THREE.Group();
    this.scene.add(this.environmentGroup);

    this.showroomStageGroup = new THREE.Group();
    this.showroomSpinRing = null;
    this.buildShowroomStage();
    this.scene.add(this.showroomStageGroup);

    // Reusable scratch vectors for closest-point interpolation
    this._tmpVec = new THREE.Vector3();
    this._interpSample = {
      u: 0,
      position: new THREE.Vector3(),
      tangent: new THREE.Vector3(0, 0, 1),
      normal: new THREE.Vector3(-1, 0, 0)
    };
  }

  disposeGroup(group) {
    if (!group) return;
    group.traverse((obj) => {
      if (obj.geometry && typeof obj.geometry.dispose === 'function') {
        obj.geometry.dispose();
      }
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => {
          if (mat.map && typeof mat.map.dispose === 'function') mat.map.dispose();
          if (mat.roughnessMap && typeof mat.roughnessMap.dispose === 'function') mat.roughnessMap.dispose();
          if (mat.bumpMap && typeof mat.bumpMap.dispose === 'function') mat.bumpMap.dispose();
          if (typeof mat.dispose === 'function') mat.dispose();
        });
      }
    });
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
  }

  buildTrack(trackId = 'city_live', weather = 'clear', options = {}) {
    const preset = resolveWorldPreset(trackId);
    this.trackId = preset.id;
    this.preset = preset;
    this.weather = preset.isRain ? 'rain' : (weather === 'rain' ? 'rain' : 'clear');
    if (options?.coupleNames) {
      this.coupleNames = {
        partner1: (options.coupleNames.partner1 || 'Aarav').trim().slice(0, 16),
        partner2: (options.coupleNames.partner2 || 'Meera').trim().slice(0, 16)
      };
    }

    this.disposeGroup(this.environmentGroup);
    this.trackMesh = null;
    this.movingObstacles = [];
    this.candleFlames = [];
    this.parkCharacters = [];
    this.dateHeartBoardMesh = null;
    this.dateVenues = {};
    this.dateBeaconGroup = null;
    this.metroTrain = null;

    this.trackWidth = preset.trackWidth;

    this.curve = new THREE.CatmullRomCurve3(preset.points, true, 'catmullrom', 0.2);
    this.totalLength = this.curve.getLength();

    const segments = 600;
    const halfWidth = this.trackWidth / 2;

    const roadVerts = [];
    const roadUvs = [];
    const roadIndices = [];
    const innerWallVerts = [];
    const outerWallVerts = [];
    const curbWallVerts = [];

    this.samplePoints = [];

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const point = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

      this.samplePoints.push({
        u,
        position: point,
        tangent,
        normal,
        leftEdge: point.clone().addScaledVector(normal, halfWidth),
        rightEdge: point.clone().addScaledVector(normal, -halfWidth)
      });
    }

    for (let i = 0; i <= segments; i++) {
      const sp = this.samplePoints[i];
      roadVerts.push(sp.leftEdge.x, sp.leftEdge.y + 0.03, sp.leftEdge.z);
      roadVerts.push(sp.rightEdge.x, sp.rightEdge.y + 0.03, sp.rightEdge.z);

      const vU = (i / segments) * 75;
      roadUvs.push(0, vU);
      roadUvs.push(1, vU);

      if (i < segments) {
        const row1 = i * 2;
        const row2 = (i + 1) * 2;
        // Winding order fixed so surface normal points UP (+Y) toward sky & lights
        roadIndices.push(row1, row2, row1 + 1);
        roadIndices.push(row1 + 1, row2, row2 + 1);
      }

      const wallHeight = 1.35;
      const innerBase = sp.leftEdge.clone().addScaledVector(sp.normal, 0.25);
      const outerBase = sp.rightEdge.clone().addScaledVector(sp.normal, -0.25);

      innerWallVerts.push(innerBase.x, innerBase.y - 0.1, innerBase.z);
      innerWallVerts.push(innerBase.x, innerBase.y + wallHeight, innerBase.z);
      outerWallVerts.push(outerBase.x, outerBase.y - 0.1, outerBase.z);
      outerWallVerts.push(outerBase.x, outerBase.y + wallHeight, outerBase.z);

      // Track deck underside skirt for elevated corners
      curbWallVerts.push(innerBase.x, innerBase.y - 1.5, innerBase.z);
      curbWallVerts.push(innerBase.x, innerBase.y + 0.03, innerBase.z);
    }

    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
    roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
    roadGeo.setIndex(roadIndices);
    roadGeo.computeVertexNormals();

    let asphaltTexture = null;
    let roughnessMap = null;
    try {
      asphaltTexture = this.generateAsphaltTexture();
      if (asphaltTexture) {
        asphaltTexture.wrapS = THREE.RepeatWrapping;
        asphaltTexture.wrapT = THREE.RepeatWrapping;
        asphaltTexture.repeat.set(1, 1);
        asphaltTexture.anisotropy = 8;
      }
      roughnessMap = this.generateAsphaltRoughnessMap(this.trackId === 'city_monsoon' || this.weather === 'rain');
      if (roughnessMap) {
        roughnessMap.wrapS = THREE.RepeatWrapping;
        roughnessMap.wrapT = THREE.RepeatWrapping;
        roughnessMap.repeat.set(1, 1);
        roughnessMap.anisotropy = 8;
      }
    } catch (e) {
      console.warn('asphaltTexture setup fallback:', e);
    }

    const isWet = (this.trackId === 'city_monsoon' || this.weather === 'rain');
    const roadMat = new THREE.MeshStandardMaterial({
      color: (this.trackId === 'cyber_desert') ? 0x42352a : (this.trackId === 'space_ring' ? 0x1e2536 : 0x2b2e35),
      map: asphaltTexture,
      roughnessMap: roughnessMap || null,
      roughness: isWet ? 0.35 : 0.78,
      metalness: isWet ? 0.52 : 0.16,
      envMapIntensity: isWet ? 1.9 : 1.0,
      side: THREE.DoubleSide
    });

    this.trackMesh = new THREE.Mesh(roadGeo, roadMat);
    this.trackMesh.receiveShadow = true;
    this.environmentGroup.add(this.trackMesh);

    this.buildBarriers(innerWallVerts, outerWallVerts, segments);
    this.buildRoadsideLightsAndChevrons();
    this.buildBrakingBoards();
    this.buildStartGantry();
    this.buildGrandstandsAndFloodlights();
    if (preset.isMetroCity) this.buildHighwaySigns();
    this.buildCheckpoints(20);
    this.buildBoostPads();
    this.buildWorldEnvironment(preset);
    this.generateGridSlots();

    if (preset.hasMovingObstacles) {
      this.buildMovingObstacles();
    }
  }

  buildShowroomStage() {
    const discGeo = new THREE.CylinderGeometry(5.2, 5.65, 0.08, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x0b0f18,
      metalness: 0.88,
      roughness: 0.22
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.set(0, -0.008, 0);
    disc.receiveShadow = true;

    const rimGeo = new THREE.TorusGeometry(5.15, 0.085, 10, 64);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 0.04, 0);

    const spinArcGeo = new THREE.TorusGeometry(3.90, 0.055, 8, 48, Math.PI * 1.45);
    const spinArcMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.88 });
    this.showroomSpinRing = new THREE.Mesh(spinArcGeo, spinArcMat);
    this.showroomSpinRing.rotation.x = Math.PI / 2;
    this.showroomSpinRing.position.set(0, 0.045, 0);

    this.showroomStageGroup.add(disc, rim, this.showroomSpinRing);

    const archMat = new THREE.MeshStandardMaterial({ color: 0x151c2a, metalness: 0.9, roughness: 0.25 });
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xeef8ff });
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
      const px = Math.cos(ang) * 5.8;
      const pz = Math.sin(ang) * 5.8;
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.4, 0.34), archMat);
      pillar.position.set(px, 1.7, pz);
      pillar.lookAt(0, 1.7, 0);
      const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.8, 0.06), ledMat);
      ledStrip.position.set(Math.cos(ang) * 5.65, 1.75, Math.sin(ang) * 5.65);
      ledStrip.lookAt(0, 1.75, 0);
      this.showroomStageGroup.add(pillar, ledStrip);
    }
  }

  setShowroomStageVisible(visible) {
    if (this.showroomStageGroup) {
      this.showroomStageGroup.visible = !!visible;
    }
  }

  updateShowroomStage(dt) {
    if (this.showroomStageGroup?.visible && this.showroomSpinRing) {
      this.showroomSpinRing.rotation.z += dt * 0.65;
    }
  }

  generateAsphaltTexture() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const baseColor = (this.trackId === 'cyber_desert') ? '#3a2d22' : (this.trackId === 'space_ring' ? '#1c2335' : '#252932');
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 512, 1024);

      // Asphalt grain aggregate
      for (let i = 0; i < 24000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 1024;
        const lum = Math.floor(28 + Math.random() * 34);
        ctx.fillStyle = `rgb(${lum},${lum + 2},${lum + 6})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Subtle darker worn asphalt tire tracks + natural tarmac shoulder verges
      ctx.fillStyle = 'rgba(10, 12, 16, 0.34)';
      ctx.fillRect(108, 0, 82, 1024);
      ctx.fillRect(322, 0, 82, 1024);
      ctx.fillStyle = 'rgba(155, 138, 114, 0.30)';
      ctx.fillRect(0, 0, 16, 1024);
      ctx.fillRect(496, 0, 16, 1024);

      // Crisp highway thermoplastic white edge boundaries
      ctx.fillStyle = 'rgba(246, 248, 252, 0.90)';
      ctx.fillRect(18, 0, 9, 1024);
      ctx.fillRect(485, 0, 9, 1024);

      // Realistic sandstone / race kerbs
      const isMetro = !!this.preset?.isMetroCity;
      const curbColorA = isMetro ? '#b86b4b' : ((this.trackId === 'cyber_desert') ? '#ffaa00' : (this.trackId === 'space_ring' ? '#00f0ff' : '#ff0055'));
      const curbColorB = isMetro ? '#d8c5a3' : '#f1f5f9';
      for (let y = 0; y < 1024; y += 64) {
        const step = Math.floor(y / 64);
        ctx.fillStyle = step % 2 === 0 ? curbColorA : curbColorB;
        ctx.fillRect(2, y, 13, 62);
        ctx.fillRect(497, y, 13, 62);
      }

      // Authentic Highway Center Dashed Divider + Reflective Amber Studs
      const centerColor = isMetro ? '#f5b83d' : ((this.trackId === 'cyber_desert') ? '#ffd066' : '#00f0ff');
      for (let y = 0; y < 1024; y += 128) {
        ctx.fillStyle = centerColor;
        ctx.fillRect(252, y + 14, 8, 64);
      }

      const tex = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
      return tex;
    } catch (e) {
      console.warn('generateAsphaltTexture drawing error:', e);
      return null;
    }
  }

  generateAsphaltRoughnessMap(isWet = false) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = isWet ? '#666666' : '#cccccc';
      ctx.fillRect(0, 0, 256, 512);

      // Glossy worn racing tire grooves
      ctx.fillStyle = isWet ? '#262626' : '#888888';
      ctx.fillRect(52, 0, 44, 512);
      ctx.fillRect(160, 0, 44, 512);

      if (isWet) {
        // Mirror-smooth rain puddles along the asphalt
        for (let i = 0; i < 24; i++) {
          const px = 28 + Math.random() * 200;
          const py = Math.random() * 512;
          const rx = 14 + Math.random() * 26;
          const ry = 28 + Math.random() * 58;
          ctx.fillStyle = 'rgba(18, 18, 18, 0.72)';
          ctx.beginPath();
          if (ctx.ellipse) ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
          else ctx.arc(px, py, rx, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      return null;
    }
  }

  buildBarriers(innerVerts, outerVerts, segments) {
    const buildWallMesh = (verts, isInner) => {
      const indices = [];
      for (let i = 0; i < segments; i++) {
        const r1 = i * 2;
        const r2 = (i + 1) * 2;
        indices.push(r1, r1 + 1, r2);
        indices.push(r1 + 1, r2 + 1, r2);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: 0x2a313e,
        metalness: 0.72,
        roughness: 0.32,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.environmentGroup.add(mesh);

      // Neon Guardrail Top Ribbon
      const neonStripVerts = [];
      const stripIndices = [];
      for (let i = 0; i <= segments; i++) {
        const topX = verts[i * 2 * 3 + 0] || verts[0];
        const topY = (verts[i * 2 * 3 + 1] || 0) + 1.38;
        const topZ = verts[i * 2 * 3 + 2] || 0;
        neonStripVerts.push(topX, topY, topZ);
        neonStripVerts.push(topX, topY + 0.16, topZ);

        if (i < segments) {
          const r1 = i * 2;
          const r2 = (i + 1) * 2;
          stripIndices.push(r1, r1 + 1, r2);
          stripIndices.push(r1 + 1, r2 + 1, r2);
        }
      }

      const neonGeo = new THREE.BufferGeometry();
      neonGeo.setAttribute('position', new THREE.Float32BufferAttribute(neonStripVerts, 3));
      neonGeo.setIndex(stripIndices);

      const neonColor = this.preset?.isMetroCity
        ? (isInner ? 0xff9933 : 0x138808)
        : ((this.trackId === 'cyber_desert')
            ? (isInner ? 0xffaa00 : 0xff4400)
            : (this.trackId === 'space_ring' ? (isInner ? 0x00ffff : 0xaa00ff) : (isInner ? 0x00f0ff : 0xff0077)));

      const neonMesh = new THREE.Mesh(neonGeo, new THREE.MeshBasicMaterial({ color: neonColor, side: THREE.DoubleSide }));
      this.environmentGroup.add(neonMesh);
    };

    buildWallMesh(innerVerts, true);
    buildWallMesh(outerVerts, false);
  }

  buildRoadsideLightsAndChevrons() {
    const poleCount = 44;
    const poleGeo = new THREE.CylinderGeometry(0.11, 0.17, 6.2, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: this.preset?.isMetroCity ? 0x2c2420 : 0x1e2530, metalness: 0.82, roughness: 0.32 });
    const armGeo = new THREE.BoxGeometry(1.55, 0.14, 0.16);
    const lampGeo = new THREE.CylinderGeometry(0.24, 0.34, 0.38, 8);
    const lampColor = this.preset?.isMetroCity ? 0xffcc70 : (this.trackId === 'cyber_desert' ? 0xffaa33 : (this.trackId === 'industrial_core' ? 0xff6622 : 0x00f0ff));
    const lampMat = new THREE.MeshBasicMaterial({ color: lampColor });

    const poleInst = new THREE.InstancedMesh(poleGeo, poleMat, poleCount * 2);
    const armInst = new THREE.InstancedMesh(armGeo, poleMat, poleCount * 2);
    const lampInst = new THREE.InstancedMesh(lampGeo, lampMat, poleCount * 2);

    const dummy = new THREE.Object3D();
    const halfW = this.trackWidth / 2 + 1.0;

    let idx = 0;
    for (let i = 0; i < poleCount; i++) {
      const spIdx = Math.floor((i / poleCount) * (this.samplePoints.length - 1));
      const sp = this.samplePoints[spIdx];
      const yaw = Math.atan2(sp.tangent.x, sp.tangent.z);

      [-1, 1].forEach((side) => {
        const base = sp.position.clone().addScaledVector(sp.normal, side * halfW);
        dummy.position.set(base.x, base.y + 3.1, base.z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        poleInst.setMatrixAt(idx, dummy.matrix);

        const armOffset = sp.normal.clone().multiplyScalar(-side * 0.65);
        dummy.position.set(base.x + armOffset.x, base.y + 6.18, base.z + armOffset.z);
        dummy.updateMatrix();
        armInst.setMatrixAt(idx, dummy.matrix);

        const bulbOffset = sp.normal.clone().multiplyScalar(-side * 1.25);
        dummy.position.set(base.x + bulbOffset.x, base.y + 5.98, base.z + bulbOffset.z);
        dummy.updateMatrix();
        lampInst.setMatrixAt(idx, dummy.matrix);
        idx++;
      });
    }

    poleInst.instanceMatrix.needsUpdate = true;
    armInst.instanceMatrix.needsUpdate = true;
    lampInst.instanceMatrix.needsUpdate = true;
    this.environmentGroup.add(poleInst, armInst, lampInst);

    // 3D Concrete Jersey Support Posts along road edge guardrails
    const postGeo = new THREE.BoxGeometry(0.44, 1.48, 0.56);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x3b424d, roughness: 0.78, metalness: 0.25 });
    const postCount = 72;
    const guardPostInst = new THREE.InstancedMesh(postGeo, postMat, postCount * 2);
    let gIdx = 0;
    for (let i = 0; i < postCount; i++) {
      const sp = this.samplePoints[Math.floor((i / postCount) * (this.samplePoints.length - 1))];
      const yaw = Math.atan2(sp.tangent.x, sp.tangent.z);
      [-1, 1].forEach((side) => {
        const p = sp.position.clone().addScaledVector(sp.normal, side * (this.trackWidth * 0.5 + 0.15));
        dummy.position.set(p.x, p.y + 0.72, p.z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        guardPostInst.setMatrixAt(gIdx++, dummy.matrix);
      });
    }
    guardPostInst.instanceMatrix.needsUpdate = true;
    this.environmentGroup.add(guardPostInst);

    // High-visibility turn warning chevrons at sharp corners
    const chevronGeo = new THREE.BoxGeometry(2.4, 1.4, 0.22);
    const chevronCanvas = document.createElement('canvas');
    chevronCanvas.width = 128;
    chevronCanvas.height = 64;
    const cctx = chevronCanvas.getContext('2d');
    cctx.fillStyle = '#0a0d16';
    cctx.fillRect(0, 0, 128, 64);
    cctx.fillStyle = '#ffaa00';
    for (let cx = 12; cx < 110; cx += 38) {
      cctx.beginPath();
      cctx.moveTo(cx, 8);
      cctx.lineTo(cx + 22, 32);
      cctx.lineTo(cx, 56);
      cctx.lineTo(cx + 12, 56);
      cctx.lineTo(cx + 34, 32);
      cctx.lineTo(cx + 12, 8);
      cctx.closePath();
      cctx.fill();
    }
    const chevronMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(chevronCanvas) });

    for (let i = 10; i < this.samplePoints.length - 10; i += 14) {
      const sp = this.samplePoints[i];
      const spAhead = this.samplePoints[(i + 12) % this.samplePoints.length];
      const crossY = sp.tangent.x * spAhead.tangent.z - sp.tangent.z * spAhead.tangent.x;
      const dot = sp.tangent.dot(spAhead.tangent);
      if (dot < 0.96) {
        const outerSide = crossY > 0 ? 1 : -1;
        const pos = sp.position.clone().addScaledVector(sp.normal, outerSide * (halfW + 0.5));
        const sign = new THREE.Mesh(chevronGeo, chevronMat);
        sign.position.set(pos.x, pos.y + 2.2, pos.z);
        sign.lookAt(sp.position.x, pos.y + 2.2, sp.position.z);
        this.environmentGroup.add(sign);
      }
    }
  }

  buildBrakingBoards() {
    const halfW = this.trackWidth / 2 + 1.1;
    const makeBoardMat = (label) => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 96;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 128, 96);
      ctx.strokeStyle = '#ff0044';
      ctx.lineWidth = 6;
      ctx.strokeRect(4, 4, 120, 88);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 64, 48);
      return new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) });
    };
    const mat200 = makeBoardMat('200m');
    const mat100 = makeBoardMat('100m');
    const boardGeo = new THREE.BoxGeometry(1.5, 1.05, 0.12);

    for (let i = 18; i < this.samplePoints.length - 18; i += 42) {
      const sp = this.samplePoints[i];
      const spAhead = this.samplePoints[(i + 14) % this.samplePoints.length];
      if (sp.tangent.dot(spAhead.tangent) < 0.92) {
        const crossY = sp.tangent.x * spAhead.tangent.z - sp.tangent.z * spAhead.tangent.x;
        const outerSide = crossY > 0 ? 1 : -1;
        const sp200 = this.samplePoints[(i - 9 + this.samplePoints.length) % this.samplePoints.length];
        const sp100 = this.samplePoints[(i - 4 + this.samplePoints.length) % this.samplePoints.length];
        [
          { pt: sp200, mat: mat200 },
          { pt: sp100, mat: mat100 }
        ].forEach(({ pt, mat }) => {
          const m = new THREE.Mesh(boardGeo, mat);
          const p = pt.position.clone().addScaledVector(pt.normal, outerSide * halfW);
          m.position.set(p.x, p.y + 1.9, p.z);
          m.rotation.y = Math.atan2(pt.tangent.x, pt.tangent.z) + Math.PI;
          this.environmentGroup.add(m);
        });
      }
    }
  }

  buildGrandstandsAndFloodlights() {
    const sp = this.samplePoints[0];
    const yaw = Math.atan2(sp.tangent.x, sp.tangent.z);
    const group = new THREE.Group();
    group.position.copy(sp.position);
    group.rotation.y = yaw;

    const concreteMat = new THREE.MeshStandardMaterial({ color: this.preset?.isMetroCity ? 0x5c362c : 0x161c28, roughness: 0.78, metalness: 0.25 });
    const trimCyanMat = new THREE.MeshBasicMaterial({ color: this.preset?.isMetroCity ? 0xff9933 : 0x00f0ff });
    const trimMagMat = new THREE.MeshBasicMaterial({ color: this.preset?.isMetroCity ? 0x138808 : 0xff0055 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x262e3d, metalness: 0.85, roughness: 0.25 });
    const beamHeadMat = new THREE.MeshBasicMaterial({ color: this.preset?.isMetroCity ? 0xffe4b5 : 0xf8fbff });

    [-1, 1].forEach((side) => {
      const xBase = side * (this.trackWidth / 2 + 8.5);
      // 3-tier Motorsport Grandstand shifted slightly forward (+30m) along clear straight so south hairpin stays 100% clear
      const zCenter = 30;
      for (let tier = 0; tier < 3; tier++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.7 + tier * 1.35, 46), concreteMat);
        step.position.set(xBase + side * tier * 2.7, (1.7 + tier * 1.35) * 0.5, zCenter);
        group.add(step);
      }
      const roof = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.45, 48), concreteMat);
      roof.position.set(xBase + side * 2.9, 7.6, zCenter);
      const neonFascia = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.40, 48), side < 0 ? trimCyanMat : trimMagMat);
      neonFascia.position.set(xBase - side * 2.0, 7.45, zCenter);
      group.add(roof, neonFascia);

      // Stadium Floodlight Towers
      [zCenter - 18, zCenter + 18].forEach((zPos) => {
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.48, 16, 8), poleMat);
        tower.position.set(xBase + side * 6.2, 8, zPos);
        const lightHead = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 0.5), beamHeadMat);
        lightHead.position.set(xBase + side * 5.5, 16, zPos);
        lightHead.lookAt(0, 0, zPos);
        group.add(tower, lightHead);
      });
    });

    this.environmentGroup.add(group);
  }

  buildStartGantry() {
    const sp = this.samplePoints[0];
    const gantryGroup = new THREE.Group();
    gantryGroup.position.copy(sp.position);
    gantryGroup.rotation.y = Math.atan2(sp.tangent.x, sp.tangent.z);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x33373f, metalness: 0.9, roughness: 0.25 });
    const postGeo = new THREE.BoxGeometry(0.9, 8.2, 0.9);

    const postL = new THREE.Mesh(postGeo, pillarMat);
    postL.position.set(-this.trackWidth / 2 - 0.8, 4.1, 0);

    const postR = new THREE.Mesh(postGeo, pillarMat);
    postR.position.set(this.trackWidth / 2 + 0.8, 4.1, 0);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(this.trackWidth + 3.2, 2.2, 1.6), pillarMat);
    bridge.position.set(0, 7.6, 0);

    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 1024;
    bannerCanvas.height = 256;
    const bCtx = bannerCanvas.getContext('2d');
    bCtx.fillStyle = this.preset?.isMetroCity ? '#0d1118' : '#060a12';
    bCtx.fillRect(0, 0, 1024, 256);
    if (this.preset?.isMetroCity) {
      bCtx.fillStyle = '#ff9933';
      bCtx.fillRect(0, 0, 1024, 18);
      bCtx.fillStyle = '#ffffff';
      bCtx.fillRect(0, 18, 1024, 10);
      bCtx.fillStyle = '#138808';
      bCtx.fillRect(0, 228, 1024, 28);
      bCtx.fillStyle = '#ffd088';
      bCtx.font = 'bold 50px Orbitron, sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText(TRACK_PRESETS[this.trackId].name.toUpperCase(), 512, 112);
      bCtx.fillStyle = '#ffffff';
      bCtx.font = 'bold 34px Orbitron, sans-serif';
      bCtx.fillText('★ S3D GRAND PRIX • EMERALD CIRCUIT ★', 512, 186);
    } else {
      bCtx.strokeStyle = '#00f0ff';
      bCtx.lineWidth = 12;
      bCtx.strokeRect(6, 6, 1012, 244);
      bCtx.fillStyle = '#00f0ff';
      bCtx.font = 'bold 58px Orbitron, sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText(TRACK_PRESETS[this.trackId].name.toUpperCase(), 512, 105);
      bCtx.fillStyle = '#ff0055';
      bCtx.font = 'bold 42px Orbitron, sans-serif';
      bCtx.fillText('★ S3D DRIVE GP ★', 512, 185);
    }

    const bannerMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(bannerCanvas), roughness: 0.35, metalness: 0.25 });
    const housingMat = new THREE.MeshStandardMaterial({ color: 0x161b24, metalness: 0.85, roughness: 0.25 });
    const bannerBox = new THREE.Mesh(
      new THREE.BoxGeometry(this.trackWidth - 2.6, 1.65, 0.38),
      [housingMat, housingMat, housingMat, housingMat, bannerMat, bannerMat]
    );
    bannerBox.position.set(0, 7.65, 0.72);

    // 3D 5-Pod F1 Starting Gantry Light Visors
    const podMat = new THREE.MeshStandardMaterial({ color: 0x101319, metalness: 0.88, roughness: 0.22 });
    const redPodMat = new THREE.MeshBasicMaterial({ color: 0xff2244 });
    for (let p = -2; p <= 2; p++) {
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.45, 12), podMat);
      pod.rotateX(Math.PI / 2);
      pod.position.set(p * 1.4, 6.25, 0.78);
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), redPodMat);
      lens.position.set(p * 1.4, 6.25, 0.96);
      gantryGroup.add(pod, lens);
    }

    // 3D Checkered Start/Finish Flush Marble/Tar Slabs on the Road
    const whiteTileMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const blackTileMat = new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.55 });
    const cols = 14;
    const rows = 2;
    const tileW = (this.trackWidth - 2.0) / cols;
    const tileD = 1.45;
    const tileGeo = new THREE.BoxGeometry(tileW * 0.98, 0.036, tileD * 0.96);
    const whiteInst = new THREE.InstancedMesh(tileGeo, whiteTileMat, (cols * rows) / 2);
    const blackInst = new THREE.InstancedMesh(tileGeo, blackTileMat, (cols * rows) / 2);
    const tDummy = new THREE.Object3D();
    let wi = 0, bi = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tDummy.position.set(-((cols - 1) * 0.5 - c) * tileW, 0.024, (r - 0.5) * tileD);
        tDummy.updateMatrix();
        if ((r + c) % 2 === 0) whiteInst.setMatrixAt(wi++, tDummy.matrix);
        else blackInst.setMatrixAt(bi++, tDummy.matrix);
      }
    }
    whiteInst.instanceMatrix.needsUpdate = true;
    blackInst.instanceMatrix.needsUpdate = true;

    gantryGroup.add(postL, postR, bridge, bannerBox, whiteInst, blackInst);
    this.environmentGroup.add(gantryGroup);
  }

  buildCheckpoints(count = 20) {
    this.checkpoints = [];
    const ringGeo = new THREE.TorusGeometry(this.trackWidth * 0.52, 0.14, 8, 28, Math.PI);
    const startMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.65 });
    const cpMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 });

    for (let i = 0; i < count; i++) {
      const u = i / count;
      const pos = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

      const ringGroup = new THREE.Group();
      ringGroup.position.copy(pos);
      ringGroup.rotation.y = Math.atan2(tangent.x, tangent.z);

      const ringMesh = new THREE.Mesh(ringGeo, (i === 0) ? startMat : cpMat);
      ringMesh.position.y = 0.4;
      ringGroup.add(ringMesh);
      this.environmentGroup.add(ringGroup);

      this.checkpoints.push({
        index: i,
        u,
        position: pos,
        tangent,
        normal,
        radius: this.trackWidth * 0.68
      });
    }
  }

  buildBoostPads() {
    this.boostPads = [];
    const boostUValues = [0.08, 0.32, 0.58, 0.82];

    const deckMat = new THREE.MeshStandardMaterial({ color: 0x091726, metalness: 0.72, roughness: 0.28 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0x263246, metalness: 0.85, roughness: 0.2 });
    const chevronGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    boostUValues.forEach((u, idx) => {
      const pos = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u).normalize();

      const padGroup = new THREE.Group();
      padGroup.position.copy(pos);
      padGroup.rotation.y = Math.atan2(tangent.x, tangent.z);

      // 3D Recessed Steel Deck + Side Curb Rails + 3 Sculpted 3D Chevron Wings
      const deck = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.06, 12.6), deckMat);
      deck.position.y = 0.03;
      padGroup.add(deck);

      [-3.15, 3.15].forEach((rx) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 12.6), railMat);
        rail.position.set(rx, 0.06, 0);
        padGroup.add(rail);
      });

      for (let c = -1; c <= 1; c++) {
        const zCenter = c * 3.4;
        [-1, 1].forEach((side) => {
          const wing = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.09, 0.42), chevronGlowMat);
          wing.position.set(side * 0.92, 0.08, zCenter - 0.55);
          wing.rotation.y = side * 0.52;
          padGroup.add(wing);
        });
      }

      this.environmentGroup.add(padGroup);
      this.boostPads.push({ id: idx, position: pos, radius: 5.0 });
    });
  }

  buildMovingObstacles() {
    const obstacleUValues = [0.22, 0.48, 0.74];
    const pistonGeo = new THREE.BoxGeometry(4.2, 1.3, 1.4);
    const pistonMat = new THREE.MeshStandardMaterial({
      color: 0xff4400,
      emissive: 0x551100,
      metalness: 0.75,
      roughness: 0.25
    });
    const stripGeo = new THREE.BoxGeometry(4.25, 0.22, 1.45);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

    obstacleUValues.forEach((u, idx) => {
      const sp = this.samplePoints[Math.floor(u * (this.samplePoints.length - 1))];
      if (!sp) return;

      const group = new THREE.Group();
      group.position.copy(sp.position);
      group.rotation.y = Math.atan2(sp.tangent.x, sp.tangent.z);

      const piston = new THREE.Mesh(pistonGeo, pistonMat);
      piston.position.set(0, 0.7, 0);
      piston.castShadow = true;

      const warnStrip = new THREE.Mesh(stripGeo, stripMat);
      warnStrip.position.y = 0.45;
      piston.add(warnStrip);

      group.add(piston);
      this.environmentGroup.add(group);

      this.movingObstacles.push({
        group,
        piston,
        basePos: sp.position.clone(),
        normal: sp.normal.clone(),
        worldPos: sp.position.clone(),
        timer: idx * 1.5
      });
    });
  }

  updateMovingObstacles(dt) {
    this.movingObstacles.forEach((obs) => {
      obs.timer += dt * 2.1;
      const swingOffset = Math.sin(obs.timer) * (this.trackWidth * 0.32);
      obs.piston.position.x = swingOffset;
      obs.piston.getWorldPosition(obs.worldPos);
    });
  }

  updateWorldAnimations(dt) {
    if (this.metroTrain) {
      this.metroPosX += dt * 28;
      if (this.metroPosX > 360) this.metroPosX = -360;
      this.metroTrain.position.x = this.metroPosX;
    }
    const t = performance.now() * 0.008;
    if (this.candleFlames && this.candleFlames.length) {
      for (let i = 0; i < this.candleFlames.length; i++) {
        const f = this.candleFlames[i];
        const s = 0.85 + Math.sin(t + i * 1.9) * 0.18 + Math.cos(t * 2.3 + i) * 0.1;
        f.scale.set(0.92 + (s - 0.9) * 0.3, s * 1.15, 0.92 + (s - 0.9) * 0.3);
      }
    }
    if (this.dateBeaconGroup && this.dateBeaconGroup.visible) {
      this.dateBeaconGroup.rotation.y += dt * 1.45;
      this.dateBeaconGroup.position.y = 12.2 + Math.sin(t * 0.45) * 0.85;
    }
    if (this.parkCharacters && this.parkCharacters.length) {
      for (let i = 0; i < this.parkCharacters.length; i++) {
        const pc = this.parkCharacters[i];
        if (!pc?.group) continue;
        const phase = t * 0.32 + i * 1.4;
        if (pc.walkRadius > 0) {
          const ang = phase * 0.16;
          pc.group.position.x = pc.homeX + Math.cos(ang) * pc.walkRadius;
          pc.group.position.z = pc.homeZ + Math.sin(ang) * pc.walkRadius;
          pc.group.rotation.y = -ang;
          if (pc.armL) pc.armL.rotation.x = Math.sin(phase * 1.6) * 0.32;
          if (pc.armR) pc.armR.rotation.x = -Math.sin(phase * 1.6) * 0.32;
        } else {
          if (pc.head) pc.head.rotation.y = Math.sin(phase * 0.4) * 0.22;
          if (pc.armR) pc.armR.rotation.z = -0.25 + Math.sin(phase * 1.1) * 0.18;
        }
      }
    }
  }

  setCoupleNames(partner1 = 'Aarav', partner2 = 'Meera') {
    this.coupleNames = {
      partner1: (partner1 || 'Aarav').trim().slice(0, 16),
      partner2: (partner2 || 'Meera').trim().slice(0, 16)
    };
    if (this.dateHeartBoardMesh) {
      const tex = this.makeHeartBoardTexture(this.coupleNames.partner1, this.coupleNames.partner2);
      const mats = Array.isArray(this.dateHeartBoardMesh.material)
        ? this.dateHeartBoardMesh.material
        : [this.dateHeartBoardMesh.material];
      mats.forEach((m, idx) => {
        if (m && (m.userData?.isHeartFace || idx >= 4 || !Array.isArray(this.dateHeartBoardMesh.material))) {
          if (m.map && m.map !== tex) m.map.dispose();
          m.map = tex;
          m.needsUpdate = true;
        }
      });
    }
  }

  makeHeartBoardTexture(name1 = 'Aarav', name2 = 'Meera') {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, 768, 320);
    bg.addColorStop(0, '#2a0818');
    bg.addColorStop(0.5, '#4c0f28');
    bg.addColorStop(1, '#260916');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 768, 320);

    ctx.strokeStyle = '#ff6b9d';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 748, 300);
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, 724, 276);

    ctx.fillStyle = '#ffccd5';
    ctx.font = 'bold 26px Rajdhani, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ CANDLELIGHT DATE NIGHT ★', 384, 72);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Orbitron, sans-serif';
    ctx.fillText(`${name1.toUpperCase()}  ♥  ${name2.toUpperCase()}`, 384, 175);

    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 24px Rajdhani, sans-serif';
    ctx.fillText('GRAND ARCH • EMERALD GARDENS • FOREVER VIBES', 384, 248);

    const tex = new THREE.CanvasTexture(canvas);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  isPointClearOfTrack(x, z, clearanceRadius = 16) {
    const reqDist = (this.trackWidth * 0.5) + clearanceRadius;
    const reqSq = reqDist * reqDist;
    for (let i = 0; i < this.samplePoints.length; i += 2) {
      const sp = this.samplePoints[i];
      const dx = x - sp.position.x;
      const dz = z - sp.position.z;
      if (dx * dx + dz * dz < reqSq) return false;
    }
    return true;
  }

  makeSandstoneTexture(baseColor = '#d4ad7d', veinColor = '#b88c5b') {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 32) {
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, y, 256, 2);
      const offset = (y % 64 === 0) ? 0 : 32;
      for (let x = offset; x < 256; x += 64) {
        ctx.fillRect(x, y, 2, 32);
      }
    }
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.08)' : veinColor;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 3, 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  generateTerrainTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#254221';
    ctx.fillRect(0, 0, 512, 512);

    // Rich botanical Central Vista lawn turf, sunlit clover tufts & organic soil patches
    for (let i = 0; i < 9500; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 1.5 + Math.random() * 4.5;
      const pick = Math.random();
      ctx.fillStyle = pick < 0.42
        ? 'rgba(54, 96, 40, 0.36)'
        : (pick < 0.78 ? 'rgba(26, 54, 24, 0.40)' : 'rgba(84, 72, 46, 0.20)');
      ctx.fillRect(x, y, r, r);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(48, 48);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  makeFacadeTexture(style = 'cp') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (style === 'cp') {
      ctx.fillStyle = '#ebe3d0';
      ctx.fillRect(0, 0, 512, 1024);
      // Georgians white columns + deep veranda arch recesses + sandstone plinth
      for (let row = 0; row < 4; row++) {
        const y = 36 + row * 246;
        ctx.fillStyle = '#c8b896';
        ctx.fillRect(0, y - 16, 512, 12);
        for (let col = 0; col < 4; col++) {
          const x = 32 + col * 120;
          ctx.fillStyle = row === 3 ? '#f3b764' : '#242731';
          ctx.fillRect(x, y, 76, 176);
          ctx.fillStyle = 'rgba(255,255,255,0.12)';
          ctx.fillRect(x + 8, y + 8, 22, 150);
          ctx.strokeStyle = '#d4c6a8';
          ctx.lineWidth = 8;
          ctx.strokeRect(x, y, 76, 176);
        }
      }
    } else {
      const glassBg = ctx.createLinearGradient(0, 0, 0, 1024);
      glassBg.addColorStop(0, '#2b476b');
      glassBg.addColorStop(0.5, '#192a42');
      glassBg.addColorStop(1, '#101826');
      ctx.fillStyle = glassBg;
      ctx.fillRect(0, 0, 512, 1024);
      for (let row = 0; row < 20; row++) {
        ctx.fillStyle = '#0d1522';
        ctx.fillRect(0, row * 51, 512, 10);
        for (let col = 0; col < 10; col++) {
          const hash = (row * 11 + col * 19) % 7;
          ctx.fillStyle = hash < 2 ? '#ffe09c' : (hash === 2 ? '#76b9ea' : 'rgba(92, 140, 185, 0.24)');
          ctx.fillRect(10 + col * 50, row * 51 + 12, 38, 34);
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  buildHighwaySigns() {
    const signSpecs = [
      { u: 0.05, title: 'GRAND ARCH', sub: 'EMERALD BOULEVARD  ▲  150m' },
      { u: 0.29, title: 'BAY BRIDGE', sub: 'HARBOR EXPRESSWAY  ↗' },
      { u: 0.56, title: 'APEX PLAZA', sub: 'DOWNTOWN LOOP  ↑' },
      { u: 0.84, title: 'START / FINISH', sub: 'S3D GRAND PRIX  ▼' }
    ];
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x3b4252, metalness: 0.85, roughness: 0.25 });

    signSpecs.forEach((spec) => {
      const sp = this.samplePoints[Math.floor(spec.u * (this.samplePoints.length - 1))];
      if (!sp) return;
      const g = new THREE.Group();
      g.position.copy(sp.position);
      g.rotation.y = Math.atan2(sp.tangent.x, sp.tangent.z);

      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 7.6, 8), poleMat);
      postL.position.set(-this.trackWidth / 2 - 0.6, 3.8, 0);
      const postR = postL.clone();
      postR.position.x = this.trackWidth / 2 + 0.6;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(this.trackWidth + 2, 0.32, 0.32), poleMat);
      bar.position.set(0, 7.5, 0);

      const canvas = document.createElement('canvas');
      canvas.width = 768; canvas.height = 192;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#095228';
      ctx.fillRect(0, 0, 768, 192);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(8, 8, 752, 176);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 46px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(spec.title, 384, 78);
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 30px Rajdhani, sans-serif';
      ctx.fillText(spec.sub, 384, 140);

      const signMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas), roughness: 0.35, metalness: 0.15 });
      const greenFrameMat = new THREE.MeshStandardMaterial({ color: 0x095228, metalness: 0.45, roughness: 0.35 });
      const boardBox = new THREE.Mesh(
        new THREE.BoxGeometry(this.trackWidth * 0.62, 2.25, 0.34),
        [greenFrameMat, greenFrameMat, greenFrameMat, greenFrameMat, signMat, signMat]
      );
      boardBox.position.set(0, 7.4, 0.22);

      // 3D Truss Brackets + Overhead Illuminator Floodlamps on Highway Signboard
      [-4.2, 4.2].forEach((lx) => {
        const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.95), poleMat);
        lampArm.position.set(lx, 8.65, 0.55);
        const lampHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.26, 8), poleMat);
        lampHead.position.set(lx, 8.55, 0.95);
        lampHead.rotation.x = 0.55;
        g.add(lampArm, lampHead);
      });
      g.add(postL, postR, bar, boardBox);
      this.environmentGroup.add(g);
    });
  }

  getTerrainY(x, z) {
    // Always keep a generous 32m corridor around the entire road curve safely below the asphalt!
    let minSq = Infinity;
    let nearestY = 0;
    for (let i = 0; i < this.samplePoints.length; i++) {
      const sp = this.samplePoints[i];
      const dx = x - sp.position.x;
      const dz = z - sp.position.z;
      const dSq = dx * dx + dz * dz;
      if (dSq < minSq) {
        minSq = dSq;
        nearestY = sp.position.y;
      }
    }
    const minDist = Math.sqrt(minSq);
    const flatCorridorRadius = (this.trackWidth * 0.5) + 20; // 32m half-width clear of road
    if (minDist <= flatCorridorRadius) {
      return Math.min(-0.35, nearestY - 0.90);
    }

    const r = Math.hypot(x, z);
    if (r < 410 || minDist < flatCorridorRadius + 24) {
      return -0.25;
    }

    const distBlend = Math.min(1, (minDist - (flatCorridorRadius + 24)) / 65);
    const radialBlend = Math.min(1, (r - 410) / 140);
    const ridgeBlend = distBlend * radialBlend;
    return -0.25 + ridgeBlend * (3.6 + Math.sin(x * 0.015) * 3.0 + Math.cos(z * 0.014) * 2.8);
  }

  create3DHeartGeo(scale = 1.0, depth = 0.35) {
    const s = new THREE.Shape();
    s.moveTo(0, 0.25 * scale);
    s.bezierCurveTo(0, 0.72 * scale, -0.82 * scale, 0.72 * scale, -0.82 * scale, 0.15 * scale);
    s.bezierCurveTo(-0.82 * scale, -0.35 * scale, -0.2 * scale, -0.75 * scale, 0, -1.05 * scale);
    s.bezierCurveTo(0.2 * scale, -0.75 * scale, 0.82 * scale, -0.35 * scale, 0.82 * scale, 0.15 * scale);
    s.bezierCurveTo(0.82 * scale, 0.72 * scale, 0, 0.72 * scale, 0, 0.25 * scale);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: depth * 0.25,
      bevelSize: depth * 0.18,
      bevelSegments: 2
    });
    geo.center();
    return geo;
  }

  createParkVisitor(outfitHex = 0x1d4ed8, skinHex = 0xd29268, isLongHair = false) {
    const g = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: skinHex, roughness: 0.52 });
    const outfitMat = new THREE.MeshStandardMaterial({ color: outfitHex, roughness: 0.6 });
    const trouserMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x161212, roughness: 0.7 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });

    // Legs & Shoes
    [-0.1, 0.1].forEach((lx) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.052, 0.78, 8), isLongHair ? outfitMat : trouserMat);
      leg.position.set(lx, 0.42, 0);
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.21), shoeMat);
      shoe.position.set(lx, 0.035, 0.04);
      g.add(leg, shoe);
    });

    // Sculpted Torso + Collar
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.145, 0.56, 10), outfitMat);
    torso.scale.set(1.18, 1.0, 0.72);
    torso.position.y = 1.08;
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.058, 0.1, 8), skinMat);
    neck.position.y = 1.40;
    g.add(torso, neck);

    // Sculpted Head + Jaw + Facial Features + Hair
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 12), skinMat);
    head.scale.set(0.92, 1.08, 0.96);
    head.position.y = 1.54;
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.045, 6), skinMat);
    nose.rotateX(Math.PI / 2);
    nose.position.set(0, -0.01, 0.112);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    [-0.038, 0.038].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), eyeMat);
      eye.position.set(ex, 0.02, 0.102);
      head.add(eye);
    });
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.122, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
    hair.position.set(0, 0.025, -0.01);
    head.add(nose, hair);
    if (isLongHair) {
      const backHair = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.075, 0.28, 10), hairMat);
      backHair.position.set(0, -0.1, -0.06);
      head.add(backHair);
    }

    // Articulated Arms
    const armGeo = new THREE.CylinderGeometry(0.045, 0.036, 0.50, 8);
    const armL = new THREE.Mesh(armGeo, outfitMat);
    armL.position.set(-0.23, 1.08, 0);
    armL.rotation.z = 0.08;
    const armR = new THREE.Mesh(armGeo, outfitMat);
    armR.position.set(0.23, 1.08, 0);
    armR.rotation.z = -0.08;

    g.add(head, armL, armR);
    return { group: g, head, armL, armR, homeX: 0, homeZ: 0, walkRadius: 0 };
  }

  buildWorldEnvironment(preset) {
    // 3D Sculpted Central Lawns, Park Paths & Gentle Background Ridge Hills
    const terrainTex = this.generateTerrainTexture();
    const isRain = (this.weather === 'rain' || !!preset?.isRain);
    const groundTint = isRain
      ? 0x76947a
      : (preset?.isNight ? 0x627a5e : (preset?.isFog ? 0x99ab99 : 0xe4eedc));
    const groundGeo = new THREE.PlaneGeometry(2200, 2200, 96, 96);
    groundGeo.rotateX(-Math.PI / 2);
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      posAttr.setY(i, this.getTerrainY(vx, vz));
    }
    groundGeo.computeVertexNormals();
    const groundMat = new THREE.MeshStandardMaterial({
      color: groundTint,
      map: terrainTex,
      roughness: isRain ? 0.42 : 0.94,
      metalness: isRain ? 0.25 : 0.04
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    this.environmentGroup.add(ground);

    // Subtle Night / Twilight Stars over Metro Sky
    const starCount = preset?.isNight ? 750 : 220;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.44;
      const r = 750 + Math.random() * 250;
      starPositions[i * 3 + 0] = r * Math.cos(theta) * Math.cos(phi);
      starPositions[i * 3 + 1] = 45 + r * Math.sin(phi);
      starPositions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffe6c2,
      size: 2.0,
      transparent: true,
      opacity: preset?.isNight ? 0.88 : 0.16,
      fog: false
    });
    this.environmentGroup.add(new THREE.Points(starGeo, starMat));

    this.buildCityLandmarks();
    this.buildCityFoliage();
    this.buildCitySkyline();
    this.buildMetroViaduct();
  }

  buildCityLandmarks() {
    const sandstoneCreamMat = new THREE.MeshStandardMaterial({
      color: 0xe6caa0,
      map: this.makeSandstoneTexture('#d9b382', '#bd925d'),
      roughness: 0.78,
      metalness: 0.06
    });
    const redSandstoneMat = new THREE.MeshStandardMaterial({
      color: 0xb64a38,
      map: this.makeSandstoneTexture('#9b3a2b', '#7a291e'),
      roughness: 0.82,
      metalness: 0.06
    });
    const whiteMarbleMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.25, metalness: 0.15, emissive: 0x1a1e28, emissiveIntensity: 0.22 });
    const darkArchVoidMat = new THREE.MeshStandardMaterial({ color: 0x140e12, roughness: 0.9 });
    const saffronMat = new THREE.MeshBasicMaterial({ color: 0xff9933 });
    const greenFlagMat = new THREE.MeshBasicMaterial({ color: 0x138808 });
    const whiteGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 });

    // 1. GRAND ARCH & PAVILION CANOPY (Set safely back in Central Park lawns)
    const ig = new THREE.Group();
    ig.position.set(-50, 0, 192);
    ig.rotation.y = 0.28;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(34, 2.2, 16), redSandstoneMat);
    plinth.position.y = 1.1;
    const leftPier = new THREE.Mesh(new THREE.BoxGeometry(7.2, 26, 9.5), sandstoneCreamMat);
    leftPier.position.set(-8.4, 15, 0);
    const rightPier = leftPier.clone();
    rightPier.position.x = 8.4;

    const crownLower = new THREE.Mesh(new THREE.BoxGeometry(25.5, 5.2, 10.2), sandstoneCreamMat);
    crownLower.position.y = 29.8;
    const crownCornice = new THREE.Mesh(new THREE.BoxGeometry(27.5, 2.2, 11.4), redSandstoneMat);
    crownCornice.position.y = 33.4;
    const crownTop = new THREE.Mesh(new THREE.BoxGeometry(22.5, 4.2, 9.2), sandstoneCreamMat);
    crownTop.position.y = 36.2;

    // Tricolor Architectural Uplights on Grand Arch Frieze
    const triSaffron = new THREE.Mesh(new THREE.BoxGeometry(25.8, 0.5, 10.4), saffronMat);
    triSaffron.position.y = 32.0;
    const triWhite = new THREE.Mesh(new THREE.BoxGeometry(25.8, 0.4, 10.4), whiteGlowMat);
    triWhite.position.y = 31.4;
    const triGreen = new THREE.Mesh(new THREE.BoxGeometry(25.8, 0.5, 10.4), greenFlagMat);
    triGreen.position.y = 30.8;

    // 3D Carved Sandstone Barrel Vault Archway + Stepped Amar Jawan Jyoti Memorial
    const archVault = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 4.8, 9.6, 16, 1, false, 0, Math.PI),
      sandstoneCreamMat
    );
    archVault.rotation.z = Math.PI / 2;
    archVault.rotation.y = Math.PI / 2;
    archVault.position.set(0, 22.8, 0);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(9.6, 4.8, 9.6), sandstoneCreamMat);
    archTop.position.y = 25.0;

    const cenotaphBase = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.2, 4.8), redSandstoneMat);
    cenotaphBase.position.set(0, 1.6, 11.0);
    const rifleStand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 1.6, 8), goldMat);
    rifleStand.position.set(0, 3.0, 11.0);
    const helmetTop = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), goldMat);
    helmetTop.position.set(0, 3.85, 11.0);
    const flameBowl = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 1.4, 12), redSandstoneMat);
    flameBowl.position.set(0, 2.8, 11.0);
    const eternalFlame = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.8, 8), saffronMat);
    eternalFlame.position.set(0, 4.2, 11.0);
    ig.add(archVault, cenotaphBase, rifleStand, helmetTop);

    // Adjacent National War Memorial Canopy Pavilion
    const canopyBase = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.8, 1.6, 8), redSandstoneMat);
    canopyBase.position.set(-22, 0.8, 14);
    const canopyDome = new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), sandstoneCreamMat);
    canopyDome.position.set(-22, 11.5, 14);
    ig.add(plinth, leftPier, rightPier, crownLower, crownCornice, crownTop, triSaffron, triWhite, triGreen, archTop, flameBowl, eternalFlame, canopyBase, canopyDome);
    for (let c = 0; c < 4; c++) {
      const ang = (c / 4) * Math.PI * 2 + Math.PI * 0.25;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 10, 10), sandstoneCreamMat);
      col.position.set(-22 + Math.cos(ang) * 2.8, 6.5, 14 + Math.sin(ang) * 2.8);
      ig.add(col);
    }
    this.environmentGroup.add(ig);

    // 2. LOTUS TEMPLE (Bahai House of Worship in East Infield + Reflecting Pool)
    const lotus = new THREE.Group();
    lotus.position.set(140, 0, 75);
    const pool = new THREE.Mesh(
      new THREE.CylinderGeometry(28, 29, 0.5, 36),
      new THREE.MeshStandardMaterial({ color: 0x0b4b75, roughness: 0.1, metalness: 0.75 })
    );
    pool.position.y = 0.25;
    const lotusBase = new THREE.Mesh(new THREE.CylinderGeometry(18, 21, 2.5, 18), whiteMarbleMat);
    lotusBase.position.y = 1.5;
    lotus.add(pool, lotusBase);
    for (let p = 0; p < 9; p++) {
      const ang = (p / 9) * Math.PI * 2;
      const outerPetal = new THREE.Mesh(new THREE.SphereGeometry(5.2, 12, 10, 0, Math.PI, 0, Math.PI * 0.65), whiteMarbleMat);
      outerPetal.scale.set(1.0, 2.3, 0.36);
      outerPetal.position.set(Math.cos(ang) * 11.4, 8.8, Math.sin(ang) * 11.4);
      outerPetal.rotation.order = 'YXZ';
      outerPetal.rotation.y = -ang + Math.PI / 2;
      outerPetal.rotation.x = 0.24;

      const midPetal = new THREE.Mesh(new THREE.SphereGeometry(4.4, 12, 10, 0, Math.PI, 0, Math.PI * 0.65), whiteMarbleMat);
      midPetal.scale.set(0.95, 2.55, 0.34);
      midPetal.position.set(Math.cos(ang + 0.35) * 8.2, 11.0, Math.sin(ang + 0.35) * 8.2);
      midPetal.rotation.order = 'YXZ';
      midPetal.rotation.y = -(ang + 0.35) + Math.PI / 2;
      midPetal.rotation.x = 0.14;

      const innerPetal = new THREE.Mesh(new THREE.ConeGeometry(4.2, 22.0, 8), whiteMarbleMat);
      innerPetal.position.set(Math.cos(ang + 0.18) * 5.2, 13.0, Math.sin(ang + 0.18) * 5.2);
      innerPetal.rotation.order = 'YXZ';
      innerPetal.rotation.y = -(ang + 0.18) + Math.PI / 2;
      innerPetal.rotation.x = 0.10;
      lotus.add(outerPetal, midPetal, innerPetal);

      if (p % 3 === 0) {
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.85, 11), whiteMarbleMat);
        bridge.position.set(Math.cos(ang) * 23.5, 0.6, Math.sin(ang) * 23.5);
        bridge.rotation.y = -ang;
        lotus.add(bridge);
      }
    }
    this.environmentGroup.add(lotus);

    // 3. SOUTH-WEST FLUTED SANDSTONE TOWER
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-345, 0, -165);
    let qY = 0;
    const tiers = [
      { rBot: 7.4, rTop: 6.0, h: 16, mat: redSandstoneMat },
      { rBot: 5.8, rTop: 4.8, h: 13, mat: redSandstoneMat },
      { rBot: 4.6, rTop: 3.7, h: 11, mat: redSandstoneMat },
      { rBot: 3.5, rTop: 2.9, h: 9, mat: whiteMarbleMat },
      { rBot: 2.8, rTop: 2.2, h: 8, mat: sandstoneCreamMat }
    ];
    tiers.forEach((t) => {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(t.rTop, t.rBot, t.h, 16), t.mat);
      seg.position.y = qY + t.h * 0.5;
      qY += t.h;
      const balc = new THREE.Mesh(new THREE.CylinderGeometry(t.rTop + 1.0, t.rTop + 0.2, 1.0, 16), sandstoneCreamMat);
      balc.position.y = qY;
      towerGroup.add(seg, balc);
    });
    this.environmentGroup.add(towerGroup);

    // 4. EAST HORIZON HERITAGE FORTRESS & EMBLEM TOWER
    const fort = new THREE.Group();
    fort.position.set(402, 0, 68);
    fort.rotation.y = -Math.PI / 2;
    const rampart = new THREE.Mesh(new THREE.BoxGeometry(92, 15, 10), redSandstoneMat);
    rampart.position.y = 7.5;
    const gateBody = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 14), redSandstoneMat);
    gateBody.position.y = 12;
    const gatePortal = new THREE.Mesh(new THREE.BoxGeometry(8, 14, 14.4), darkArchVoidMat);
    gatePortal.position.y = 7;
    fort.add(rampart, gateBody, gatePortal);
    [-11, 11].forEach((tx) => {
      const bastion = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 28, 8), redSandstoneMat);
      bastion.position.set(tx, 14, 2);
      const chhatri = new THREE.Mesh(new THREE.SphereGeometry(3.2, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), whiteMarbleMat);
      chhatri.position.set(tx, 29.5, 2);
      fort.add(bastion, chhatri);
    });
    const flagpole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 16, 8), whiteMarbleMat);
    flagpole.position.set(0, 31, 0);
    const fSaf = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.4, 0.2), saffronMat);
    fSaf.position.set(4.2, 37.8, 0);
    const fWh = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.4, 0.2), whiteGlowMat);
    fWh.position.set(4.2, 36.4, 0);
    const fGr = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.4, 0.2), greenFlagMat);
    fGr.position.set(4.2, 35.0, 0);
    fort.add(flagpole, fSaf, fWh, fGr);
    this.environmentGroup.add(fort);

    // 5. BAY SIGNATURE BRIDGE (Tilted Bow Pylon + Stay Cables at North-East Riverbank)
    const sig = new THREE.Group();
    sig.position.set(410, 0, -185);
    sig.rotation.y = -0.65;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(110, 2.4, 12), sandstoneCreamMat);
    deck.position.y = 4.5;
    const pylonGroup = new THREE.Group();
    pylonGroup.position.set(-22, 4.5, 0);
    pylonGroup.rotation.z = -0.34;
    const legA = new THREE.Mesh(new THREE.BoxGeometry(3.4, 62, 2.8), whiteMarbleMat);
    legA.position.set(0, 30, -3.5);
    const legB = legA.clone();
    legB.position.z = 3.5;
    const goldTop = new THREE.Mesh(new THREE.BoxGeometry(4.2, 8, 9.6), goldMat);
    goldTop.position.set(0, 61, 0);
    pylonGroup.add(legA, legB, goldTop);
    sig.add(deck, pylonGroup);
    const cableMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.78, roughness: 0.25 });
    for (let k = 0; k < 8; k++) {
      [-2.2, 2.2].forEach((cz) => {
        const start = new THREE.Vector3(-2, 58, cz);
        const end = new THREE.Vector3(6 + k * 7, 5.5, cz);
        const diff = end.clone().sub(start);
        const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, diff.length(), 6), cableMat);
        cable.position.copy(start).addScaledVector(diff, 0.5);
        cable.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.normalize());
        sig.add(cable);
      });
    }
    this.environmentGroup.add(sig);

    // 6. SANSAD BHAVAN / RASHTRAPATI HERITAGE ROTUNDA (Inner West Plaza)
    const sansad = new THREE.Group();
    sansad.position.set(-108, 0, 122);
    const rotundaCore = new THREE.Mesh(new THREE.CylinderGeometry(20, 22, 10, 24), redSandstoneMat);
    rotundaCore.position.y = 5;
    const rotundaRing = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 9.5, 24, 1, true), sandstoneCreamMat);
    rotundaRing.position.y = 4.8;
    const rotundaDome = new THREE.Mesh(new THREE.SphereGeometry(12, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), goldMat);
    rotundaDome.position.y = 10;
    sansad.add(rotundaCore, rotundaRing, rotundaDome);
    for (let pc = 0; pc < 16; pc++) {
      const ang = (pc / 16) * Math.PI * 2;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 9.6, 8), sandstoneCreamMat);
      col.position.set(Math.cos(ang) * 23.6, 4.8, Math.sin(ang) * 23.6);
      sansad.add(col);
    }
    this.environmentGroup.add(sansad);

    // 7. CENTRAL PARKWAY REFLECTING CANALS, FOUNTAINS & STONE GAZEBOS
    const canalWaterMat = new THREE.MeshStandardMaterial({ color: 0x0f4c75, roughness: 0.08, metalness: 0.78 });
    const mistMat = new THREE.MeshBasicMaterial({ color: 0xdbeafe, transparent: true, opacity: 0.62 });
    [
      { cx: 34, cz: 86, len: 124, fountains: [48, 86, 124] },
      { cx: -34, cz: 50, len: 64, fountains: [34, 66] }
    ].forEach(({ cx, cz, len, fountains }) => {
      const canalBorder = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.35, len + 4), redSandstoneMat);
      canalBorder.position.set(cx, 0.05, cz);
      const canalWater = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.24, len), canalWaterMat);
      canalWater.position.set(cx, 0.16, cz);
      this.environmentGroup.add(canalBorder, canalWater);

      fountains.forEach((fz) => {
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 0.85, 0.9, 12), sandstoneCreamMat);
        bowl.position.set(cx, 0.75, fz);
        const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.38, 2.4, 8), mistMat);
        jet.position.set(cx, 2.2, fz);
        this.environmentGroup.add(bowl, jet);
      });
    });

    // Park Sandstone Baradari Gazebos
    [[118, 175], [82, -110]].forEach(([gx, gz]) => {
      const gaz = new THREE.Group();
      gaz.position.set(gx, 0, gz);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 8.2, 1.2, 8), redSandstoneMat);
      base.position.y = 0.6;
      const dome = new THREE.Mesh(new THREE.SphereGeometry(5.5, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), sandstoneCreamMat);
      dome.position.y = 7.4;
      gaz.add(base, dome);
      for (let k = 0; k < 6; k++) {
        const ang = (k / 6) * Math.PI * 2;
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 6.5, 8), sandstoneCreamMat);
        p.position.set(Math.cos(ang) * 5.2, 4.2, Math.sin(ang) * 5.2);
        gaz.add(p);
      }
      this.environmentGroup.add(gaz);
    });

    // 8. ROMANTIC CANDLELIGHT DATE PAVILION & CUSTOM HEART BOARD (Beside Park Pull-Off)
    this.buildDatePavilion();
  }

  makeVenueSignTexture(venueName = 'Shah Rasoi', badgeText = '100% PURE VEG', accentHex = '#ff4d88', isFav = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, 768, 320);
    bg.addColorStop(0, '#1e0918');
    bg.addColorStop(0.5, isFav ? '#4c0f28' : '#162038');
    bg.addColorStop(1, '#190b1d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 768, 320);

    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 748, 300);
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, 724, 276);

    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 26px Rajdhani, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isFav ? '♥ OUR FAVORITE • 100% PURE VEG ♥' : '🌿 100% PURE VEG ROMANTIC CAFÉ 🌿', 384, 72);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px Orbitron, sans-serif';
    ctx.fillText(venueName.toUpperCase(), 384, 174);

    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 25px Rajdhani, sans-serif';
    const n1 = (this.coupleNames?.partner1 || 'Aarav').toUpperCase();
    const n2 = (this.coupleNames?.partner2 || 'Meera').toUpperCase();
    ctx.fillText(`${n1} ♥ ${n2}  •  ${badgeText.toUpperCase()}`, 384, 248);

    const tex = new THREE.CanvasTexture(canvas);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  setActiveDateVenue(venueId = 'shah_rasoi') {
    this.activeDateVenueId = venueId;
    const targetVenue = this.dateVenues?.[venueId] || this.dateVenues?.shah_rasoi;
    if (targetVenue) {
      this.dateSpotPos.copy(targetVenue.parkingPos);
      if (this.dateBeaconGroup) {
        this.dateBeaconGroup.position.set(targetVenue.pavilionPos.x, 12.2, targetVenue.pavilionPos.z);
        this.dateBeaconGroup.visible = true;
      }
    }
  }

  buildSingleCafePavilion(spec) {
    const pav = new THREE.Group();
    pav.position.copy(spec.pavilionPos);
    const dirToPark = spec.parkingPos.clone().sub(spec.pavilionPos);
    dirToPark.y = 0;
    const facingAngle = Math.atan2(dirToPark.x, dirToPark.z);
    pav.rotation.y = facingAngle;

    const marbleMat = new THREE.MeshStandardMaterial({ color: spec.isFavorite ? 0xf4efe6 : 0xedf2f7, roughness: 0.25, metalness: 0.1 });
    const velvetMat = new THREE.MeshStandardMaterial({ color: spec.accentColorHex, roughness: 0.85 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.88, roughness: 0.2 });
    const roseMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.5 });
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xfff8e7, roughness: 0.45 });
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa22 });
    const glowMat = new THREE.MeshBasicMaterial({ color: spec.accentColorHex });

    const deck = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 9.2, 0.5, 24), marbleMat);
    deck.position.y = 0.25;
    const carpet = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 12.5), velvetMat);
    carpet.position.set(0, 0.52, 2.2);
    pav.add(deck, carpet);

    [-3.6, 3.6].forEach((px) => {
      [-2.8, 2.8].forEach((pz) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 5.2, 10), marbleMat);
        col.position.set(px, 2.8, pz);
        const garland = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 8), roseMat);
        garland.position.set(px, 5.0, pz);
        pav.add(col, garland);
      });
    });

    const archBeam = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.4, 0.6), goldMat);
    archBeam.position.set(0, 5.4, -2.8);
    const boardFaceMat = new THREE.MeshStandardMaterial({
      map: this.makeVenueSignTexture(spec.name, spec.badgeText, spec.accentCss, spec.isFavorite),
      roughness: 0.35,
      metalness: 0.12
    });
    if (spec.isFavorite) boardFaceMat.userData = { isHeartFace: true };

    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 3.0, 0.34),
      [goldMat, goldMat, goldMat, goldMat, boardFaceMat, boardFaceMat]
    );
    signBoard.position.set(0, 6.9, -2.55);
    if (spec.isFavorite) this.dateHeartBoardMesh = signBoard;

    const heartBorder = new THREE.Mesh(new THREE.BoxGeometry(7.65, 3.45, 0.22), glowMat);
    heartBorder.position.set(0, 6.9, -2.56);
    const topHeart = new THREE.Mesh(this.create3DHeartGeo(spec.isFavorite ? 1.05 : 0.78, 0.38), glowMat);
    topHeart.position.set(0, 9.25, -2.55);
    pav.add(archBeam, heartBorder, signBoard, topHeart);

    const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, 1.05, 8), goldMat);
    tableLeg.position.set(0, 0.85, 0);
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.1, 18), marbleMat);
    tableTop.position.set(0, 1.4, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({ color: 0xeef8ff, metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.65 });
    [-0.36, 0.36].forEach((gx) => {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.18, 8), crystalMat);
      stem.position.set(gx, 1.54, 0.36);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.03, 0.16, 10), crystalMat);
      cup.position.set(gx, 1.70, 0.36);
      pav.add(stem, cup);
    });
    const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.26, 10), crystalMat);
    vase.position.set(0, 1.58, -0.35);
    for (let r = 0; r < 3; r++) {
      const rBulb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), roseMat);
      rBulb.position.set((r - 1) * 0.07, 1.75 + (r === 1 ? 0.04 : 0), -0.35);
      pav.add(rBulb);
    }
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.72 });
    const benchBack = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 0.65), benchMat);
    benchBack.position.set(0, 0.92, -1.55);
    const benchRest = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.58, 0.12), benchMat);
    benchRest.position.set(0, 1.24, -1.84);
    pav.add(tableLeg, tableTop, vase, benchBack, benchRest);

    const hostChar = this.createParkVisitor(spec.accentColorHex, 0xd4966c, false);
    hostChar.group.position.set(3.2, 0.5, 4.8);
    hostChar.group.rotation.y = -0.35;
    pav.add(hostChar.group);
    this.parkCharacters.push(hostChar);

    const candleSpots = [
      [0, 1.45, 0], [-0.45, 1.45, 0.2], [0.45, 1.45, -0.2],
      [-2.1, 0.55, 6.2], [2.1, 0.55, 6.2],
      [-2.1, 0.55, 4.4], [2.1, 0.55, 4.4],
      [-2.1, 0.55, 2.6], [2.1, 0.55, 2.6],
      [-2.1, 0.55, 0.8], [2.1, 0.55, 0.8],
      [-3.5, 0.55, -1.2], [3.5, 0.55, -1.2],
      [-3.5, 0.55, -3.2], [3.5, 0.55, -3.2],
      [-1.5, 0.55, -3.6], [1.5, 0.55, -3.6], [0, 0.55, 7.6]
    ];
    candleSpots.forEach(([cx, cy, cz], idx) => {
      const h = idx < 3 ? 0.28 : (0.38 + (idx % 3) * 0.14);
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, h, 8), waxMat);
      pillar.position.set(cx, cy + h * 0.5, cz);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.22, 6), flameMat);
      flame.position.set(cx, cy + h + 0.12, cz);
      pav.add(pillar, flame);
      this.candleFlames.push(flame);
    });

    // Illuminated roadside parking bay pad so couple knows right where to pull over
    const padGeo = new THREE.RingGeometry(2.6, 3.3, 28);
    padGeo.rotateX(-Math.PI / 2);
    const pad = new THREE.Mesh(padGeo, new THREE.MeshBasicMaterial({ color: spec.accentColorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
    pad.position.set(spec.parkingPos.x, 0.08, spec.parkingPos.z);
    this.environmentGroup.add(pad);

    const warmGlow = new THREE.PointLight(spec.isFavorite ? 0xff9e54 : spec.accentColorHex, 2.2, 34);
    warmGlow.position.set(0, 4.2, 0);
    pav.add(warmGlow);

    this.environmentGroup.add(pav);
    pav.updateMatrixWorld(true);

    return {
      id: spec.id,
      name: spec.name,
      isFavorite: spec.isFavorite,
      pavilionPos: spec.pavilionPos.clone(),
      parkingPos: spec.parkingPos.clone(),
      facingAngle,
      entryApproachPos: pav.localToWorld(new THREE.Vector3(0, 0.52, 6.2)),
      tablePos: pav.localToWorld(new THREE.Vector3(0, 1.46, 0)),
      seatBoyPos: pav.localToWorld(new THREE.Vector3(0, 0.50, 1.25)),
      seatGirlPos: pav.localToWorld(new THREE.Vector3(0, 0.50, -1.25)),
      danceCenterPos: pav.localToWorld(new THREE.Vector3(-3.4, 0.50, 1.8))
    };
  }

  buildDatePavilion() {
    this.dateVenues = {};

    const findSideSpot = (uFrac, name, badgeText, accentCss, accentColorHex, isFavorite = false) => {
      const idx = Math.floor(uFrac * (this.samplePoints.length - 1)) % this.samplePoints.length;
      const sp = this.samplePoints[idx];
      let chosenSign = 1;
      for (const s of [1, -1]) {
        const testPav = sp.position.clone().addScaledVector(sp.normal, s * 29);
        if (this.isPointClearOfTrack(testPav.x, testPav.z, 17)) {
          chosenSign = s;
          break;
        }
      }
      return {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_cafe$/, ''),
        name,
        badgeText,
        accentCss,
        accentColorHex,
        isFavorite,
        pavilionPos: sp.position.clone().addScaledVector(sp.normal, chosenSign * 29).setY(0),
        parkingPos: sp.position.clone().addScaledVector(sp.normal, chosenSign * 14.5).setY(0)
      };
    };

    const specs = [
      {
        id: 'shah_rasoi',
        name: 'Shah Rasoi',
        badgeText: '100% PURE VEG • FAVORITE',
        accentCss: '#ff4d88',
        accentColorHex: 0xff4d88,
        isFavorite: true,
        pavilionPos: new THREE.Vector3(-36, 0, 108),
        parkingPos: new THREE.Vector3(-14.5, 0, 108)
      },
      { ...findSideSpot(0.28, 'Velvet Brew Café', 'ARTISANAL PURE VEG CAFÉ', '#fb923c', 0xfb923c, false), id: 'velvet_brew' },
      { ...findSideSpot(0.55, 'Moonlight Courtyard', 'PURE VEG STARLIGHT LOUNGE', '#38bdf8', 0x38bdf8, false), id: 'moonlight_courtyard' },
      { ...findSideSpot(0.81, 'Rosewood Bistro', 'ACOUSTIC PURE VEG BISTRO', '#c084fc', 0xc084fc, false), id: 'rosewood_bistro' }
    ];

    specs.forEach((spec) => {
      this.dateVenues[spec.id] = this.buildSingleCafePavilion(spec);
    });

    // Floating ruby beacon above the selected café/restaurant
    const beacon = new THREE.Group();
    const bHeart = new THREE.Mesh(this.create3DHeartGeo(1.3, 0.45), new THREE.MeshBasicMaterial({ color: 0xff3b78 }));
    beacon.add(bHeart);
    this.dateBeaconGroup = beacon;
    this.environmentGroup.add(beacon);

    this.setActiveDateVenue(this.activeDateVenueId || 'shah_rasoi');
  }

  buildCityFoliage() {
    // 380 Natural Organic-Crown Neem/Ashoka/Banyan/Gulmohar/Amaltas 3D Trees + 3D Park Benches + Strolling Visitors
    const maxTrees = 380;
    const trunkGeo = new THREE.CylinderGeometry(0.28, 0.56, 4.8, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3b2619, roughness: 0.94 });

    const makeOrganicFoliageGeo = (radius, segW = 10, segH = 8) => {
      const geo = new THREE.SphereGeometry(radius, segW, segH);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i);
        const wave = 1.0 + 0.14 * Math.sin(vx * 1.9 + vy * 2.1) * Math.cos(vz * 1.7);
        pos.setXYZ(i, vx * wave, vy * (0.94 + 0.08 * Math.sin(vx * 2.4)), vz * wave);
      }
      geo.computeVertexNormals();
      return geo;
    };

    const crownGeo = makeOrganicFoliageGeo(2.45, 10, 8);
    const smallCrownGeo = makeOrganicFoliageGeo(1.70, 9, 7);
    const bushGeo = makeOrganicFoliageGeo(1.25, 8, 6);
    const crownMatA = new THREE.MeshStandardMaterial({ color: 0x1b4f26, roughness: 0.88 });
    const crownMatB = new THREE.MeshStandardMaterial({ color: 0x2b6931, roughness: 0.86 });
    const bloomMatRed = new THREE.MeshStandardMaterial({ color: 0xd93829, roughness: 0.72 });
    const bloomMatGold = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.72 });

    const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, maxTrees);
    const crownInstA = new THREE.InstancedMesh(crownGeo, crownMatA, maxTrees);
    const crownInstB = new THREE.InstancedMesh(crownGeo, crownMatB, maxTrees);
    const blossomInst = new THREE.InstancedMesh(smallCrownGeo, bloomMatRed, 64);
    const amaltasInst = new THREE.InstancedMesh(smallCrownGeo, bloomMatGold, 48);

    const bushMat = new THREE.MeshStandardMaterial({ color: 0x234d22, roughness: 0.9 });
    const bushInst = new THREE.InstancedMesh(bushGeo, bushMat, 160);

    // 3D Carved Wood & Cast-Iron Park Benches in Central Lawns & Parkways
    const benchCount = 48;
    const benchSeatGeo = new THREE.BoxGeometry(2.4, 0.16, 0.78);
    const benchWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.78 });
    const benchInst = new THREE.InstancedMesh(benchSeatGeo, benchWoodMat, benchCount);

    const dummy = new THREE.Object3D();

    let placed = 0;
    let countA = 0;
    let countB = 0;
    let bushCount = 0;
    let redCount = 0;
    let goldCount = 0;
    let benchIdx = 0;

    for (let attempt = 0; attempt < 1200 && placed < maxTrees; attempt++) {
      const ang = (attempt / 1200) * Math.PI * 2 * 7.3;
      const rad = 36 + ((attempt * 47) % 395);
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad;

      if (!this.isPointClearOfTrack(x, z, 11.5)) continue;

      const groundY = this.getTerrainY(x, z);
      const s = 0.85 + (placed % 5) * 0.24;
      dummy.position.set(x, groundY + 2.3 * s, z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(0, placed * 0.7, 0);
      dummy.updateMatrix();
      trunkInst.setMatrixAt(placed, dummy.matrix);

      // Multi-Cluster Organic 3D Foliage Tufts per Tree
      if (countA < crownInstA.count) {
        dummy.position.set(x, groundY + 5.7 * s, z);
        dummy.scale.set(s * 1.22, s * 0.96, s * 1.22);
        dummy.updateMatrix();
        crownInstA.setMatrixAt(countA++, dummy.matrix);
      }
      if (countB < crownInstB.count) {
        dummy.position.set(x + s * 1.25, groundY + 4.8 * s, z - s * 0.9);
        dummy.scale.set(s * 0.88, s * 0.78, s * 0.88);
        dummy.updateMatrix();
        crownInstB.setMatrixAt(countB++, dummy.matrix);
      }

      if (placed % 9 === 0 && redCount < 64) {
        dummy.position.set(x - s * 0.9, groundY + 5.9 * s, z + s * 0.7);
        dummy.scale.set(s * 0.92, s * 0.75, s * 0.92);
        dummy.updateMatrix();
        blossomInst.setMatrixAt(redCount++, dummy.matrix);
      } else if (placed % 11 === 0 && goldCount < 48) {
        dummy.position.set(x + s * 0.7, groundY + 5.6 * s, z + s * 0.8);
        dummy.scale.set(s * 0.9, s * 0.72, s * 0.9);
        dummy.updateMatrix();
        amaltasInst.setMatrixAt(goldCount++, dummy.matrix);
      }

      if (bushCount < 160 && placed % 2 === 0 && this.isPointClearOfTrack(x + 2.4, z - 1.8, 9)) {
        dummy.position.set(x + 2.4, groundY + 0.85, z - 1.8);
        dummy.scale.set(1.2, 0.75, 1.2);
        dummy.updateMatrix();
        bushInst.setMatrixAt(bushCount++, dummy.matrix);
      }
      if (benchIdx < benchCount && placed % 7 === 0 && rad < 210 && this.isPointClearOfTrack(x - 2.6, z + 1.4, 9)) {
        dummy.position.set(x - 2.6, groundY + 0.56, z + 1.4);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(0, ang + Math.PI / 2, 0);
        dummy.updateMatrix();
        benchInst.setMatrixAt(benchIdx++, dummy.matrix);
      }
      placed++;
    }

    trunkInst.count = placed;
    crownInstA.count = countA;
    crownInstB.count = countB;
    blossomInst.count = redCount;
    amaltasInst.count = goldCount;
    bushInst.count = bushCount;
    benchInst.count = benchIdx;
    [trunkInst, crownInstA, crownInstB, blossomInst, amaltasInst, bushInst, benchInst].forEach((inst) => {
      inst.instanceMatrix.needsUpdate = true;
    });
    this.environmentGroup.add(trunkInst, crownInstA, crownInstB, blossomInst, amaltasInst, bushInst, benchInst);

    // Realistic Animated Strolling Park Visitors Strictly Inside Clear Park Lawns (Zero Road Overlap!)
    const strollSpots = [
      { x: -46, z: 72, color: 0xe11d48, long: true, r: 4.5 },
      { x: -44.2, z: 72.5, color: 0x1e3a8a, long: false, r: 4.5 },
      { x: 46, z: 96, color: 0x059669, long: true, r: 3.8 },
      { x: 112, z: 162, color: 0x7c3aed, long: false, r: 5.2 }
    ];
    strollSpots.forEach((spCfg) => {
      if (!this.isPointClearOfTrack(spCfg.x, spCfg.z, spCfg.r + 6)) return;
      const visitor = this.createParkVisitor(spCfg.color, 0xd29268, spCfg.long);
      visitor.homeX = spCfg.x;
      visitor.homeZ = spCfg.z;
      visitor.walkRadius = spCfg.r;
      visitor.group.position.set(spCfg.x, this.getTerrainY(spCfg.x, spCfg.z) + 0.2, spCfg.z);
      this.environmentGroup.add(visitor.group);
      this.parkCharacters.push(visitor);
    });
  }

  buildCitySkyline() {
    // 1. Textured Heritage Plaza Colonnades Strictly Outside Road Clearance
    const cpMax = 36;
    const unitBox = new THREE.BoxGeometry(1, 1, 1);
    const cpMat = new THREE.MeshStandardMaterial({
      map: this.makeFacadeTexture('cp'),
      roughness: 0.62,
      metalness: 0.08
    });
    const corniceMat = new THREE.MeshStandardMaterial({ color: 0xe7dec8, roughness: 0.68 });
    const cpInst = new THREE.InstancedMesh(unitBox, cpMat, cpMax);
    const cpRoofInst = new THREE.InstancedMesh(unitBox, corniceMat, cpMax);
    const dummy = new THREE.Object3D();
    let cpPlaced = 0;

    for (let i = 0; i < cpMax; i++) {
      const ang = (i / cpMax) * Math.PI * 2;
      const dist = 426 + (i % 3) * 28;
      const x = Math.cos(ang) * dist;
      const z = Math.sin(ang) * dist;
      if (!this.isPointClearOfTrack(x, z, 30)) continue;

      const gy = this.getTerrainY(x, z);
      const h = 16 + (i % 3) * 4;
      dummy.position.set(x, gy + h * 0.5, z);
      dummy.scale.set(30, h, 15);
      dummy.rotation.set(0, -ang + Math.PI / 2, 0);
      dummy.updateMatrix();
      cpInst.setMatrixAt(cpPlaced, dummy.matrix);

      dummy.position.set(x, gy + h + 0.9, z);
      dummy.scale.set(31.5, 1.8, 16.5);
      dummy.updateMatrix();
      cpRoofInst.setMatrixAt(cpPlaced, dummy.matrix);
      cpPlaced++;
    }
    cpInst.count = cpPlaced;
    cpRoofInst.count = cpPlaced;
    cpInst.instanceMatrix.needsUpdate = true;
    cpRoofInst.instanceMatrix.needsUpdate = true;
    this.environmentGroup.add(cpInst, cpRoofInst);

    // 2. Realistic Multi-Tiered Outer Skyline Towers
    const towerMax = 76;
    const towerMat = new THREE.MeshStandardMaterial({
      map: this.makeFacadeTexture('tower'),
      metalness: 0.65,
      roughness: 0.28
    });
    const podiumMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.55, metalness: 0.25 });
    const warmCrownMat = new THREE.MeshBasicMaterial({ color: 0xffc66e });
    const pInst = new THREE.InstancedMesh(unitBox, podiumMat, towerMax);
    const tInst = new THREE.InstancedMesh(unitBox, towerMat, towerMax);
    const sInst = new THREE.InstancedMesh(unitBox, towerMat, towerMax);
    const cInst = new THREE.InstancedMesh(unitBox, warmCrownMat, towerMax);
    let tPlaced = 0;

    for (let i = 0; i < towerMax; i++) {
      const ang = (i / towerMax) * Math.PI * 2;
      const dist = 515 + (i % 5) * 52;
      const x = Math.cos(ang) * dist;
      const z = Math.sin(ang) * dist;
      if (!this.isPointClearOfTrack(x, z, 36)) continue;

      const gy = this.getTerrainY(x, z);
      const h = 54 + ((i * 29) % 124);
      const w = 18 + ((i * 11) % 20);
      const podH = 12;

      dummy.position.set(x, gy + podH * 0.5, z);
      dummy.scale.set(w + 6, podH, w + 6);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      pInst.setMatrixAt(tPlaced, dummy.matrix);

      dummy.position.set(x, gy + podH + h * 0.42, z);
      dummy.scale.set(w, h * 0.84, w);
      dummy.updateMatrix();
      tInst.setMatrixAt(tPlaced, dummy.matrix);

      dummy.position.set(x, gy + podH + h * 0.92, z);
      dummy.scale.set(w * 0.72, h * 0.16, w * 0.72);
      dummy.updateMatrix();
      sInst.setMatrixAt(tPlaced, dummy.matrix);

      dummy.position.set(x, gy + podH + h + 0.7, z);
      dummy.scale.set(w * 0.76, 1.4, w * 0.76);
      dummy.updateMatrix();
      cInst.setMatrixAt(tPlaced, dummy.matrix);
      tPlaced++;
    }
    pInst.count = tPlaced;
    tInst.count = tPlaced;
    sInst.count = tPlaced;
    cInst.count = tPlaced;
    [pInst, tInst, sInst, cInst].forEach((inst) => {
      inst.instanceMatrix.needsUpdate = true;
    });
    this.environmentGroup.add(pInst, tInst, sInst, cInst);
  }

  buildMetroViaduct() {
    // Elevated Concrete Metro Corridor + Passing Blue-Line Train along z = -345
    const concMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.82 });
    const railSpan = new THREE.Mesh(new THREE.BoxGeometry(760, 1.8, 7.2), concMat);
    railSpan.position.set(0, 14.5, -345);
    this.environmentGroup.add(railSpan);

    const pierGeo = new THREE.CylinderGeometry(1.3, 1.7, 14.5, 10);
    const pierInst = new THREE.InstancedMesh(pierGeo, concMat, 19);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 19; i++) {
      dummy.position.set(-340 + i * 38, 7.25, -345);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      pierInst.setMatrixAt(i, dummy.matrix);
    }
    pierInst.instanceMatrix.needsUpdate = true;
    this.environmentGroup.add(pierInst);

    // Animated Silver & Blue-Line Metro 4-Coach Train
    const trainGroup = new THREE.Group();
    trainGroup.position.set(-180, 17.2, -345);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.75, roughness: 0.22 });
    const blueStripeMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const winMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    for (let c = 0; c < 4; c++) {
      const coachX = (c - 1.5) * 18.5;
      const coach = new THREE.Mesh(new THREE.BoxGeometry(17.2, 3.6, 3.2), bodyMat);
      coach.position.x = coachX;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(17.25, 0.55, 3.28), blueStripeMat);
      stripe.position.set(coachX, -0.8, 0);
      const windows = new THREE.Mesh(new THREE.BoxGeometry(15.2, 1.2, 3.26), winMat);
      windows.position.set(coachX, 0.5, 0);
      const acPod = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.48, 2.1), concMat);
      acPod.position.set(coachX, 2.02, 0);
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.65, 2.6), winMat);
      bogie.position.set(coachX, -1.95, 0);
      trainGroup.add(coach, stripe, windows, acPod, bogie);
      if (c === 0 || c === 3) {
        const nose = new THREE.Mesh(new THREE.ConeGeometry(1.75, 3.6, 8), bodyMat);
        nose.rotateZ(c === 3 ? -Math.PI / 2 : Math.PI / 2);
        nose.position.set(coachX + (c === 3 ? 10.2 : -10.2), -0.25, 0);
        trainGroup.add(nose);
      }
    }
    this.metroTrain = trainGroup;
    this.metroPosX = -180;
    this.environmentGroup.add(trainGroup);
  }

  generateGridSlots() {
    this.gridSlots = [];
    for (let i = 0; i < 8; i++) {
      const row = Math.floor(i / 2);
      const isRight = (i % 2 === 1);
      const distBack = 12 + row * 10;

      let u = (1.0 - (distBack / this.totalLength)) % 1.0;
      if (u < 0) u += 1.0;

      const sp = this.samplePoints[Math.floor(u * (this.samplePoints.length - 1))];
      const lateralOffset = isRight ? 4.2 : -4.2;

      const pos = sp.position.clone().addScaledVector(sp.normal, lateralOffset);
      pos.y += 0.035;

      this.gridSlots.push({
        slot: i,
        position: pos,
        rotationY: Math.atan2(sp.tangent.x, sp.tangent.z),
        tangent: sp.tangent
      });
    }
  }

  getClosestPoint(pos) {
    if (!this.samplePoints || this.samplePoints.length === 0) {
      return {
        sample: this._interpSample,
        distance: 0,
        lateralOffset: 0,
        isOffTrack: false
      };
    }

    let minSqDist = Infinity;
    let closestIndex = 0;
    const len = this.samplePoints.length - 1;

    for (let i = 0; i < len; i++) {
      const sp = this.samplePoints[i];
      const dx = pos.x - sp.position.x;
      const dy = pos.y - sp.position.y;
      const dz = pos.z - sp.position.z;
      const sqDist = dx * dx + dy * dy + dz * dz;
      if (sqDist < minSqDist) {
        minSqDist = sqDist;
        closestIndex = i;
      }
    }

    const sp0 = this.samplePoints[closestIndex];
    const spPrev = this.samplePoints[(closestIndex - 1 + len) % len];
    const spNext = this.samplePoints[(closestIndex + 1) % len];

    // Sub-segment linear interpolation for butter-smooth height and perpendicular barrier checks
    this._tmpVec.subVectors(pos, sp0.position);
    const segNextLen = sp0.position.distanceTo(spNext.position) || 1;
    const segPrevLen = sp0.position.distanceTo(spPrev.position) || 1;
    const along = this._tmpVec.dot(sp0.tangent);

    let sampleA = sp0;
    let sampleB = spNext;
    let alpha = 0;

    if (along >= 0) {
      alpha = Math.min(1, along / segNextLen);
      sampleA = sp0;
      sampleB = spNext;
    } else {
      alpha = Math.min(1, -along / segPrevLen);
      sampleA = sp0;
      sampleB = spPrev;
    }

    this._interpSample.position.lerpVectors(sampleA.position, sampleB.position, alpha);
    this._interpSample.tangent.lerpVectors(sampleA.tangent, sampleB.tangent, alpha).normalize();
    this._interpSample.normal.lerpVectors(sampleA.normal, sampleB.normal, alpha).normalize();
    this._interpSample.u = sampleA.u;

    this._tmpVec.subVectors(pos, this._interpSample.position);
    this._tmpVec.y = 0;
    const lateralOffset = this._tmpVec.dot(this._interpSample.normal);
    const absLateral = Math.abs(lateralOffset);

    return {
      sample: this._interpSample,
      distance: absLateral,
      lateralOffset,
      isOffTrack: absLateral > this.trackWidth * 0.5
    };
  }
}
