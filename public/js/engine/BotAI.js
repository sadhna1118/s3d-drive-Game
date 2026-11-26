/**
 * Velocity Rush: Neon Rebellion - Adaptive AI Rival & Nemesis System
 * Named Rivals with upright spline orientation, counter-nitro, drift blocking,
 * soft car-to-car collision, and in-game banter.
 */
import { Car } from './Car.js';

export const RIVAL_PROFILES = [
  {
    id: 'vortex',
    name: 'VORTEX',
    title: 'The Enforcer',
    personality: 'Aggressive / Rammer',
    carIndex: 1,
    color: '#ffaa00',
    dialogues: {
      overtake: 'You think you can pass me?!',
      drift: 'Watch my line, rookie!',
      nitro: 'Taste my plasma afterburners!',
      crash: 'Get off my track!'
    }
  },
  {
    id: 'shadow',
    name: 'SHADOW',
    title: 'Drift Outlaw',
    personality: 'Apex Blocker / Touge King',
    carIndex: 4,
    color: '#ff3300',
    dialogues: {
      overtake: 'Nice try, but you cant hold my apex!',
      drift: 'Drifting against me? Amateur.',
      nitro: 'Speed is nothing without control!',
      crash: 'Keep your distance.'
    }
  },
  {
    id: 'titan',
    name: 'TITAN',
    title: 'Warp Specialist',
    personality: 'Nitro Powerhouse',
    carIndex: 2,
    color: '#0088ff',
    dialogues: {
      overtake: 'Nobody passes Titan on the straight!',
      drift: 'Hold on tight!',
      nitro: 'Engaging maximum NOS overdrive!',
      crash: 'You barely scratched my armor.'
    }
  },
  {
    id: 'apex',
    name: 'APEX OVERLORD',
    title: 'The AI Syndicate Boss',
    personality: 'Final Boss / EMP Master',
    carIndex: 0,
    color: '#ff0022',
    isBoss: true,
    dialogues: {
      overtake: 'Rebel scum... I will crush you.',
      drift: 'Your maneuvers are futile.',
      nitro: 'Activating EMP Shockwave Protocol!',
      crash: 'Systems nominal. You will be erased.'
    }
  }
];

export class BotRacer {
  constructor(scene, track, gridSlotIndex, rivalProfile, onBanterCallback = null, onCrashCallback = null) {
    this.track = track;
    this.rival = rivalProfile || RIVAL_PROFILES[gridSlotIndex % RIVAL_PROFILES.length];
    this.gridSlotIndex = gridSlotIndex;
    this.onBanter = onBanterCallback;
    this.onCrash = onCrashCallback;

    this.car = new Car(
      scene,
      track,
      this.rival.carIndex,
      this.rival.color,
      false,
      this.rival.name
    );

    this.u = 0;
    this.speed = 0;
    this.basePace = 58 + (gridSlotIndex % 3) * 4.5 + (this.rival.isBoss ? 8 : 0);
    this.lateralOffset = (Math.random() - 0.5) * 6;
    this.nitroCooldown = 4 + Math.random() * 5;
    this.isNitro = false;

    // Boss EMP Ability
    this.empTimer = 0;
    this.empActiveTimer = 0;
    this.empActive = false;

    // Dialogue cooldown
    this.lastBanterTime = 0;

    // Full Cinematic Crash State
    this.isCrashing = false;
    this.crashTimer = 0;
    this.crashHitCooldown = 0;
    this.crashPos = new THREE.Vector3();
    this.crashVel = new THREE.Vector3();
    this.crashYaw = 0;
    this.crashSpinRate = 0;
    this.crashPitch = 0;
    this.crashPitchRate = 0;
    this.crashRoll = 0;
    this.crashRollRate = 0;
    this.crashSmokeTimer = 0;
    this.crashSparkTimer = 0;
    this.crashBounceCount = 0;

    // Scratch math objects
    this._up = new THREE.Vector3(0, 1, 0);
    this._lookMat = new THREE.Matrix4();
    this._targetQuat = new THREE.Quaternion();
    this._crashEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    this._crashFwd = new THREE.Vector3();
    this._crashTmp = new THREE.Vector3();
    this._toOther = new THREE.Vector3();

    const slot = this.track.gridSlots[gridSlotIndex];
    if (slot) {
      this.car.mesh.position.copy(slot.position);
      this.car.mesh.rotation.y = slot.rotationY;
      this.car.targetTransform.position.copy(slot.position);
      this.car.targetTransform.quaternion.copy(this.car.mesh.quaternion);
      const sp = this.track.getClosestPoint(slot.position).sample;
      this.u = sp.u;
    }
  }

