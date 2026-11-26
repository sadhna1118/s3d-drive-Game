/**
 * Velocity Rush 3D - Pro Arcade-Sim Vehicle Physics
 * Features:
 * - Real 6-Speed + Neutral + Reverse Gear System (Automatic & Manual MT/AT)
 * - Rev-limiter & Downshift Engine Braking
 * - Dual-Purpose Handbrake (Launch Control Hold at start + Customizable Drift Lock at speed)
 * - All Nitro Super Modes (Plasma Surge, Twin-Stage Overboost, Quantum Hyper-Warp)
 * - Fully Customizable Speed-Sensitive Steering & Stability Assist
 */
import { UPGRADE_TIERS } from '../systems/CareerManager.js';
import { NITRO_MODES } from './CarBuilder.js';

export const GEAR_SPEC = {
  R: { minFrac: 0, maxFrac: 0.25, torqueMult: 1.18 },
  N: { minFrac: 0, maxFrac: 0, torqueMult: 0 },
  1: { minFrac: 0.0, maxFrac: 0.27, torqueMult: 1.52 },
  2: { minFrac: 0.17, maxFrac: 0.45, torqueMult: 1.30 },
  3: { minFrac: 0.32, maxFrac: 0.65, torqueMult: 1.14 },
  4: { minFrac: 0.48, maxFrac: 0.82, torqueMult: 1.02 },
  5: { minFrac: 0.66, maxFrac: 0.96, torqueMult: 0.94 },
  6: { minFrac: 0.80, maxFrac: 1.28, torqueMult: 0.90 }
};

export class VehiclePhysics {
  constructor(track, config, upgrades = {}) {
    this.track = track;
    this.config = config;
    this.upgrades = upgrades;

    // Transform State
    this.position = new THREE.Vector3(0, 0.035, 0);
    this.quaternion = new THREE.Quaternion();
    this.rotationY = 0;

    // Dynamic Vectors
    this.velocity = new THREE.Vector3();
    this.speed = 0;
    this.speedKmh = 0;
    this.steeringAngle = 0;
    this.wheelRotation = 0;

    // Suspension & Slope Dynamics
    this.suspensionPitch = 0;
    this.suspensionRoll = 0;
    this.trackPitch = 0;

    // Real Transmission & Gear State
    this.transmissionMode = 'auto'; // 'auto' | 'manual'
    this.gear = 1;
    this.rpm = 1100;
    this.maxRpm = 8500;
    this.shiftLight = false;
    this.revLimiter = false;
    this.autoShiftCooldown = 0;
    this.isReversing = false;
    this.autoReverseHoldTimer = 0;
    this._autoBaseMaxKmh = 252;

    // Handbrake & Launch Control
    this.isHandbrakeActive = false;
    this.handbrakeMode = 'drift';
    this.launchControlCharge = 0;
    this.isLaunchReady = false;
    this.justLaunched = false;

    // Drifting & Slip
    this.isDrifting = false;
    this.slipAngle = 0;
    this.driftScore = 0;
    this.driftCombo = 1.0;
    this.driftTime = 0;

    // Nitro Super System
    this.nitroMode = 'twin_overboost';
    this.nitroMax = 100;
    this.nitroAmount = 100;
    this.isNitroActive = false;
    this.wasNitroActive = false;
    this.boostPadTimer = 0;

    // Checkpoints & Laps
    this.currentCheckpoint = 0;
    this.lap = 1;
    this.totalLaps = 3;
    this.lapStartTime = 0;
    this.bestLapTime = 0;
    this.raceFinished = false;
    this.wrongWay = false;

    // Active Electronics & Equipment Telemetry
    this.absEnabled = true;
    this.tcsEnabled = true;
    this.absActive = false;
    this.tcsActive = false;
    this.brakeBias = 'balanced';
    this.aeroTrim = 'balanced';
    this.finalDrive = 'balanced';
    this.brakeHeat = 0;
    this.boostPsi = 0;
    this.lateralG = 0;

    // Collision
    this.collisionShake = 0;
    this.wallCollisionsCount = 0;
    this.hazardCooldown = 0;

    // Scratch vectors
    this._forwardDir = new THREE.Vector3();
    this._rightDir = new THREE.Vector3();
    this._lateralVel = new THREE.Vector3();
    this._upVec = new THREE.Vector3(0, 1, 0);
    this._qBase = new THREE.Quaternion();
    this._qSusp = new THREE.Quaternion();
    this._euler = new THREE.Euler();

    this.applyUpgrades(this.upgrades);
  }

