/**
 * Velocity Rush: Neon Rebellion - 5 Dynamic Worlds & Environmental Physics
 * 1. Neon City (Night)
 * 2. Cyber City (Rain)
 * 3. Cyber Desert (Sandstorm)
 * 4. Orbital Ring (Low-Gravity Space Station)
 * 5. Industrial Core Zone (Moving Obstacles)
 */

export const TRACK_PRESETS = {
  neon_city: {
    id: 'neon_city',
    name: '🌇 Neon City (Night Circuit)',
    description: 'High-speed street GP framed by glowing megatowers & holographic gantries.',
    skyColor: 0x05070e,
    fogColor: 0x05070e,
    ambientLight: 0x223355,
    dirLight: 0x00f0ff,
    trackWidth: 22,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 1.0,
    points: [
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
      new THREE.Vector3(-100, 0, 40),
      new THREE.Vector3(-40, 0, -40)
    ]
  },
  cyber_rain: {
    id: 'cyber_rain',
    name: '🌧️ Cyber City (Rain & Thunder)',
    description: 'Torrential neon rainstorm with wet reflective asphalt and reduced tire grip.',
    skyColor: 0x060912,
    fogColor: 0x0a101f,
    ambientLight: 0x112233,
    dirLight: 0x66aacc,
    trackWidth: 22,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 0.85,
    isRain: true,
    points: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 180),
      new THREE.Vector3(70, 2, 290),
      new THREE.Vector3(180, 4, 310),
      new THREE.Vector3(270, 2, 260),
      new THREE.Vector3(310, 0, 160),
      new THREE.Vector3(320, 0, 40),
      new THREE.Vector3(350, 3, -80),
      new THREE.Vector3(290, 4, -180),
      new THREE.Vector3(210, 2, -240),
      new THREE.Vector3(100, 0, -270),
      new THREE.Vector3(-40, 0, -280),
      new THREE.Vector3(-160, 3, -240),
      new THREE.Vector3(-260, 5, -160),
      new THREE.Vector3(-290, 4, -60),
      new THREE.Vector3(-240, 2, 40),
      new THREE.Vector3(-160, 0, 90),
      new THREE.Vector3(-80, 0, 40)
    ]
  },
  cyber_desert: {
    id: 'cyber_desert',
    name: '🏜️ Cyber Desert (Sandstorm)',
    description: 'High-speed desert highway battered by violent orange dust storms and shifting dunes.',
    skyColor: 0x241108,
    fogColor: 0x3d1d0c,
    ambientLight: 0x553311,
    dirLight: 0xffaa44,
    trackWidth: 25,
    gravity: 9.8,
    dragMult: 1.25, // Sandstorm air drag
    gripMult: 0.92,
    points: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(40, 2, 160),
      new THREE.Vector3(140, 5, 270),
      new THREE.Vector3(260, 7, 300),
      new THREE.Vector3(370, 5, 210),
      new THREE.Vector3(410, 3, 90),
      new THREE.Vector3(360, 2, -50),
      new THREE.Vector3(270, 4, -150),
      new THREE.Vector3(150, 6, -250),
      new THREE.Vector3(10, 4, -290),
      new THREE.Vector3(-130, 2, -270),
      new THREE.Vector3(-250, 4, -190),
      new THREE.Vector3(-320, 6, -70),
      new THREE.Vector3(-280, 3, 70),
      new THREE.Vector3(-180, 1, 130),
      new THREE.Vector3(-80, 0, 70)
    ]
  },
  space_ring: {
    id: 'space_ring',
    name: '🌌 Space Ring (Low-Gravity)',
    description: 'Orbital space station floating above earth with low-gravity float and supercharged nitro.',
    skyColor: 0x020308,
    fogColor: 0x050711,
    ambientLight: 0x223366,
    dirLight: 0x00ffff,
    trackWidth: 20,
    gravity: 4.2, // Low gravity float!
    dragMult: 0.75, // Near vacuum
    gripMult: 1.05,
    points: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 4, 150),
      new THREE.Vector3(80, 8, 240),
      new THREE.Vector3(190, 12, 260),
      new THREE.Vector3(270, 8, 180),
      new THREE.Vector3(290, 4, 80),
      new THREE.Vector3(320, 2, -40),
      new THREE.Vector3(260, 6, -140),
      new THREE.Vector3(160, 10, -220),
      new THREE.Vector3(20, 6, -260),
      new THREE.Vector3(-120, 2, -240),
      new THREE.Vector3(-220, 6, -160),
      new THREE.Vector3(-260, 10, -60),
      new THREE.Vector3(-220, 6, 40),
      new THREE.Vector3(-140, 2, 100),
      new THREE.Vector3(-60, 0, 50)
    ]
  },
  industrial_core: {
    id: 'industrial_core',
    name: '🏭 Industrial Core (Moving Hazards)',
    description: 'Heavy industrial power plant with moving hazard pistons and steam vents.',
    skyColor: 0x0c0a08,
    fogColor: 0x18120c,
    ambientLight: 0x443322,
    dirLight: 0xff6600,
    trackWidth: 21,
    gravity: 9.8,
    dragMult: 1.0,
    gripMult: 0.96,
    hasMovingObstacles: true,
    points: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, 1, 140),
      new THREE.Vector3(90, 3, 220),
      new THREE.Vector3(190, 6, 240),
      new THREE.Vector3(240, 4, 160),
      new THREE.Vector3(170, 2, 90),
      new THREE.Vector3(230, 4, 10),
      new THREE.Vector3(290, 6, -70),
      new THREE.Vector3(210, 4, -150),
      new THREE.Vector3(110, 2, -120),
      new THREE.Vector3(10, 1, -180),
      new THREE.Vector3(-90, 3, -210),
      new THREE.Vector3(-170, 5, -140),
      new THREE.Vector3(-230, 4, -40),
      new THREE.Vector3(-170, 2, 40),
      new THREE.Vector3(-80, 0, 30)
    ]
  }
};

