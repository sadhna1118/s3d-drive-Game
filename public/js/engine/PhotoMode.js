/**
 * Velocity Rush: Neon Rebellion - High-Res Photo Mode & Screenshot Exporter
 * Free orbit camera, FOV/Bloom tuning, and watermarked PNG export.
 */

export class PhotoModeManager {
  constructor(renderer, camera, scene) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.isActive = false;
    this.orbitRadius = 6.5;
    this.orbitTheta = 0; // horizontal angle
    this.orbitPhi = 0.3; // vertical angle
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
  }

  initMouseControls() {
    window.addEventListener('mousedown', (e) => {
      if (!this.isActive) return;
      if (e.target.closest('.interactive') && !e.target.closest('#canvas-container')) return;
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
      this.orbitPhi = THREE.MathUtils.clamp(this.orbitPhi + dy * 0.008, 0.05, Math.PI / 2 - 0.1);

      this.updateCamera();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('wheel', (e) => {
      if (!this.isActive) return;
      this.orbitRadius = THREE.MathUtils.clamp(this.orbitRadius + e.deltaY * 0.005, 3.0, 16.0);
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
    // Render high quality frame
    this.renderer.render();

    const canvas = this.renderer.renderer.domElement;

    // Create export canvas to watermark
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');

    ctx.drawImage(canvas, 0, 0);

    // Draw Sleek Watermark Banner
    ctx.fillStyle = 'rgba(6, 10, 18, 0.6)';
    ctx.roundRect(exportCanvas.width - 340, exportCanvas.height - 70, 310, 50, 8);
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.roundRect(exportCanvas.width - 340, exportCanvas.height - 70, 310, 50, 8);
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 20px Orbitron, sans-serif';
    ctx.fillText('S3D DRIVE', exportCanvas.width - 325, exportCanvas.height - 40);
    ctx.fillStyle = '#ff0055';
    ctx.font = 'bold 12px Orbitron, sans-serif';
    ctx.fillText('3D SPEED RACER', exportCanvas.width - 325, exportCanvas.height - 25);

    // Trigger download
    const link = document.createElement('a');
    link.download = `S3D_Drive_Photo_${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  }
}