  applyUpgrades(upgrades = {}) {
    this.upgrades = upgrades;
    const engineTier = UPGRADE_TIERS.engine[(upgrades.engine || 1) - 1] || UPGRADE_TIERS.engine[0];
    const turboTier = UPGRADE_TIERS.turbo[(upgrades.turbo || 1) - 1] || UPGRADE_TIERS.turbo[0];
    const gearboxTier = UPGRADE_TIERS.gearbox[(upgrades.gearbox || 1) - 1] || UPGRADE_TIERS.gearbox[0];
    const suspTier = UPGRADE_TIERS.suspension[(upgrades.suspension || 1) - 1] || UPGRADE_TIERS.suspension[0];
    const brakesTier = UPGRADE_TIERS.brakes[(upgrades.brakes || 1) - 1] || UPGRADE_TIERS.brakes[0];
    const chassisTier = UPGRADE_TIERS.chassis[(upgrades.chassis || 1) - 1] || UPGRADE_TIERS.chassis[0];
    const tireTier = UPGRADE_TIERS.tires[(upgrades.tires || 1) - 1] || UPGRADE_TIERS.tires[0];
    const nitroTier = UPGRADE_TIERS.nitro[(upgrades.nitro || 1) - 1] || UPGRADE_TIERS.nitro[0];

    this.enginePowerMult = engineTier.powerMult * (chassisTier.weightReduction || 1.0) * (gearboxTier.shiftTorqueBonus || 1.0);
    this.topSpeedBonus = engineTier.topSpeedBonus + ((gearboxTier.ratioSpread - 1) * 120);
    this.turboLaunchMult = turboTier.launchMult;
    this.suspensionHandlingMult = suspTier.handlingMult || 1.0;
    this.rollStiffnessMult = suspTier.rollStiffness || 1.0;
    this.brakePowerMult = brakesTier.brakeMult || 1.0;
    this.brakeCoolingMult = brakesTier.coolingRate || 1.0;
    this.tireDriftGrip = tireTier.driftGrip;
    this.tireGripMult = tireTier.gripMult;

    this.nitroMax = nitroTier.capacity;
    this.nitroAmount = this.nitroMax;
    this.nitroRechargeRate = nitroTier.rechargeRate;
    this.nitroBoostPower = nitroTier.boostPower;
  }

  shiftUp() {
    const order = ['R', 'N', 1, 2, 3, 4, 5, 6];
    const idx = order.indexOf(this.gear);
    if (idx >= 0 && idx < order.length - 1) {
      this.gear = order[idx + 1];
      this.isReversing = (this.gear === 'R');
      return true;
    }
    return false;
  }

  shiftDown() {
    const order = ['R', 'N', 1, 2, 3, 4, 5, 6];
    const idx = order.indexOf(this.gear);
    if (idx > 0) {
      const nextGear = order[idx - 1];
      // Prevent slamming into Reverse at high forward speed
      if (nextGear === 'R' && this.speedKmh > 24) return false;
      this.gear = nextGear;
      this.isReversing = (this.gear === 'R');
      return true;
    }
    return false;
  }

  resetToGrid(gridSlot) {
    if (gridSlot && gridSlot.position) {
      this.position.copy(gridSlot.position);
      this.rotationY = gridSlot.rotationY || 0;
      this.quaternion.setFromAxisAngle(this._upVec, this.rotationY);
    }
    this.velocity.set(0, 0, 0);
    this.speed = 0;
    this.speedKmh = 0;
    this.steeringAngle = 0;
    this.suspensionPitch = 0;
    this.suspensionRoll = 0;
    this.trackPitch = 0;
    this.gear = 1;
    this.rpm = 1100;
    this.shiftLight = false;
    this.revLimiter = false;
    this.autoShiftCooldown = 0;
    this.isReversing = false;
    this.autoReverseHoldTimer = 0;
    this._autoBaseMaxKmh = 252;
    this.isHandbrakeActive = false;
    this.launchControlCharge = 0;
    this.isLaunchReady = false;
    this.justLaunched = false;
    this.nitroAmount = this.nitroMax;
    this.isNitroActive = false;
    this.wasNitroActive = false;
    this.boostPadTimer = 0;
    this.isDrifting = false;
    this.driftScore = 0;
    this.driftCombo = 1.0;
    this.driftTime = 0;
    this.currentCheckpoint = 0;
    this.lap = 1;
    this.bestLapTime = 0;
    this.raceFinished = false;
    this.wrongWay = false;
    this.wallCollisionsCount = 0;
    this.hazardCooldown = 0;
  }