  triggerBanter(type) {
    const now = performance.now();
    if (now - this.lastBanterTime > 8000 && this.rival.dialogues[type]) {
      this.lastBanterTime = now;
      if (this.onBanter) {
        this.onBanter(this.rival.name, this.rival.color, this.rival.dialogues[type]);
      }
    }
  }

  /**
   * Launches this AI car into a cinematic spin, airborne tumble, and wreckage slide.
   */
  triggerCrash(impulseDir, impactSpeed = 24, airborneBoost = 1.0, notifyCallback = true) {
    const dir = this._crashTmp.copy(impulseDir || this._up);
    dir.y = 0;
    if (dir.lengthSq() < 0.0001) {
      this._crashFwd.set(0, 0, 1).applyQuaternion(this.car.mesh.quaternion);
      dir.copy(this._crashFwd);
      dir.y = 0;
    }
    dir.normalize();

    const tangent = this.track.curve.getTangentAt(this.u).normalize();
    this.crashPos.copy(this.car.mesh.position);
    this._crashEuler.setFromQuaternion(this.car.mesh.quaternion, 'YXZ');
    this.crashYaw = this._crashEuler.y;
    this.crashPitch = 0;
    this.crashRoll = 0;

    // Preserve forward carry + violent directional slam impulse
    const horizKick = Math.max(12, Math.min(54, impactSpeed * 0.92));
    this.crashVel.copy(tangent).multiplyScalar(Math.max(8, this.speed * 0.55));
    this.crashVel.addScaledVector(dir, horizKick);

    const launchY = (impactSpeed >= 17 || airborneBoost > 0.7)
      ? Math.min(8.6, 2.1 + (impactSpeed / 11.5) * 1.45 * airborneBoost)
      : Math.min(3.2, 1.4 + impactSpeed * 0.08);
    this.crashVel.y = launchY;

    // Torque sign from car forward cross impact vector for physically grounded spinout
    this._crashFwd.set(0, 0, 1).applyQuaternion(this.car.mesh.quaternion);
    const crossY = this._crashFwd.x * dir.z - this._crashFwd.z * dir.x;
    const spinSign = Math.abs(crossY) > 0.08 ? Math.sign(crossY) : (Math.random() < 0.5 ? -1 : 1);

    this.crashSpinRate = spinSign * (4.6 + Math.min(9.5, impactSpeed * 0.25));
    const heavyFlip = impactSpeed >= 15.5;
    this.crashRollRate = heavyFlip
      ? spinSign * (2.6 + Math.min(8.5, (impactSpeed - 12) * 0.26))
      : spinSign * 0.9;
    this.crashPitchRate = (Math.random() - 0.28) * Math.min(5.2, impactSpeed * 0.14);

    this.isCrashing = true;
    this.crashTimer = Math.min(2.55, 1.45 + impactSpeed * 0.024);
    this.crashHitCooldown = 0.55;
    this.crashSmokeTimer = 0;
    this.crashSparkTimer = 0;
    this.crashBounceCount = 0;
    this.isNitro = false;
    this.speed = Math.max(12, this.crashVel.length() * 0.65);

    this.triggerBanter('crash');

    if (notifyCallback && this.onCrash) {
      const intensity = Math.min(1.25, 0.52 + impactSpeed / 40);
      this.onCrash(this.crashPos.clone(), dir.clone(), intensity, impactSpeed >= 19);
    }
  }

