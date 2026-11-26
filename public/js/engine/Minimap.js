/**
 * Velocity Rush 3D - 2D Canvas Track Minimap & Radar
 * Real-time track outline, player blip, AI racers & multiplayer opponents.
 */

export class Minimap {
  constructor(canvasElement, track) {
    this.canvas = canvasElement || document.getElementById('minimap-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.track = track;

    this.width = this.canvas ? this.canvas.width : 140;
    this.height = this.canvas ? this.canvas.height : 140;

    // Calculate bounding box of the track to normalize coordinates
    this.bounds = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity };
    if (this.track && this.track.samplePoints) {
      this.calculateBounds();
    }
  }

  calculateBounds() {
    this.track.samplePoints.forEach((sp) => {
      if (sp.position.x < this.bounds.minX) this.bounds.minX = sp.position.x;
      if (sp.position.x > this.bounds.maxX) this.bounds.maxX = sp.position.x;
      if (sp.position.z < this.bounds.minZ) this.bounds.minZ = sp.position.z;
      if (sp.position.z > this.bounds.maxZ) this.bounds.maxZ = sp.position.z;
    });

    // Add margin
    const margin = 40;
    this.bounds.minX -= margin;
    this.bounds.maxX += margin;
    this.bounds.minZ -= margin;
    this.bounds.maxZ += margin;

    this.bounds.rangeX = this.bounds.maxX - this.bounds.minX;
    this.bounds.rangeZ = this.bounds.maxZ - this.bounds.minZ;
  }

  worldToCanvas(x, z) {
    const nx = (x - this.bounds.minX) / this.bounds.rangeX;
    const nz = (z - this.bounds.minZ) / this.bounds.rangeZ;

    return {
      x: 15 + nx * (this.width - 30),
      y: 15 + nz * (this.height - 30)
    };
  }

  render(playerCar, opponents = []) {
    if (!this.ctx || !this.track || !this.track.samplePoints || !this.track.samplePoints.length) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Radar Glass Background
    this.ctx.fillStyle = 'rgba(6, 12, 22, 0.75)';
    this.ctx.beginPath();
    this.ctx.roundRect(0, 0, this.width, this.height, 16);
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // 2. Draw Track Ribbon
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(30, 60, 90, 0.8)';
    this.ctx.lineWidth = 8;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    for (let i = 0; i < this.track.samplePoints.length; i += 4) {
      const sp = this.track.samplePoints[i];
      const pt = this.worldToCanvas(sp.position.x, sp.position.z);
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // Glowing Track Line
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    for (let i = 0; i < this.track.samplePoints.length; i += 4) {
      const sp = this.track.samplePoints[i];
      const pt = this.worldToCanvas(sp.position.x, sp.position.z);
      if (i === 0) this.ctx.moveTo(pt.x, pt.y);
      else this.ctx.lineTo(pt.x, pt.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // 3. Start / Finish Line Marker
    const startSp = this.track.samplePoints[0];
    const startPt = this.worldToCanvas(startSp.position.x, startSp.position.z);
    this.ctx.fillStyle = '#ff0055';
    this.ctx.fillRect(startPt.x - 3, startPt.y - 3, 6, 6);

    // 4. Draw Opponent / Bot Blips
    opponents.forEach((opp) => {
      if (!opp || !opp.car) return;
      const pos = opp.car.mesh.position;
      const pt = this.worldToCanvas(pos.x, pos.z);

      this.ctx.fillStyle = opp.car.color || '#ffaa00';
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 5. Draw Local Player Blip (Highlighted Heading Arrow)
    if (playerCar) {
      const pos = playerCar.mesh.position;
      const pt = this.worldToCanvas(pos.x, pos.z);
      const rotY = playerCar.physics.rotationY;

      this.ctx.save();
      this.ctx.translate(pt.x, pt.y);
      this.ctx.rotate(-rotY);

      // Player Triangle
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 7);
      this.ctx.lineTo(5, -5);
      this.ctx.lineTo(0, -3);
      this.ctx.lineTo(-5, -5);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}