  update(dt, input = {}) {
    if (this.raceFinished) {
      input = {
        throttle: 0, brake: 0.35, steer: 0, handbrake: false, nitro: false,
        steerSensitivity: 1.0, stabilityAssist: 0.85, transmissionMode: 'auto', nitroMode: this.nitroMode, handbrakeMode: 'drift'
      };
    }

    const throttle = input ? (input.throttle || 0) : 0;
    const brake = input ? (input.brake || 0) : 0;
    const steer = input ? (input.steer || 0) : 0;
    const handbrake = input ? !!input.handbrake : false;
    const nitro = input ? !!input.nitro : false;
    const sensitivity = input ? (input.steerSensitivity || 1.0) : 1.0;
    const stabilityAssist = input && input.stabilityAssist !== undefined ? input.stabilityAssist : 0.85;
    this.transmissionMode = input?.transmissionMode || this.transmissionMode || 'auto';
    this.nitroMode = input?.nitroMode || this.nitroMode || 'twin_overboost';
    this.handbrakeMode = input?.handbrakeMode || this.handbrakeMode || 'drift';
    this.absEnabled = input?.absEnabled !== undefined ? !!input.absEnabled : this.absEnabled;
    this.tcsEnabled = input?.tcsEnabled !== undefined ? !!input.tcsEnabled : this.tcsEnabled;
    this.brakeBias = input?.brakeBias || this.brakeBias || 'balanced';
    this.aeroTrim = input?.aeroTrim || this.aeroTrim || 'balanced';
    this.finalDrive = input?.finalDrive || this.finalDrive || 'balanced';
    this.absActive = false;
    this.tcsActive = false;

    const nitroCfg = NITRO_MODES[this.nitroMode] || NITRO_MODES.twin_overboost;
    const physConfig = (this.config && this.config.physics)
      ? this.config.physics
      : { maxSpeed: 252, accelPower: 130, handling: 3.0, driftGrip: 0.92, weight: 1450 };

    const preset = this.track?.preset || {};
    const aeroGripMod = this.aeroTrim === 'high_downforce' ? 1.12 : (this.aeroTrim === 'low_drag' ? 0.94 : 1.0);
    const aeroDragMod = this.aeroTrim === 'high_downforce' ? 1.08 : (this.aeroTrim === 'low_drag' ? 0.88 : 1.0);
    const finalDriveAccelMod = this.finalDrive === 'accel' ? 1.09 : (this.finalDrive === 'top_speed' ? 0.94 : 1.0);
    const finalDriveSpeedMult = this.finalDrive === 'top_speed' ? 1.06 : (this.finalDrive === 'accel' ? 0.96 : 1.0);
    const worldGripMod = (preset.gripMult || ((this.track && this.track.weather === 'rain') ? 0.91 : 1.0)) * aeroGripMod;
    const worldDragMod = (preset.dragMult || 1.0) * aeroDragMod;

    this.justLaunched = false;

    // 1. Nitro Super State & Instant Burst Pulse
    const wantsNitro = nitro || this.boostPadTimer > 0;
    if (wantsNitro && (this.nitroAmount > 0.5 || this.boostPadTimer > 0)) {
      this.isNitroActive = true;
      if (!this.wasNitroActive && this.nitroAmount > 16 && this.speed > 5) {
        // Initial Super Nitro shockwave kick
        this.velocity.addScaledVector(this._forwardDir, nitroCfg.launchBurst);
      }
      if (this.boostPadTimer > 0) {
        this.boostPadTimer -= dt;
      } else {
        this.nitroAmount = Math.max(0, this.nitroAmount - dt * nitroCfg.drainRate);
      }
    } else {
      this.isNitroActive = false;
      const effectiveRecharge = Math.max(this.nitroRechargeRate, nitroCfg.rechargeRate);
      this.nitroAmount = Math.min(this.nitroMax, this.nitroAmount + dt * effectiveRecharge);
    }
    this.wasNitroActive = this.isNitroActive;

    // 2. Basis Vectors
    this._forwardDir.set(0, 0, 1).applyQuaternion(this.quaternion);
    this._forwardDir.y = 0;
    if (this._forwardDir.lengthSq() > 0.0001) this._forwardDir.normalize();
    else this._forwardDir.set(0, 0, 1);
    this._rightDir.set(-this._forwardDir.z, 0, this._forwardDir.x).normalize();

    const forwardSpeed = this.velocity.dot(this._forwardDir);
    const lateralSpeed = this.velocity.dot(this._rightDir);
    const absSpeed = Math.abs(forwardSpeed);

    // 3. Top Speed & Gear Ratio Calculations (399 km/h hypercar ceiling)
    const baseCarMaxKmh = (physConfig.maxSpeed + this.topSpeedBonus) * finalDriveSpeedMult;
    this._autoBaseMaxKmh = baseCarMaxKmh;
    let effectiveMaxSpeedKmh = baseCarMaxKmh;
    if (this.isNitroActive) effectiveMaxSpeedKmh += nitroCfg.topSpeedBonus;
    effectiveMaxSpeedKmh = Math.min(399, effectiveMaxSpeedKmh);
    const maxSpeedMs = effectiveMaxSpeedKmh / 3.6;

    const gearSpec = GEAR_SPEC[this.gear] || GEAR_SPEC[1];
    const gearMaxMs = (this.gear === 'N')
      ? 0
      : (this.gear === 'R')
        ? (62 / 3.6)
        : (baseCarMaxKmh / 3.6) * gearSpec.maxFrac + (this.isNitroActive ? (nitroCfg.topSpeedBonus / 3.6) : 0);

    let accelForce = (physConfig.accelPower * 0.42) * this.enginePowerMult * this.turboLaunchMult * finalDriveAccelMod * (gearSpec.torqueMult || 1.0);
    if (this.isNitroActive) accelForce *= Math.max(this.nitroBoostPower, nitroCfg.powerMult);

    // Traction Control (TCS) intervention if tires slip excessively at corner exit or in rain
    if (this.tcsEnabled && throttle > 0.65 && !handbrake && (Math.abs(lateralSpeed) > 4.2 || (worldGripMod < 0.95 && absSpeed < 22))) {
      accelForce *= 0.84;
      this.tcsActive = true;
    }

    // 4. Handbrake Parking Hold & Launch Control (Stationary / Low Speed)
    this.isHandbrakeActive = handbrake;
    const isLowSpeedHold = handbrake && (this.speedKmh < 16);

    if (isLowSpeedHold) {
      // Firm rear brake hold
      this.velocity.multiplyScalar(Math.exp(-12 * dt));
      if (throttle > 0.4 && this.gear !== 'N' && this.gear !== 'R') {
        this.launchControlCharge = Math.min(1.0, this.launchControlCharge + dt * 1.45);
        this.isLaunchReady = this.launchControlCharge >= 0.7;
      } else {
        this.launchControlCharge = Math.max(0, this.launchControlCharge - dt * 2.5);
        this.isLaunchReady = false;
      }
    } else if (this.isLaunchReady && !handbrake && throttle > 0.3 && this.gear !== 'N' && this.gear !== 'R') {
      // Launch Control Boost Release!
      this.velocity.addScaledVector(this._forwardDir, 13.5);
      this.launchControlCharge = 0;
      this.isLaunchReady = false;
      this.justLaunched = true;
    } else if (!handbrake) {
      this.launchControlCharge = Math.max(0, this.launchControlCharge - dt * 3);
      this.isLaunchReady = false;
    }

    // 5. Longitudinal Throttle, Braking & Gear Limiter
    let longitudinalAccel = 0;

    // Automatic transmission: pressing Forward (W/Up) ALWAYS overrides Reverse/Neutral immediately!
    if (this.transmissionMode === 'auto' && throttle > 0.05 && (this.gear === 'R' || this.gear === 'N' || this.isReversing)) {
      this.gear = 1;
      this.isReversing = false;
      this.autoReverseHoldTimer = 0;
    }

    // Track brief stop-hold before Auto drops from braking into Reverse, preventing reverse snaps during forward stops/slides
    const isStoppedEnoughForRev = (forwardSpeed <= 0.35 && absSpeed <= 1.2);
    if (this.transmissionMode === 'auto' && throttle <= 0.05 && brake > 0.05) {
      if (this.gear === 'R' || this.isReversing) {
        this.autoReverseHoldTimer = 0.15;
      } else if (isStoppedEnoughForRev) {
        this.autoReverseHoldTimer = Math.min(0.3, (this.autoReverseHoldTimer || 0) + dt);
      } else {
        this.autoReverseHoldTimer = 0;
      }
    } else {
      this.autoReverseHoldTimer = 0;
    }

    const wantsAutoReverse = (
      this.transmissionMode === 'auto' &&
      throttle <= 0.05 &&
      brake > 0.05 &&
      (this.gear === 'R' || (isStoppedEnoughForRev && this.autoReverseHoldTimer >= 0.08))
    );
    const isBrakingWhileMovingForward = (brake > 0.05 && forwardSpeed > 0.35 && this.gear !== 'N' && this.gear !== 'R');
    const inReverseState = (!isLowSpeedHold && (this.gear === 'R' || wantsAutoReverse));

    if (!isLowSpeedHold) {
      if (this.gear === 'N') {
        this.isReversing = false;
        this.velocity.multiplyScalar(Math.exp(-0.45 * dt));
        if (brake > 0 && absSpeed > 0.15) {
          this.velocity.addScaledVector(this._forwardDir, -Math.sign(forwardSpeed) * Math.min(absSpeed / dt, brake * 56) * dt);
          longitudinalAccel = -Math.sign(forwardSpeed) * brake * 56;
        }
      } else if (isBrakingWhileMovingForward) {
        // Hydraulic brake ALWAYS wins over overlapping throttle when moving forward
        this.isReversing = false;
        const biasMod = this.brakeBias === 'front' ? 1.06 : (this.brakeBias === 'rear' ? 0.96 : 1.0);
        let brakeForce = 84 * (this.brakePowerMult || 1.0) * biasMod;
        if (this.absEnabled && brake > 0.65 && forwardSpeed > 8) {
          this.absActive = true;
          // Subtle ABS pulse maximizes threshold stopping while keeping front steering grip
          brakeForce *= (0.94 + Math.sin(performance.now() * 0.08) * 0.06);
        }
        const decel = Math.min(forwardSpeed, brake * brakeForce * dt);
        this.velocity.addScaledVector(this._forwardDir, -decel);
        if (!handbrake) {
          const latSpeed = this.velocity.dot(this._rightDir);
          if (Math.abs(latSpeed) > 0.08) {
            const latCut = Math.min(Math.abs(latSpeed), brake * 22 * dt);
            this.velocity.addScaledVector(this._rightDir, -Math.sign(latSpeed) * latCut);
          }
        }
        longitudinalAccel = -brakeForce;
      } else if (inReverseState) {
        this.isReversing = true;
        if (this.transmissionMode === 'auto') {
          this.gear = 'R';
          const revMaxMs = 72 / 3.6;
          if (brake > 0.05) {
            if (forwardSpeed > -revMaxMs) {
              const revThrust = forwardSpeed > 0.1 ? 52 : 34;
              this.velocity.addScaledVector(this._forwardDir, -brake * revThrust * dt);
              longitudinalAccel = -revThrust;
            }
          } else {
            this.velocity.multiplyScalar(Math.exp(-1.15 * dt));
            if (throttle <= 0.05 && Math.abs(forwardSpeed) <= 0.45) {
              this.isReversing = false;
              this.gear = 1;
            }
          }
        } else {
          // Manual mode in gear 'R': Throttle pushes backward, Brake stops toward 0
          const revMaxMs = gearMaxMs || (72 / 3.6);
          if (brake > 0.05 && forwardSpeed < -0.05) {
            const stopStep = Math.min(Math.abs(forwardSpeed), brake * 62 * dt);
            this.velocity.addScaledVector(this._forwardDir, stopStep);
            longitudinalAccel = 62;
          } else if (throttle > 0.05 && forwardSpeed > -revMaxMs) {
            const revPull = 32 * (0.75 + 0.25 * (1 - Math.min(1, Math.abs(forwardSpeed) / revMaxMs)));
            this.velocity.addScaledVector(this._forwardDir, -throttle * revPull * dt);
            longitudinalAccel = -revPull;
          } else if (throttle <= 0.05 && brake <= 0.05) {
            this.velocity.multiplyScalar(Math.exp(-0.65 * dt));
          }
        }
      } else if (throttle > 0.05 && brake <= 0.05) {
        this.isReversing = false;
        if (forwardSpeed < -0.2) {
          // Fast clean arrest of leftover backward momentum when switching from Reverse -> Forward
          const cancelAccel = 78 * (0.65 + throttle * 0.6);
          const cancelStep = Math.min(Math.abs(forwardSpeed) + 0.5, cancelAccel * dt);
          this.velocity.addScaledVector(this._forwardDir, cancelStep);
          longitudinalAccel = cancelAccel;
        } else if (forwardSpeed < Math.min(gearMaxMs, maxSpeedMs * 1.005)) {
          const posFwd = Math.max(0, forwardSpeed);
          const gearRatio = Math.max(0, posFwd / Math.max(1, gearMaxMs));
          const ceilRatio = Math.max(0, posFwd / Math.max(1, maxSpeedMs));
          const gearTorque = Math.max(0.32, 1.0 - 0.68 * Math.pow(Math.min(1, gearRatio), 1.85));
          const ceilingTaper = ceilRatio > 0.90 ? Math.max(0.18, 1.0 - (ceilRatio - 0.90) * 6.5) : 1.0;
          const force = throttle * accelForce * gearTorque * ceilingTaper;
          this.velocity.addScaledVector(this._forwardDir, force * dt);
          longitudinalAccel = force;
        } else if (this.transmissionMode === 'manual') {
          // Manual gear rev-limiter + subtle downshift engine braking
          const overspeed = forwardSpeed - gearMaxMs;
          this.velocity.addScaledVector(this._forwardDir, -Math.min(18, overspeed * 4.5) * dt);
          longitudinalAccel = -6;
        }
      } else if (brake > 0.05) {
        this.isReversing = false;
        if (forwardSpeed < -0.1) {
          // Braking while coasting backward in gear 1..6 (Manual) or overlapping W+S while reversing
          const stopStep = Math.min(-forwardSpeed, brake * 62 * dt);
          this.velocity.addScaledVector(this._forwardDir, stopStep);
          longitudinalAccel = 62;
        } else {
          // Overlapping W+S at standstill (forwardSpeed <= 0.35): hold stopped cleanly
          this.velocity.multiplyScalar(Math.exp(-8.0 * dt));
        }
      } else {
        this.velocity.multiplyScalar(Math.exp(-0.55 * dt));
        if (this.transmissionMode === 'auto' && Math.abs(forwardSpeed) < 0.75) {
          this.isReversing = false;
          if (this.gear === 'R') this.gear = 1;
        }
      }
    }

    // Aerodynamic Drag & Crisp Electronic Speed Limiter (strict 399 km/h ceiling)
    const speedSq = this.velocity.lengthSq();
    if (speedSq > 0.01) {
      const currSpeed = Math.sqrt(speedSq);
      const dragAccel = speedSq * 0.00062 * worldDragMod;
      const afterDrag = Math.max(0, currSpeed - dragAccel * dt);
      const hardCapMs = Math.min(maxSpeedMs, 399 / 3.6);
      const governedSpeed = Math.min(afterDrag, hardCapMs);
      this.velocity.multiplyScalar(governedSpeed / currSpeed);
    }

    // 6. Steering Mode, Handbrake Drift, Brake Bias & Stability Assist
    const handlingFactor = ((physConfig.handling || 3.0) / 2.9) * (this.suspensionHandlingMult || 1.0);
    const absSteerPenalty = (!this.absEnabled && brake > 0.7 && forwardSpeed > 12) ? 0.55 : 1.0;
    const trailBiasMult = (brake > 0.35 && this.brakeBias === 'rear') ? 1.18 : 1.0;
    const maxWheelAngle = 0.48 / (1 + absSpeed * 0.012);
    const targetWheelSteer = -steer * maxWheelAngle;
    this.steeringAngle = THREE.MathUtils.lerp(this.steeringAngle, targetWheelSteer, 1 - Math.exp(-15 * dt));

    const lowSpeedScale = Math.min(1.0, absSpeed / 3.8);
    const baseMaxYaw = (2.15 / (1 + absSpeed * 0.0068)) * handlingFactor * (0.72 + 0.28 * sensitivity) * absSteerPenalty * trailBiasMult;
    const dirSign = forwardSpeed >= -0.2 ? 1 : -1;
    let yawRate = -steer * baseMaxYaw * lowSpeedScale * dirSign;

    const handbrakeDriftEligible = handbrake && absSpeed > 9 && Math.abs(steer) > 0.1;
    const tcsSlipThreshold = this.tcsEnabled ? 0.45 : 0.75;
    const naturalHardOversteer = (stabilityAssist < tcsSlipThreshold) && Math.abs(steer) > 0.88 && absSpeed > 36 && Math.abs(lateralSpeed) > 6.0;
    this.isDrifting = handbrakeDriftEligible || naturalHardOversteer;

    if (this.isDrifting) {
      const hbYawMult = this.handbrakeMode === 'lock' ? 1.42 : (this.handbrakeMode === 'sharp' ? 1.18 : 1.28);
      const hbLatDecayRate = this.handbrakeMode === 'lock' ? 2.1 : (this.handbrakeMode === 'sharp' ? 5.2 : 3.2);
      yawRate *= handbrake ? hbYawMult : 1.15;

      const driftDecay = 1 - Math.exp(-hbLatDecayRate * dt);
      this._lateralVel.copy(this._rightDir).multiplyScalar(lateralSpeed);
      this.velocity.addScaledVector(this._lateralVel, -driftDecay);

      if (throttle > 0.2 && forwardSpeed < maxSpeedMs * 0.94) {
        this.velocity.addScaledVector(this._forwardDir, 5.2 * dt);
      }

      this.nitroAmount = Math.min(this.nitroMax, this.nitroAmount + dt * (this.nitroRechargeRate * 3.4));
      this.driftTime += dt;
      this.driftScore += Math.floor((Math.abs(lateralSpeed) + absSpeed * 0.24) * dt * 98 * this.driftCombo);
      this.driftCombo = Math.min(5.0, 1.0 + this.driftTime * 0.55);
    } else {
      // Stability Assist + High-Speed Aero Downforce scales lateral cornering grip up to 549 km/h
      const downforceGripBonus = 1.0 + Math.min(0.65, absSpeed * 0.0042);
      const gripStrength = (7.2 + stabilityAssist * 5.8) * worldGripMod * downforceGripBonus * this.tireGripMult * this.tireDriftGrip;
      const gripDecay = 1 - Math.exp(-gripStrength * dt);
      this._lateralVel.copy(this._rightDir).multiplyScalar(lateralSpeed);
      this.velocity.addScaledVector(this._lateralVel, -gripDecay);

      if (this.driftTime > 0) {
        this.driftTime = Math.max(0, this.driftTime - dt * 2.5);
        if (this.driftTime === 0) this.driftCombo = 1.0;
      }
    }

    this.rotationY += yawRate * dt;
    this.slipAngle = Math.atan2(lateralSpeed, absSpeed + 0.5);

    // 7. Position & Wheel Roll
    this.position.addScaledVector(this.velocity, dt);
    this.speed = this.velocity.length();
    this.speedKmh = Math.round(this.speed * 3.6);
    if (!isLowSpeedHold) {
      this.wheelRotation += (forwardSpeed / 0.38) * dt;
    }

    // 8. Transmission RPM & Auto-Shifting
    this.calculateTransmission(dt, forwardSpeed, baseCarMaxKmh, throttle, isLowSpeedHold);

    // 9. Chassis Weight Transfer, Brake Rotor Thermal & Boost Telemetry
    const rollDiv = Math.max(0.8, this.rollStiffnessMult || 1.0);
    const targetPitch = THREE.MathUtils.clamp(-longitudinalAccel * 0.0007 / rollDiv, -0.045, 0.035);
    const targetRoll = THREE.MathUtils.clamp((-lateralSpeed * 0.0045 - steer * (absSpeed * 0.0005)) / rollDiv, -0.065, 0.065);
    const suspLerp = 1 - Math.exp(-10 * dt);
    this.suspensionPitch = THREE.MathUtils.lerp(this.suspensionPitch, targetPitch, suspLerp);
    this.suspensionRoll = THREE.MathUtils.lerp(this.suspensionRoll, targetRoll, suspLerp);

    const isHeatingBrakes = (brake > 0.3 && absSpeed > 6) || (handbrake && absSpeed > 8);
    if (isHeatingBrakes) {
      this.brakeHeat = Math.min(1.0, this.brakeHeat + dt * 0.9 * (absSpeed / 35));
    } else {
      const coolRate = (0.35 + absSpeed * 0.025) * (this.brakeCoolingMult || 1.0);
      this.brakeHeat = Math.max(0, this.brakeHeat - dt * coolRate);
    }

    const targetBoostPsi = Math.min(28, (throttle * 14 * (this.turboLaunchMult || 1.0)) + (this.isNitroActive ? 12 : 0));
    this.boostPsi = THREE.MathUtils.lerp(this.boostPsi, targetBoostPsi, 1 - Math.exp(-8 * dt));
    this.lateralG = THREE.MathUtils.lerp(this.lateralG, Math.min(3.5, Math.abs(yawRate * absSpeed) / 9.81), 1 - Math.exp(-10 * dt));

    // 10. Track Elevation, Barriers, Moving Obstacles & Checkpoints
    this.snapToTrack(dt);
    if (this.hazardCooldown > 0) this.hazardCooldown = Math.max(0, this.hazardCooldown - dt);
    this.checkBarrierCollisions();
    this.checkObstacleCollisions();
    this.checkBoostPads();
    this.checkCheckpoints();

    if (this.collisionShake > 0) {
      this.collisionShake = Math.max(0, this.collisionShake - dt * 3.5);
    }
  }