  _updateCrashing(dt, playerCar, allBots, particles) {
    const halfSafeWidth = Math.max(4, this.track.trackWidth / 2 - 2.2);
    this.crashTimer -= dt;
    this.crashSmokeTimer -= dt;
    this.crashSparkTimer -= dt;

    // Gravity + spatial integration
    this.crashVel.y -= 22.5 * dt;
    this.crashPos.addScaledVector(this.crashVel, dt);

    const closest = this.track.getClosestPoint(this.crashPos);
    const groundY = (closest?.sample?.position?.y ?? 0) + 0.04;
    let isOnGround = false;

    if (this.crashPos.y <= groundY) {
      this.crashPos.y = groundY;
      isOnGround = true;

      if (this.crashVel.y < -2.6) {
        this.crashVel.y = -this.crashVel.y * 0.36;
        this.crashBounceCount++;
        this.crashRollRate *= 0.68;
        this.crashPitchRate *= 0.65;
        if (this.crashBounceCount <= 3) {
          particles?.emitCrashExplosion?.(this.crashPos, this.crashVel, 0.72);
          if (this.onCrash) {
            this.onCrash(this.crashPos.clone(), this.crashVel.clone().normalize(), 0.52, false);
          }
        }
      } else {
        this.crashVel.y = 0;
        const groundDrag = Math.exp(-2.15 * dt);
        this.crashVel.x *= groundDrag;
        this.crashVel.z *= groundDrag;
        // Settle roll & pitch as chassis scrapes back onto wheels
        this.crashPitch *= Math.exp(-4.5 * dt);
        this.crashRoll *= Math.exp(-3.8 * dt);
      }
    }

    // Trackside barrier slam rebound during crash
    const barrierHalfW = Math.max(5, (this.track.trackWidth || 16) * 0.5 - 1.35);
    if (closest && Math.abs(closest.lateralOffset) > barrierHalfW) {
      const sign = Math.sign(closest.lateralOffset);
      const overshoot = Math.abs(closest.lateralOffset) - barrierHalfW;
      this.crashPos.addScaledVector(closest.sample.normal, -sign * overshoot);
      const vn = this.crashVel.dot(closest.sample.normal);
      if (vn * sign > 0) {
        this.crashVel.addScaledVector(closest.sample.normal, -1.58 * vn);
        this.crashSpinRate = -this.crashSpinRate * 0.78;
        particles?.emitCrashExplosion?.(this.crashPos, closest.sample.normal, 0.85);
        if (this.onCrash) {
          this.onCrash(this.crashPos.clone(), closest.sample.normal.clone(), 0.68, false);
        }
      }
    }

    const horizSpeed = Math.hypot(this.crashVel.x, this.crashVel.z);

    // Continuous smoke & scraping spark trail
    if (particles && this.crashSmokeTimer <= 0) {
      this.crashSmokeTimer = 0.055;
      particles.emitSmoke?.(this.crashPos, 0.9);
      if (isOnGround && horizSpeed > 5.5 && this.crashSparkTimer <= 0) {
        this.crashSparkTimer = 0.065;
        particles.emitSparks?.(this.crashPos, 9);
      }
    }

    // Chain-reaction pileup if crashing wreckage slams other bots
    if (Array.isArray(allBots) && horizSpeed > 7.5) {
      for (const other of allBots) {
        if (!other || other === this || other.isCrashing || other.crashHitCooldown > 0) continue;
        const dist = this.crashPos.distanceTo(other.car.mesh.position);
        if (dist < 3.2) {
          this._toOther.subVectors(other.car.mesh.position, this.crashPos);
          this._toOther.y = 0;
          if (this._toOther.lengthSq() < 0.0001) this._toOther.set(1, 0, 0);
          else this._toOther.normalize();

          other.triggerCrash(this._toOther, Math.max(16, horizSpeed * 0.9), 0.9, true);
          this.crashVel.multiplyScalar(0.75);
        }
      }
    }

    // Secondary impact feedback if player drives into spinning wreckage
    if (playerCar && this.crashHitCooldown <= 0) {
      const distPlayer = this.crashPos.distanceTo(playerCar.physics.position);
      if (distPlayer < 3.1) {
        this._toOther.subVectors(playerCar.physics.position, this.crashPos);
        this._toOther.y = 0;
        if (this._toOther.lengthSq() > 0.0001) {
          this._toOther.normalize();
          playerCar.physics.position.addScaledVector(this._toOther, (3.1 - distPlayer) * 0.55);
          playerCar.physics.velocity.addScaledVector(this._toOther, 6.5);
          playerCar.physics.collisionShake = Math.max(playerCar.physics.collisionShake || 0, 0.58);
          this.crashHitCooldown = 0.45;
          particles?.emitSparks?.(this.crashPos, 12);
        }
      }
    }

    // Smoothly calm angular velocities toward recovery near end of crash
    const angularDrag = this.crashTimer < 0.55 ? Math.exp(-5.0 * dt) : Math.exp(-1.1 * dt);
    this.crashSpinRate *= angularDrag;
    this.crashPitchRate *= angularDrag;
    this.crashRollRate *= angularDrag;

    this.crashYaw += this.crashSpinRate * dt;
    this.crashPitch += this.crashPitchRate * dt;
    this.crashRoll += this.crashRollRate * dt;

    if (this.crashTimer < 0.5) {
      const settle = Math.exp(-8.0 * dt);
      this.crashPitch *= settle;
      this.crashRoll *= settle;
    }

    this._crashEuler.set(this.crashPitch, this.crashYaw, this.crashRoll, 'YXZ');
    this._targetQuat.setFromEuler(this._crashEuler);

    const prevCp = Math.floor(this.u * this.track.checkpoints.length);
    if (closest?.sample) {
      this.u = closest.sample.u;
      this.lateralOffset = THREE.MathUtils.clamp(closest.lateralOffset, -halfSafeWidth, halfSafeWidth);
    }
    const newCp = Math.floor(this.u * this.track.checkpoints.length);
    if (newCp === 0 && prevCp === this.track.checkpoints.length - 1) {
      this.car.physics.lap++;
    }
    this.car.physics.currentCheckpoint = newCp;
    this.speed = Math.max(12, horizSpeed);

    this.car.setRemoteTransform({
      x: this.crashPos.x,
      y: this.crashPos.y,
      z: this.crashPos.z,
      qx: this._targetQuat.x,
      qy: this._targetQuat.y,
      qz: this._targetQuat.z,
      qw: this._targetQuat.w,
      steer: 0,
      wheelRot: this.car.targetTransform.wheelRotation + (horizSpeed / 0.38) * dt * 0.5,
      speed: Math.round(horizSpeed * 3.6),
      nitro: false,
      drift: isOnGround && horizSpeed > 5.0,
      crashing: true,
      lap: this.car.physics.lap,
      checkpoint: newCp
    });

    this.car.update(dt, null, particles, null);

    // Recover upright back onto track racing line cleanly
    if (this.crashTimer <= 0) {
      this.isCrashing = false;
      this.crashPitch = 0;
      this.crashRoll = 0;
      this.crashSpinRate = 0;
      this.crashPitchRate = 0;
      this.crashRollRate = 0;
      this.crashHitCooldown = 0.8;
      this.speed = Math.max(18, Math.min(34, horizSpeed));
    }
  }

