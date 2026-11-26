/**
 * S3D Drive — Romantic Date Mode Experience Manager
 * Handles Pure Veg Café & Restaurant venues (including favorite Shah Rasoi),
 * roadside arrival & car-door opening cutscene, ordering gourmet pure-veg dishes,
 * celebrating, singing romantic duets, and slow-dancing under fairy lights.
 */

export const PURE_VEG_VENUES = [
  {
    id: 'shah_rasoi',
    name: 'Shah Rasoi',
    shortName: 'Shah Rasoi ★',
    badge: '★ FAVORITE',
    isFavorite: true,
    cuisineTag: '100% Pure Veg • Royal Heritage Dining',
    tagline: 'Our All-Time Favorite • Royal Sandstone Lantern Courtyard & Candlelit Terrace',
    accentColor: '#ff4d88',
    accentHex: 0xff4d88,
    glowHex: 0xffb703,
    menu: [
      { id: 'shahi_paneer', name: 'Royal Shahi Paneer', cat: 'Main', icon: '🥘', propType: 'handi', color: 0xf59e0b },
      { id: 'dal_bukhara', name: 'Dal Bukhara Reserve', cat: 'Main', icon: '🍲', propType: 'handi', color: 0x9a3412 },
      { id: 'butter_naan', name: 'Crisp Butter Naan Basket', cat: 'Bread', icon: '🫓', propType: 'naan', color: 0xfde68a },
      { id: 'zafrani_pulao', name: 'Zafrani Dum Pulao', cat: 'Rice', icon: '🍚', propType: 'bowl', color: 0xfbbf24 },
      { id: 'paneer_tikka', name: 'Malai Paneer Tikka', cat: 'Starter', icon: '🧀', propType: 'platter', color: 0xfb923c },
      { id: 'kesar_thandai', name: 'Kesar Badam Thandai', cat: 'Drink', icon: '🥛', propType: 'goblet', color: 0xfef08a },
      { id: 'gulab_jamun', name: 'Saffron Gulab Jamun', cat: 'Dessert', icon: '🍮', propType: 'dessert', color: 0xb45309 },
      { id: 'rose_kulfi', name: 'Rose Pistachio Kulfi', cat: 'Dessert', icon: '🍨', propType: 'dessert', color: 0xf472b6 }
    ]
  },
  {
    id: 'velvet_brew',
    name: 'Velvet Brew Café',
    shortName: 'Velvet Brew Café',
    badge: 'PURE VEG CAFÉ',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Artisanal Coffee & Patisserie',
    tagline: 'Fairy-Lit Espresso Bar, Stone-Baked Flatbreads & Handcrafted Chocolates',
    accentColor: '#fb923c',
    accentHex: 0xfb923c,
    glowHex: 0xffd166,
    menu: [
      { id: 'velvet_latte', name: 'Signature Rose Latte', cat: 'Coffee', icon: '☕', propType: 'cup', color: 0xfda4af },
      { id: 'hazelnut_cap', name: 'Hazelnut Cappuccino', cat: 'Coffee', icon: '🧋', propType: 'cup', color: 0xd97706 },
      { id: 'margherita', name: 'Wood-Fired Margherita', cat: 'Bistro', icon: '🍕', propType: 'platter', color: 0xef4444 },
      { id: 'creamy_alfredo', name: 'Herb Penne Alfredo', cat: 'Bistro', icon: '🍝', propType: 'bowl', color: 0xfef3c7 },
      { id: 'truffle_toast', name: 'Cheese Avocado Sourdough', cat: 'Starter', icon: '🥪', propType: 'platter', color: 0x84cc16 },
      { id: 'choco_lava', name: 'Belgian Choco Lava Cake', cat: 'Dessert', icon: '🍰', propType: 'cake', color: 0x451a03 }
    ]
  },
  {
    id: 'moonlight_courtyard',
    name: 'Moonlight Courtyard',
    shortName: 'Moonlight Courtyard',
    badge: 'PURE VEG LOUNGE',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Starlight Terrace Lounge',
    tagline: 'Candlelit Emerald Garden, Mint Sparklers & Fusion Veg Mezze Platters',
    accentColor: '#38bdf8',
    accentHex: 0x38bdf8,
    glowHex: 0x7dd3fc,
    menu: [
      { id: 'mezze_platter', name: 'Starlight Mezze Platter', cat: 'Starter', icon: '🥗', propType: 'platter', color: 0x4ade80 },
      { id: 'mint_mojito', name: 'Twilight Mint Cooler', cat: 'Drink', icon: '🍹', propType: 'goblet', color: 0x2dd4bf },
      { id: 'mushroom_risotto', name: 'Velvet Cream Risotto', cat: 'Main', icon: '🍛', propType: 'bowl', color: 0xfde047 },
      { id: 'paneer_sliders', name: 'Crispy Paneer Sliders', cat: 'Starter', icon: '🍔', propType: 'platter', color: 0xf97316 },
      { id: 'strawberry_tiramisu', name: 'Berry Velvet Tiramisu', cat: 'Dessert', icon: '🍓', propType: 'cake', color: 0xf43f5e }
    ]
  },
  {
    id: 'rosewood_bistro',
    name: 'Rosewood Bistro',
    shortName: 'Rosewood Bistro',
    badge: 'PURE VEG BISTRO',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Acoustic Garden Bistro',
    tagline: 'Cozy Acoustic Guitars, Floral Arches & Wholesome Pure Veg Comfort Classics',
    accentColor: '#c084fc',
    accentHex: 0xc084fc,
    glowHex: 0xf0abfc,
    menu: [
      { id: 'masala_chai', name: 'Kullad Cardamom Chai', cat: 'Drink', icon: '🫖', propType: 'cup', color: 0xd97706 },
      { id: 'pesto_flatbread', name: 'Basil Pesto Burrata', cat: 'Main', icon: '🫓', propType: 'platter', color: 0x22c55e },
      { id: 'corn_galouti', name: 'Meltaway Corn Galouti', cat: 'Starter', icon: '🥘', propType: 'platter', color: 0xeab308 },
      { id: 'chole_kulche', name: 'Amritsari Chole & Kulcha', cat: 'Main', icon: '🍛', propType: 'handi', color: 0xc2410c },
      { id: 'mango_cheesecake', name: 'Alphonso Mango Cheesecake', cat: 'Dessert', icon: '🍰', propType: 'cake', color: 0xfbbf24 }
    ]
  }
];

