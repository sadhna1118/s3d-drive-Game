/**
 * Velocity Rush 3D - Smooth Arcade Camera Controller
 * Velocity-aligned chase camera, hood view, cockpit steering wheel view, and showroom orbit.
 */

import { NITRO_MODES } from './CarBuilder.js';

export const CAMERA_MODES = {
  CHASE: 'CHASE',
  COCKPIT: 'COCKPIT',
  HOOD: 'HOOD',
  CINEMATIC: 'CINEMATIC',
  SHOWROOM: 'SHOWROOM'
};

export class CameraController {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.mode = CAMERA_MODES.SHOWROOM;

    this.baseFov = 64;
    this.currentFov = 64;

    this.currentPosition = new THREE.Vector3(0, 5, -10);
    this.currentTarget = new THREE.Vector3(0, 1, 0);
    this.chaseForward = new THREE.Vector3(0, 0, 1);

    // Showroom Orbit & Interactive Drag
    this.orbitAngle = 0.45;
    this.orbitDistance = 6.4;
    this.orbitHeight = 2.05;
    this.isDraggingOrbit = false;
    this.lastDragX = 0;
    this.lastDragY = 0;
    this.manualOrbitPauseTimer = 0;

    // Camera Preferences
    this.chaseDistanceMult = 1.0;
    this.fovScaleMult = 1.0;

    // Shake
    this.shakeIntensity = 0;

    // Cockpit Steering Wheel 3D Mesh + LED Shift Strip
    this.cockpitWheel = null;
    this.cockpitLeds = [];
    this.initCockpitWheel();
    this.initShowroomOrbit();

