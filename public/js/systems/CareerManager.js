/**
 * Velocity Rush 3D - Career, Economy, Tuning & Achievements System
 * Manages player credits, car upgrades, visual mods, championship cups, and badges.
 */

export const UPGRADE_TIERS = {
  engine: [
    { tier: 1, name: 'Stock Engine', cost: 0, powerMult: 1.0, topSpeedBonus: 0 },
    { tier: 2, name: 'Stage 1 ECU + Intake', cost: 3500, powerMult: 1.12, topSpeedBonus: 12 },
    { tier: 3, name: 'Stage 2 Twin-Turbo', cost: 8500, powerMult: 1.25, topSpeedBonus: 24 },
    { tier: 4, name: 'Stage 3 Hybrid Hyper-V12', cost: 16000, powerMult: 1.42, topSpeedBonus: 40 }
  ],
  turbo: [
    { tier: 1, name: 'Stock Throttle', cost: 0, launchMult: 1.0 },
    { tier: 2, name: 'High-Flow Intercooler', cost: 2500, launchMult: 1.15 },
    { tier: 3, name: 'Ball-Bearing Twin Turbo', cost: 6500, launchMult: 1.30 },
    { tier: 4, name: 'Anti-Lag Supercharger', cost: 12500, launchMult: 1.50 }
  ],
  gearbox: [
    { tier: 1, name: 'Factory 6-Speed Synchro', cost: 0, shiftTorqueBonus: 1.0, ratioSpread: 1.0 },
    { tier: 2, name: 'Close-Ratio Sport Box', cost: 2800, shiftTorqueBonus: 1.07, ratioSpread: 1.04 },
    { tier: 3, name: '7-Spec Dual-Clutch DCT', cost: 6800, shiftTorqueBonus: 1.14, ratioSpread: 1.08 },
    { tier: 4, name: 'Sequential Carbon Dogbox', cost: 13500, shiftTorqueBonus: 1.22, ratioSpread: 1.13 }
  ],
  suspension: [
    { tier: 1, name: 'OEM Comfort Dampers', cost: 0, handlingMult: 1.0, rollStiffness: 1.0 },
    { tier: 2, name: 'Lowered Sport Coilovers', cost: 2200, handlingMult: 1.08, rollStiffness: 1.22 },
    { tier: 3, name: 'Track Ohlins 2-Way Billet', cost: 5800, handlingMult: 1.16, rollStiffness: 1.48 },
    { tier: 4, name: 'Active Pushrod Hydraulic', cost: 11500, handlingMult: 1.26, rollStiffness: 1.80 }
  ],
  brakes: [
    { tier: 1, name: 'Ventilated Steel Discs', cost: 0, brakeMult: 1.0, coolingRate: 1.0 },
    { tier: 2, name: 'Brembo 6-Piston Drilled', cost: 2000, brakeMult: 1.14, coolingRate: 1.25 },
    { tier: 3, name: 'Track Slotted Monoblock', cost: 5200, brakeMult: 1.28, coolingRate: 1.55 },
    { tier: 4, name: 'F1 Carbon-Ceramic CCM-R', cost: 10800, brakeMult: 1.44, coolingRate: 2.0 }
  ],
  chassis: [
    { tier: 1, name: 'OEM Steel & Aluminum', cost: 0, weightReduction: 1.0 },
    { tier: 2, name: 'Carbon Hood & Trunk', cost: 3000, weightReduction: 1.07 },
    { tier: 3, name: 'Titanium Cage + Lexan', cost: 7200, weightReduction: 1.15 },
    { tier: 4, name: 'Full Carbon Monocoque Tub', cost: 14500, weightReduction: 1.24 }
  ],
  tires: [
    { tier: 1, name: 'Street Radial Tires', cost: 0, driftGrip: 0.90, gripMult: 1.0 },
    { tier: 2, name: 'Semi-Slick Sport Tires', cost: 2000, driftGrip: 0.93, gripMult: 1.10 },
    { tier: 3, name: 'Pro Drift Compound', cost: 5000, driftGrip: 0.97, gripMult: 1.20 },
    { tier: 4, name: 'Apex Soft Racing Slicks', cost: 10000, driftGrip: 0.99, gripMult: 1.35 }
  ],
  nitro: [
    { tier: 1, name: 'Single NOS Bottle (100L)', cost: 0, capacity: 100, rechargeRate: 4, boostPower: 1.45 },
    { tier: 2, name: 'Dual Purge Setup (150L)', cost: 3000, capacity: 150, rechargeRate: 6, boostPower: 1.55 },
    { tier: 3, name: 'Liquid Plasma Injection', cost: 7500, capacity: 200, rechargeRate: 8, boostPower: 1.70 },
    { tier: 4, name: 'Quantum Overdrive ERS', cost: 14000, capacity: 250, rechargeRate: 12, boostPower: 1.90 }
  ]
};