export const DATE_DUET_SONGS = [
  {
    id: 'shaam_rangeen',
    title: 'Shaam Rangeen • Romantic Duet',
    chords: [
      [261.63, 329.63, 392.00], // Cmaj
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // Fmaj
      [196.00, 246.94, 293.66]  // Gmaj
    ],
    melody: [523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.00, 392.00],
    lyrics: [
      { singer: 'boy', text: '♫ "Chaandni raat mein, tere saath yeh safar..."' },
      { singer: 'girl', text: '♫ "Dil ki har dhadkan pe, bas tera hi asar..."' },
      { singer: 'boy', text: '♫ "Shah Rasoi ki khushboo aur yeh pyara samaa..."' },
      { singer: 'both', text: '♫ "Hamesha saath chalenge, chahe ho koi jahaan!" ♥' }
    ]
  },
  {
    id: 'starlight_serenade',
    title: 'Starlight Serenade • Acoustic',
    chords: [
      [293.66, 369.99, 440.00], // D
      [246.94, 293.66, 369.99], // Bm
      [196.00, 246.94, 293.66], // G
      [220.00, 277.18, 329.63]  // A
    ],
    melody: [587.33, 659.25, 739.99, 659.25, 587.33, 554.37, 493.88, 440.00],
    lyrics: [
      { singer: 'girl', text: '♫ "Candlelight glows softer when I look at you..."' },
      { singer: 'boy', text: '♫ "Every mile feels golden with this midnight view..."' },
      { singer: 'both', text: '♫ "Raise a toast together, let the music play forever!" ♥' }
    ]
  },
  {
    id: 'dil_ka_karwaan',
    title: 'Dil Ka Karwaan • Celebration Song',
    chords: [
      [349.23, 440.00, 523.25], // F
      [293.66, 349.23, 440.00], // Dm
      [233.08, 293.66, 349.23], // Bb
      [261.63, 329.63, 392.00]  // C
    ],
    melody: [698.46, 659.25, 587.33, 523.25, 587.33, 659.25, 698.46, 783.99],
    lyrics: [
      { singer: 'boy', text: '♫ "Gaadi roki tere liye, khola pyaar se darwaza..."' },
      { singer: 'girl', text: '♫ "Muskurake thama haath, yeh pal hai sabse taaza!"' },
      { singer: 'both', text: '♫ "Jhoomein aur gaayein hum, khushiyon ke saath!" 💃🎶' }
    ]
  }
];

export function getVenueById(venueId) {
  return PURE_VEG_VENUES.find((v) => v.id === venueId) || PURE_VEG_VENUES[0];
}

export class DateExperienceManager {
  constructor(scene, track, cameraCtrl, particles, audio) {
    this.scene = scene;
    this.track = track;
    this.cameraCtrl = cameraCtrl;
    this.particles = particles;
    this.audio = audio;

    this.active = false;
    this.phase = 'IDLE'; // 'IDLE' | 'DRIVING' | 'CUTSCENE_WALK' | 'CAFE_DINING'
    this.selectedVenueId = 'shah_rasoi';
    this.coupleNames = { partner1: 'Aarav', partner2: 'Meera' };
    this.playerCar = null;

    // Cutscene timeline state
    this.cutsceneTime = 0;
    this.doorOpenedPlayed = false;
    this.partnerSteppedOut = false;

    // Dining & entertainment state
    this.orderedDishes = [];
    this.activityMode = 'dine'; // 'dine' | 'toast' | 'sing' | 'dance'
    this.activityTimer = 0;
    this.songIndex = 0;
    this.lyricIndex = 0;
    this.lyricTimer = 0;
    this.danceAngle = 0;
    this.petalTimer = 0;
    this.cameraOrbitAngle = 0.55;

    // 3D Props container
    this.rootGroup = new THREE.Group();
    this.tablePropsGroup = new THREE.Group();
    this.rootGroup.add(this.tablePropsGroup);
    if (this.scene) this.scene.add(this.rootGroup);

    this.boyRig = null;
    this.girlRig = null;
    this.carDoorPivot = null;
    this.floatingHearts = [];

    // Scratch vectors
    this._v1 = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._v3 = new THREE.Vector3();

    this.onStateChange = null;
    this.onToast = null;
  }

  getVenueConfig() {
    return getVenueById(this.selectedVenueId);
  }

  getWorldVenueData() {
    const venueMap = this.track?.dateVenues || {};
    return venueMap[this.selectedVenueId] || venueMap.shah_rasoi || {
      id: this.selectedVenueId,
      parkingPos: new THREE.Vector3(-12, 0, 108),
      pavilionPos: new THREE.Vector3(-36, 0, 108),
      entryApproachPos: new THREE.Vector3(-23, 0, 108),
      tablePos: new THREE.Vector3(-36, 1.48, 108),
      seatBoyPos: new THREE.Vector3(-36, 0.35, 109.25),
      seatGirlPos: new THREE.Vector3(-36, 0.35, 106.75),
      danceCenterPos: new THREE.Vector3(-32.2, 0.35, 108),
      facingAngle: Math.PI / 2
    };
  }

