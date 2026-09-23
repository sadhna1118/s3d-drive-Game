/**
 * Velocity Rush 3D - Particle System with Rain, Spray, Warp Lines & Explosive Combos
 */

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;

    this.smokeParticles = [];
    this.nitroParticles = [];
    this.sparkParticles = [];
    this.confettiParticles = [];
    this.waterSprayParticles = [];

    // 3D Rain Streaks System
    this.rainCount = 800;
    this.rainGeo = null;
    this.rainMesh = null;
    this.isRaining = false;
    this.initRain();

    // Skid Marks
    this.maxSkidSegments = 600;
    this.skidMesh = null;
    this.initSkidMarks();

    this.smokeMat = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.45, depthWrite: false });
    this.sprayMat = new THREE.MeshBasicMaterial({ color: 0x88bbdd, transparent: true, opacity: 0.5, depthWrite: false });
    this.nitroMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.9, depthWrite: false });
    this.nitroMatMagenta = new THREE.MeshBasicMaterial({ color: 0xff0077, transparent: true, opacity: 0.9, depthWrite: false });
    this.sparkMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, depthWrite: false });
  }

  initRain() {
    this.rainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(this.rainCount * 6); // 2 vertices per drop line

    for (let i = 0; i < this.rainCount; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = Math.random() * 50;
      const z = (Math.random() - 0.5) * 120;

      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y - 1.8;
      positions[i * 6 + 5] = z;
    }

    this.rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const rainMat = new THREE.LineBasicMaterial({
      color: 0x66aacc,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    this.rainMesh = new THREE.LineSegments(this.rainGeo, rainMat);
    this.rainMesh.visible = false;
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
    const alphas = new Float32Array(this.maxSkidSegments * 6);

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const mat = new THREE.MeshBasicMaterial({
      color: 0x111115,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });

    this.skidMesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.skidMesh);
    this.skidIndex = 0;
  }

  addSkidMark(leftWheelPos, rightWheelPos) {
    if (!this.skidMesh) return;
    const posAttr = this.skidMesh.geometry.attributes.position;
    const idx = (this.skidIndex % this.maxSkidSegments) * 18;

    const w = 0.22;
    const yOffset = 0.05;

    posAttr.setXYZ(idx + 0, leftWheelPos.x - w, leftWheelPos.y + yOffset, leftWheelPos.z);
    posAttr.setXYZ(idx + 1, leftWheelPos.x + w, leftWheelPos.y + yOffset, leftWheelPos.z);
    posAttr.setXYZ(idx + 2, leftWheelPos.x, leftWheelPos.y + yOffset, leftWheelPos.z - 0.5);

    posAttr.setXYZ(idx + 3, rightWheelPos.x - w, rightWheelPos.y + yOffset, rightWheelPos.z);
    posAttr.setXYZ(idx + 4, rightWheelPos.x + w, rightWheelPos.y + yOffset, rightWheelPos.z);
    posAttr.setXYZ(idx + 5, rightWheelPos.x, rightWheelPos.y + yOffset, rightWheelPos.z - 0.5);

    posAttr.needsUpdate = true;
    this.skidIndex++;
  }

  emitSmoke(pos) {
    const geo = new THREE.SphereGeometry(0.25 + Math.random() * 0.2, 6, 6);
    const mesh = new THREE.Mesh(geo, this.smokeMat.clone());
    mesh.position.copy(pos);
    mesh.position.y += 0.2;
    this.scene.add(mesh);

    this.smokeParticles.push({
      mesh,
      life: 0.8,
      maxLife: 0.8,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 1.5, 0.8 + Math.random() * 1.2, (Math.random() - 0.5) * 1.5),
      growth: 1.8 + Math.random() * 1.5
    });
  }

  emitWaterSpray(pos) {
    const geo = new THREE.SphereGeometry(0.2, 4, 4);
    const mesh = new THREE.Mesh(geo, this.sprayMat.clone());
    mesh.position.copy(pos);
    mesh.position.y += 0.15;
    this.scene.add(mesh);

    this.waterSprayParticles.push({
      mesh,
      life: 0.4,
      maxLife: 0.4,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 3, 1.2 + Math.random() * 2, (Math.random() - 0.5) * 3)
    });
  }

  emitNitro(pos, carQuaternion) {
    const geo = new THREE.ConeGeometry(0.12, 0.6, 6);
    geo.rotateX(-Math.PI / 2);
    const isCyan = Math.random() > 0.3;
    const mesh = new THREE.Mesh(geo, isCyan ? this.nitroMatCyan : this.nitroMatMagenta);
    mesh.position.copy(pos);
    mesh.quaternion.copy(carQuaternion);
    this.scene.add(mesh);

    const backDir = new THREE.Vector3(0, 0, -1).applyQuaternion(carQuaternion);

    this.nitroParticles.push({
      mesh,
      life: 0.18,
      maxLife: 0.18,
      velocity: backDir.multiplyScalar(15 + Math.random() * 10)
    });
  }

  emitSparks(pos, count = 12) {
    for (let i = 0; i < count; i++) {
      const geo = new THREE.BoxGeometry(0.08, 0.08, 0.2);
      const mesh = new THREE.Mesh(geo, this.sparkMat);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      this.sparkParticles.push({
        mesh,
        life: 0.4 + Math.random() * 0.3,
        maxLife: 0.7,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 16, 4 + Math.random() * 8, (Math.random() - 0.5) * 16)
      });
    }
  }

  emitConfetti(origin) {
    const colors = [0x00f0ff, 0xff0055, 0xffee00, 0x00ff88, 0xffffff];
    for (let i = 0; i < 90; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      const geo = new THREE.PlaneGeometry(0.3, 0.2);
      const mat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(origin).add(new THREE.Vector3((Math.random() - 0.5) * 8, 4 + Math.random() * 4, (Math.random() - 0.5) * 8));
      this.scene.add(mesh);

      this.confettiParticles.push({
        mesh,
        life: 3.5,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 8, 6 + Math.random() * 8, (Math.random() - 0.5) * 8),
        rotSpeed: new THREE.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6)
      });
    }
  }

  update(dt, cameraPos) {
    // 1. Update Rain Following Camera
    if (this.isRaining && this.rainMesh && cameraPos) {
      this.rainMesh.position.set(cameraPos.x, 0, cameraPos.z);
      const posAttr = this.rainGeo.attributes.position;
      for (let i = 0; i < this.rainCount; i++) {
        let y1 = posAttr.getY(i * 2 + 0);
        let y2 = posAttr.getY(i * 2 + 1);
        y1 -= 75 * dt;
        y2 -= 75 * dt;
        if (y1 < 0) {
          y1 = 45;
          y2 = 45 - 1.8;
        }
        posAttr.setY(i * 2 + 0, y1);
        posAttr.setY(i * 2 + 1, y2);
      }
      posAttr.needsUpdate = true;
    }

    // 2. Smoke
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.smokeParticles.splice(i, 1);
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const scale = 1.0 + (1.0 - p.life / p.maxLife) * p.growth;
      p.mesh.scale.set(scale, scale, scale);
      p.mesh.material.opacity = (p.life / p.maxLife) * 0.45;
    }

    // 3. Water Spray
    for (let i = this.waterSprayParticles.length - 1; i >= 0; i--) {
      const p = this.waterSprayParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.waterSprayParticles.splice(i, 1);
        continue;
      }
      p.velocity.y -= 9.8 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
    }

    // 4. Nitro Jets
    for (let i = this.nitroParticles.length - 1; i >= 0; i--) {
      const p = this.nitroParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.nitroParticles.splice(i, 1);
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const scale = (p.life / p.maxLife);
      p.mesh.scale.set(scale, scale, scale * 1.5);
    }

    // 5. Sparks
    for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
      const p = this.sparkParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.sparkParticles.splice(i, 1);
        continue;
      }
      p.velocity.y -= 25 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
    }

    // 6. Confetti
    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.confettiParticles.splice(i, 1);
        continue;
      }
      p.velocity.y -= 9.8 * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.mesh.rotation.x += p.rotSpeed.x * dt;
      p.mesh.rotation.y += p.rotSpeed.y * dt;
    }
  }
}
