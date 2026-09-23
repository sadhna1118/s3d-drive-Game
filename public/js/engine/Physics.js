/**
 * Velocity Rush 3D - Realistic Vehicle Physics with Suspension Weight Transfer
 * Features pitch nose-dive on braking, acceleration squat, cornering body roll, and wet rain friction.
 */
import { UPGRADE_TIERS } from '../systems/CareerManager.js';

export class VehiclePhysics {
  constructor(track, config, upgrades = {}) {
    this.track = track;
    this.config = config;
    this.upgrades = upgrades;

    // Transform State
    this.position = new THREE.Vector3(0, 0.4, 0);
    this.quaternion = new THREE.Quaternion();
    this.rotationY = 0;

    // Dynamic Vectors
    this.velocity = new THREE.Vector3();
    this.speed = 0;
    this.speedKmh = 0;
    this.steeringAngle = 0;
    this.wheelRotation = 0;

    // Realistic Chassis Suspension Dynamics
    this.suspensionPitch = 0;
    this.suspensionRoll = 0;

    // Engine & Transmission
    this.gear = 1;
    this.rpm = 1000;
    this.maxRpm = 8500;
    this.isReversing = false;

    // Drifting & Slip
    this.isDrifting = false;
    this.slipAngle = 0;
    this.driftScore = 0;
    this.driftCombo = 1.0;
    this.driftTime = 0;

    // Nitro System
    this.nitroMax = 100;
    this.nitroAmount = 100;
    this.isNitroActive = false;
    this.boostPadTimer = 0;

    // Checkpoints & Laps
    this.currentCheckpoint = 0;
    this.lap = 1;
    this.totalLaps = 3;
    this.lapStartTime = 0;
    this.bestLapTime = 0;
    this.raceFinished = false;
    this.wrongWay = false;

    // Collision
    this.collisionShake = 0;
    this.wallCollisionsCount = 0;

    this.applyUpgrades(this.upgrades);
  }

  applyUpgrades(upgrades = {}) {
    this.upgrades = upgrades;
    const engineTier = UPGRADE_TIERS.engine[(upgrades.engine || 1) - 1] || UPGRADE_TIERS.engine[0];
    const turboTier = UPGRADE_TIERS.turbo[(upgrades.turbo || 1) - 1] || UPGRADE_TIERS.turbo[0];
    const tireTier = UPGRADE_TIERS.tires[(upgrades.tires || 1) - 1] || UPGRADE_TIERS.tires[0];
    const nitroTier = UPGRADE_TIERS.nitro[(upgrades.nitro || 1) - 1] || UPGRADE_TIERS.nitro[0];

    this.enginePowerMult = engineTier.powerMult;
    this.topSpeedBonus = engineTier.topSpeedBonus;
    this.turboLaunchMult = turboTier.launchMult;
    this.tireDriftGrip = tireTier.driftGrip;
    this.tireGripMult = tireTier.gripMult;

    this.nitroMax = nitroTier.capacity;
    this.nitroAmount = this.nitroMax;
    this.nitroRechargeRate = nitroTier.rechargeRate;
    this.nitroBoostPower = nitroTier.boostPower;
  }

