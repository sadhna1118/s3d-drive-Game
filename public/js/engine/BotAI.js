/**
 * Velocity Rush: Neon Rebellion - Adaptive AI Rival & Nemesis System
 * Named Rivals with adaptive strategies, counter-nitro, drift blocking, and in-game banter.
 */
import { Car } from './Car.js';

export const RIVAL_PROFILES = [
  {
    id: 'vortex',
    name: 'VORTEX',
    title: 'The Enforcer',
    personality: 'Aggressive / Rammer',
    carIndex: 1,
    color: '#ff0055',
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
    carIndex: 2,
    color: '#ffaa00',
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
    carIndex: 0,
    color: '#aa00ff',
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
    carIndex: 3,
    color: '#00f0ff',
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
  constructor(scene, track, gridSlotIndex, rivalProfile, onBanterCallback = null) {
    this.track = track;
    this.rival = rivalProfile || RIVAL_PROFILES[gridSlotIndex % RIVAL_PROFILES.length];
    this.gridSlotIndex = gridSlotIndex;
    this.onBanter = onBanterCallback;

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
    this.targetSpeed = 48;
    this.lateralOffset = (Math.random() - 0.5) * 5;
    this.nitroCooldown = 4 + Math.random() * 5;
    this.isNitro = false;

    // Boss EMP Ability
    this.empTimer = 0;
    this.empActive = false;

    // Dialogue cooldown
    this.lastBanterTime = 0;

    const slot = this.track.gridSlots[gridSlotIndex];
    if (slot) {
      this.car.mesh.position.copy(slot.position);
      this.car.mesh.rotation.y = slot.rotationY;
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

  update(dt, playerCar, allBots) {
    const lookaheadU = (this.u + 0.035) % 1.0;
    const targetPoint = this.track.curve.getPointAt(lookaheadU);
    const tangent = this.track.curve.getTangentAt(this.u).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

    const futureTangent = this.track.curve.getTangentAt((this.u + 0.08) % 1.0);
    const cornerSharpness = 1.0 - tangent.dot(futureTangent);

    let baseMaxSpeed = 60;
    if (cornerSharpness > 0.15) {
      baseMaxSpeed = 40 - cornerSharpness * 32;
    }

    // --- Adaptive Behavioral AI Engine ---
    if (playerCar) {
      const distToPlayer = this.car.mesh.position.distanceTo(playerCar.physics.position);

      // 1. Overtake & Proximity Reactions
      if (distToPlayer < 25) {
        if (this.rival.id === 'vortex') {
          // Vortex swerves toward player to intimidate/block
          const toPlayer = playerCar.physics.position.clone().sub(this.car.mesh.position);
          const lateralToPlayer = toPlayer.dot(normal);
          this.lateralOffset = THREE.MathUtils.lerp(this.lateralOffset, lateralToPlayer > 0 ? 3 : -3, dt * 2);
          if (distToPlayer < 12) this.triggerBanter('overtake');
        } else if (this.rival.id === 'shadow' && playerCar.physics.isDrifting) {
          // Shadow blocks inside apex when player drifts
          this.lateralOffset = THREE.MathUtils.lerp(this.lateralOffset, (cornerSharpness > 0.1 ? 4 : -4), dt * 3);
          this.triggerBanter('drift');
        } else if (this.rival.id === 'titan' && playerCar.physics.isNitroActive) {
          // Titan unleashes instant counter-nitro!
          this.isNitro = true;
          this.triggerBanter('nitro');
        }
      }

      // 2. Boss Special Ability: EMP Shockwave
      if (this.rival.isBoss) {
        this.empTimer += dt;
        if (this.empTimer > 12) {
          this.empTimer = 0;
          this.empActive = true;
          this.triggerBanter('nitro');
          setTimeout(() => { this.empActive = false; }, 3000);
        }

        // Slow player if inside EMP field unless player is using Nitro!
        if (this.empActive && distToPlayer < 18 && !playerCar.physics.isNitroActive) {
          playerCar.physics.velocity.multiplyScalar(0.97);
        }
      }
    }

    // Nitro Usage
    this.nitroCooldown -= dt;
    if (this.nitroCooldown <= 0 && cornerSharpness < 0.06) {
      this.isNitro = true;
      baseMaxSpeed += 16;
      if (this.nitroCooldown < -2.8) {
        this.isNitro = false;
        this.nitroCooldown = 7 + Math.random() * 6;
      }
    } else if (cornerSharpness > 0.1) {
      this.isNitro = false;
    }

    this.speed = THREE.MathUtils.lerp(this.speed, Math.max(26, baseMaxSpeed), dt * 3.8);

    const du = (this.speed * dt) / this.track.totalLength;
    this.u = (this.u + du) % 1.0;

    const posOnTrack = this.track.curve.getPointAt(this.u);
    const elevatedPos = posOnTrack.clone().addScaledVector(normal, this.lateralOffset);
    elevatedPos.y += 0.38;

    const lookTarget = targetPoint.clone().addScaledVector(normal, this.lateralOffset);
    const forwardVec = lookTarget.clone().sub(elevatedPos).normalize();
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), forwardVec);

    this.car.setRemoteTransform({
      x: elevatedPos.x,
      y: elevatedPos.y,
      z: elevatedPos.z,
      qx: targetQuat.x,
      qy: targetQuat.y,
      qz: targetQuat.z,
      qw: targetQuat.w,
      steer: cornerSharpness * (this.lateralOffset > 0 ? 0.3 : -0.3),
      wheelRot: (this.car.targetTransform.wheelRotation + (this.speed / 0.38) * dt),
      speed: Math.round(this.speed * 3.6),
      nitro: this.isNitro,
      drift: cornerSharpness > 0.22,
      lap: this.car.physics.lap,
      checkpoint: Math.floor(this.u * this.track.checkpoints.length)
    });

    const newCp = Math.floor(this.u * this.track.checkpoints.length);
    if (newCp === 0 && this.car.physics.currentCheckpoint === this.track.checkpoints.length - 1) {
      this.car.physics.lap++;
    }
    this.car.physics.currentCheckpoint = newCp;

    // Update car mesh and wheels interpolation
    this.car.update(dt, null, null, null);
  }

  destroy() {
    this.car.destroy();
  }
}
