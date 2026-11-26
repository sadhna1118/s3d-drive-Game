/**
 * Velocity Rush: Neon Rebellion - Cinematic Replay System & Multi-Angle Director
 * Records ~30Hz race keyframes and plays back with automated cinematic camera switching.
 */

export const REPLAY_CAM_ANGLES = {
  CHASE: 'CHASE',
  LOW_ASPHALT: 'LOW_ASPHALT',
  WHEEL_SIDE: 'WHEEL_SIDE',
  DRONE_OVERHEAD: 'DRONE_OVERHEAD'
};

export class ReplaySystem {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.isRecording = false;
    this.isPlaying = false;
    this.recordedFrames = [];
    this.lastRecordTime = -1;
    this.playbackTime = 0;
    this.playbackSpeed = 1.0;
    this.duration = 0;

    this.currentAngle = REPLAY_CAM_ANGLES.CHASE;
    this.angleTimer = 0;
    this.angleDuration = 4.5;
    this.directorAngles = [
      REPLAY_CAM_ANGLES.CHASE,
      REPLAY_CAM_ANGLES.LOW_ASPHALT,
      REPLAY_CAM_ANGLES.WHEEL_SIDE,
      REPLAY_CAM_ANGLES.DRONE_OVERHEAD
    ];
  }

  startRecording() {
    this.isRecording = true;
    this.isPlaying = false;
    this.recordedFrames = [];
    this.lastRecordTime = -1;
    this.playbackTime = 0;
    this.duration = 0;
  }

  recordFrame(timeOffset, playerCar, opponentCars = []) {
    if (!this.isRecording || !playerCar) return;
    // Sample at ~30 Hz for smooth playback and minimal memory growth
    if (this.lastRecordTime >= 0 && (timeOffset - this.lastRecordTime) < 0.032) return;
    this.lastRecordTime = timeOffset;

    const oppData = opponentCars.map((opp) => {
      const mesh = opp.car ? opp.car.mesh : opp.mesh;
      return {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
        qx: mesh.quaternion.x,
        qy: mesh.quaternion.y,
        qz: mesh.quaternion.z,
        qw: mesh.quaternion.w
      };
    });

    this.recordedFrames.push({
      t: timeOffset,
      player: {
        x: playerCar.physics.position.x,
        y: playerCar.physics.position.y,
        z: playerCar.physics.position.z,
        qx: playerCar.physics.quaternion.x,
        qy: playerCar.physics.quaternion.y,
        qz: playerCar.physics.quaternion.z,
        qw: playerCar.physics.quaternion.w
      },
      opponents: oppData
    });
  }

  stopRecording() {
    this.isRecording = false;
    if (this.recordedFrames.length > 0) {
      this.duration = this.recordedFrames[this.recordedFrames.length - 1].t;
    }
  }

  canPlay() {
    return this.recordedFrames.length >= 2 && this.duration > 0;
  }

  startPlayback() {
    if (!this.canPlay()) return false;
    this.isPlaying = true;
    this.playbackTime = 0;
    this.playbackSpeed = 1.0;
    this.angleTimer = 0;
    this.currentAngle = REPLAY_CAM_ANGLES.CHASE;
    return true;
  }

  stopPlayback() {
    this.isPlaying = false;
  }

  setSpeed(speed = 1.0) {
    this.playbackSpeed = speed;
  }

  cycleAngle() {
    const idx = this.directorAngles.indexOf(this.currentAngle);
    this.currentAngle = this.directorAngles[(idx + 1) % this.directorAngles.length];
    this.angleTimer = 0;
    return this.currentAngle;
  }

  update(dt, playerCar, opponentCars = []) {
    if (!this.isPlaying || this.recordedFrames.length < 2) return;

    this.playbackTime += dt * this.playbackSpeed;
    if (this.playbackTime > this.duration) {
      this.playbackTime = 0;
    }

    let kIdx = 0;
    while (kIdx < this.recordedFrames.length - 2 && this.recordedFrames[kIdx + 1].t < this.playbackTime) {
      kIdx++;
    }

    const f1 = this.recordedFrames[kIdx];
    const f2 = this.recordedFrames[Math.min(this.recordedFrames.length - 1, kIdx + 1)];

    if (f1 && f2 && playerCar) {
      const span = f2.t - f1.t;
      const alpha = span > 0.0001 ? THREE.MathUtils.clamp((this.playbackTime - f1.t) / span, 0, 1) : 0;

      const p1 = new THREE.Vector3(f1.player.x, f1.player.y, f1.player.z);
      const p2 = new THREE.Vector3(f2.player.x, f2.player.y, f2.player.z);
      playerCar.mesh.position.lerpVectors(p1, p2, alpha);

      const q1 = new THREE.Quaternion(f1.player.qx, f1.player.qy, f1.player.qz, f1.player.qw);
      const q2 = new THREE.Quaternion(f2.player.qx, f2.player.qy, f2.player.qz, f2.player.qw);
      playerCar.mesh.quaternion.copy(q1).slerp(q2, alpha);

      if (f1.opponents && opponentCars.length > 0) {
        opponentCars.forEach((opp, i) => {
          const oF1 = f1.opponents[i];
          const oF2 = f2.opponents ? f2.opponents[i] : oF1;
          const oppMesh = opp.car ? opp.car.mesh : opp.mesh;
          if (oF1 && oF2 && oppMesh) {
            oppMesh.position.lerpVectors(
              new THREE.Vector3(oF1.x, oF1.y, oF1.z),
              new THREE.Vector3(oF2.x, oF2.y, oF2.z),
              alpha
            );
            oppMesh.quaternion.copy(
              new THREE.Quaternion(oF1.qx, oF1.qy, oF1.qz, oF1.qw)
            ).slerp(new THREE.Quaternion(oF2.qx, oF2.qy, oF2.qz, oF2.qw), alpha);
          }
        });
      }
    }

    this.angleTimer += dt;
    if (this.angleTimer >= this.angleDuration) {
      this.angleTimer = 0;
      const nextIdx = (this.directorAngles.indexOf(this.currentAngle) + 1) % this.directorAngles.length;
      this.currentAngle = this.directorAngles[nextIdx];
    }

    this.applyDirectorCamera(playerCar);
  }

  applyDirectorCamera(playerCar) {
    if (!playerCar) return;
    const carPos = playerCar.mesh.position;
    const carQuat = playerCar.mesh.quaternion;

    switch (this.currentAngle) {
      case REPLAY_CAM_ANGLES.CHASE: {
        const offset = new THREE.Vector3(0, 2.2, -6.5).applyQuaternion(carQuat);
        this.camera.position.copy(carPos).add(offset);
        this.camera.lookAt(carPos.clone().add(new THREE.Vector3(0, 0.9, 4).applyQuaternion(carQuat)));
        break;
      }
      case REPLAY_CAM_ANGLES.LOW_ASPHALT: {
        const offset = new THREE.Vector3(2.5, 0.4, 5.0).applyQuaternion(carQuat);
        this.camera.position.copy(carPos).add(offset);
        this.camera.lookAt(carPos.clone().add(new THREE.Vector3(0, 0.5, 0)));
        break;
      }
      case REPLAY_CAM_ANGLES.WHEEL_SIDE: {
        const offset = new THREE.Vector3(-2.2, 0.6, -0.5).applyQuaternion(carQuat);
        this.camera.position.copy(carPos).add(offset);
        this.camera.lookAt(carPos.clone().add(new THREE.Vector3(0, 0.5, 2.0).applyQuaternion(carQuat)));
        break;
      }
      case REPLAY_CAM_ANGLES.DRONE_OVERHEAD: {
        const offset = new THREE.Vector3(0, 10, -14).applyQuaternion(carQuat);
        this.camera.position.copy(carPos).add(offset);
        this.camera.lookAt(carPos);
        break;
      }
    }
  }
}