export const ACHIEVEMENTS = [
  { id: 'first_win', title: 'First Blood', desc: 'Win your first Grand Prix race', icon: '🥇', reward: 2000 },
  { id: 'speed_300', title: '300 KM/H Club', desc: 'Reach 300 KM/H with Nitro Warp', icon: '⚡', reward: 3500 },
  { id: 'drift_king', title: 'Drift Master', desc: 'Score a 10,000+ Drift Combo', icon: '🔥', reward: 4000 },
  { id: 'clean_lap', title: 'Precision Driver', desc: 'Complete a lap with zero wall collisions', icon: '🎯', reward: 2500 },
  { id: 'rain_master', title: 'Storm Chaser', desc: 'Win a race in Cyber Rain & Thunder', icon: '🌧️', reward: 3000 },
  { id: 'car_collector', title: 'Fleet Commander', desc: 'Customize all 4 vehicle classes', icon: '🚗', reward: 5000 },
  { id: 'max_tune', title: 'Apex Mechanic', desc: 'Fully max out all 4 upgrades on any car', icon: '🔧', reward: 8000 },
  { id: 'time_attack', title: 'Ghost Buster', desc: 'Beat your personal best Ghost in Time Attack', icon: '👻', reward: 3500 }
];

export const CAREER_CUPS = [
  {
    id: 'novice_cup',
    name: 'Novice City Cup',
    tier: 'Bronze',
    entryFee: 0,
    prizeMoney: 8000,
    races: [
      { track: 'city_sunny', weather: 'clear', laps: 2, name: 'Grand Arch Daylight Sprint' },
      { track: 'city_sunset', weather: 'clear', laps: 2, name: 'Emerald Boulevard Golden Hour' }
    ]
  },
  {
    id: 'pro_cup',
    name: 'Pro Express Championship',
    tier: 'Silver',
    entryFee: 2500,
    prizeMoney: 18000,
    races: [
      { track: 'city_monsoon', weather: 'rain', laps: 3, name: 'Monsoon Express Rain GP' },
      { track: 'city_fog', weather: 'clear', laps: 3, name: 'Highland Forest Morning Mist' },
      { track: 'city_night', weather: 'clear', laps: 3, name: 'Midnight Floodlight Sprint' }
    ]
  },
  {
    id: 'apex_cup',
    name: 'Apex Grand Masters',
    tier: 'Gold',
    entryFee: 6000,
    prizeMoney: 35000,
    races: [
      { track: 'city_monsoon', weather: 'rain', laps: 3, name: 'Apex Plaza Monsoon' },
      { track: 'city_fog', weather: 'clear', laps: 4, name: 'Ridge Sanctuary Winter Mist' },
      { track: 'city_night', weather: 'clear', laps: 4, name: 'Harbor Bridge & Skyline Night' },
      { track: 'city_live', weather: 'clear', laps: 5, name: 'Live Real-Time Sky Finale' }
    ]
  }
];