    // Scratch vectors
    this._carForward = new THREE.Vector3();
    this._velDir = new THREE.Vector3();
    this._idealPos = new THREE.Vector3();
    this._idealTarget = new THREE.Vector3();
  }

  initCockpitWheel() {
    const wheelGroup = new THREE.Group();

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.025, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7 })
    );

    const center = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.03, 12),
      new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9 })
    );
    center.rotateX(Math.PI / 2);

    const spoke1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.01), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    const spoke2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.01), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    spoke2.position.y = -0.08;

    // 5-LED Racing Shift Light Strip mounted on top of the cockpit wheel
    this.cockpitLeds = [];
    const ledGeo = new THREE.BoxGeometry(0.022, 0.014, 0.016);
    for (let i = 0; i < 5; i++) {
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x112233 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set((i - 2) * 0.032, 0.178 - Math.abs(i - 2) * 0.004, 0.016);
      wheelGroup.add(led);
      this.cockpitLeds.push(led);
    }

    wheelGroup.add(ring, center, spoke1, spoke2);
    wheelGroup.position.set(0, -0.22, -0.45);
    wheelGroup.rotation.x = -0.3;

    this.cockpitWheel = wheelGroup;
    this.camera.add(this.cockpitWheel);
    this.cockpitWheel.visible = false;
  }

  initShowroomOrbit() {
    if (typeof window === 'undefined') return;
    window.addEventListener('pointerdown', (e) => {
      if (this.mode !== CAMERA_MODES.SHOWROOM) return;
      if (e.target && e.target.closest && e.target.closest('button, select, input, .glass-panel, .modal-overlay, a')) return;
      this.isDraggingOrbit = true;
      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      this.manualOrbitPauseTimer = 3.0;
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDraggingOrbit || this.mode !== CAMERA_MODES.SHOWROOM) return;
      const dx = e.clientX - this.lastDragX;
      const dy = e.clientY - this.lastDragY;
      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      this.orbitAngle -= dx * 0.0085;
      this.orbitHeight = Math.max(1.05, Math.min(3.8, this.orbitHeight + dy * 0.01));
      this.manualOrbitPauseTimer = 3.0;
    });

    window.addEventListener('pointerup', () => { this.isDraggingOrbit = false; });

    window.addEventListener('wheel', (e) => {
      if (this.mode !== CAMERA_MODES.SHOWROOM) return;
      if (e.target && e.target.closest && e.target.closest('.modal-overlay:not(.hidden), select')) return;
      this.orbitDistance = Math.max(4.4, Math.min(9.2, this.orbitDistance + e.deltaY * 0.004));
    }, { passive: true });
  }

  setCameraOptions({ distanceMode, fovScale } = {}) {
    if (distanceMode) {
      this.chaseDistanceMult = distanceMode === 'close' ? 0.84 : (distanceMode === 'wide' ? 1.22 : 1.0);
    }
    if (fovScale) {
      this.fovScaleMult = fovScale === 'off' ? 0.0 : (fovScale === 'intense' ? 1.45 : 1.0);
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (this.cockpitWheel) {
      this.cockpitWheel.visible = (this.mode === CAMERA_MODES.COCKPIT);
    }
  }

  cycleMode() {
    const modes = [CAMERA_MODES.CHASE, CAMERA_MODES.HOOD, CAMERA_MODES.COCKPIT, CAMERA_MODES.CINEMATIC];
    const currIdx = modes.indexOf(this.mode);
    const nextIdx = (currIdx + 1) % modes.length;
    this.setMode(modes[nextIdx]);
    return this.mode;
  }

  snapToTarget(targetMesh) {
    if (!targetMesh) return;
    this._carForward.set(0, 0, 1).applyQuaternion(targetMesh.quaternion).normalize();
    this.chaseForward.copy(this._carForward);
    this.currentPosition.copy(targetMesh.position).addScaledVector(this._carForward, -6.4).add(new THREE.Vector3(0, 2.5, 0));
    this.currentTarget.copy(targetMesh.position).addScaledVector(this._carForward, 4.5).add(new THREE.Vector3(0, 1.0, 0));
    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  triggerShake(intensity = 0.5) {
    this.shakeIntensity = Math.min(1.0, this.shakeIntensity + intensity);
  }

  /**
   * Triggers a punchy directional impact kick + transient FOV surge on major crashes.
   * @param {number} intensity
   */
  triggerCrashKick(intensity = 0.75) {
    const clamped = Math.min(1.25, Math.max(0.15, intensity));
    this.shakeIntensity = Math.min(1.0, this.shakeIntensity + clamped * 0.9);
    this.crashFovKick = Math.min(14, Math.max(this.crashFovKick || 0, clamped * 10.5));
  }

  update(dt, targetMesh, physics) {
    if (!targetMesh) return;

    // FOV Speed Warp (scales dynamically up to 399 km/h + Nitro Super Mode)
    if (this.mode !== CAMERA_MODES.SHOWROOM && physics) {
      const speedRatio = Math.min(1.0, physics.speed / 108);
      this.crashFovKick = Math.max(0, (this.crashFovKick || 0) - dt * 19);
      let targetFov = this.baseFov + speedRatio * 10 * this.fovScaleMult + this.crashFovKick;
      if (physics.isNitroActive) {
        const nCfg = NITRO_MODES[physics.nitroMode] || NITRO_MODES.plasma;
        targetFov += nCfg.fovBonus * Math.max(0.2, this.fovScaleMult);
      }

      this.currentFov = THREE.MathUtils.lerp(this.currentFov, targetFov, 1 - Math.exp(-8 * dt));
      this.camera.fov = this.currentFov;
      this.camera.updateProjectionMatrix();
    } else if (this.mode === CAMERA_MODES.SHOWROOM && Math.abs(this.currentFov - 58) > 0.1) {
      this.currentFov = THREE.MathUtils.lerp(this.currentFov, 58, 1 - Math.exp(-6 * dt));
      this.camera.fov = this.currentFov;
      this.camera.updateProjectionMatrix();
    }

    switch (this.mode) {
      case CAMERA_MODES.SHOWROOM:
        this.updateShowroom(dt, targetMesh);
        break;
      case CAMERA_MODES.CHASE:
        this.updateChase(dt, targetMesh, physics);
        break;
      case CAMERA_MODES.HOOD:
        this.updateHood(targetMesh);
        break;
      case CAMERA_MODES.COCKPIT:
        this.updateCockpit(targetMesh, physics);
        break;
      case CAMERA_MODES.CINEMATIC:
        this.updateCinematic(dt, targetMesh);
        break;
    }

    // Impact Camera Shake
    if (physics && physics.collisionShake > this.shakeIntensity) {
      this.shakeIntensity = physics.collisionShake * 0.7;
    }
    if (this.shakeIntensity > 0) {
      const shakeAmt = this.shakeIntensity * 0.35;
      this.camera.position.x += (Math.random() - 0.5) * shakeAmt;
      this.camera.position.y += (Math.random() - 0.5) * shakeAmt;
      this.camera.position.z += (Math.random() - 0.5) * shakeAmt;
      this.shakeIntensity = Math.max(0, this.shakeIntensity - dt * 4.5);
    }
  }

  updateShowroom(dt, targetMesh) {
    if (this.manualOrbitPauseTimer > 0) {
      this.manualOrbitPauseTimer -= dt;
    } else if (!this.isDraggingOrbit) {
      this.orbitAngle += dt * 0.28;
    }
    const x = targetMesh.position.x + Math.sin(this.orbitAngle) * this.orbitDistance;
    const z = targetMesh.position.z + Math.cos(this.orbitAngle) * this.orbitDistance;
    const y = targetMesh.position.y + this.orbitHeight;

    this.camera.position.set(x, y, z);
    this.camera.lookAt(targetMesh.position.x, targetMesh.position.y + 0.58, targetMesh.position.z);
  }

  updateChase(dt, targetMesh, physics) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    this._carForward.set(0, 0, 1).applyQuaternion(carQuat).normalize();

    // Blend camera follow direction subtly with velocity vector so drifts feel smooth & readable
    if (physics && physics.speed > 10 && physics.velocity.dot(this._carForward) > 2) {
      this._velDir.copy(physics.velocity).normalize();
      this._carForward.lerp(this._velDir, 0.35).normalize();
    }

    const forwardAlpha = 1 - Math.exp(-9.5 * dt);
    this.chaseForward.lerp(this._carForward, forwardAlpha).normalize();

    const speedRatio = physics ? Math.min(1.0, physics.speed / 102) : 0;
    const reversePull = physics?.isReversing ? 0.85 : 0;
    const chaseDist = (6.3 + speedRatio * 1.4 + (physics?.isNitroActive ? 0.65 : 0) + reversePull) * this.chaseDistanceMult;
    const chaseHeight = (2.45 - speedRatio * 0.25 + (physics?.isReversing ? 0.2 : 0)) * (0.9 + 0.1 * this.chaseDistanceMult);

    this._idealPos.copy(carPos)
      .addScaledVector(this.chaseForward, -chaseDist)
      .add(new THREE.Vector3(0, chaseHeight, 0));

    this._idealTarget.copy(carPos)
      .addScaledVector(this.chaseForward, 4.5)
      .add(new THREE.Vector3(0, 1.05, 0));

    const posAlpha = 1 - Math.exp(-12 * dt);
    const targetAlpha = 1 - Math.exp(-16 * dt);
    this.currentPosition.lerp(this._idealPos, posAlpha);
    this.currentTarget.lerp(this._idealTarget, targetAlpha);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  updateCinematic(dt, targetMesh) {
    const t = performance.now() * 0.00032;
    const carPos = targetMesh.position;
    this._carForward.set(0, 0, 1).applyQuaternion(targetMesh.quaternion).normalize();
    const baseYaw = Math.atan2(this._carForward.x, this._carForward.z) + Math.sin(t) * 0.85;
    const dist = 6.2 + Math.cos(t * 1.3) * 1.1;
    const h = 1.65 + Math.sin(t * 0.9) * 0.45;

    this._idealPos.set(
      carPos.x - Math.sin(baseYaw) * dist,
      carPos.y + h,
      carPos.z - Math.cos(baseYaw) * dist
    );
    this._idealTarget.set(carPos.x, carPos.y + 0.72, carPos.z);

    this.currentPosition.lerp(this._idealPos, 1 - Math.exp(-4.5 * dt));
    this.currentTarget.lerp(this._idealTarget, 1 - Math.exp(-8.0 * dt));
    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  updateHood(targetMesh) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    const hoodOffset = new THREE.Vector3(0, 0.78, 0.45).applyQuaternion(carQuat);
    const lookOffset = new THREE.Vector3(0, 0.68, 14).applyQuaternion(carQuat);

    this.camera.position.copy(carPos).add(hoodOffset);
    this.camera.lookAt(carPos.clone().add(lookOffset));
  }

  updateCockpit(targetMesh, physics) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    const cockpitOffset = new THREE.Vector3(0, 0.84, -0.15).applyQuaternion(carQuat);
    const lookOffset = new THREE.Vector3(0, 0.78, 14).applyQuaternion(carQuat);

    this.camera.position.copy(carPos).add(cockpitOffset);
    this.camera.lookAt(carPos.clone().add(lookOffset));

    if (this.cockpitWheel && physics) {
      this.cockpitWheel.rotation.z = -physics.steeringAngle * 2.6;
      const rpmRatio = physics.rpm / Math.max(1, physics.maxRpm);
      const litCount = Math.round(rpmRatio * this.cockpitLeds.length);
      this.cockpitLeds.forEach((led, idx) => {
        if (idx < litCount) {
          const hex = idx < 2 ? 0x00ff88 : (idx < 4 ? 0xffaa00 : 0xff0055);
          led.material.color.setHex(hex);
        } else {
          led.material.color.setHex(0x111a28);
        }
      });
    }
  }
}