export class Track {
  constructor(scene) {
    this.scene = scene;
    this.trackId = 'neon_city';
    this.weather = 'clear';

    this.curve = null;
    this.trackMesh = null;
    this.checkpoints = [];
    this.boostPads = [];
    this.movingObstacles = [];
    this.trackWidth = 22;
    this.totalLength = 0;
    this.samplePoints = [];
    this.gridSlots = [];
    this.environmentGroup = new THREE.Group();
    this.scene.add(this.environmentGroup);
  }

  buildTrack(trackId = 'neon_city', weather = 'clear') {
    this.trackId = trackId;
    this.weather = weather;

    if (this.trackMesh) {
      this.scene.remove(this.trackMesh);
      this.trackMesh = null;
    }
    while (this.environmentGroup.children.length > 0) {
      const obj = this.environmentGroup.children[0];
      this.environmentGroup.remove(obj);
    }
    this.movingObstacles = [];

    const preset = TRACK_PRESETS[this.trackId] || TRACK_PRESETS.neon_city;
    this.trackWidth = preset.trackWidth;

    this.curve = new THREE.CatmullRomCurve3(preset.points, true, 'catmullrom', 0.18);
    this.totalLength = this.curve.getLength();

    const segments = 600;
    const halfWidth = this.trackWidth / 2;

    const roadVerts = [];
    const roadUvs = [];
    const roadIndices = [];
    const innerWallVerts = [];
    const outerWallVerts = [];

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
      roadVerts.push(sp.leftEdge.x, sp.leftEdge.y + 0.02, sp.leftEdge.z);
      roadVerts.push(sp.rightEdge.x, sp.rightEdge.y + 0.02, sp.rightEdge.z);

      const vU = (i / segments) * 80;
      roadUvs.push(0, vU);
      roadUvs.push(1, vU);

      if (i < segments) {
        const row1 = i * 2;
        const row2 = (i + 1) * 2;
        roadIndices.push(row1, row1 + 1, row2);
        roadIndices.push(row1 + 1, row2 + 1, row2);
      }

      const wallHeight = 1.3;
      const innerBase = sp.leftEdge.clone().addScaledVector(sp.normal, 0.2);
      const outerBase = sp.rightEdge.clone().addScaledVector(sp.normal, -0.2);

      innerWallVerts.push(innerBase.x, innerBase.y, innerBase.z);
      innerWallVerts.push(innerBase.x, innerBase.y + wallHeight, innerBase.z);
      outerWallVerts.push(outerBase.x, outerBase.y, outerBase.z);
      outerWallVerts.push(outerBase.x, outerBase.y + wallHeight, outerBase.z);
    }

    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
    roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
    roadGeo.setIndex(roadIndices);
    roadGeo.computeVertexNormals();