export class CareerManager {
  constructor() {
    this.storageKey = 'velocity_rush_save_v1';
    this.data = {
      credits: 5000, // Starter cash
      upgrades: {
        hyperion_gt: { engine: 1, turbo: 1, tires: 1, nitro: 1, rimStyle: 0, spoiler: 1, tint: 0, underglowMode: 'pulse' },
        apex_cyber: { engine: 1, turbo: 1, tires: 1, nitro: 1, rimStyle: 1, spoiler: 0, tint: 1, underglowMode: 'rainbow' },
        phantom_drift: { engine: 1, turbo: 1, tires: 1, nitro: 1, rimStyle: 2, spoiler: 1, tint: 2, underglowMode: 'pulse' },
        formula_pulse: { engine: 1, turbo: 1, tires: 1, nitro: 1, rimStyle: 0, spoiler: 1, tint: 0, underglowMode: 'static' }
      },
      unlockedAchievements: [],
      careerProgress: {
        novice_cup: { completed: false, bestRank: 0 },
        pro_cup: { completed: false, bestRank: 0 },
        apex_cup: { completed: false, bestRank: 0 }
      },
      bestLaps: {} // trackId -> bestLapTime
    };

    this.onCreditsChanged = null;
    this.onAchievementUnlocked = null;

    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.data = {
            ...this.data,
            ...parsed,
            credits: (typeof parsed.credits === 'number' && !isNaN(parsed.credits)) ? parsed.credits : 5000,
            upgrades: {
              ...this.data.upgrades,
              ...(parsed.upgrades && typeof parsed.upgrades === 'object' ? parsed.upgrades : {})
            }
          };
        }
      }
    } catch (e) {
      console.warn('Could not load career save from localStorage:', e);
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Could not save career save to localStorage:', e);
    }
  }

  getCredits() {
    return this.data.credits;
  }

  earnCredits(amount, reason = '') {
    this.data.credits += amount;
    this.save();
    if (this.onCreditsChanged) this.onCreditsChanged(this.data.credits, amount, reason);
  }

  spendCredits(amount) {
    if (this.data.credits >= amount) {
      this.data.credits -= amount;
      this.save();
      if (this.onCreditsChanged) this.onCreditsChanged(this.data.credits, -amount);
      return true;
    }
    return false;
  }

  getCarUpgrades(carId) {
    if (!this.data.upgrades || typeof this.data.upgrades !== 'object') {
      this.data.upgrades = {};
    }
    const defaults = {
      engine: 1, turbo: 1, gearbox: 1, suspension: 1, brakes: 1, chassis: 1, tires: 1, nitro: 1,
      rimStyle: 0, spoiler: 1, spoilerStyle: 0, aeroKit: 0, exhaustStyle: 0, headlightStyle: 0,
      caliperColor: 0, paintFinish: 'metallic', tint: 0, underglowMode: 'pulse'
    };
    if (!this.data.upgrades[carId]) {
      this.data.upgrades[carId] = { ...defaults };
    } else {
      this.data.upgrades[carId] = { ...defaults, ...this.data.upgrades[carId] };
    }
    return this.data.upgrades[carId];
  }

  upgradeCarComponent(carId, category) {
    const up = this.getCarUpgrades(carId);
    const currentTier = up[category] || 1;
    const nextTier = currentTier + 1;
    const tierList = UPGRADE_TIERS[category];

    if (!tierList || nextTier > tierList.length) return false;

    const upgradeConfig = tierList[nextTier - 1];
    if (this.spendCredits(upgradeConfig.cost)) {
      up[category] = nextTier;
      this.save();

      if (up.engine >= 4 && up.turbo >= 4 && up.tires >= 4 && up.nitro >= 4) {
        this.unlockAchievement('max_tune');
      }

      return true;
    }
    return false;
  }

  setVisualMod(carId, key, value) {
    const carUp = this.getCarUpgrades(carId);
    carUp[key] = value;
    this.save();
  }

  unlockAchievement(id) {
    if (!this.data.unlockedAchievements.includes(id)) {
      this.data.unlockedAchievements.push(id);
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        this.earnCredits(ach.reward, `Achievement: ${ach.title}`);
        if (this.onAchievementUnlocked) this.onAchievementUnlocked(ach);
      }
      this.save();
    }
  }

  saveBestLap(trackId, timeSec) {
    if (!this.data.bestLaps[trackId] || timeSec < this.data.bestLaps[trackId]) {
      this.data.bestLaps[trackId] = timeSec;
      this.save();
    }
  }

  getBestLap(trackId) {
    return this.data.bestLaps[trackId] || null;
  }
}