  resetToGrid(gridSlot) {
    if (gridSlot && gridSlot.position) {
      this.position.copy(gridSlot.position);
      this.rotationY = gridSlot.rotationY || 0;
      this.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationY);
    }
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.speedKmh = 0;
    this.steeringAngle = 0;
    this.suspensionPitch = 0;
    this.suspensionRoll = 0;
    this.gear = 1;
    this.rpm = 1000;
    this.nitroAmount = this.nitroMax;
    this.isNitroActive = false;
    this.isDrifting = false;
    this.driftScore = 0;
    this.currentCheckpoint = 0;
    this.lap = 1;
    this.raceFinished = false;
    this.wrongWay = false;
    this.wallCollisionsCount = 0;
  }

  update(dt, input = {}) {
    if (this.raceFinished) {
      input = { throttle: 0, brake: 0.3, steer: 0, handbrake: false, nitro: false };
    }

    const throttle = input ? (input.throttle || 0) : 0;
    const brake = input ? (input.brake || 0) : 0;
    const steer = input ? (input.steer || 0) : 0;
    const handbrake = input ? !!input.handbrake : false;
    const nitro = input ? !!input.nitro : false;
    const physConfig = (this.config && this.config.physics) ? this.config.physics : { maxSpeed: 230, accelPower: 115, handling: 2.8, driftGrip: 0.92, weight: 1450 };

    const isRain = (this.track && this.track.weather === 'rain');
    const weatherGripModifier = isRain ? 0.88 : 1.0;

    // 1. Nitro State
    const wantsNitro = nitro || this.boostPadTimer > 0;
    if (wantsNitro && (this.nitroAmount > 0 || this.boostPadTimer > 0)) {
      this.isNitroActive = true;
      if (this.boostPadTimer > 0) {
        this.boostPadTimer -= dt;
      } else {
        this.nitroAmount = Math.max(0, this.nitroAmount - dt * 26);
      }
    } else {
      this.isNitroActive = false;
      this.nitroAmount = Math.min(this.nitroMax, this.nitroAmount + dt * this.nitroRechargeRate);
    }

    // 2. Power & Top Speed
    let effectiveMaxSpeedKmh = (physConfig.maxSpeed + this.topSpeedBonus);
    if (this.isNitroActive) effectiveMaxSpeedKmh += 45;
    const maxSpeedMs = effectiveMaxSpeedKmh / 3.6;

    let accelForce = physConfig.accelPower * this.enginePowerMult * this.turboLaunchMult;
    if (this.isNitroActive) accelForce *= this.nitroBoostPower;

    // 3. Direction Vectors
    const forwardDir = new THREE.Vector3(0, 0, 1).applyQuaternion(this.quaternion).normalize();
    const rightDir = new THREE.Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();

    const forwardSpeed = this.velocity.dot(forwardDir);
    const lateralSpeed = this.velocity.dot(rightDir);

    let longitudinalAccel = 0;

    if (throttle > 0) {
      if (forwardSpeed < -0.5) {
        this.velocity.addScaledVector(forwardDir, brake ? 35 * dt : 25 * dt);
        longitudinalAccel = 25;
      } else {
        const speedRatio = Math.max(0, forwardSpeed / maxSpeedMs);
        const torqueMult = Math.max(0.2, 1.0 - Math.pow(speedRatio, 1.8));
        const force = throttle * accelForce * torqueMult;
        this.velocity.addScaledVector(forwardDir, force * dt);
        longitudinalAccel = force;
        this.isReversing = false;
      }
    } else if (brake > 0) {
      if (forwardSpeed > 0.8) {
        const brakeForce = 48;
        this.velocity.addScaledVector(forwardDir, -brake * brakeForce * dt);
        longitudinalAccel = -brakeForce;
      } else {
        this.isReversing = true;
        const reverseMaxMs = 45 / 3.6;
        if (forwardSpeed > -reverseMaxMs) {
          this.velocity.addScaledVector(forwardDir, -brake * 18 * dt);
          longitudinalAccel = -18;
        }
      }
    } else {
      this.velocity.multiplyScalar(Math.pow(0.985, dt * 60));
    }

    // Aerodynamic Drag
    const dragForce = this.velocity.lengthSq() * 0.0011;
    this.velocity.addScaledVector(this.velocity.clone().normalize(), -dragForce * dt);

    // 4. Steering & Handbrake Drift
    const speedRatio = Math.min(1.0, Math.abs(forwardSpeed) / 40);
    const maxSteerAngle = 0.55 * (1.0 - speedRatio * 0.45);
    const targetSteer = -steer * maxSteerAngle;
    this.steeringAngle = THREE.MathUtils.lerp(this.steeringAngle, targetSteer, dt * 10);

    const isHardTurning = Math.abs(steer) > 0.6 && Math.abs(forwardSpeed) > 13;
    this.isDrifting = (handbrake || isHardTurning) && Math.abs(forwardSpeed) > 9;

    let lateralFriction = this.tireDriftGrip * weatherGripModifier;
    let yawRate = this.steeringAngle * (forwardSpeed / 3.2);

    if (this.isDrifting) {
      lateralFriction = handbrake ? 0.42 : 0.68;
      yawRate *= 1.45;

      this.nitroAmount = Math.min(this.nitroMax, this.nitroAmount + dt * (this.nitroRechargeRate * 3.5));
      this.driftTime += dt;
      this.driftScore += Math.floor(Math.abs(lateralSpeed) * dt * 140 * this.driftCombo);
      this.driftCombo = Math.min(5.0, 1.0 + this.driftTime * 0.6);
    } else {
      if (this.driftTime > 0.4) {
        this.driftTime = 0;
        this.driftCombo = 1.0;
      }
    }

    const lateralVel = rightDir.clone().multiplyScalar(lateralSpeed);
    this.velocity.sub(lateralVel.multiplyScalar(Math.min(1.0, (1.0 - lateralFriction) * 8 * dt + 0.15)));

    this.rotationY += yawRate * dt;
    this.slipAngle = Math.atan2(lateralSpeed, Math.abs(forwardSpeed) + 0.001);

    // 5. Position & Wheels
    this.position.addScaledVector(this.velocity, dt);
    this.speed = this.velocity.length();
    this.speedKmh = Math.round(this.speed * 3.6);
    this.wheelRotation += (forwardSpeed / 0.38) * dt;

    // 6. Gears & RPM
    this.calculateTransmission(forwardSpeed, maxSpeedMs, throttle);

    // 7. Realistic Weight Transfer Suspension Dynamics (Nose-dive, Squat, Roll)
    const targetPitch = THREE.MathUtils.clamp(-longitudinalAccel * 0.0008, -0.05, 0.04);
    const targetRoll = THREE.MathUtils.clamp(lateralSpeed * 0.004, -0.07, 0.07);

    this.suspensionPitch = THREE.MathUtils.lerp(this.suspensionPitch, targetPitch, dt * 8);
    this.suspensionRoll = THREE.MathUtils.lerp(this.suspensionRoll, targetRoll, dt * 8);

    // 8. Snap to track elevation & bank with suspension tilt
    this.snapToTrack(dt);

    // 9. Collisions & Checkpoints
    this.checkBarrierCollisions(dt);
    this.checkBoostPads();
    this.checkCheckpoints();

    if (this.collisionShake > 0) {
      this.collisionShake = Math.max(0, this.collisionShake - dt * 3);
    }
  }

  calculateTransmission(forwardSpeed, maxSpeedMs, throttle) {
    if (this.isReversing) {
      this.gear = 'R';
      this.rpm = 1000 + Math.min(4000, Math.abs(forwardSpeed) * 300);
      return;
    }

    const speedKmh = forwardSpeed * 3.6;
    const gearThresholds = [0, 48, 96, 142, 195, 245, 360];

    for (let g = 1; g <= 6; g++) {
      if (speedKmh <= gearThresholds[g] || g === 6) {
        this.gear = g;
        const minG = gearThresholds[g - 1];
        const maxG = gearThresholds[g];
        const gRatio = Math.max(0, Math.min(1.0, (speedKmh - minG) / (maxG - minG)));
        const idleRpm = throttle ? 2200 : 1000;
        this.rpm = idleRpm + gRatio * (this.maxRpm - idleRpm);
        break;
      }
    }
  }

  snapToTrack(dt) {
    if (!this.track) return;
    const trackInfo = this.track.getClosestPoint(this.position);
    const sp = trackInfo.sample;

    const targetY = sp.position.y + 0.38;
    this.position.y = THREE.MathUtils.lerp(this.position.y, targetY, dt * 15);

    const upVector = new THREE.Vector3(0, 1, 0);
    const qBase = new THREE.Quaternion().setFromAxisAngle(upVector, this.rotationY);

    const qSuspension = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(this.suspensionPitch, 0, this.suspensionRoll)
    );
    this.quaternion.copy(qBase).multiply(qSuspension);
  }

  checkBarrierCollisions(dt) {
    if (!this.track) return;
    const trackInfo = this.track.getClosestPoint(this.position);
    const halfTrackWidth = this.track.trackWidth / 2 - 1.2;

    if (trackInfo.distance > halfTrackWidth) {
      const sp = trackInfo.sample;
      const toCar = this.position.clone().sub(sp.position);
      toCar.y = 0;

      const inwardNormal = toCar.clone().normalize().negate();
      const clampedPos = sp.position.clone().addScaledVector(toCar.normalize(), halfTrackWidth);
      this.position.x = clampedPos.x;
      this.position.z = clampedPos.z;

      const velInward = this.velocity.dot(inwardNormal);
      if (velInward < 0) {
        const restitution = 0.45;
        this.velocity.addScaledVector(inwardNormal, -(1 + restitution) * velInward);
        this.velocity.multiplyScalar(0.75);

        this.collisionShake = Math.min(1.0, this.speed / 20);
        this.wallCollisionsCount++;
      }
    }
  }

  checkBoostPads() {
    if (!this.track) return;
    this.track.boostPads.forEach((pad) => {
      const dist = this.position.distanceTo(pad.position);
      if (dist < pad.radius && this.boostPadTimer <= 0) {
        this.boostPadTimer = 2.2;
        this.isNitroActive = true;
      }
    });
  }

  checkCheckpoints() {
    if (!this.track || !this.track.checkpoints.length) return;
    const nextCpIdx = (this.currentCheckpoint + 1) % this.track.checkpoints.length;
    const nextCp = this.track.checkpoints[nextCpIdx];
    const distToNext = this.position.distanceTo(nextCp.position);

    if (distToNext < nextCp.radius) {
      this.currentCheckpoint = nextCpIdx;

      if (this.currentCheckpoint === 0) {
        const now = performance.now();
        const lapTime = (now - this.lapStartTime) / 1000;
        this.lapStartTime = now;

        if (this.lap > 1) {
          if (!this.bestLapTime || lapTime < this.bestLapTime) {
            this.bestLapTime = lapTime;
          }
        }

        if (this.lap >= this.totalLaps) {
          this.raceFinished = true;
        } else {
          this.lap++;
        }
      }
    }

    const sp = this.track.getClosestPoint(this.position).sample;
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.quaternion);
    const dot = forward.dot(sp.tangent);
    this.wrongWay = dot < -0.3 && this.speed > 5;
  }
}
