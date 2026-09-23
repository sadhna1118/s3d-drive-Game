/**
 * Velocity Rush: Neon Rebellion - Professional Telemetry & Analytics Engine
 * Tracks real-time vehicle dynamics: Top Speed, Average Speed, Drift Distance,
 * Nitro Usage, Overtakes, Air Time, and Clean Driving Accuracy.
 */

export class TelemetryManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.topSpeed = 0;
    this.speedSamples = [];
    this.totalDriftDistance = 0;
    this.nitroActivationsCount = 0;
    this.totalNitroTime = 0;
    this.overtakesCount = 0;
    this.airTime = 0;
    this.wallCollisions = 0;
    this.lastPositionRank = 1;
    this.startTime = 0;
    this.endTime = 0;
    this.lastNitroState = false;
  }

  startRace(startRank = 1) {
    this.reset();
    this.startTime = performance.now();
    this.lastPositionRank = startRank;
  }

  update(dt, physics, currentRank) {
    if (!physics) return;

    // 1. Top Speed & Average Speed
    if (physics.speedKmh > this.topSpeed) {
      this.topSpeed = physics.speedKmh;
    }
    this.speedSamples.push(physics.speedKmh);
    if (this.speedSamples.length > 300) {
      this.speedSamples.shift();
    }

    // 2. Drift Distance Accumulator (Speed * dt when drifting)
    if (physics.isDrifting && physics.speed > 5) {
      this.totalDriftDistance += physics.speed * dt;
    }

    // 3. Nitro Activations & Duration
    if (physics.isNitroActive) {
      this.totalNitroTime += dt;
      if (!this.lastNitroState) {
        this.nitroActivationsCount++;
      }
    }
    this.lastNitroState = physics.isNitroActive;

    // 4. Airborne Time
    if (physics.position.y > 0.9) {
      this.airTime += dt;
    }

    // 5. Overtakes (Rank improvement)
    if (currentRank < this.lastPositionRank) {
      this.overtakesCount += (this.lastPositionRank - currentRank);
    }
    this.lastPositionRank = currentRank;

    this.wallCollisions = physics.wallCollisionsCount || 0;
  }

  finishRace() {
    this.endTime = performance.now();
  }

  getAnalyticsSummary(bestLapTime, totalTimeSec) {
    const avgSpeed = this.speedSamples.length > 0
      ? Math.round(this.speedSamples.reduce((a, b) => a + b, 0) / this.speedSamples.length)
      : 0;

    const cleanScore = Math.max(0, 100 - (this.wallCollisions * 8));

    return {
      topSpeed: Math.round(this.topSpeed),
      avgSpeed,
      driftDistanceMeters: Math.round(this.totalDriftDistance),
      nitroUsed: this.nitroActivationsCount,
      nitroTimeSec: this.totalNitroTime.toFixed(1),
      overtakes: this.overtakesCount,
      airTimeSec: this.airTime.toFixed(1),
      wallCollisions: this.wallCollisions,
      cleanDrivingAccuracy: `${cleanScore}%`,
      bestLap: bestLapTime,
      totalRaceTime: totalTimeSec
    };
  }
}