  calculateTransmission(dt, forwardSpeed, baseCarMaxKmh, throttle, isLowSpeedHold) {
    if (this.autoShiftCooldown > 0) {
      this.autoShiftCooldown = Math.max(0, this.autoShiftCooldown - dt);
    }

    // Free revving in Neutral or Launch Control hold
    if (this.gear === 'N' || isLowSpeedHold) {
      const targetRpm = isLowSpeedHold
        ? (1100 + this.launchControlCharge * 5700)
        : (throttle > 0.1 ? 6800 + Math.sin(performance.now() * 0.04) * 350 : 1100);
      this.rpm = THREE.MathUtils.lerp(this.rpm, targetRpm, 1 - Math.exp(-12 * dt));
      this.shiftLight = this.rpm > 7500;
      this.revLimiter = false;
      return;
    }

    if (this.isReversing || this.gear === 'R') {
      if (this.transmissionMode === 'auto' && (throttle > 0.05 || forwardSpeed > 0.35 || !this.isReversing)) {
        this.gear = 1;
        this.isReversing = false;
      } else {
        this.gear = 'R';
        this.rpm = 1200 + Math.min(4600, Math.abs(forwardSpeed) * 280);
        this.shiftLight = false;
        this.revLimiter = false;
        return;
      }
    }

    const speedKmh = Math.max(0, forwardSpeed * 3.6);
    const spec = GEAR_SPEC[this.gear] || GEAR_SPEC[1];
    const minKmh = baseCarMaxKmh * spec.minFrac;
    const maxKmh = baseCarMaxKmh * spec.maxFrac;

    const rawRatio = (speedKmh - minKmh) / Math.max(10, maxKmh - minKmh);
    const clampedRatio = Math.max(0, Math.min(1.06, rawRatio));
    const idleRpm = throttle > 0.1 ? 2100 : 1100;
    let targetRpm = idleRpm + clampedRatio * (this.maxRpm - idleRpm);

    // Subtle rev-limiter bounce at redline in Manual mode
    if (targetRpm >= this.maxRpm - 120) {
      this.revLimiter = true;
      targetRpm = this.maxRpm - 180 + Math.sin(performance.now() * 0.06) * 160;
    } else {
      this.revLimiter = false;
    }

    this.rpm = THREE.MathUtils.lerp(this.rpm, targetRpm, 1 - Math.exp(-16 * dt));
    this.shiftLight = this.rpm >= 7550;

    // Automatic Transmission Shifting (decisive upshift under throttle + fast multi-gear kickdown)
    if (this.transmissionMode === 'auto' && this.autoShiftCooldown <= 0) {
      if (typeof this.gear === 'number') {
        if (this.gear < 6 && ((throttle > 0.15 && (this.rpm > 7450 || speedKmh > maxKmh * 0.89)) || speedKmh > maxKmh * 0.94)) {
          this.gear++;
          this.autoShiftCooldown = 0.18;
        } else if (this.gear > 1 && speedKmh < minKmh * 0.92) {
          const baseMaxKmh = this._autoBaseMaxKmh || 252;
          let targetGear = this.gear - 1;
          while (targetGear > 1 && speedKmh < (baseMaxKmh * (GEAR_SPEC[targetGear]?.minFrac || 0) * 0.92)) {
            targetGear--;
          }
          this.gear = targetGear;
          this.autoShiftCooldown = 0.06;
        }
      }
    }
  }

