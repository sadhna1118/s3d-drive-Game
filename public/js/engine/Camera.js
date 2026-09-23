/**
 * Velocity Rush 3D - Camera Controller with Cockpit Steering Wheel & Rearview Mirror
 */

export const CAMERA_MODES = {
  CHASE: 'CHASE',
  COCKPIT: 'COCKPIT',
  HOOD: 'HOOD',
  SHOWROOM: 'SHOWROOM'
};

export class CameraController {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.mode = CAMERA_MODES.SHOWROOM;

    this.baseFov = 65;
    this.currentFov = 65;

    this.currentPosition = new THREE.Vector3(0, 5, -10);
    this.currentTarget = new THREE.Vector3(0, 1, 0);

    // Showroom Orbit
    this.orbitAngle = 0;
    this.orbitDistance = 6.8;
    this.orbitHeight = 2.0;

    // Shake
    this.shakeIntensity = 0;

    // Cockpit Steering Wheel 3D Mesh
    this.cockpitWheel = null;
    this.initCockpitWheel();

    // Rearview Mirror Camera
    this.rearCamera = new THREE.PerspectiveCamera(60, 3 / 1, 0.5, 300);
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

    wheelGroup.add(ring, center, spoke1, spoke2);
    wheelGroup.position.set(0, -0.22, -0.45);
    wheelGroup.rotation.x = -0.3;

    this.cockpitWheel = wheelGroup;
    this.camera.add(this.cockpitWheel);
    this.cockpitWheel.visible = false;
  }

  setMode(mode) {
    this.mode = mode;
    if (this.cockpitWheel) {
      this.cockpitWheel.visible = (this.mode === CAMERA_MODES.COCKPIT);
    }
  }

  cycleMode() {
    const modes = [CAMERA_MODES.CHASE, CAMERA_MODES.HOOD, CAMERA_MODES.COCKPIT];
    const currIdx = modes.indexOf(this.mode);
    const nextIdx = (currIdx + 1) % modes.length;
    this.setMode(modes[nextIdx]);
    return this.mode;
  }

  triggerShake(intensity = 0.5) {
    this.shakeIntensity = Math.min(1.0, this.shakeIntensity + intensity);
  }

  update(dt, targetMesh, physics) {
    if (!targetMesh) return;

    // FOV Speed Warp
    if (this.mode !== CAMERA_MODES.SHOWROOM && physics) {
      const speedRatio = Math.min(1.0, physics.speed / 70);
      let targetFov = this.baseFov + speedRatio * 8;
      if (physics.isNitroActive) targetFov += 16;

      this.currentFov = THREE.MathUtils.lerp(this.currentFov, targetFov, dt * 8);
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
        this.updateHood(dt, targetMesh);
        break;
      case CAMERA_MODES.COCKPIT:
        this.updateCockpit(dt, targetMesh, physics);
        break;
    }

    // Shake
    if (this.shakeIntensity > 0) {
      const shakeAmt = this.shakeIntensity * 0.45;
      this.camera.position.x += (Math.random() - 0.5) * shakeAmt;
      this.camera.position.y += (Math.random() - 0.5) * shakeAmt;
      this.camera.position.z += (Math.random() - 0.5) * shakeAmt;
      this.shakeIntensity = Math.max(0, this.shakeIntensity - dt * 4);
    }

    // Update Rearview Mirror Camera
    if (targetMesh) {
      const rearPos = targetMesh.position.clone().add(new THREE.Vector3(0, 1.2, 0));
      const lookBehind = targetMesh.position.clone().add(new THREE.Vector3(0, 1.0, -20).applyQuaternion(targetMesh.quaternion));
      this.rearCamera.position.copy(rearPos);
      this.rearCamera.lookAt(lookBehind);
    }
  }

  updateShowroom(dt, targetMesh) {
    this.orbitAngle += dt * 0.35;
    const x = targetMesh.position.x + Math.sin(this.orbitAngle) * this.orbitDistance;
    const z = targetMesh.position.z + Math.cos(this.orbitAngle) * this.orbitDistance;
    const y = targetMesh.position.y + this.orbitHeight;

    this.camera.position.set(x, y, z);
    this.camera.lookAt(targetMesh.position.x, targetMesh.position.y + 0.6, targetMesh.position.z);
  }

  updateChase(dt, targetMesh, physics) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    const speedRatio = physics ? Math.min(1.0, physics.speed / 60) : 0;
    const chaseDist = 6.2 + speedRatio * 1.5;
    const chaseHeight = 2.4 - speedRatio * 0.3;

    const behindOffset = new THREE.Vector3(0, chaseHeight, -chaseDist).applyQuaternion(carQuat);
    const idealPosition = carPos.clone().add(behindOffset);

    const forwardOffset = new THREE.Vector3(0, 1.1, 4.0).applyQuaternion(carQuat);
    const idealTarget = carPos.clone().add(forwardOffset);

    const followLag = Math.min(1.0, dt * 9);
    this.currentPosition.lerp(idealPosition, followLag);
    this.currentTarget.lerp(idealTarget, THREE.MathUtils.clamp(dt * 14, 0, 1));

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  updateHood(dt, targetMesh) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    const hoodOffset = new THREE.Vector3(0, 0.75, 0.4).applyQuaternion(carQuat);
    const lookOffset = new THREE.Vector3(0, 0.65, 12).applyQuaternion(carQuat);

    this.camera.position.copy(carPos.clone().add(hoodOffset));
    this.camera.lookAt(carPos.clone().add(lookOffset));
  }

  updateCockpit(dt, targetMesh, physics) {
    const carPos = targetMesh.position;
    const carQuat = targetMesh.quaternion;

    const cockpitOffset = new THREE.Vector3(0, 0.82, -0.2).applyQuaternion(carQuat);
    const lookOffset = new THREE.Vector3(0, 0.8, 12).applyQuaternion(carQuat);

    this.camera.position.copy(carPos.clone().add(cockpitOffset));
    this.camera.lookAt(carPos.clone().add(lookOffset));

    // Turn steering wheel with physics steer input
    if (this.cockpitWheel && physics) {
      this.cockpitWheel.rotation.z = -physics.steeringAngle * 2.8;
    }
  }
}
