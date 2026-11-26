/**
 * Velocity Rush: Neon Rebellion - High-Res Photo Mode & Screenshot Exporter
 * Free orbit camera, FOV tuning, touch/mouse drag, and watermarked PNG export.
 */

export class PhotoModeManager {
  constructor(renderer, camera, scene) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.isActive = false;
    this.orbitRadius = 6.5;
    this.orbitTheta = 0.4;
    this.orbitPhi = 0.32;
    this.targetPos = new THREE.Vector3();

    this.isDragging = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;

    this.initMouseControls();
  }

  enter(carMesh) {
    this.isActive = true;
    if (carMesh) {
      this.targetPos.copy(carMesh.position).add(new THREE.Vector3(0, 0.6, 0));
    }
    this.updateCamera();
  }

  exit() {
    this.isActive = false;
    this.isDragging = false;
  }

  initMouseControls() {
    window.addEventListener('mousedown', (e) => {
      if (!this.isActive) return;
      if (e.target.closest('.photo-mode-overlay')) return;
      this.isDragging = true;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isActive || !this.isDragging) return;
      const dx = e.clientX - this.prevMouseX;
      const dy = e.clientY - this.prevMouseY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      this.orbitTheta -= dx * 0.008;
      this.orbitPhi = THREE.MathUtils.clamp(this.orbitPhi + dy * 0.008, 0.06, Math.PI / 2 - 0.1);
      this.updateCamera();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('wheel', (e) => {
      if (!this.isActive) return;
      this.orbitRadius = THREE.MathUtils.clamp(this.orbitRadius + e.deltaY * 0.005, 3.0, 18.0);
      this.updateCamera();
    });
  }

  updateCamera() {
    const x = this.targetPos.x + this.orbitRadius * Math.sin(this.orbitTheta) * Math.cos(this.orbitPhi);
    const y = this.targetPos.y + this.orbitRadius * Math.sin(this.orbitPhi);
    const z = this.targetPos.z + this.orbitRadius * Math.cos(this.orbitTheta) * Math.cos(this.orbitPhi);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.targetPos);
  }

  setFov(val) {
    this.camera.fov = val;
    this.camera.updateProjectionMatrix();
  }

  captureScreenshot() {
    this.renderer.render();
    const canvas = this.renderer.renderer.domElement;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');

    ctx.drawImage(canvas, 0, 0);

    const bx = exportCanvas.width - 340;
    const by = exportCanvas.height - 70;
    ctx.fillStyle = 'rgba(6, 10, 18, 0.72)';
    ctx.beginPath();
    ctx.roundRect(bx, by, 310, 50, 8);
    ctx.fill();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, 310, 50, 8);
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 20px Orbitron, sans-serif';
    ctx.fillText('S3D DRIVE', bx + 15, by + 26);
    ctx.fillStyle = '#ff0055';
    ctx.font = 'bold 12px Orbitron, sans-serif';
    ctx.fillText('3D SPEED RACER', bx + 15, by + 42);

    const link = document.createElement('a');
    link.download = `S3D_Drive_Photo_${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  }
}