    let asphaltTexture = null;
    try {
      asphaltTexture = this.generateAsphaltTexture();
      if (asphaltTexture) {
        asphaltTexture.wrapS = THREE.RepeatWrapping;
        asphaltTexture.wrapT = THREE.RepeatWrapping;
        asphaltTexture.repeat.set(1, 40);
      }
    } catch (e) {
      console.warn('asphaltTexture setup fallback:', e);
    }

    const isWet = (this.trackId === 'cyber_rain' || this.weather === 'rain');
    const roadMat = new THREE.MeshStandardMaterial({
      color: (this.trackId === 'cyber_desert') ? 0x2e241c : 0x1c1f24,
      map: asphaltTexture,
      roughness: isWet ? 0.2 : 0.85,
      metalness: isWet ? 0.7 : 0.15
    });

    this.trackMesh = new THREE.Mesh(roadGeo, roadMat);
    this.trackMesh.receiveShadow = true;
    this.environmentGroup.add(this.trackMesh);

    this.buildBarriers(innerWallVerts, outerWallVerts, segments);
    this.buildStartGantry();
    this.buildCheckpoints(20);
    this.buildBoostPads();
    this.buildWorldEnvironment(preset);
    this.generateGridSlots();

    if (preset.hasMovingObstacles) {
      this.buildMovingObstacles();
    }
  }

  generateAsphaltTexture() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const baseColor = (this.trackId === 'cyber_desert') ? '#2e241c' : '#1c1f24';
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 512, 1024);

      for (let i = 0; i < 30000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 1024;
        const lum = Math.floor(20 + Math.random() * 25);
        ctx.fillStyle = `rgb(${lum},${lum},${lum})`;
        ctx.fillRect(x, y, 2, 2);
      }

      ctx.fillStyle = 'rgba(10, 10, 15, 0.45)';
      ctx.fillRect(100, 0, 90, 1024);
      ctx.fillRect(322, 0, 90, 1024);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(12, 0, 14, 1024);
      ctx.fillRect(486, 0, 14, 1024);

      const curbColor = (this.trackId === 'cyber_desert') ? '#ffaa00' : (this.trackId === 'space_ring' ? '#00ffff' : '#ff0055');
      for (let y = 0; y < 1024; y += 64) {
        ctx.fillStyle = (Math.floor(y / 64) % 2 === 0) ? curbColor : '#ffffff';
        ctx.fillRect(0, y, 12, 64);
        ctx.fillRect(500, y, 12, 64);
      }

      const centerColor = (this.trackId === 'space_ring') ? '#00ffff' : '#00f0ff';
      for (let y = 0; y < 1024; y += 128) {
        ctx.fillStyle = centerColor;
        ctx.fillRect(252, y, 8, 70);
      }

      return new THREE.CanvasTexture(canvas);
    } catch (e) {
      console.warn('generateAsphaltTexture drawing error:', e);
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

      const mat = new THREE.MeshStandardMaterial({ color: 0x22262d, metalness: 0.8, roughness: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.environmentGroup.add(mesh);

      // Neon Top Strip
      const neonStripVerts = [];
      const stripIndices = [];
      for (let i = 0; i <= segments; i++) {
        const topX = verts[i * 2 * 3 + 0] || verts[0];
        const topY = (verts[i * 2 * 3 + 1] || 0) + 1.25;
        const topZ = verts[i * 2 * 3 + 2] || 0;
        neonStripVerts.push(topX, topY, topZ);
        neonStripVerts.push(topX, topY + 0.18, topZ);

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

      const neonColor = (this.trackId === 'cyber_desert')
        ? (isInner ? 0xffaa00 : 0xff4400)
        : (this.trackId === 'space_ring' ? (isInner ? 0x00ffff : 0xaa00ff) : (isInner ? 0x00f0ff : 0xff0077));

      const neonMesh = new THREE.Mesh(neonGeo, new THREE.MeshBasicMaterial({ color: neonColor }));
      this.environmentGroup.add(neonMesh);
    };

    buildWallMesh(innerVerts, true);
    buildWallMesh(outerVerts, false);
  }

  buildStartGantry() {
    const sp = this.samplePoints[0];
    const gantryGroup = new THREE.Group();
    gantryGroup.position.copy(sp.position);
    gantryGroup.rotation.y = Math.atan2(sp.tangent.x, sp.tangent.z);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x33373f, metalness: 0.9 });
    const postGeo = new THREE.BoxGeometry(0.8, 8, 0.8);

    const postL = new THREE.Mesh(postGeo, pillarMat);
    postL.position.set(-this.trackWidth / 2 - 0.8, 4, 0);

    const postR = new THREE.Mesh(postGeo, pillarMat);
    postR.position.set(this.trackWidth / 2 + 0.8, 4, 0);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(this.trackWidth + 3, 2.2, 1.6), pillarMat);
    bridge.position.set(0, 7.5, 0);

    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 1024;
    bannerCanvas.height = 256;
    const bCtx = bannerCanvas.getContext('2d');
    bCtx.fillStyle = '#060a12';
    bCtx.fillRect(0, 0, 1024, 256);
    bCtx.strokeStyle = '#00f0ff';
    bCtx.lineWidth = 12;
    bCtx.strokeRect(6, 6, 1012, 244);
    bCtx.fillStyle = '#00f0ff';
    bCtx.font = 'bold 64px Orbitron, sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText(TRACK_PRESETS[this.trackId].name.toUpperCase(), 512, 105);
    bCtx.fillStyle = '#ff0055';
    bCtx.font = 'bold 44px Orbitron, sans-serif';
    bCtx.fillText('★ S3D DRIVE GP ★', 512, 185);

    const bannerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(this.trackWidth - 4, 1.4),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(bannerCanvas) })
    );
    bannerMesh.position.set(0, 7.5, 0.82);

    gantryGroup.add(postL, postR, bridge, bannerMesh);
    this.environmentGroup.add(gantryGroup);
  }

  buildCheckpoints(count = 20) {
    this.checkpoints = [];
    for (let i = 0; i < count; i++) {
      const u = i / count;
      const pos = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

      const ringGroup = new THREE.Group();
      ringGroup.position.copy(pos);
      ringGroup.rotation.y = Math.atan2(tangent.x, tangent.z);

      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(this.trackWidth * 0.52, 0.15, 8, 24, Math.PI),
        new THREE.MeshBasicMaterial({ color: (i === 0) ? 0x00ff88 : 0x00f0ff, transparent: true, opacity: 0.55 })
      );
      ringMesh.position.y = 0.5;
      ringGroup.add(ringMesh);
      this.environmentGroup.add(ringGroup);

      this.checkpoints.push({
        index: i,
        u,
        position: pos,
        tangent,
        normal,
        radius: this.trackWidth * 0.65
      });
    }
  }

  buildBoostPads() {
    this.boostPads = [];
    const boostUValues = [0.08, 0.32, 0.58, 0.82];

    boostUValues.forEach((u, idx) => {
      const pos = this.curve.getPointAt(u);
      const tangent = this.curve.getTangentAt(u).normalize();

      const padGroup = new THREE.Group();
      padGroup.position.copy(pos);
      padGroup.rotation.y = Math.atan2(tangent.x, tangent.z);

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.fillRect(0, 0, 256, 512);

      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      for (let y = 80; y < 450; y += 120) {
        ctx.beginPath();
        ctx.moveTo(128, y - 50);
        ctx.lineTo(220, y + 30);
        ctx.lineTo(180, y + 30);
        ctx.lineTo(128, y - 10);
        ctx.lineTo(76, y + 30);
        ctx.lineTo(36, y + 30);
        ctx.closePath();
        ctx.fill();
      }

      const padMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 12),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.95 })
      );
      padMesh.rotation.x = -Math.PI / 2;
      padMesh.position.y = 0.05;

      padGroup.add(padMesh);
      this.environmentGroup.add(padGroup);

      this.boostPads.push({ id: idx, position: pos, radius: 4.5 });
    });
  }

  buildMovingObstacles() {
    // Industrial Moving Laser Hazard Cranes
    const obstacleUValues = [0.22, 0.48, 0.74];
    obstacleUValues.forEach((u, idx) => {
      const sp = this.samplePoints[Math.floor(u * (this.samplePoints.length - 1))];
      if (!sp) return;

      const group = new THREE.Group();
      group.position.copy(sp.position);
      group.rotation.y = Math.atan2(sp.tangent.x, sp.tangent.z);

      const pistonMat = new THREE.MeshStandardMaterial({ color: 0xff4400, metalness: 0.8 });
      const piston = new THREE.Mesh(new THREE.BoxGeometry(4, 1.2, 1.2), pistonMat);
      piston.position.set(0, 0.6, 0);

      group.add(piston);
      this.environmentGroup.add(group);

      this.movingObstacles.push({
        group,
        piston,
        basePos: sp.position.clone(),
        normal: sp.normal.clone(),
        timer: idx * 1.5
      });
    });
  }

  updateMovingObstacles(dt) {
    this.movingObstacles.forEach((obs) => {
      obs.timer += dt * 2.5;
      const swingOffset = Math.sin(obs.timer) * (this.trackWidth * 0.35);
      obs.piston.position.x = swingOffset;
    });
  }

  buildWorldEnvironment(preset) {
    const groundGeo = new THREE.PlaneGeometry(1800, 1800, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: (this.trackId === 'cyber_desert') ? 0x241108 : (this.trackId === 'space_ring' ? 0x020308 : 0x07090f),
      roughness: 0.95,
      metalness: (this.trackId === 'space_ring') ? 0.8 : 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    this.environmentGroup.add(ground);

    const gridColor = (this.trackId === 'cyber_desert') ? 0xffaa00 : (this.trackId === 'space_ring' ? 0x00ffff : 0x00f0ff);
    const gridHelper = new THREE.GridHelper(1800, 90, gridColor, 0x112233);
    this.environmentGroup.add(gridHelper);

    if (this.trackId === 'space_ring') {
      // Floating Space Asteroids & Starfield Ring
      const astMat = new THREE.MeshStandardMaterial({ color: 0x334455, roughness: 0.9 });
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const dist = 320 + Math.random() * 200;
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;
        const y = 20 + Math.random() * 80;
        const astGeo = new THREE.DodecahedronGeometry(8 + Math.random() * 15, 1);
        const ast = new THREE.Mesh(astGeo, astMat);
        ast.position.set(x, y, z);
        this.environmentGroup.add(ast);
      }
    } else {
      // High-Rise Skyscrapers & Industrial Towers
      const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
      const buildingMat = new THREE.MeshStandardMaterial({ color: 0x0c1018, metalness: 0.85, roughness: 0.3 });

      for (let i = 0; i < 80; i++) {
        const angle = (i / 80) * Math.PI * 2;
        const dist = 380 + Math.random() * 260;
        const x = Math.cos(angle) * dist;
        const z = Math.sin(angle) * dist;
        const height = 50 + Math.random() * 140;
        const width = 20 + Math.random() * 30;

        const bMesh = new THREE.Mesh(buildingGeo, buildingMat);
        bMesh.scale.set(width, height, width);
        bMesh.position.set(x, height / 2, z);
        this.environmentGroup.add(bMesh);

        if (Math.random() > 0.4) {
          const roofGeo = new THREE.BoxGeometry(width + 1, 1.5, width + 1);
          const roofMat = new THREE.MeshBasicMaterial({ color: (i % 2 === 0) ? 0x00f0ff : 0xff0077 });
          const roofMesh = new THREE.Mesh(roofGeo, roofMat);
          roofMesh.position.set(x, height, z);
          this.environmentGroup.add(roofMesh);
        }
      }
    }
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
      pos.y += 0.3;

      this.gridSlots.push({
        slot: i,
        position: pos,
        rotationY: Math.atan2(sp.tangent.x, sp.tangent.z),
        tangent: sp.tangent
      });
    }
  }

  getClosestPoint(pos) {
    let minSqDist = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < this.samplePoints.length; i += 2) {
      const sp = this.samplePoints[i];
      const sqDist = pos.distanceToSquared(sp.position);
      if (sqDist < minSqDist) {
        minSqDist = sqDist;
        closestIndex = i;
      }
    }

    const sp = this.samplePoints[closestIndex];
    return {
      sample: sp,
      distance: Math.sqrt(minSqDist),
      isOffTrack: Math.sqrt(minSqDist) > this.trackWidth * 0.5
    };
  }
}