  update(dt, playerCar, allBots = [], particles = null) {
    if (this.crashHitCooldown > 0) {
      this.crashHitCooldown = Math.max(0, this.crashHitCooldown - dt);
    }

    if (this.isCrashing) {
      this._updateCrashing(dt, playerCar, allBots, particles);
      return;
    }

    const lookaheadU = (this.u + 0.035) % 1.0;
    const targetPoint = this.track.curve.getPointAt(lookaheadU);
    const tangent = this.track.curve.getTangentAt(this.u).normalize();
    const normal = new THREE.Vector3().crossVectors(tangent, this._up).normalize();

    const futureTangent = this.track.curve.getTangentAt((this.u + 0.08) % 1.0);
    const cornerSharpness = 1.0 - tangent.dot(futureTangent);

    let baseMaxSpeed = this.basePace;
    if (cornerSharpness > 0.14) {
      baseMaxSpeed = Math.max(30, this.basePace - cornerSharpness * 34);
    }

    const halfSafeWidth = Math.max(4, this.track.trackWidth / 2 - 2.6);

    // --- Adaptive Behavioral AI Engine ---
    if (playerCar) {
      const distToPlayer = this.car.mesh.position.distanceTo(playerCar.physics.position);

      if (distToPlayer < 25) {
        if (this.rival.id === 'vortex') {
          const toPlayer = playerCar.physics.position.clone().sub(this.car.mesh.position);
          const lateralToPlayer = toPlayer.dot(normal);
          this.lateralOffset = THREE.MathUtils.lerp(this.lateralOffset, lateralToPlayer > 0 ? 3.5 : -3.5, dt * 1.8);
          if (distToPlayer < 12) this.triggerBanter('overtake');
        } else if (this.rival.id === 'shadow' && playerCar.physics.isDrifting) {
          this.lateralOffset = THREE.MathUtils.lerp(this.lateralOffset, (cornerSharpness > 0.1 ? 4 : -4), dt * 2.5);
          this.triggerBanter('drift');
        } else if (this.rival.id === 'titan' && playerCar.physics.isNitroActive) {
          this.isNitro = true;
          this.triggerBanter('nitro');
        }
      }

      // Full Car-to-Car Impact & Cinematic Wreck Physics
      if (distToPlayer < 3.15 && distToPlayer > 0.01) {
        const toBot = this._toOther.subVectors(this.car.mesh.position, playerCar.physics.position);
        toBot.y = 0;
        if (toBot.lengthSq() > 0.0001) {
          toBot.normalize();
          const overlap = 3.15 - distToPlayer;
          const pVel = playerCar.physics.velocity;
          const pSpeed = pVel ? Math.hypot(pVel.x, pVel.z) : 0;

          // Bot world velocity vector along track tangent
          const relVx = (pVel?.x || 0) - tangent.x * this.speed;
          const relVz = (pVel?.z || 0) - tangent.z * this.speed;
          const closingSpeed = relVx * toBot.x + relVz * toBot.z;
          const relMag = Math.hypot(relVx, relVz);
          const impactSpeed = Math.max(closingSpeed, relMag * 0.9, pSpeed * 0.42);

          if (this.crashHitCooldown <= 0 && (impactSpeed >= 10.5 || (pSpeed >= 18 && closingSpeed > 4.2))) {
            // Separate cleanly, deflect player chassis & impart violent crash to struck bot
            playerCar.physics.position.addScaledVector(toBot, -overlap * 0.55);
            if (pVel) {
              pVel.addScaledVector(toBot, -Math.min(18, impactSpeed * 0.44));
            }
            const steerTwist = (tangent.x * toBot.z - tangent.z * toBot.x);
            if (typeof playerCar.physics.rotationY === 'number') {
              playerCar.physics.rotationY += Math.sign(steerTwist || 1) * Math.min(0.18, impactSpeed * 0.004);
            }
            const intensity = Math.min(1.1, 0.58 + impactSpeed / 40);
            playerCar.physics.collisionShake = Math.max(playerCar.physics.collisionShake || 0, intensity);

            const impactMid = this.car.mesh.position.clone().lerp(playerCar.physics.position, 0.5);
            impactMid.y += 0.45;
            particles?.emitCrashExplosion?.(impactMid, toBot, Math.min(1.25, intensity + 0.15));

            this.triggerCrash(toBot, impactSpeed * 1.18, impactSpeed >= 20 ? 1.15 : 0.72, true);
            this._updateCrashing(dt * 0.5, playerCar, allBots, particles);
            return;
          }

          // Low-speed paint trading / wheel rub
          playerCar.physics.position.addScaledVector(toBot, -overlap * 0.65);
          if (pVel) pVel.addScaledVector(toBot, -4.5);
          this.lateralOffset = THREE.MathUtils.clamp(this.lateralOffset + toBot.dot(normal) * overlap * 0.45, -halfSafeWidth, halfSafeWidth);
          playerCar.physics.collisionShake = Math.max(playerCar.physics.collisionShake || 0, 0.45);
          particles?.emitSparks?.(this.car.mesh.position, 10);
          this.triggerBanter('crash');
        }
      }

      // Boss Special Ability: EMP Shockwave (frame-delta timer so pause works cleanly)
      if (this.rival.isBoss) {
        if (this.empActive) {
          this.empActiveTimer -= dt;
          if (this.empActiveTimer <= 0) this.empActive = false;
        } else {
          this.empTimer += dt;
          if (this.empTimer > 12) {
            this.empTimer = 0;
            this.empActive = true;
            this.empActiveTimer = 3.0;
            this.triggerBanter('nitro');
          }
        }

        if (this.empActive && distToPlayer < 18 && !playerCar.physics.isNitroActive) {
          playerCar.physics.velocity.multiplyScalar(Math.exp(-1.5 * dt));
        }
      }
    }

    // Bot-to-Bot Pack Shunts & High-Speed Pileup Crashes
    if (Array.isArray(allBots) && allBots.length > 1 && this.crashHitCooldown <= 0) {
      for (const other of allBots) {
        if (!other || other === this || other.isCrashing || other.crashHitCooldown > 0) continue;
        const distOther = this.car.mesh.position.distanceTo(other.car.mesh.position);
        if (distOther < 3.05 && distOther > 0.01) {
          this._toOther.subVectors(other.car.mesh.position, this.car.mesh.position);
          this._toOther.y = 0;
          if (this._toOther.lengthSq() > 0.0001) {
            this._toOther.normalize();
            const speedDelta = Math.abs(this.speed - other.speed);
            const bothFast = this.speed > 26 && other.speed > 26;
            if (bothFast && speedDelta >= 12.5) {
              particles?.emitCrashExplosion?.(other.car.mesh.position, this._toOther, 0.95);
              other.triggerCrash(this._toOther, Math.max(18, speedDelta * 1.45), 0.9, true);
              this.crashHitCooldown = 0.6;
            } else {
              const pushLat = this._toOther.dot(normal);
              const sep = (3.05 - distOther) * 0.45;
              this.lateralOffset = THREE.MathUtils.clamp(this.lateralOffset - pushLat * sep, -halfSafeWidth, halfSafeWidth);
              other.lateralOffset = THREE.MathUtils.clamp(other.lateralOffset + pushLat * sep, -halfSafeWidth, halfSafeWidth);
            }
          }
        }
      }
    }

    this.lateralOffset = THREE.MathUtils.clamp(this.lateralOffset, -halfSafeWidth, halfSafeWidth);

    // Nitro Usage
    this.nitroCooldown -= dt;
    if (this.nitroCooldown <= 0 && cornerSharpness < 0.06) {
      this.isNitro = true;
      baseMaxSpeed += 14;
      if (this.nitroCooldown < -2.6) {
        this.isNitro = false;
        this.nitroCooldown = 7 + Math.random() * 6;
      }
    } else if (cornerSharpness > 0.1) {
      this.isNitro = false;
    }

    this.speed = THREE.MathUtils.lerp(this.speed, Math.max(26, baseMaxSpeed), 1 - Math.exp(-3.8 * dt));

    const prevCp = Math.floor(this.u * this.track.checkpoints.length);
    const du = (this.speed * dt) / this.track.totalLength;
    this.u = (this.u + du) % 1.0;

    const posOnTrack = this.track.curve.getPointAt(this.u);
    const elevatedPos = posOnTrack.clone().addScaledVector(normal, this.lateralOffset);
    elevatedPos.y += 0.035;

    const lookTarget = targetPoint.clone().addScaledVector(normal, this.lateralOffset);
    lookTarget.y += 0.035;

    // Upright orientation without Z-roll twist on hills
    this._lookMat.lookAt(lookTarget, elevatedPos, this._up);
    this._targetQuat.setFromRotationMatrix(this._lookMat);

    this.car.setRemoteTransform({
      x: elevatedPos.x,
      y: elevatedPos.y,
      z: elevatedPos.z,
      qx: this._targetQuat.x,
      qy: this._targetQuat.y,
      qz: this._targetQuat.z,
      qw: this._targetQuat.w,
      steer: cornerSharpness * (this.lateralOffset > 0 ? 0.3 : -0.3),
      wheelRot: (this.car.targetTransform.wheelRotation + (this.speed / 0.38) * dt),
      speed: Math.round(this.speed * 3.6),
      nitro: this.isNitro,
      drift: cornerSharpness > 0.22,
      crashing: false,
      lap: this.car.physics.lap,
      checkpoint: Math.floor(this.u * this.track.checkpoints.length)
    });

    const newCp = Math.floor(this.u * this.track.checkpoints.length);
    if (newCp === 0 && prevCp === this.track.checkpoints.length - 1) {
      this.car.physics.lap++;
    }
    this.car.physics.currentCheckpoint = newCp;

    this.car.update(dt, null, particles, null);
  }

  destroy() {
    this.car.destroy();
  }
}
