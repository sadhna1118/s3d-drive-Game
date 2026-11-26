/**
 * Velocity Rush 3D - Car Entity Controller
 * Supports Visual Mods (Rims, Window Tint, Underglow animation) and Upgrades.
 */
import { CarBuilder, CAR_CONFIGS } from './CarBuilder.js';
import { VehiclePhysics } from './Physics.js';

export class Car {
  constructor(scene, track, carIndex = 0, color = '#00f0ff', isLocalPlayer = false, name = 'Player', visualMods = {}, upgrades = {}) {
    this.scene = scene;
    this.track = track;
    this.carIndex = Math.abs(parseInt(carIndex) || 0) % CAR_CONFIGS.length;
    this.color = color || '#00f0ff';
    this.isLocalPlayer = !!isLocalPlayer;
    this.name = name || 'Player';
    this.visualMods = visualMods || {};
    this.upgrades = upgrades || {};

    this.config = CAR_CONFIGS[this.carIndex] || CAR_CONFIGS[0];
    this.modelData = CarBuilder.createCar(this.carIndex, this.color, this.visualMods);
    this.mesh = this.modelData.mesh;
    if (this.scene && this.mesh) this.scene.add(this.mesh);

    this.physics = new VehiclePhysics(this.track, this.config, this.upgrades);

    this.nameplate = null;
    if (!this.isLocalPlayer && this.name !== 'Showroom') {
      this.createNameplate();
    }

    this.targetTransform = {
      position: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      steeringAngle: 0,
      wheelRotation: 0,
      speedKmh: 0,
      isNitroActive: false,
      isDrifting: false
    };

    this.lastSparkTime = 0;
  }

  createNameplate() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(10, 15, 25, 0.75)';
      if (ctx.roundRect) ctx.roundRect(4, 4, 248, 56, 12);
      else ctx.rect(4, 4, 248, 56);
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      if (ctx.roundRect) ctx.roundRect(4, 4, 248, 56, 12);
      else ctx.rect(4, 4, 248, 56);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.name, 128, 32);

      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      this.nameplate = new THREE.Sprite(mat);
      this.nameplate.scale.set(4.5, 1.15, 1);
      this.nameplate.position.set(0, 2.2, 0);
      this.mesh.add(this.nameplate);
    } catch (e) {
      console.warn('createNameplate fallback:', e);
    }
  }

  updateCustomization(carIndex, color, name, visualMods = {}, upgrades = {}) {
    this.visualMods = { ...this.visualMods, ...visualMods };
    this.upgrades = { ...this.upgrades, ...upgrades };

    if (carIndex !== undefined && (carIndex !== this.carIndex || visualMods.rimStyle !== undefined || visualMods.tint !== undefined)) {
      this.carIndex = Math.abs(parseInt(carIndex) || 0) % CAR_CONFIGS.length;
      if (this.scene && this.mesh) this.scene.remove(this.mesh);
      this.modelData = CarBuilder.createCar(this.carIndex, color || this.color, this.visualMods);
      this.mesh = this.modelData.mesh;
      if (this.scene && this.mesh) this.scene.add(this.mesh);
      this.config = CAR_CONFIGS[this.carIndex] || CAR_CONFIGS[0];
      if (this.physics) this.physics.config = this.config;
    }

    if (color) {
      this.color = color;
      this.modelData.updateColor(color);
    }

    if (name) {
      this.name = name;
      if (this.nameplate) {
        this.mesh.remove(this.nameplate);
        this.createNameplate();
      }
    }

    this.physics.applyUpgrades(this.upgrades);
  }

  update(dt, input, particles, audio) {
    if (this.isLocalPlayer) {
      this.physics.update(dt, input);

      this.mesh.position.copy(this.physics.position);
      this.mesh.quaternion.copy(this.physics.quaternion);

      this.modelData.wheels.forEach((w) => {
        if (w.isFront) {
          w.pivot.rotation.y = this.physics.steeringAngle;
        }
        w.wheelMesh.rotation.x = this.physics.wheelRotation;
      });

      if (this.modelData.updateUnderglowAnimation) {
        this.modelData.updateUnderglowAnimation(dt);
      }

      if (particles) {
        if (this.physics.isDrifting && this.physics.speed > 8) {
          const rearL = new THREE.Vector3(-0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          const rearR = new THREE.Vector3(0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);

          particles.emitSmoke(rearL);
          particles.emitSmoke(rearR);
          particles.addSkidMark(rearL, rearR);
        }

        // Wet Rain Water Spray from tires
        if (this.track && this.track.weather === 'rain' && this.physics.speed > 15) {
          const rearL = new THREE.Vector3(-0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          const rearR = new THREE.Vector3(0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          particles.emitWaterSpray(rearL);
          particles.emitWaterSpray(rearR);
        }

        if (this.physics.isNitroActive) {
          this.modelData.exhaustPipes.forEach((pipeOffset) => {
            const pipeWorld = pipeOffset.clone().applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
            particles.emitNitro(pipeWorld, this.mesh.quaternion);
          });
        }

        if (this.physics.collisionShake > 0.4 && performance.now() - this.lastSparkTime > 200) {
          this.lastSparkTime = performance.now();
          particles.emitSparks(this.mesh.position, 16);
          if (audio) audio.playCrash(this.physics.collisionShake);
        }
      }

      if (audio) {
        const rpmRatio = this.physics.rpm / this.physics.maxRpm;
        const speedRatio = this.physics.speed / 70;
        audio.updateEngine(rpmRatio, input.throttle > 0, speedRatio);
        audio.updateSkid(this.physics.isDrifting ? Math.abs(this.physics.slipAngle) * 2.5 : 0);
        audio.updateNitro(this.physics.isNitroActive);
      }
    } else {
      this.interpolateRemote(dt, particles);
    }
  }

  setRemoteTransform(state) {
    this.targetTransform.position.set(state.x, state.y, state.z);
    this.targetTransform.quaternion.set(state.qx, state.qy, state.qz, state.qw);
    this.targetTransform.steeringAngle = state.steer || 0;
    this.targetTransform.wheelRotation = state.wheelRot || 0;
    this.targetTransform.speedKmh = state.speed || 0;
    this.targetTransform.isNitroActive = !!state.nitro;
    this.targetTransform.isDrifting = !!state.drift;
    this.physics.lap = state.lap || 1;
    this.physics.currentCheckpoint = state.checkpoint || 0;
  }

  interpolateRemote(dt, particles) {
    const lerpSpeed = Math.min(1.0, dt * 20);

    this.mesh.position.lerp(this.targetTransform.position, lerpSpeed);
    this.mesh.quaternion.slerp(this.targetTransform.quaternion, lerpSpeed);

    this.modelData.wheels.forEach((w) => {
      if (w.isFront) {
        w.pivot.rotation.y = THREE.MathUtils.lerp(w.pivot.rotation.y, this.targetTransform.steeringAngle, lerpSpeed);
      }
      w.wheelMesh.rotation.x = this.targetTransform.wheelRotation;
    });

    if (particles) {
      if (this.targetTransform.isNitroActive) {
        this.modelData.exhaustPipes.forEach((pipeOffset) => {
          const pipeWorld = pipeOffset.clone().applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          particles.emitNitro(pipeWorld, this.mesh.quaternion);
        });
      }

      if (this.targetTransform.isDrifting) {
        const rearL = new THREE.Vector3(-0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
        const rearR = new THREE.Vector3(0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
        particles.emitSmoke(rearL);
        particles.emitSmoke(rearR);
      }
    }
  }

  destroy() {
    this.scene.remove(this.mesh);
  }
}
