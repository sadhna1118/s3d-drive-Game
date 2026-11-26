/**
 * Velocity Rush 3D - Holographic Ghost Car Recording & Playback
 * Time-series keyframe recorder and smooth playback of fastest personal lap in Time Attack.
 */
import { CarBuilder } from './CarBuilder.js';

export class GhostCarManager {
  constructor(scene) {
    this.scene = scene;
    this.isRecording = false;
    this.recordedLap = [];
    this.activeGhostMesh = null;
    this.currentPlaybackIndex = 0;
    this.lapStartTime = 0;
    this.ghostData = null; // Array of keyframes
  }

  loadGhost(trackId) {
    try {
      const raw = localStorage.getItem(`ghost_lap_${trackId}`);
      if (raw) {
        this.ghostData = JSON.parse(raw);
      } else {
        this.ghostData = null;
      }
    } catch (e) {
      this.ghostData = null;
    }
  }

  saveGhost(trackId, keyframes) {
    try {
      localStorage.setItem(`ghost_lap_${trackId}`, JSON.stringify(keyframes));
      this.ghostData = keyframes;
    } catch (e) {
      console.warn('Could not save ghost data:', e);
    }
  }

  startRecording() {
    this.isRecording = true;
    this.recordedLap = [];
    this.lapStartTime = performance.now();
  }

  recordFrame(physics) {
    if (!this.isRecording) return;
    const timeOffset = (performance.now() - this.lapStartTime) / 1000;
    this.recordedLap.push({
      t: timeOffset,
      x: physics.position.x,
      y: physics.position.y,
      z: physics.position.z,
      qx: physics.quaternion.x,
      qy: physics.quaternion.y,
      qz: physics.quaternion.z,
      qw: physics.quaternion.w,
      steer: physics.steeringAngle,
      wheelRot: physics.wheelRotation
    });
  }

  finishRecording(trackId, lapTime) {
    this.isRecording = false;
    if (this.recordedLap.length > 50) {
      // Check if this lap beats saved ghost
      const savedLap = this.ghostData;
      if (!savedLap || lapTime < savedLap[savedLap.length - 1].t) {
        this.saveGhost(trackId, this.recordedLap);
      }
    }
  }

  spawnGhostVisual(carIndex = 0) {
    this.destroyGhost();
    if (!this.ghostData || this.ghostData.length === 0) return;

    // Create Holographic Translucent Ghost Car
    const carObj = CarBuilder.createCar(carIndex, '#00ffff');
    this.activeGhostMesh = carObj.mesh;

    // Replace materials with holographic translucent cyan glow
    this.activeGhostMesh.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          wireframe: child.name.includes('wheel') ? true : false,
          transparent: true,
          opacity: 0.35,
          depthWrite: false
        });
      }
    });

    this.scene.add(this.activeGhostMesh);
    this.currentPlaybackIndex = 0;
  }

  updatePlayback(lapCurrentTime) {
    if (!this.activeGhostMesh || !this.ghostData || this.ghostData.length < 2) return;

    // Find current keyframe in ghost data
    while (
      this.currentPlaybackIndex < this.ghostData.length - 1 &&
      this.ghostData[this.currentPlaybackIndex + 1].t < lapCurrentTime
    ) {
      this.currentPlaybackIndex++;
    }

    const k1 = this.ghostData[this.currentPlaybackIndex];
    const k2 = this.ghostData[Math.min(this.ghostData.length - 1, this.currentPlaybackIndex + 1)];

    if (k1 && k2 && k1 !== k2) {
      const alpha = (lapCurrentTime - k1.t) / (k2.t - k1.t || 0.001);
      const clampedAlpha = THREE.MathUtils.clamp(alpha, 0, 1);

      const p1 = new THREE.Vector3(k1.x, k1.y, k1.z);
      const p2 = new THREE.Vector3(k2.x, k2.y, k2.z);
      this.activeGhostMesh.position.lerpVectors(p1, p2, clampedAlpha);

      const q1 = new THREE.Quaternion(k1.qx, k1.qy, k1.qz, k1.qw);
      const q2 = new THREE.Quaternion(k2.qx, k2.qy, k2.qz, k2.qw);
      this.activeGhostMesh.quaternion.copy(q1).slerp(q2, clampedAlpha);
    } else if (k1) {
      this.activeGhostMesh.position.set(k1.x, k1.y, k1.z);
      this.activeGhostMesh.quaternion.set(k1.qx, k1.qy, k1.qz, k1.qw);
    }
  }

  destroyGhost() {
    if (this.activeGhostMesh) {
      this.scene.remove(this.activeGhostMesh);
      this.activeGhostMesh = null;
    }
  }
}