  selectVenue(venueId, notify = true) {
    const cfg = getVenueById(venueId);
    this.selectedVenueId = cfg.id;
    this.track?.setActiveDateVenue?.(cfg.id);
    if (notify) {
      const favStr = cfg.isFavorite ? ' ★ Favorite Pure Veg Restaurant' : ' (100% Pure Veg)';
      this.onToast?.(`💐 Destination set: ${cfg.name}${favStr}`);
    }
    this.emitUIState();
    return cfg;
  }

  startSession(playerCar, coupleNames, venueId = 'shah_rasoi') {
    this.cleanupVisuals();
    this.playerCar = playerCar;
    this.coupleNames = {
      partner1: (coupleNames?.partner1 || 'Aarav').trim() || 'Aarav',
      partner2: (coupleNames?.partner2 || 'Meera').trim() || 'Meera'
    };
    this.active = true;
    this.phase = 'DRIVING';
    this.orderedDishes = [];
    this.activityMode = 'dine';
    this.selectVenue(venueId || this.selectedVenueId, false);
    this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);
    this.emitUIState();
  }

  stopSession() {
    this.active = false;
    this.phase = 'IDLE';
    this.audio?.stopRomanticDuetSong?.();
    this.cleanupVisuals();
    this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);
    this.playerCar = null;
    this.emitUIState();
  }

  cleanupVisuals() {
    this.removeHingedDoor();
    if (this.boyRig?.root?.parent) this.boyRig.root.parent.remove(this.boyRig.root);
    if (this.girlRig?.root?.parent) this.girlRig.root.parent.remove(this.girlRig.root);
    this.boyRig = null;
    this.girlRig = null;
    while (this.tablePropsGroup.children.length > 0) {
      this.tablePropsGroup.remove(this.tablePropsGroup.children[0]);
    }
    this.floatingHearts.forEach((h) => h.parent?.remove(h));
    this.floatingHearts = [];
  }

  removeHingedDoor() {
    if (this.carDoorPivot?.parent) {
      this.carDoorPivot.parent.remove(this.carDoorPivot);
    }
    this.carDoorPivot = null;
  }

  getDistanceInfo() {
    if (!this.playerCar?.physics) {
      return { distance: 999, canPark: false, headingDeg: 0, speedKmh: 0 };
    }
    const worldVenue = this.getWorldVenueData();
    const carPos = this.playerCar.physics.position;
    const dx = worldVenue.parkingPos.x - carPos.x;
    const dz = worldVenue.parkingPos.z - carPos.z;
    const dist = Math.hypot(dx, dz);

    const worldAngle = Math.atan2(dx, dz);
    let relAngle = worldAngle - this.playerCar.physics.rotationY;
    while (relAngle > Math.PI) relAngle -= Math.PI * 2;
    while (relAngle < -Math.PI) relAngle += Math.PI * 2;

    return {
      distance: dist,
      canPark: dist < 34,
      headingDeg: Math.round((relAngle * 180) / Math.PI),
      speedKmh: Math.round(this.playerCar.physics.speedKmh || 0)
    };
  }

  createStandingPerson(isGirl = false) {
    const root = new THREE.Group();
    const skinMat = new THREE.MeshPhysicalMaterial({ color: isGirl ? 0xe2a882 : 0xd99b72, roughness: 0.48, clearcoat: 0.08 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x161212, roughness: 0.65 });
    const suitMat = new THREE.MeshStandardMaterial({ color: 0x162238, roughness: 0.55 });
    const trouserMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.68 });
    const dressMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.42, metalness: 0.14 });
    const stoleMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.55 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1e1414, roughness: 0.45 });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xb94a58, roughness: 0.42 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x160f0c });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.88, roughness: 0.18 });

    // Lower body: legs / dress skirt
    const hipY = 0.88;
    const legL = new THREE.Group();
    legL.position.set(0.095, hipY, 0);
    const legR = new THREE.Group();
    legR.position.set(-0.095, hipY, 0);

    const thighGeo = new THREE.CylinderGeometry(0.068, 0.056, 0.42, 10);
    const shinGeo = new THREE.CylinderGeometry(0.054, 0.042, 0.42, 10);
    const shoeGeo = new THREE.BoxGeometry(0.11, 0.07, 0.22);

    [legL, legR].forEach((leg) => {
      const thigh = new THREE.Mesh(thighGeo, isGirl ? skinMat : trouserMat);
      thigh.position.y = -0.21;
      const shin = new THREE.Mesh(shinGeo, isGirl ? skinMat : trouserMat);
      shin.position.y = -0.62;
      const shoe = new THREE.Mesh(shoeGeo, isGirl ? dressMat : shoeMat);
      shoe.position.set(0, -0.84, 0.045);
      leg.add(thigh, shin, shoe);
    });
    root.add(legL, legR);

    // Torso
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, hipY, 0);
    const torsoMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(isGirl ? 0.14 : 0.165, isGirl ? 0.12 : 0.135, 0.48, 12),
      isGirl ? dressMat : suitMat
    );
    torsoMesh.scale.set(1.15, 1.0, 0.72);
    torsoMesh.position.y = 0.25;
    torsoGroup.add(torsoMesh);

    if (isGirl) {
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.28, 0.48, 16), dressMat);
      skirt.position.y = -0.14;
      const stole = new THREE.Mesh(new THREE.TorusGeometry(0.165, 0.025, 6, 16, Math.PI * 1.15), stoleMat);
      stole.rotation.x = Math.PI / 2 + 0.2;
      stole.position.set(0, 0.44, 0.01);
      const necklace = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.008, 6, 14), goldMat);
      necklace.rotation.x = Math.PI / 2 + 0.22;
      necklace.position.set(0, 0.48, 0.02);
      torsoGroup.add(skirt, stole, necklace);
    } else {
      const shirtV = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.2, 4), shirtMat);
      shirtV.rotation.x = Math.PI;
      shirtV.position.set(0, 0.36, 0.09);
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.18, 0.02), dressMat);
      tie.position.set(0, 0.32, 0.105);
      torsoGroup.add(shirtV, tie);
    }

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.62, 0.01);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 14), skinMat);
    skull.scale.set(0.92, 1.08, 0.96);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.04, 6), skinMat);
    nose.rotation.x = Math.PI * 0.42;
    nose.position.set(0, -0.008, 0.112);
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.0055, 6, 12, Math.PI), lipMat);
    smile.rotation.z = Math.PI;
    smile.position.set(0, -0.036, 0.102);
    [-0.036, 0.036].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), eyeMat);
      eye.position.set(ex, 0.022, 0.101);
      head.add(eye);
    });
    const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.123, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.58), hairMat);
    hairCap.position.set(0, 0.02, -0.012);
    head.add(skull, nose, smile, hairCap);
    if (isGirl) {
      const backHair = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.08, 0.34, 12), hairMat);
      backHair.scale.set(1.08, 1.0, 0.56);
      backHair.position.set(0, -0.11, -0.075);
      const rose = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), dressMat);
      rose.position.set(0.105, 0.035, -0.01);
      head.add(backHair, rose);
    } else {
      const quiff = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), hairMat);
      quiff.scale.set(1.25, 0.65, 1.0);
      quiff.position.set(0, 0.098, 0.03);
      head.add(quiff);
    }
    torsoGroup.add(head);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.044, 0.034, 0.44, 8);
    const handGeo = new THREE.SphereGeometry(0.036, 8, 8);
    const armL = new THREE.Group();
    armL.position.set(0.20, 0.46, 0);
    const armLMesh = new THREE.Mesh(armGeo, isGirl ? skinMat : suitMat);
    armLMesh.position.y = -0.21;
    const handL = new THREE.Mesh(handGeo, skinMat);
    handL.position.y = -0.45;
    armL.add(armLMesh, handL);

    const armR = new THREE.Group();
    armR.position.set(-0.20, 0.46, 0);
    const armRMesh = new THREE.Mesh(armGeo, isGirl ? skinMat : suitMat);
    armRMesh.position.y = -0.21;
    const handR = new THREE.Mesh(handGeo, skinMat);
    handR.position.y = -0.45;
    armR.add(armRMesh, handR);

    torsoGroup.add(armL, armR);
    root.add(torsoGroup);
    root.scale.setScalar(1.04);

    return { root, legL, legR, armL, armR, torsoGroup, head };
  }

  createHingedPassengerDoor(carColorHex) {
    this.removeHingedDoor();
    if (!this.playerCar?.mesh) return;

    const pivot = new THREE.Group();
    const isSuv = this.playerCar.config?.id?.includes('thar') || this.playerCar.config?.id?.includes('scorpio') || this.playerCar.config?.id?.includes('safari');
    // Passenger side (-X), front hinge at z = +0.58 so door leaf extends toward -Z
    pivot.position.set(isSuv ? -1.04 : -1.00, isSuv ? 0.68 : 0.42, 0.58);

    const paintCol = new THREE.Color(carColorHex || '#00f0ff');
    const doorPaintMat = new THREE.MeshPhysicalMaterial({
      color: paintCol,
      metalness: 0.72,
      roughness: 0.24,
      clearcoat: 0.85
    });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.6 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.34, roughness: 0.08 });

    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.09, isSuv ? 0.64 : 0.50, 1.08), doorPaintMat);
    leaf.position.set(0, 0, -0.54);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.16), trimMat);
    handle.position.set(-0.04, 0.14, -0.88);
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.32, 0.92), glassMat);
    windowFrame.position.set(0.01, isSuv ? 0.45 : 0.36, -0.54);

    pivot.add(leaf, handle, windowFrame);
    this.playerCar.mesh.add(pivot);
    this.carDoorPivot = pivot;
  }

  triggerArrivalCutscene(skipToDining = false) {
    if (!this.active || this.phase === 'CAFE_DINING') return;
    if (!skipToDining && this.phase === 'CUTSCENE_WALK') return;

    const worldVenue = this.getWorldVenueData();

    // Gently park car cleanly facing along track beside the selected café pull-off
    if (this.playerCar?.physics) {
      const p = this.playerCar.physics;
      p.speed = 0;
      p.speedKmh = 0;
      p.velocity.set(0, 0, 0);
      p.angularVelocity = 0;
      p.position.copy(worldVenue.parkingPos);
      p.position.y = 0.05;
      p.rotationY = Math.atan2(
        worldVenue.pavilionPos.x - worldVenue.parkingPos.x,
        worldVenue.pavilionPos.z - worldVenue.parkingPos.z
      ) + Math.PI * 0.5;
      p.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rotationY);
      this.playerCar.mesh.position.copy(p.position);
      this.playerCar.mesh.quaternion.copy(p.quaternion);
    }

    // Spawn articulated walking couple & hinged passenger door
    if (!this.boyRig) {
      this.boyRig = this.createStandingPerson(false);
      this.rootGroup.add(this.boyRig.root);
    }
    if (!this.girlRig) {
      this.girlRig = this.createStandingPerson(true);
      this.rootGroup.add(this.girlRig.root);
    }

    if (skipToDining) {
      this.enterCafeDining();
      return;
    }

    this.createHingedPassengerDoor(this.playerCar?.color);
    this.phase = 'CUTSCENE_WALK';
    this.cutsceneTime = 0;
    this.doorOpenedPlayed = false;
    this.partnerSteppedOut = false;

    // Boy gets out first; girl stays seated until he opens her door
    this.playerCar?.modelData?.setCrewSeatedVisible?.(false, true);
    this.girlRig.root.visible = false;
    this.boyRig.root.visible = true;

    const venueCfg = this.getVenueConfig();
    this.onToast?.(`💖 Arrived at ${venueCfg.name}! ${this.coupleNames.partner1} steps out to open ${this.coupleNames.partner2}'s door...`);
    this.emitUIState();
  }

  enterCafeDining() {
    this.phase = 'CAFE_DINING';
    this.playerCar?.modelData?.setCrewSeatedVisible?.(false, false);
    if (this.carDoorPivot) this.carDoorPivot.rotation.y = 0;
    if (!this.boyRig) {
      this.boyRig = this.createStandingPerson(false);
      this.rootGroup.add(this.boyRig.root);
    }
    if (!this.girlRig) {
      this.girlRig = this.createStandingPerson(true);
      this.rootGroup.add(this.girlRig.root);
    }
    this.boyRig.root.visible = true;
    this.girlRig.root.visible = true;
    this.activityMode = 'dine';
    this.activityTimer = 0;

    for (let i = 0; i < 16; i++) {
      this.particles?.emitPetal?.(this.getWorldVenueData().tablePos);
    }

    const venueCfg = this.getVenueConfig();
    this.onToast?.(`🪷 Welcome inside ${venueCfg.name} (${venueCfg.cuisineTag})!`);
    this.emitUIState();
  }

  orderDish(dishId) {
    if (this.phase !== 'CAFE_DINING') return null;
    const venue = this.getVenueConfig();
    const dish = venue.menu.find((m) => m.id === dishId) || venue.menu[0];
    if (!dish) return null;

    this.orderedDishes.push({ ...dish, orderedAt: Date.now() });
    this.placeDishOnTable(dish, this.orderedDishes.length - 1);
    this.activityMode = 'dine';
    this.activityTimer = 2.6;
    this.audio?.playCelebrateChime?.();
    this.spawnFloatingHearts(2, this.getWorldVenueData().tablePos);
    this.onToast?.(`${dish.icon} Served: ${dish.name} (100% Pure Veg)`);
    this.emitUIState();
    return dish;
  }

  placeDishOnTable(dish, slotIndex) {
    const worldVenue = this.getWorldVenueData();
    const tp = worldVenue.tablePos;
    const angles = [0.25, 1.35, 2.35, 3.45, 4.45, 5.45, 0.8, 2.9];
    const ang = angles[slotIndex % angles.length];
    const radius = slotIndex < 4 ? 0.34 : 0.50;
    const px = tp.x + Math.cos(ang) * radius;
    const pz = tp.z + Math.sin(ang) * radius;
    const py = tp.y + 0.02;

    const dishGroup = new THREE.Group();
    dishGroup.position.set(px, py, pz);

    const plateMat = new THREE.MeshStandardMaterial({ color: 0xfef9f0, roughness: 0.2, metalness: 0.15 });
    const foodMat = new THREE.MeshStandardMaterial({ color: dish.color || 0xfbbf24, roughness: 0.45, metalness: 0.08 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.8 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, metalness: 0.85 });

    if (dish.propType === 'handi') {
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.085, 0.11, 14), copperMat);
      pot.position.y = 0.055;
      const curry = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.025, 14), foodMat);
      curry.position.y = 0.105;
      dishGroup.add(pot, curry);
    } else if (dish.propType === 'goblet' || dish.propType === 'cup') {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.04, 0.08, 10), goldMat);
      stem.position.y = 0.04;
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.058, 0.036, 0.11, 12),
        new THREE.MeshPhysicalMaterial({ color: dish.color || 0x38bdf8, transparent: true, opacity: 0.78, roughness: 0.12 })
      );
      cup.position.y = 0.11;
      dishGroup.add(stem, cup);
    } else if (dish.propType === 'cake' || dish.propType === 'dessert') {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.10, 0.018, 14), plateMat);
      plate.position.y = 0.009;
      const cake = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.082, 0.09, 14), foodMat);
      cake.position.y = 0.06;
      const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
      cherry.position.y = 0.115;
      dishGroup.add(plate, cake, cherry);
    } else {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.115, 0.02, 16), plateMat);
      plate.position.y = 0.01;
      dishGroup.add(plate);
      for (let i = 0; i < 4; i++) {
        const piece = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), foodMat);
        piece.scale.set(1.2, 0.65, 1.0);
        const a = (i / 4) * Math.PI * 2;
        piece.position.set(Math.cos(a) * 0.045, 0.038, Math.sin(a) * 0.045);
        dishGroup.add(piece);
      }
    }

    this.tablePropsGroup.add(dishGroup);
  }

  triggerCelebrate() {
    if (this.phase !== 'CAFE_DINING') return;
    this.activityMode = 'toast';
    this.activityTimer = 4.2;
    const worldVenue = this.getWorldVenueData();
    this.particles?.emitConfetti?.(worldVenue.tablePos);
    for (let i = 0; i < 22; i++) {
      this.particles?.emitPetal?.(worldVenue.tablePos);
    }
    this.spawnFloatingHearts(8, worldVenue.tablePos);
    this.audio?.playCelebrateChime?.();
    this.onToast?.(`🥂 ${this.coupleNames.partner1} & ${this.coupleNames.partner2} celebrate at ${this.getVenueConfig().name}!`);
    this.emitUIState();
  }

  triggerSingDuet(songIdx = null) {
    if (this.phase !== 'CAFE_DINING') return;
    if (typeof songIdx === 'number') {
      this.songIndex = songIdx % DATE_DUET_SONGS.length;
    } else if (this.activityMode === 'sing') {
      this.songIndex = (this.songIndex + 1) % DATE_DUET_SONGS.length;
    }
    const song = DATE_DUET_SONGS[this.songIndex];
    this.activityMode = 'sing';
    this.activityTimer = 14.0;
    this.lyricIndex = 0;
    this.lyricTimer = 0;

    this.audio?.playRomanticDuetSong?.(song);
    this.spawnFloatingHearts(6, this.getWorldVenueData().tablePos);
    this.onToast?.(`🎤 Singing Together: "${song.title}"`);
    this.emitUIState();
  }

  triggerSlowDance() {
    if (this.phase !== 'CAFE_DINING') return;
    this.activityMode = 'dance';
    this.activityTimer = 15.0;
    this.danceAngle = 0;

    const song = DATE_DUET_SONGS[this.songIndex % DATE_DUET_SONGS.length];
    this.audio?.playRomanticDuetSong?.(song);
    for (let i = 0; i < 24; i++) {
      this.particles?.emitPetal?.(this.getWorldVenueData().danceCenterPos);
    }
    this.spawnFloatingHearts(8, this.getWorldVenueData().danceCenterPos);
    this.onToast?.(`💃 Slow Dancing under Fairy Lights — ${this.coupleNames.partner1} ♥ ${this.coupleNames.partner2}!`);
    this.emitUIState();
  }

  returnToCarAndDrive() {
    if (!this.active) return;
    this.audio?.stopRomanticDuetSong?.();
    this.phase = 'DRIVING';
    this.activityMode = 'dine';
    this.removeHingedDoor();
    if (this.boyRig?.root) this.boyRig.root.visible = false;
    if (this.girlRig?.root) this.girlRig.root.visible = false;
    this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);

    if (this.playerCar?.physics) {
      const worldVenue = this.getWorldVenueData();
      this.playerCar.physics.position.copy(worldVenue.parkingPos);
      this.playerCar.physics.position.y = 0.05;
      this.playerCar.physics.speed = 0;
      this.playerCar.physics.speedKmh = 0;
    }
    this.cameraCtrl?.setMode?.('CHASE');
    this.onToast?.(`🚗 Back on Emerald Boulevard — pick another Pure Veg Café anytime!`);
    this.emitUIState();
  }

  spawnFloatingHearts(count, origin) {
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff2a6d,
      emissive: 0x9f1239,
      emissiveIntensity: 0.7,
      roughness: 0.3
    });
    const heartGeo = new THREE.SphereGeometry(0.11, 8, 8);
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(heartGeo, heartMat);
      mesh.scale.set(1.15, 0.9, 0.5);
      mesh.position.set(
        origin.x + (Math.random() - 0.5) * 2.2,
        origin.y + 0.35 + Math.random() * 0.5,
        origin.z + (Math.random() - 0.5) * 2.2
      );
      mesh.userData = {
        life: 2.4 + Math.random() * 1.2,
        vy: 0.9 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.4
      };
      this.rootGroup.add(mesh);
      this.floatingHearts.push(mesh);
    }
  }

  carLocalToWorld(lx, ly, lz, outVec) {
    outVec.set(lx, ly, lz);
    if (this.playerCar?.mesh) {
      outVec.applyQuaternion(this.playerCar.mesh.quaternion);
      outVec.add(this.playerCar.mesh.position);
    }
    return outVec;
  }

  setWalkCycle(rig, phase, sway = 1) {
    const swing = Math.sin(phase) * 0.42 * sway;
    rig.legL.rotation.x = swing;
    rig.legR.rotation.x = -swing;
    rig.armL.rotation.x = -swing * 0.7;
    rig.armR.rotation.x = swing * 0.7;
  }

  update(dt) {
    if (!this.active) return;

    // Update floating heart sparkles
    for (let i = this.floatingHearts.length - 1; i >= 0; i--) {
      const h = this.floatingHearts[i];
      h.userData.life -= dt;
      if (h.userData.life <= 0) {
        h.parent?.remove(h);
        this.floatingHearts.splice(i, 1);
      } else {
        h.position.y += h.userData.vy * dt;
        h.position.x += h.userData.vx * dt;
        h.rotation.y += dt * 3;
      }
    }

    const worldVenue = this.getWorldVenueData();

    if (this.phase === 'DRIVING') {
      const info = this.getDistanceInfo();
      if (info.distance < 15.5 && info.speedKmh < 26) {
        this.triggerArrivalCutscene(false);
      }
      this.emitUIState(info);
      return;
    }

    if (this.phase === 'CUTSCENE_WALK') {
      this.cutsceneTime += dt;
      const t = this.cutsceneTime;
      const boyOutPos = this.carLocalToWorld(1.55, 0.05, -0.1, new THREE.Vector3());
      const noseBoyPos = this.carLocalToWorld(1.45, 0.05, 2.75, new THREE.Vector3());
      const noseGirlPos = this.carLocalToWorld(-1.45, 0.05, 2.75, new THREE.Vector3());
      const girlDoorStandPos = this.carLocalToWorld(-1.62, 0.05, -0.08, new THREE.Vector3());
      const girlStepOutPos = this.carLocalToWorld(-1.05, 0.05, -0.06, new THREE.Vector3());
      const holdHandsMidBoy = new THREE.Vector3().lerpVectors(girlDoorStandPos, worldVenue.entryApproachPos, 0.5);
      const cafeEntryBoy = worldVenue.seatBoyPos;
      const cafeEntryGirl = worldVenue.seatGirlPos;

      // Stage 1 (0 - 2.6s): Boy walks from driver side around nose to girl's passenger door
      if (t < 2.6) {
        const u = t / 2.6;
        if (u < 0.35) {
          this.boyRig.root.position.lerpVectors(boyOutPos, noseBoyPos, u / 0.35);
        } else if (u < 0.65) {
          this.boyRig.root.position.lerpVectors(noseBoyPos, noseGirlPos, (u - 0.35) / 0.30);
        } else {
          this.boyRig.root.position.lerpVectors(noseGirlPos, girlDoorStandPos, (u - 0.65) / 0.35);
        }
        this.setWalkCycle(this.boyRig, t * 7.5, 1);
        this.boyRig.root.lookAt(
          u < 0.35 ? noseBoyPos : (u < 0.65 ? noseGirlPos : girlDoorStandPos)
        );
      }
      // Stage 2 (2.6 - 4.0s): Boy reaches out & opens passenger side door (+Y swings outward!)
      else if (t < 4.0) {
        const u = (t - 2.6) / 1.4;
        this.boyRig.root.position.copy(girlDoorStandPos);
        this.boyRig.root.lookAt(girlStepOutPos);
        this.setWalkCycle(this.boyRig, 0, 0);
        this.boyRig.armR.rotation.x = -1.05 * Math.sin(Math.min(1, u * 1.4) * Math.PI * 0.5);

        if (!this.doorOpenedPlayed) {
          this.doorOpenedPlayed = true;
          this.audio?.playDoorLatch?.();
        }
        if (this.carDoorPivot) {
          this.carDoorPivot.rotation.y = 1.08 * Math.min(1, u * 1.25);
        }
        if (u > 0.45 && !this.partnerSteppedOut) {
          this.partnerSteppedOut = true;
          this.playerCar?.modelData?.setCrewSeatedVisible?.(false, false);
          this.girlRig.root.visible = true;
          this.girlRig.root.position.copy(girlStepOutPos);
          this.onToast?.(`💖 ${this.coupleNames.partner1} opens the car door for ${this.coupleNames.partner2}!`);
        }
        if (this.partnerSteppedOut) {
          this.girlRig.root.position.lerpVectors(
            girlStepOutPos,
            this.carLocalToWorld(-1.58, 0.05, 0.35, new THREE.Vector3()),
            Math.max(0, (u - 0.45) / 0.55)
          );
          this.girlRig.root.lookAt(girlDoorStandPos);
          this.setWalkCycle(this.girlRig, t * 6.5, 0.7);
        }
      }
      // Stage 3 (4.0 - 7.8s): Both walk hand-in-hand up velvet carpet into selected café!
      else if (t < 7.8) {
        const u = (t - 4.0) / 3.8;
        if (this.carDoorPivot) {
          this.carDoorPivot.rotation.y = Math.max(0, 1.08 * (1 - u * 2.2));
        }
        const sideOffset = new THREE.Vector3(-0.34, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldVenue.facingAngle);
        const startCenter = girlDoorStandPos.clone().lerp(holdHandsMidBoy, 0.15);
        const endCenter = cafeEntryBoy.clone().lerp(cafeEntryGirl, 0.5);
        const midCenter = worldVenue.entryApproachPos;
        const currCenter = u < 0.45
          ? startCenter.clone().lerp(midCenter, u / 0.45)
          : midCenter.clone().lerp(endCenter, (u - 0.45) / 0.55);

        this.boyRig.root.position.copy(currCenter).add(sideOffset);
        this.girlRig.root.position.copy(currCenter).sub(sideOffset);
        this.boyRig.root.lookAt(endCenter);
        this.girlRig.root.lookAt(endCenter);
        this.setWalkCycle(this.boyRig, t * 7.0, 1);
        this.setWalkCycle(this.girlRig, t * 7.0 + Math.PI * 0.25, 1);
        // Holding inner hands lightly raised
        this.boyRig.armR.rotation.x = -0.35;
        this.boyRig.armR.rotation.z = -0.25;
        this.girlRig.armL.rotation.x = -0.35;
        this.girlRig.armL.rotation.z = 0.25;
      } else {
        this.enterCafeDining();
        return;
      }

      // Smooth cutscene camera tracking couple outside car & café
      const focusTarget = (t < 4.0 ? this.boyRig.root.position : this.boyRig.root.position.clone().lerp(this.girlRig.root.position, 0.5))
        .clone().add(new THREE.Vector3(0, 1.15, 0));
      const camPos = focusTarget.clone().add(new THREE.Vector3(
        t < 4.2 ? -4.8 : -5.5,
        1.65,
        t < 4.2 ? 3.8 : 4.2
      ));
      this.cameraCtrl?.setExternalCameraPose?.(camPos, focusTarget, dt);
      return;
    }

    if (this.phase === 'CAFE_DINING') {
      const nowSec = performance.now() * 0.001;
      this.petalTimer += dt;
      if (this.activityTimer > 0) {
        this.activityTimer -= dt;
      }

      if (this.activityMode === 'dance') {
        // Couple slow-dances gracefully together under fairy lights
        this.danceAngle += dt * 0.72;
        const center = worldVenue.danceCenterPos;
        const sep = 0.34;
        const bx = center.x + Math.cos(this.danceAngle) * sep;
        const bz = center.z + Math.sin(this.danceAngle) * sep;
        const gx = center.x - Math.cos(this.danceAngle) * sep;
        const gz = center.z - Math.sin(this.danceAngle) * sep;

        this.boyRig.root.position.set(bx, center.y, bz);
        this.girlRig.root.position.set(gx, center.y, gz);
        this.boyRig.root.lookAt(gx, center.y, gz);
        this.girlRig.root.lookAt(bx, center.y, bz);

        const sway = Math.sin(nowSec * 3.2) * 0.14;
        this.boyRig.torsoGroup.rotation.z = sway;
        this.girlRig.torsoGroup.rotation.z = -sway;
        this.boyRig.armL.rotation.x = -1.25;
        this.boyRig.armR.rotation.x = -1.05;
        this.girlRig.armL.rotation.x = -1.05;
        this.girlRig.armR.rotation.x = -1.25;
        this.setWalkCycle(this.boyRig, nowSec * 4.2, 0.38);
        this.setWalkCycle(this.girlRig, nowSec * 4.2 + 0.5, 0.38);

        if (this.petalTimer > 0.22) {
          this.petalTimer = 0;
          this.particles?.emitPetal?.(center);
        }
      } else {
        // Seated / standing warmly across candlelit Pure Veg dining table
        this.boyRig.root.position.copy(worldVenue.seatBoyPos);
        this.girlRig.root.position.copy(worldVenue.seatGirlPos);
        this.boyRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatBoyPos.y, worldVenue.tablePos.z);
        this.girlRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatGirlPos.y, worldVenue.tablePos.z);

        this.setWalkCycle(this.boyRig, 0, 0);
        this.setWalkCycle(this.girlRig, 0, 0);
        this.boyRig.torsoGroup.rotation.z = 0;
        this.girlRig.torsoGroup.rotation.z = 0;

        if (this.activityMode === 'toast') {
          const raise = -1.75 + Math.sin(nowSec * 6.5) * 0.25;
          this.boyRig.armR.rotation.x = raise;
          this.girlRig.armR.rotation.x = raise;
          this.boyRig.armL.rotation.x = -0.5;
          this.girlRig.armL.rotation.x = -0.5;
        } else if (this.activityMode === 'sing') {
          this.lyricTimer += dt;
          const song = DATE_DUET_SONGS[this.songIndex % DATE_DUET_SONGS.length];
          if (this.lyricTimer > 3.2) {
            this.lyricTimer = 0;
            this.lyricIndex = (this.lyricIndex + 1) % song.lyrics.length;
            this.spawnFloatingHearts(2, worldVenue.tablePos);
            this.emitUIState();
          }
          const bob = Math.sin(nowSec * 5.0) * 0.12;
          this.boyRig.head.rotation.x = bob;
          this.girlRig.head.rotation.x = -bob;
          this.boyRig.armL.rotation.x = -0.95 + Math.sin(nowSec * 4) * 0.2;
          this.girlRig.armR.rotation.x = -0.95 + Math.cos(nowSec * 4) * 0.2;
        } else {
          // Relaxed happy table chatter
          this.boyRig.head.rotation.y = Math.sin(nowSec * 1.4) * 0.12;
          this.girlRig.head.rotation.y = Math.cos(nowSec * 1.3) * 0.14;
          this.boyRig.armR.rotation.x = -0.75 + Math.sin(nowSec * 2.4) * 0.12;
          this.girlRig.armL.rotation.x = -0.75 + Math.cos(nowSec * 2.1) * 0.12;
        }
      }

      // Romantic gentle camera orbit around café table / dance spot
      this.cameraOrbitAngle += dt * (this.activityMode === 'dance' ? 0.34 : 0.18);
      const lookCenter = (this.activityMode === 'dance' ? worldVenue.danceCenterPos : worldVenue.tablePos)
        .clone().add(new THREE.Vector3(0, this.activityMode === 'dance' ? 1.15 : 0.1, 0));
      const orbitDist = this.activityMode === 'dance' ? 4.4 : 4.8;
      const camPos = new THREE.Vector3(
        lookCenter.x + Math.cos(this.cameraOrbitAngle) * orbitDist,
        lookCenter.y + 1.85,
        lookCenter.z + Math.sin(this.cameraOrbitAngle) * orbitDist
      );
      this.cameraCtrl?.setExternalCameraPose?.(camPos, lookCenter, dt);
    }
  }

  getActiveLyricLine() {
    if (this.activityMode !== 'sing') return null;
    const song = DATE_DUET_SONGS[this.songIndex % DATE_DUET_SONGS.length];
    const line = song.lyrics[this.lyricIndex % song.lyrics.length];
    const who = line.singer === 'boy'
      ? this.coupleNames.partner1
      : (line.singer === 'girl' ? this.coupleNames.partner2 : `${this.coupleNames.partner1} & ${this.coupleNames.partner2}`);
    return { songTitle: song.title, singerName: who, text: line.text };
  }

  emitUIState(distInfo = null) {
    if (!this.onStateChange) return;
    const info = distInfo || this.getDistanceInfo();
    this.onStateChange({
      active: this.active,
      phase: this.phase,
      venue: this.getVenueConfig(),
      coupleNames: this.coupleNames,
      distance: Math.round(info.distance),
      headingDeg: info.headingDeg,
      canPark: info.canPark,
      orderedDishes: this.orderedDishes,
      activityMode: this.activityMode,
      lyric: this.getActiveLyricLine()
    });
  }
}