  snapToTrack(dt) {
    if (!this.track) return;
    const trackInfo = this.track.getClosestPoint(this.position);
    const sp = trackInfo.sample;

    const targetY = sp.position.y + 0.035;
    const gravityScale = (this.track.preset?.gravity || 9.8) / 9.8;
    const yLerp = 1 - Math.exp(-(14 + 6 * gravityScale) * dt);
    this.position.y = THREE.MathUtils.lerp(this.position.y, targetY, yLerp);

    const slopePitch = -Math.asin(THREE.MathUtils.clamp(sp.tangent.y, -0.35, 0.35));
    this.trackPitch = THREE.MathUtils.lerp(this.trackPitch, slopePitch, 1 - Math.exp(-10 * dt));

    this._qBase.setFromAxisAngle(this._upVec, this.rotationY);
    this._euler.set(this.trackPitch + this.suspensionPitch, 0, this.suspensionRoll);
    this._qSusp.setFromEuler(this._euler);
    this.quaternion.copy(this._qBase).multiply(this._qSusp);
  }

  checkBarrierCollisions() {
    if (!this.track) return;
    const trackInfo = this.track.getClosestPoint(this.position);
    const halfTrackWidth = this.track.trackWidth / 2 - 1.25;

    if (trackInfo.distance > halfTrackWidth) {
      const sp = trackInfo.sample;
      const sign = trackInfo.lateralOffset >= 0 ? 1 : -1;

      this.position.x = sp.position.x + sp.normal.x * sign * halfTrackWidth;
      this.position.z = sp.position.z + sp.normal.z * sign * halfTrackWidth;

      const inwardX = -sp.normal.x * sign;
      const inwardZ = -sp.normal.z * sign;
      const velInward = this.velocity.x * inwardX + this.velocity.z * inwardZ;

      if (velInward < 0) {
        const impactStrength = Math.abs(velInward);
        const restitution = impactStrength > 8 ? 0.25 : 0.05;
        this.velocity.x -= (1 + restitution) * velInward * inwardX;
        this.velocity.z -= (1 + restitution) * velInward * inwardZ;

        if (impactStrength > 6.5) {
          this.velocity.multiplyScalar(0.86);
          this.collisionShake = Math.min(1.0, impactStrength / 18);
          this.wallCollisionsCount++;
        } else {
          this.velocity.multiplyScalar(0.992);
        }

        const tangentYaw = Math.atan2(sp.tangent.x, sp.tangent.z);
        let yawDiff = tangentYaw - this.rotationY;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        if (Math.abs(yawDiff) < Math.PI * 0.65) {
          this.rotationY += yawDiff * 0.14;
        }
      }
    }
  }

