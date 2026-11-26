/**
 * Velocity Rush 3D - Car Entity Controller
 * Supports Visual Mods, Upgrades, Dynamic Brake/Nitro Visuals, and Resource Disposal.
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
    const enableSpotlights = this.isLocalPlayer || this.name === 'Showroom';
    this.modelData = CarBuilder.createCar(this.carIndex, this.color, this.visualMods, enableSpotlights);
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
    this._rearL = new THREE.Vector3();
    this._rearR = new THREE.Vector3();
    this._pipeWorld = new THREE.Vector3();
    this._rightVec = new THREE.Vector3();
  }

  createNameplate() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(10, 15, 25, 0.78)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(4, 4, 248, 56, 12);
      else ctx.rect(4, 4, 248, 56);
      ctx.fill();

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
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
      this.nameplate.position.set(0, 2.25, 0);
      this.mesh.add(this.nameplate);
    } catch (e) {
      console.warn('createNameplate fallback:', e);
    }
  }

  disposeMeshResources(root) {
    if (!root) return;
    root.traverse((obj) => {
      if (obj.geometry && typeof obj.geometry.dispose === 'function') {
        obj.geometry.dispose();
      }
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if (m.map && typeof m.map.dispose === 'function') m.map.dispose();
          if (typeof m.dispose === 'function') m.dispose();
        });
      }
    });
  }

  updateCustomization(carIndex, color, name, visualMods = {}, upgrades = {}) {
    const prev = this.visualMods || {};
    this.visualMods = { ...prev, ...visualMods };
    this.upgrades = { ...this.upgrades, ...upgrades };

    const rebuildNeeded = (carIndex !== undefined && carIndex !== this.carIndex) ||
      visualMods.rimStyle !== undefined ||
      visualMods.underglowMode !== undefined ||
      visualMods.spoilerStyle !== undefined ||
      visualMods.aeroKit !== undefined ||
      visualMods.headlightStyle !== undefined ||
      visualMods.caliperColor !== undefined ||
      visualMods.dateMode !== undefined ||
      visualMods.showCharacters !== undefined ||
      visualMods.coupleNames !== undefined ||
      visualMods.forceReload;

    if (rebuildNeeded) {
      const targetIdx = carIndex !== undefined ? carIndex : this.carIndex;
      const prevPos = this.mesh ? this.mesh.position.clone() : new THREE.Vector3(0, 0.035, 0);
      const prevQuat = this.mesh ? this.mesh.quaternion.clone() : new THREE.Quaternion();
      this.carIndex = Math.abs(parseInt(targetIdx) || 0) % CAR_CONFIGS.length;
      if (this.scene && this.mesh) {
        this.scene.remove(this.mesh);
        this.disposeMeshResources(this.mesh);
      }
      const enableSpotlights = this.isLocalPlayer || this.name === 'Showroom';
      this.modelData = CarBuilder.createCar(this.carIndex, color || this.color, this.visualMods, enableSpotlights);
      this.mesh = this.modelData.mesh;
      this.mesh.position.copy(prevPos);
      this.mesh.quaternion.copy(prevQuat);
      if (this.scene && this.mesh) this.scene.add(this.mesh);
      this.config = CAR_CONFIGS[this.carIndex] || CAR_CONFIGS[0];
      if (this.physics) this.physics.config = this.config;
    }

    if (visualMods.paintFinish !== undefined && this.modelData.updatePaintFinish) {
      this.modelData.updatePaintFinish(visualMods.paintFinish);
    }

    if (visualMods.tint !== undefined && this.modelData.updateTint) {
      this.modelData.updateTint(visualMods.tint);
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
      const prevGear = this.physics.gear;
      this.physics.update(dt, input);

      this.mesh.position.copy(this.physics.position);
      this.mesh.quaternion.copy(this.physics.quaternion);

      this.modelData.wheels.forEach((w) => {
        if (w.isFront) {
          w.pivot.rotation.y = this.physics.steeringAngle;
        }
        w.wheelMesh.rotation.x = w.isGLB
          ? this.physics.wheelRotation
          : (w.isRight ? -this.physics.wheelRotation : this.physics.wheelRotation);
      });

      if (this.modelData.setBrakeLight) {
        this.modelData.setBrakeLight((input?.brake || 0) > 0.1 || this.physics.isReversing || this.physics.isHandbrakeActive);
      }
      if (this.modelData.setBrakeHeat) {
        this.modelData.setBrakeHeat(this.physics.brakeHeat || 0);
      }
      if (this.modelData.setNitroVisual) {
        this.modelData.setNitroVisual(this.physics.isNitroActive, this.physics.nitroMode);
      }
      if (this.modelData.setIndicatorVisual) {
        this.modelData.setIndicatorVisual(input?.indicatorMode || 'off', !!input?.indicatorPhaseOn);
      }
      if (this.modelData.updateUnderglowAnimation) {
        this.modelData.updateUnderglowAnimation(dt);
      }
      if (this.modelData.updateDateAnimations) {
        this.modelData.updateDateAnimations(dt, this.physics.steeringAngle);
      }

      if (particles) {
        if (this.physics.justLaunched) {
          this._rearL.set(-0.9, 0.08, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          this._rearR.set(0.9, 0.08, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          particles.emitSmoke(this._rearL);
          particles.emitSmoke(this._rearR);
          particles.emitSparks(this.mesh.position, 8);
        }
        if (this.physics.isDrifting && this.physics.speed > 9) {
          this._rearL.set(-0.9, 0.08, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          this._rearR.set(0.9, 0.08, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          this._rightVec.set(1, 0, 0).applyQuaternion(this.mesh.quaternion).normalize();

          particles.emitSmoke(this._rearL);
          particles.emitSmoke(this._rearR);
          particles.addSkidMark(this._rearL, this._rearR, this._rightVec);
        }

        if (this.track && this.track.weather === 'rain' && this.physics.speed > 14) {
          this._rearL.set(-0.9, 0.1, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          this._rearR.set(0.9, 0.1, -1.25).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          particles.emitWaterSpray(this._rearL);
          particles.emitWaterSpray(this._rearR);
        }

        if (this.physics.isNitroActive) {
          this.modelData.exhaustPipes.forEach((pipeOffset) => {
            this._pipeWorld.copy(pipeOffset).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
            particles.emitNitro(this._pipeWorld, this.mesh.quaternion, this.physics.nitroMode);
          });
        }

        if (this.physics.collisionShake > 0.35 && performance.now() - this.lastSparkTime > 180) {
          this.lastSparkTime = performance.now();
          if (this.physics.collisionShake > 0.52 && typeof particles.emitCrashExplosion === 'function') {
            particles.emitCrashExplosion(this.mesh.position, null, this.physics.collisionShake);
          } else {
            particles.emitSparks(this.mesh.position, 14);
          }
          if (audio) audio.playCrash(this.physics.collisionShake);
        }
      }

      if (audio) {
        if (prevGear !== this.physics.gear && prevGear !== 'N' && this.physics.gear !== 'N') {
          const isDown = (typeof prevGear === 'number' && typeof this.physics.gear === 'number')
            ? this.physics.gear < prevGear
            : false;
          audio.playShift?.(isDown);
        }
        const rpmRatio = this.physics.rpm / this.physics.maxRpm;
        const speedRatio = this.physics.speed / 110;
        audio.updateEngine(rpmRatio, input?.throttle || 0, speedRatio, this.config?.id, this.physics.boostPsi);
        audio.updateSkid(this.physics.isDrifting ? Math.abs(this.physics.slipAngle) * 2.4 : 0);
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
    this.targetTransform.isCrashing = !!state.crashing;
    this.physics.lap = state.lap || 1;
    this.physics.currentCheckpoint = state.checkpoint || 0;
  }

  interpolateRemote(dt, particles) {
    const rate = this.targetTransform.isCrashing ? 42 : 20;
    const lerpSpeed = 1 - Math.exp(-rate * dt);

    if (this.targetTransform.isCrashing && this.mesh.position.distanceToSquared(this.targetTransform.position) > 64) {
      this.mesh.position.copy(this.targetTransform.position);
      this.mesh.quaternion.copy(this.targetTransform.quaternion);
    } else {
      this.mesh.position.lerp(this.targetTransform.position, lerpSpeed);
      this.mesh.quaternion.slerp(this.targetTransform.quaternion, lerpSpeed);
    }

    this.modelData.wheels.forEach((w) => {
      if (w.isFront) {
        w.pivot.rotation.y = THREE.MathUtils.lerp(w.pivot.rotation.y, this.targetTransform.steeringAngle, lerpSpeed);
      }
      w.wheelMesh.rotation.x = w.isGLB
        ? this.targetTransform.wheelRotation
        : (w.isRight ? -this.targetTransform.wheelRotation : this.targetTransform.wheelRotation);
    });

    if (this.modelData.setNitroVisual) {
      this.modelData.setNitroVisual(this.targetTransform.isNitroActive);
    }
    if (this.modelData.updateUnderglowAnimation) {
      this.modelData.updateUnderglowAnimation(dt);
    }

    if (particles) {
      if (this.targetTransform.isNitroActive) {
        this.modelData.exhaustPipes.forEach((pipeOffset) => {
          this._pipeWorld.copy(pipeOffset).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
          particles.emitNitro(this._pipeWorld, this.mesh.quaternion);
        });
      }

      if (this.targetTransform.isDrifting) {
        this._rearL.set(-0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
        this._rearR.set(0.9, 0.1, -1.2).applyQuaternion(this.mesh.quaternion).add(this.mesh.position);
        particles.emitSmoke(this._rearL);
        particles.emitSmoke(this._rearR);
      }
    }
  }

  destroy() {
    if (this.scene && this.mesh) {
      this.scene.remove(this.mesh);
      this.disposeMeshResources(this.mesh);
    }
  }
}
