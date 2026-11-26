/**
 * Velocity Rush 3D - Pooled Particle System (Zero Per-Frame Geometry/Material Leaks)
 * Handles Rain, Water Spray, Tire Smoke, Nitro Exhaust, Sparks, Skid Marks, and Confetti.
 */

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;

    // 3D Rain Streaks System
    this.rainCount = 750;
    this.rainGeo = null;
    this.rainMesh = null;
    this.isRaining = false;
    this.initRain();

    // Skid Marks
    this.maxSkidSegments = 600;
    this.skidMesh = null;
    this.skidIndex = 0;
    this.initSkidMarks();

    // Shared Geometries & Materials (Zero allocations during gameplay)
    this.smokeGeo = new THREE.SphereGeometry(0.28, 6, 6);
    this.smokeMat = new THREE.MeshBasicMaterial({ color: 0xd0d8e0, transparent: true, opacity: 0.36, depthWrite: false });

    this.sprayGeo = new THREE.SphereGeometry(0.2, 5, 5);
    this.sprayMat = new THREE.MeshBasicMaterial({ color: 0x8cc8ee, transparent: true, opacity: 0.45, depthWrite: false });

    this.nitroGeo = new THREE.ConeGeometry(0.13, 0.65, 6);
    this.nitroGeo.rotateX(-Math.PI / 2);
    this.nitroMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85, depthWrite: false });
    this.nitroMatGold = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.9, depthWrite: false });
    this.nitroMatMagenta = new THREE.MeshBasicMaterial({ color: 0xff0077, transparent: true, opacity: 0.88, depthWrite: false });

    this.sparkGeo = new THREE.OctahedronGeometry(0.11, 0);
    this.sparkGeo.scale(0.65, 0.65, 2.2);
    this.sparkMat = new THREE.MeshBasicMaterial({ color: 0xffbb22, transparent: true, opacity: 0.95, depthWrite: false });

    // Solid 3D Volumetric Foil Confetti Ribbons
    this.confettiGeo = new THREE.BoxGeometry(0.28, 0.035, 0.20);
    this.confettiMats = [0x00f0ff, 0xff0055, 0xffee00, 0x00ff88, 0xffffff].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, metalness: 0.55, roughness: 0.25 })
    );

    this.smokePool = this.createPool(64, this.smokeGeo, this.smokeMat);
    this.sprayPool = this.createPool(48, this.sprayGeo, this.sprayMat);
    this.nitroPool = this.createPool(48, this.nitroGeo, this.nitroMatCyan);
    this.sparkPool = this.createPool(48, this.sparkGeo, this.sparkMat);
    this.confettiPool = this.createPool(90, this.confettiGeo, this.confettiMats[0]);
    this.confettiPool.forEach((p, idx) => {
      p.mesh.material = this.confettiMats[idx % this.confettiMats.length];
    });

    // Sculpted 3D Cupped Rose Petals (Curved 3D organic volume, not flat paper planes)
    this.petalGeo = new THREE.SphereGeometry(0.105, 8, 6);
    this.petalGeo.scale(1.22, 0.24, 0.88);
    this.petalMats = [0xe11d48, 0xf43f5e, 0xfb7185, 0xfecdd3].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.42, metalness: 0.06 })
    );
    this.petalPool = this.createPool(64, this.petalGeo, this.petalMats[0]);
    this.petalPool.forEach((p, idx) => {
      p.mesh.material = this.petalMats[idx % this.petalMats.length];
    });

    // Warm Golden 3D Glowing Fireflies / Forest Dust Motes (Delhi Ridge Forests & Parks)
    this.fireflyGeo = new THREE.IcosahedronGeometry(0.085, 1);
    this.fireflyMat = new THREE.MeshBasicMaterial({ color: 0xffe066, transparent: true, opacity: 0.9, depthWrite: false });
    this.fireflyPool = this.createPool(48, this.fireflyGeo, this.fireflyMat);

    // 3D Tumbling Crash Debris Shards (metallic/carbon bodywork & glass splinters)
    this.debrisGeo = new THREE.BoxGeometry(0.24, 0.055, 0.18);
    this.debrisMats = [0x1c212b, 0xd4d8e0, 0xe11d48, 0xf59e0b].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, metalness: 0.65, roughness: 0.35 })
    );
    this.debrisPool = this.createPool(42, this.debrisGeo, this.debrisMats[0]);
    this.debrisPool.forEach((p, idx) => {
      p.mesh.material = this.debrisMats[idx % this.debrisMats.length];
    });
  }

  createPool(count, geo, mat) {
    const pool = [];
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      pool.push({
        mesh,
        active: false,
        life: 0,
        maxLife: 1,
        velocity: new THREE.Vector3(),
        rotSpeed: new THREE.Vector3(),
        growth: 1
      });
    }
    return pool;
  }

  acquireFromPool(pool) {
    for (let i = 0; i < pool.length; i++) {
      if (!pool[i].active) return pool[i];
    }
    // Recycle oldest entry smoothly if saturated
    return pool[0];
  }

  initRain() {
    this.rainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.rainCount * 6);

    for (let i = 0; i < this.rainCount; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = Math.random() * 48;
      const z = (Math.random() - 0.5) * 120;

      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y - 1.9;
      positions[i * 6 + 5] = z;
    }

    this.rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const rainMat = new THREE.LineBasicMaterial({
      color: 0x77bbee,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });
    this.rainMesh = new THREE.LineSegments(this.rainGeo, rainMat);
    this.rainMesh.visible = false;
    this.rainMesh.frustumCulled = false;
    this.scene.add(this.rainMesh);
  }

  setWeather(weather) {
    this.isRaining = (weather === 'rain');
    if (this.rainMesh) {
      this.rainMesh.visible = this.isRaining;
    }
  }

  initSkidMarks() {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxSkidSegments * 6 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.MeshBasicMaterial({
      color: 0x0c0e14,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });

    this.skidMesh = new THREE.Mesh(geo, mat);
    this.skidMesh.frustumCulled = false;
    this.scene.add(this.skidMesh);
    this.skidIndex = 0;
  }

  reset() {
    [this.smokePool, this.sprayPool, this.nitroPool, this.sparkPool, this.confettiPool, this.petalPool, this.fireflyPool, this.debrisPool].forEach((pool) => {
      pool.forEach((p) => {
        p.active = false;
        p.mesh.visible = false;
      });
    });

    if (this.skidMesh) {
      const posAttr = this.skidMesh.geometry.attributes.position;
      posAttr.array.fill(0);
      posAttr.needsUpdate = true;
      this.skidIndex = 0;
    }
  }

  addSkidMark(leftWheelPos, rightWheelPos, rightVec = null) {
    if (!this.skidMesh) return;
    const posAttr = this.skidMesh.geometry.attributes.position;
    const baseVertex = (this.skidIndex % this.maxSkidSegments) * 6;

    const rx = rightVec ? rightVec.x * 0.16 : 0.16;
    const rz = rightVec ? rightVec.z * 0.16 : 0;
    const fx = rightVec ? -rightVec.z * 0.45 : 0;
    const fz = rightVec ? rightVec.x * 0.45 : -0.45;
    const yL = leftWheelPos.y;
    const yR = rightWheelPos.y;

    posAttr.setXYZ(baseVertex + 0, leftWheelPos.x - rx, yL, leftWheelPos.z - rz);
    posAttr.setXYZ(baseVertex + 1, leftWheelPos.x + rx, yL, leftWheelPos.z + rz);
    posAttr.setXYZ(baseVertex + 2, leftWheelPos.x + fx, yL, leftWheelPos.z + fz);

    posAttr.setXYZ(baseVertex + 3, rightWheelPos.x - rx, yR, rightWheelPos.z - rz);
    posAttr.setXYZ(baseVertex + 4, rightWheelPos.x + rx, yR, rightWheelPos.z + rz);
    posAttr.setXYZ(baseVertex + 5, rightWheelPos.x + fx, yR, rightWheelPos.z + fz);

    posAttr.needsUpdate = true;
    this.skidIndex++;
  }

  emitSmoke(pos) {
    const p = this.acquireFromPool(this.smokePool);
    p.active = true;
    p.life = 0.65;
    p.maxLife = 0.65;
    p.growth = 1.6 + Math.random() * 1.1;
    p.velocity.set((Math.random() - 0.5) * 1.5, 0.9 + Math.random() * 1.0, (Math.random() - 0.5) * 1.5);
    p.mesh.position.set(pos.x, pos.y + 0.18, pos.z);
    p.mesh.scale.set(0.8, 0.8, 0.8);
    p.mesh.visible = true;
  }

  emitWaterSpray(pos) {
    const p = this.acquireFromPool(this.sprayPool);
    p.active = true;
    p.life = 0.38;
    p.maxLife = 0.38;
    p.velocity.set((Math.random() - 0.5) * 3.0, 1.4 + Math.random() * 1.8, (Math.random() - 0.5) * 3.0);
    p.mesh.position.set(pos.x, pos.y + 0.14, pos.z);
    p.mesh.scale.set(0.85, 0.85, 0.85);
    p.mesh.visible = true;
  }

  emitNitro(pos, carQuaternion, nitroMode = 'twin_overboost') {
    const p = this.acquireFromPool(this.nitroPool);
    p.active = true;
    p.life = 0.16;
    p.maxLife = 0.16;
    p.mesh.material = nitroMode === 'hyper_warp'
      ? this.nitroMatMagenta
      : (nitroMode === 'twin_overboost' ? this.nitroMatGold : this.nitroMatCyan);
    p.mesh.position.copy(pos);
    p.mesh.quaternion.copy(carQuaternion);
    p.mesh.scale.set(1, 1, nitroMode === 'hyper_warp' ? 1.85 : 1.45);
    p.velocity.set(0, 0, -1).applyQuaternion(carQuaternion).multiplyScalar(14 + Math.random() * 8);
    p.mesh.visible = true;
  }

  emitSparks(pos, count = 12) {
    const spawnCount = Math.min(count, 24);
    for (let i = 0; i < spawnCount; i++) {
      const p = this.acquireFromPool(this.sparkPool);
      p.active = true;
      p.life = 0.35 + Math.random() * 0.25;
      p.maxLife = 0.6;
      p.mesh.position.set(pos.x, pos.y + 0.35, pos.z);
      p.mesh.scale.set(1, 1, 1);
      p.velocity.set((Math.random() - 0.5) * 16, 4 + Math.random() * 7, (Math.random() - 0.5) * 16);
      p.mesh.visible = true;
    }
  }

  emitCrashExplosion(pos, impactDir = null, intensity = 1.0) {
    const power = Math.max(0.5, Math.min(1.6, intensity));
    const dx = impactDir ? impactDir.x : 0;
    const dz = impactDir ? impactDir.z : 1;
    // Blazing metallic sparks
    this.emitSparks(pos, Math.round(14 * power));
    // Thick impact smoke puff
    for (let s = 0; s < 6; s++) {
      const sm = this.acquireFromPool(this.smokePool);
      sm.active = true;
      sm.life = 0.85 + Math.random() * 0.35;
      sm.maxLife = 1.2;
      sm.growth = 2.6 + Math.random() * 1.4;
      sm.mesh.position.set(pos.x + (Math.random() - 0.5) * 1.1, pos.y + 0.45, pos.z + (Math.random() - 0.5) * 1.1);
      sm.mesh.scale.set(1.2, 1.2, 1.2);
      sm.velocity.set(dx * 5 + (Math.random() - 0.5) * 5, 2.2 + Math.random() * 2.5, dz * 5 + (Math.random() - 0.5) * 5);
      sm.mesh.visible = true;
    }
    // 3D tumbling car debris fragments
    const shardCount = Math.round(12 * power);
    for (let i = 0; i < shardCount; i++) {
      const d = this.acquireFromPool(this.debrisPool);
      d.active = true;
      d.life = 1.4 + Math.random() * 0.8;
      d.maxLife = 2.2;
      d.mesh.position.set(pos.x + (Math.random() - 0.5) * 0.8, pos.y + 0.55 + Math.random() * 0.4, pos.z + (Math.random() - 0.5) * 0.8);
      d.mesh.scale.set(0.7 + Math.random() * 0.9, 0.8 + Math.random() * 0.6, 0.7 + Math.random() * 1.0);
      d.velocity.set(
        dx * (9 + Math.random() * 11) + (Math.random() - 0.5) * 14,
        (6.5 + Math.random() * 8.5) * power,
        dz * (9 + Math.random() * 11) + (Math.random() - 0.5) * 14
      );
      d.rotSpeed.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 18);
      d.mesh.visible = true;
    }
  }

  emitConfetti(origin) {
    for (let i = 0; i < this.confettiPool.length; i++) {
      const p = this.confettiPool[i];
      p.active = true;
      p.life = 3.2;
      p.maxLife = 3.2;
      p.mesh.position.set(
        origin.x + (Math.random() - 0.5) * 8,
        origin.y + 3 + Math.random() * 4,
        origin.z + (Math.random() - 0.5) * 8
      );
      p.mesh.scale.set(1, 1, 1);
      p.velocity.set((Math.random() - 0.5) * 8, 6 + Math.random() * 7, (Math.random() - 0.5) * 8);
      p.rotSpeed.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      p.mesh.visible = true;
    }
  }

  emitPetal(origin) {
    const p = this.acquireFromPool(this.petalPool);
    p.active = true;
    p.life = 2.6 + Math.random() * 1.4;
    p.maxLife = 4.0;
    p.mesh.position.set(
      origin.x + (Math.random() - 0.5) * 6.5,
      origin.y + 1.4 + Math.random() * 2.2,
      origin.z + (Math.random() - 0.5) * 6.5
    );
    const sc = 0.8 + Math.random() * 0.6;
    p.mesh.scale.set(sc, sc, sc);
    p.velocity.set((Math.random() - 0.5) * 1.6, -0.55 - Math.random() * 0.6, (Math.random() - 0.5) * 1.6);
    p.rotSpeed.set(2.5 + Math.random() * 3, 2.0 + Math.random() * 3, 2.0 + Math.random() * 3);
    p.mesh.visible = true;
  }

  emitFirefly(origin) {
    const p = this.acquireFromPool(this.fireflyPool);
    p.active = true;
    p.life = 2.4 + Math.random() * 1.8;
    p.maxLife = 4.2;
    p.mesh.position.set(
      origin.x + (Math.random() - 0.5) * 38,
      0.7 + Math.random() * 4.5,
      origin.z + (Math.random() - 0.5) * 38
    );
    const sc = 0.65 + Math.random() * 0.7;
    p.mesh.scale.set(sc, sc, sc);
    p.velocity.set((Math.random() - 0.5) * 1.2, 0.25 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 1.2);
    p.mesh.visible = true;
  }

  update(dt, cameraPos) {
    if (this.isRaining && this.rainMesh && cameraPos) {
      this.rainMesh.position.set(cameraPos.x, 0, cameraPos.z);
      const posAttr = this.rainGeo.attributes.position;
      for (let i = 0; i < this.rainCount; i++) {
        let y1 = posAttr.getY(i * 2 + 0) - 72 * dt;
        let y2 = posAttr.getY(i * 2 + 1) - 72 * dt;
        if (y1 < 0) {
          y1 = 46;
          y2 = 44.1;
        }
        posAttr.setY(i * 2 + 0, y1);
        posAttr.setY(i * 2 + 1, y2);
      }
      posAttr.needsUpdate = true;
    }

    for (let i = 0; i < this.smokePool.length; i++) {
      const p = this.smokePool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const t = 1 - p.life / p.maxLife;
      const scale = (0.7 + t * p.growth) * (1 - t * 0.65);
      p.mesh.scale.set(scale, scale, scale);
    }

    for (let i = 0; i < this.sprayPool.length; i++) {
      const p = this.sprayPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.velocity.y -= 9.8 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      const s = p.life / p.maxLife;
      p.mesh.scale.set(s, s, s);
    }

    for (let i = 0; i < this.nitroPool.length; i++) {
      const p = this.nitroPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const s = p.life / p.maxLife;
      p.mesh.scale.set(s, s, s * 1.5);
    }

    for (let i = 0; i < this.sparkPool.length; i++) {
      const p = this.sparkPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.velocity.y -= 25 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      const s = p.life / p.maxLife;
      p.mesh.scale.set(s, s, s);
    }

    for (let i = 0; i < this.confettiPool.length; i++) {
      const p = this.confettiPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.velocity.y -= 9.8 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.mesh.rotation.x += p.rotSpeed.x * dt;
      p.mesh.rotation.y += p.rotSpeed.y * dt;
    }

    for (let i = 0; i < this.petalPool.length; i++) {
      const p = this.petalPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0 || p.mesh.position.y < 0.04) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.velocity.x += Math.sin(p.life * 4.5 + i) * 1.2 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.mesh.rotation.x += p.rotSpeed.x * dt;
      p.mesh.rotation.y += p.rotSpeed.y * dt;
      p.mesh.rotation.z += p.rotSpeed.z * dt;
    }

    for (let i = 0; i < this.fireflyPool.length; i++) {
      const p = this.fireflyPool[i];
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const pulse = 0.5 + 0.5 * Math.sin(p.life * 6 + i);
      p.mesh.scale.setScalar(0.55 + pulse * 0.65);
    }

    for (let i = 0; i < this.debrisPool.length; i++) {
      const d = this.debrisPool[i];
      if (!d.active) continue;
      d.life -= dt;
      if (d.life <= 0) {
        d.active = false;
        d.mesh.visible = false;
        continue;
      }
      d.velocity.y -= 24 * dt;
      d.mesh.position.addScaledVector(d.velocity, dt);
      if (d.mesh.position.y < 0.06) {
        d.mesh.position.y = 0.06;
        d.velocity.y = Math.abs(d.velocity.y) * 0.42;
        d.velocity.x *= 0.78;
        d.velocity.z *= 0.78;
      }
      d.mesh.rotation.x += d.rotSpeed.x * dt;
      d.mesh.rotation.y += d.rotSpeed.y * dt;
      d.mesh.rotation.z += d.rotSpeed.z * dt;
    }
  }
}