  checkObstacleCollisions() {
    if (!this.track || !this.track.movingObstacles || !this.track.movingObstacles.length) return;
    if (this.hazardCooldown > 0) return;

    for (let i = 0; i < this.track.movingObstacles.length; i++) {
      const obs = this.track.movingObstacles[i];
      if (!obs.worldPos) continue;
      const dx = this.position.x - obs.worldPos.x;
      const dz = this.position.z - obs.worldPos.z;
      const distSq = dx * dx + dz * dz;
      if (distSq < 7.8) {
        this.hazardCooldown = 0.75;
        this.velocity.multiplyScalar(0.55);
        const pushLen = Math.sqrt(distSq) || 1;
        this.position.x += (dx / pushLen) * 1.4;
        this.position.z += (dz / pushLen) * 1.4;
        this.collisionShake = 0.9;
        this.wallCollisionsCount++;
        break;
      }
    }
  }

  checkBoostPads() {
    if (!this.track) return;
    for (let i = 0; i < this.track.boostPads.length; i++) {
      const pad = this.track.boostPads[i];
      const dist = this.position.distanceTo(pad.position);
      if (dist < pad.radius && this.boostPadTimer <= 0.2) {
        this.boostPadTimer = 2.2;
        this.isNitroActive = true;
      }
    }
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

        if (lapTime > 4) {
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
    const dot = this._forwardDir.dot(sp.tangent);
    const forwardSpeed = this.velocity.dot(this._forwardDir);
    this.wrongWay = dot < -0.35 && forwardSpeed > 6;
  }
}
