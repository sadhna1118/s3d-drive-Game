/**
 * S3D Drive — Romantic Date Mode Experience Manager
 * Handles Pure Veg Café & Restaurant venues (including favorite Shah Rasoi),
 * roadside arrival & car-door opening, chair-pulling seating etiquette,
 * visible candlelight dining & feeding each other, "Will you marry me?" proposing corner
 * with heart-shaped arch & red heart balloons, cake cutting together, dance twirl,
 * and visible return to car (partner first -> driver) + drive home to Home Sweet Home.
 */

export const ALL_PURE_VEG_MENU_ITEMS = [
  // --- DOSA (ALL VARIETIES) ---
  { id: 'masala_dosa', name: 'Crispy Masala Dosa', cat: 'Dosa', icon: '🥞', propType: 'dosa', color: 0xd97706 },
  { id: 'butter_roast_dosa', name: 'Paper Butter Roast Dosa', cat: 'Dosa', icon: '🫓', propType: 'dosa', color: 0xfbbf24 },
  { id: 'paneer_dosa', name: 'Paneer Makhani Dosa', cat: 'Dosa', icon: '🧀', propType: 'dosa', color: 0xf59e0b },
  { id: 'mysore_cheese_dosa', name: 'Cheese Burst Mysore Dosa', cat: 'Dosa', icon: '🥞', propType: 'dosa', color: 0xfde047 },
  { id: 'rava_dosa', name: 'Crispy Rava Pure Veg Dosa', cat: 'Dosa', icon: '🫓', propType: 'dosa', color: 0xeab308 },

  // --- STREET FOOD, CHAAT & SNACKS ---
  { id: 'chhole_bhature', name: 'Amritsari Chhole Bhature', cat: 'Chaat & Snacks', icon: '🥘', propType: 'chhole_bhature', color: 0xc2410c },
  { id: 'golgappe', name: 'Crispy Suji Golgappe', cat: 'Chaat & Snacks', icon: '🟢', propType: 'golgappe', color: 0xeab308 },
  { id: 'dahi_golgappe', name: 'Meetha Dahi Golgappe', cat: 'Chaat & Snacks', icon: '🥣', propType: 'golgappe', color: 0xfef9c3 },
  { id: 'veg_momos', name: 'Steamed & Crispy Veg Momos', cat: 'Chaat & Snacks', icon: '🥟', propType: 'momos', color: 0xfaf5ff },
  { id: 'veg_chowmein', name: 'Wok-Tossed Pure Veg Chowmein', cat: 'Chaat & Snacks', icon: '🍜', propType: 'chowmein', color: 0xf59e0b },

  // --- PIZZA & ROYAL MAINS ---
  { id: 'farmhouse_pizza', name: 'Farmhouse Cheese Burst Pizza', cat: 'Pizza & Mains', icon: '🍕', propType: 'pizza', color: 0xef4444 },
  { id: 'margherita_pizza', name: 'Wood-Fired Margherita Pizza', cat: 'Pizza & Mains', icon: '🍕', propType: 'pizza', color: 0xdc2626 },
  { id: 'paneer_pizza', name: 'Tandoori Paneer Pizza', cat: 'Pizza & Mains', icon: '🍕', propType: 'pizza', color: 0xf97316 },
  { id: 'shahi_paneer', name: 'Royal Shahi Paneer & Butter Naan', cat: 'Pizza & Mains', icon: '🍲', propType: 'handi', color: 0xf59e0b },
  { id: 'dal_bukhara', name: 'Dal Bukhara & Zafrani Pulao', cat: 'Pizza & Mains', icon: '🍚', propType: 'handi', color: 0x9a3412 },

  // --- CHOCOLATE SHAKES, STRAWBERRY SHAKE, MAZAA & JUICES ---
  { id: 'belgian_choco_shake', name: 'Belgian Dark Chocolate Shake', cat: 'Shakes & Juices', icon: '🍫', propType: 'shake', color: 0x3b1e08 },
  { id: 'oreo_choco_shake', name: 'Oreo Fudge Chocolate Shake', cat: 'Shakes & Juices', icon: '🥛', propType: 'shake', color: 0x291509 },
  { id: 'ferrero_choco_shake', name: 'Ferrero Rocher Chocolate Shake', cat: 'Shakes & Juices', icon: '🥤', propType: 'shake', color: 0x5c2d0e },
  { id: 'kitkat_choco_shake', name: 'KitKat Crunch Chocolate Shake', cat: 'Shakes & Juices', icon: '🧋', propType: 'shake', color: 0x6d3b14 },
  { id: 'strawberry_shake', name: 'Strawberry Cream Thick Shake', cat: 'Shakes & Juices', icon: '🍓', propType: 'shake', color: 0xfb7185 },
  { id: 'mazaa_drink', name: 'Chilled Mazaa Mango Bottle', cat: 'Shakes & Juices', icon: '🥭', propType: 'juice', color: 0xf59e0b },
  { id: 'mango_juice', name: 'Fresh Alphonso Mango Juice', cat: 'Shakes & Juices', icon: '🧃', propType: 'juice', color: 0xfbbf24 },
  { id: 'watermelon_juice', name: 'Chilled Watermelon Juice', cat: 'Shakes & Juices', icon: '🍉', propType: 'juice', color: 0xf43f5e },

  // --- CAKES (EVERY KIND — RED VELVET & CHOCOLATE ARE MUST ★) ---
  { id: 'red_velvet_cake', name: 'Royal Red Velvet Heart Cake ★', cat: 'Cakes', icon: '❤️', propType: 'cake', color: 0xbe123c, isMustCake: true },
  { id: 'chocolate_truffle_cake', name: 'Double Truffle Chocolate Cake ★', cat: 'Cakes', icon: '🍫', propType: 'cake', color: 0x3a180a, isMustCake: true },
  { id: 'black_forest_cake', name: 'Classic Black Forest Cake', cat: 'Cakes', icon: '🎂', propType: 'cake', color: 0x451a03 },
  { id: 'butterscotch_cake', name: 'Caramel Butterscotch Praline Cake', cat: 'Cakes', icon: '🍰', propType: 'cake', color: 0xd97706 },
  { id: 'pineapple_cake', name: 'Fresh Pineapple Cream Cake', cat: 'Cakes', icon: '🍍', propType: 'cake', color: 0xfde047 },
  { id: 'blueberry_cake', name: 'Blueberry Velvet Cheesecake', cat: 'Cakes', icon: '🫐', propType: 'cake', color: 0x6366f1 }
];

export const PURE_VEG_VENUES = [
  {
    id: 'shah_rasoi',
    name: 'Shah Rasoi',
    shortName: 'Shah Rasoi ★',
    badge: '★ FAVORITE',
    isFavorite: true,
    cuisineTag: '100% Pure Veg • Candlelight Dining & Proposing Corner',
    tagline: 'Our Favorite Romantic Pure Veg Restaurant • All Dosas, Chaat, Cakes & Heart Gate',
    accentColor: '#ff4d88',
    accentHex: 0xff4d88,
    glowHex: 0xffb703,
    menu: ALL_PURE_VEG_MENU_ITEMS
  },
  {
    id: 'velvet_brew',
    name: 'Velvet Brew Café',
    shortName: 'Velvet Brew Café',
    badge: 'PURE VEG CAFÉ',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Shakes, Cakes, Dosa, Pizza & Bistro',
    tagline: 'Fairy-Lit Espresso, All Chocolate Shakes, Red Velvet Cakes & Rose Gate',
    accentColor: '#fb923c',
    accentHex: 0xfb923c,
    glowHex: 0xffd166,
    menu: ALL_PURE_VEG_MENU_ITEMS
  },
  {
    id: 'moonlight_courtyard',
    name: 'Moonlight Courtyard',
    shortName: 'Moonlight Courtyard',
    badge: 'PURE VEG LOUNGE',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Starlight Terrace, Juices & Cakes',
    tagline: 'Candlelit Courtyard, Chhole Bhature, Golgappe, Juices & Heart Balloons',
    accentColor: '#38bdf8',
    accentHex: 0x38bdf8,
    glowHex: 0x7dd3fc,
    menu: ALL_PURE_VEG_MENU_ITEMS
  },
  {
    id: 'rosewood_bistro',
    name: 'Rosewood Bistro',
    shortName: 'Rosewood Bistro',
    badge: 'PURE VEG BISTRO',
    isFavorite: false,
    cuisineTag: '100% Pure Veg • Momos, Chowmein, Dosa & Desserts',
    tagline: 'Warm Acoustic Candlelight, Red Velvet Cake & "Will You Marry Me?" Arch',
    accentColor: '#c084fc',
    accentHex: 0xc084fc,
    glowHex: 0xf0abfc,
    menu: ALL_PURE_VEG_MENU_ITEMS
  }
];

export const DATE_DUET_SONGS = [
  {
    id: 'shaam_rangeen',
    title: 'Shaam Rangeen • Candlelight Duet',
    chords: [
      [261.63, 329.63, 392.00],
      [220.00, 261.63, 329.63],
      [174.61, 220.00, 261.63],
      [196.00, 246.94, 293.66]
    ],
    melody: [523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.00, 392.00],
    lyrics: [
      { singer: 'boy', text: '♫ "Chaandni raat mein, tere saath yeh safar..."' },
      { singer: 'girl', text: '♫ "Dil ki har dhadkan pe, bas tera hi asar..."' },
      { singer: 'boy', text: '♫ "Shah Rasoi ki khushboo aur yeh candle night pyaari..."' },
      { singer: 'both', text: '♫ "Hamesha saath chalenge, yeh zindagi humaari!" ♥' }
    ]
  },
  {
    id: 'starlight_serenade',
    title: 'Will You Marry Me? • Proposal Waltz',
    chords: [
      [293.66, 369.99, 440.00],
      [246.94, 293.66, 369.99],
      [196.00, 246.94, 293.66],
      [220.00, 277.18, 329.63]
    ],
    melody: [587.33, 659.25, 739.99, 659.25, 587.33, 554.37, 493.88, 440.00],
    lyrics: [
      { singer: 'boy', text: '♫ "Under red heart balloons and this golden archway..."' },
      { singer: 'girl', text: '♫ "Every smile over dinner makes me want to stay..."' },
      { singer: 'both', text: '♫ "Spin and twirl with me, forever begins today!" ♥' }
    ]
  },
  {
    id: 'dil_ka_karwaan',
    title: 'Dil Ka Karwaan • Celebration Duet',
    chords: [
      [349.23, 440.00, 523.25],
      [293.66, 349.23, 440.00],
      [233.08, 293.66, 349.23],
      [261.63, 329.63, 392.00]
    ],
    melody: [698.46, 659.25, 587.33, 523.25, 587.33, 659.25, 698.46, 783.99],
    lyrics: [
      { singer: 'boy', text: '♫ "Khola pyaar se darwaza, chair baithayi pyaar se..."' },
      { singer: 'girl', text: '♫ "Khilaya cake aur dosa humne dil ke izhaar se!"' },
      { singer: 'both', text: '♫ "Chalo ab ghr chalein, muskurate hue saath!" 🏡♥' }
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
    // Phases: 'IDLE' | 'DRIVING' | 'CUTSCENE_WALK' | 'CAFE_DINING' | 'CUTSCENE_RETURN' | 'DRIVE_HOME' | 'HOME_ARRIVED'
    this.phase = 'IDLE';
    this.selectedVenueId = 'shah_rasoi';
    this.coupleNames = { partner1: 'Aarav', partner2: 'Meera' };
    this.playerCar = null;

    // Cutscene timelines
    this.cutsceneTime = 0;
    this.doorOpenedPlayed = false;
    this.partnerSteppedOut = false;
    this.chairPulledMsg = false;
    this.returnStepNotified = false;
    this.returnDriverNotified = false;

    // Dining & entertainment
    this.orderedDishes = [];
    // activityMode: 'dine' | 'feed' | 'toast' | 'cake_cut' | 'sing' | 'dance' | 'propose'
    this.activityMode = 'dine';
    this.activityTimer = 0;
    this.activeFoodLabel = '';
    this.songIndex = 0;
    this.lyricIndex = 0;
    this.lyricTimer = 0;
    this.danceAngle = 0;
    this.twirlTimer = 0;
    this.petalTimer = 0;
    this.cameraOrbitAngle = 0.25;

    // Cake cutting state
    this.activeCakeGroup = null;
    this.activeCakeSlice = null;

    // 3D Props container & Crisp Dynamic Studio Lighting Rig
    this.rootGroup = new THREE.Group();
    this.tablePropsGroup = new THREE.Group();
    this.rootGroup.add(this.tablePropsGroup);
    this.initStudioLighting();
    if (this.scene) this.scene.add(this.rootGroup);

    this.boyRig = null;
    this.girlRig = null;
    this.carDoorPivot = null;
    this.floatingHearts = [];

    this._v1 = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._v3 = new THREE.Vector3();

    this.onStateChange = null;
    this.onToast = null;
  }

  initStudioLighting() {
    // Dedicated 3-point candlelight + romantic ambiance rig positioned right at the active scene
    this.cafeKeyLight = new THREE.PointLight(0xffe0b2, 0, 42);
    this.cafeCandleLight = new THREE.PointLight(0xffb76b, 0, 24);
    this.cafeRomanceLight = new THREE.PointLight(0xff5e99, 0, 28);
    this.rootGroup.add(this.cafeKeyLight, this.cafeCandleLight, this.cafeRomanceLight);
  }

  updateStudioLighting(enable, centerPos, lookPos = null) {
    if (!enable || !centerPos) {
      if (this.cafeKeyLight) this.cafeKeyLight.intensity = 0;
      if (this.cafeCandleLight) this.cafeCandleLight.intensity = 0;
      if (this.cafeRomanceLight) this.cafeRomanceLight.intensity = 0;
      return;
    }
    this.cafeKeyLight.position.set(centerPos.x + 1.8, centerPos.y + 4.4, centerPos.z + 1.8);
    this.cafeKeyLight.intensity = 2.6;

    this.cafeCandleLight.position.set(centerPos.x, centerPos.y + 0.95, centerPos.z);
    const flicker = 2.0 + Math.sin(performance.now() * 0.008) * 0.22;
    this.cafeCandleLight.intensity = flicker;

    const rTarget = lookPos || centerPos;
    this.cafeRomanceLight.position.set(rTarget.x - 2.2, rTarget.y + 2.2, rTarget.z - 2.2);
    this.cafeRomanceLight.intensity = 1.45;
  }

  getVenueConfig() {
    if (this.phase === 'DRIVE_HOME' || this.phase === 'HOME_ARRIVED') {
      return {
        id: 'home_villa',
        name: 'Home Sweet Home',
        shortName: 'Home Sweet Home ♥',
        badge: '🏡 HOME',
        isFavorite: true,
        cuisineTag: 'Safe Drive Home • Happily Ever After',
        tagline: 'Back home safely after a magical candlelit pure-veg date!',
        accentColor: '#4ade80',
        accentHex: 0x4ade80,
        menu: ALL_PURE_VEG_MENU_ITEMS
      };
    }
    return getVenueById(this.selectedVenueId);
  }

  getWorldVenueData() {
    if (this.phase === 'DRIVE_HOME' || this.phase === 'HOME_ARRIVED') {
      return this.track?.homeVenue || {
        id: 'home_villa',
        name: 'Home Sweet Home',
        pavilionPos: new THREE.Vector3(38, 0, -45),
        parkingPos: new THREE.Vector3(16, 0, -45),
        entryApproachPos: new THREE.Vector3(24, 0, -45),
        tablePos: new THREE.Vector3(35, 1.2, -45),
        porchBoyPos: new THREE.Vector3(35.5, 0.42, -45.5),
        porchGirlPos: new THREE.Vector3(35.5, 0.42, -44.5),
        facingAngle: Math.PI / 2
      };
    }
    const venueMap = this.track?.dateVenues || {};
    return venueMap[this.selectedVenueId] || venueMap.shah_rasoi || {
      id: this.selectedVenueId,
      parkingPos: new THREE.Vector3(-14.5, 0, 108),
      pavilionPos: new THREE.Vector3(-37, 0, 108),
      entryApproachPos: new THREE.Vector3(-23, 0, 108),
      tablePos: new THREE.Vector3(-37, 1.46, 108),
      seatBoyPos: new THREE.Vector3(-37, 0.50, 109.08),
      seatGirlPos: new THREE.Vector3(-37, 0.50, 106.92),
      girlChairPullPos: new THREE.Vector3(-36.2, 0.50, 106.2),
      standCutBoyPos: new THREE.Vector3(-37.4, 0.50, 106.7),
      standCutGirlPos: new THREE.Vector3(-36.6, 0.50, 106.7),
      danceCenterPos: new THREE.Vector3(-41.2, 0.50, 110.2),
      proposeCenterPos: new THREE.Vector3(-32.1, 0.56, 111.8),
      proposeBoyPos: new THREE.Vector3(-32.7, 0.56, 111.8),
      proposeGirlPos: new THREE.Vector3(-31.5, 0.56, 111.8),
      proposeLookPos: new THREE.Vector3(-32.1, 2.5, 111.2),
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
    this.activeCakeGroup = null;
    this.activeCakeSlice = null;
    this.updateStudioLighting(false);
    this.selectVenue(venueId || this.selectedVenueId, false);
    this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);
    this.emitUIState();
  }

  stopSession() {
    this.active = false;
    this.phase = 'IDLE';
    this.audio?.stopRomanticDuetSong?.();
    this.updateStudioLighting(false);
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
    this.activeCakeGroup = null;
    this.activeCakeSlice = null;
    this.floatingHearts.forEach((h) => h.parent?.remove(h));
    this.floatingHearts = [];
    this.resetVenueChairs();
  }

  resetVenueChairs() {
    if (!this.track?.dateVenues) return;
    Object.values(this.track.dateVenues).forEach((v) => {
      if (v.girlChair && v.girlChairRestLocal) v.girlChair.position.copy(v.girlChairRestLocal);
      if (v.boyChair && v.boyChairRestLocal) v.boyChair.position.copy(v.boyChairRestLocal);
    });
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
    const skinMat = new THREE.MeshPhysicalMaterial({ color: isGirl ? 0xe5ad87 : 0xdc9f76, roughness: 0.46, clearcoat: 0.08 });
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

    // Body container lowers smoothly when sitting in restaurant chair or kneeling
    const bodyRoot = new THREE.Group();
    root.add(bodyRoot);

    const hipY = 0.88;
    const thighGeo = new THREE.CylinderGeometry(0.068, 0.056, 0.42, 10);
    const shinGeo = new THREE.CylinderGeometry(0.054, 0.042, 0.42, 10);
    const shoeGeo = new THREE.BoxGeometry(0.11, 0.07, 0.22);

    const makeLeg = (xOff) => {
      const leg = new THREE.Group();
      leg.position.set(xOff, hipY, 0);
      const thigh = new THREE.Mesh(thighGeo, isGirl ? skinMat : trouserMat);
      thigh.position.y = -0.21;
      const knee = new THREE.Group();
      knee.position.set(0, -0.42, 0);
      const shin = new THREE.Mesh(shinGeo, isGirl ? skinMat : trouserMat);
      shin.position.y = -0.21;
      const shoe = new THREE.Mesh(shoeGeo, isGirl ? dressMat : shoeMat);
      shoe.position.set(0, -0.42, 0.045);
      knee.add(shin, shoe);
      leg.add(thigh, knee);
      return { leg, knee };
    };

    const leftLeg = makeLeg(0.095);
    const rightLeg = makeLeg(-0.095);
    bodyRoot.add(leftLeg.leg, rightLeg.leg);

    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, hipY, 0);
    const torsoMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(isGirl ? 0.14 : 0.165, isGirl ? 0.12 : 0.135, 0.48, 12),
      isGirl ? dressMat : suitMat
    );
    torsoMesh.scale.set(1.18, 1.0, 0.74);
    torsoMesh.position.y = 0.25;
    torsoGroup.add(torsoMesh);

    let skirt = null;
    if (isGirl) {
      skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.30, 0.48, 16), dressMat);
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

    // Removable Dining Spoon / Bite + Ring Box + Knife props attached neatly to Right Hand!
    const spoonProp = new THREE.Group();
    const spHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 6), goldMat);
    spHandle.rotation.x = Math.PI / 2;
    spHandle.position.z = 0.09;
    const spScoop = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), goldMat);
    spScoop.scale.set(1.1, 0.45, 1.3);
    spScoop.position.z = 0.21;
    const spTreat = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    spTreat.position.set(0, 0.02, 0.21);
    spoonProp.add(spHandle, spScoop, spTreat);
    spoonProp.position.set(0, -0.45, 0.03);
    spoonProp.visible = false;

    const ringBoxProp = new THREE.Group();
    const rBox = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.09), dressMat);
    const rDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.032, 0), new THREE.MeshBasicMaterial({ color: 0xe0f2fe }));
    rDiamond.position.y = 0.055;
    ringBoxProp.add(rBox, rDiamond);
    ringBoxProp.position.set(0, -0.45, 0.06);
    ringBoxProp.visible = false;

    const knifeProp = new THREE.Group();
    const kBlade = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.008, 0.30), new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9, roughness: 0.1 }));
    kBlade.position.z = 0.16;
    knifeProp.add(kBlade);
    knifeProp.position.set(0, -0.45, 0.03);
    knifeProp.visible = false;

    armR.add(armRMesh, handR, spoonProp, ringBoxProp, knifeProp);

    torsoGroup.add(armL, armR);
    bodyRoot.add(torsoGroup);
    root.scale.setScalar(1.04);

    return {
      root, bodyRoot, skirt,
      legL: leftLeg.leg, legR: rightLeg.leg,
      kneeL: leftLeg.knee, kneeR: rightLeg.knee,
      armL, armR, handL, handR,
      spoonProp, ringBoxProp, knifeProp,
      torsoGroup, head
    };
  }

  setPersonPosture(rig, posture = 'stand') {
    if (!rig) return;
    rig.spoonProp.visible = false;
    rig.ringBoxProp.visible = false;
    rig.knifeProp.visible = false;

    if (posture === 'sit') {
      rig.bodyRoot.position.y = -0.34;
      rig.legL.rotation.x = -Math.PI * 0.46;
      rig.legR.rotation.x = -Math.PI * 0.46;
      rig.kneeL.rotation.x = Math.PI * 0.46;
      rig.kneeR.rotation.x = Math.PI * 0.46;
      if (rig.skirt) rig.skirt.rotation.x = -0.65;
    } else if (posture === 'kneel') {
      rig.bodyRoot.position.y = -0.36;
      rig.legL.rotation.x = -Math.PI * 0.45;
      rig.kneeL.rotation.x = Math.PI * 0.45;
      rig.legR.rotation.x = 0.25;
      rig.kneeR.rotation.x = Math.PI * 0.45;
      if (rig.skirt) rig.skirt.rotation.x = 0;
    } else {
      rig.bodyRoot.position.y = 0;
      rig.legL.rotation.x = 0;
      rig.legR.rotation.x = 0;
      rig.kneeL.rotation.x = 0;
      rig.kneeR.rotation.x = 0;
      if (rig.skirt) rig.skirt.rotation.x = 0;
    }
  }

  createHingedPassengerDoor(carColorHex) {
    this.removeHingedDoor();
    if (!this.playerCar?.mesh) return;

    const pivot = new THREE.Group();
    const isSuv = this.playerCar.config?.id?.includes('thar') || this.playerCar.config?.id?.includes('scorpio') || this.playerCar.config?.id?.includes('safari');
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
    if (!this.active) return;

    // If driving home, arriving triggers cozy Home Sweet Home finale!
    if (this.phase === 'DRIVE_HOME') {
      this.enterHomeArrived();
      return;
    }

    if (this.phase === 'CAFE_DINING' || (!skipToDining && this.phase === 'CUTSCENE_WALK')) return;

    const worldVenue = this.getWorldVenueData();

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
    this.chairPulledMsg = false;

    this.setPersonPosture(this.boyRig, 'stand');
    this.setPersonPosture(this.girlRig, 'stand');
    this.playerCar?.modelData?.setCrewSeatedVisible?.(false, true);
    this.girlRig.root.visible = false;
    this.boyRig.root.visible = true;
    this.updateStudioLighting(true, worldVenue.tablePos, worldVenue.proposeCenterPos);

    const venueCfg = this.getVenueConfig();
    this.onToast?.(`💖 Arrived at ${venueCfg.name}! ${this.coupleNames.partner1} gets out to open ${this.coupleNames.partner2}'s door...`);
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
    const worldVenue = this.getWorldVenueData();
    if (worldVenue.girlChair && worldVenue.girlChairRestLocal) worldVenue.girlChair.position.copy(worldVenue.girlChairRestLocal);
    if (worldVenue.boyChair && worldVenue.boyChairRestLocal) worldVenue.boyChair.position.copy(worldVenue.boyChairRestLocal);

    this.boyRig.root.visible = true;
    this.girlRig.root.visible = true;
    this.setPersonPosture(this.boyRig, 'sit');
    this.setPersonPosture(this.girlRig, 'sit');
    this.activityMode = 'dine';
    this.activityTimer = 0;
    this.updateStudioLighting(true, worldVenue.tablePos, worldVenue.proposeCenterPos);

    for (let i = 0; i < 16; i++) {
      this.particles?.emitPetal?.(worldVenue.tablePos);
    }

    const venueCfg = this.getVenueConfig();
    this.onToast?.(`🕯️ Candlelight Dinner inside ${venueCfg.name} (100% Pure Veg)!`);
    this.emitUIState();
  }

  orderDish(dishId) {
    if (this.phase !== 'CAFE_DINING') return null;
    const dish = ALL_PURE_VEG_MENU_ITEMS.find((m) => m.id === dishId) || ALL_PURE_VEG_MENU_ITEMS[0];
    if (!dish) return null;

    this.orderedDishes.push({ ...dish, orderedAt: Date.now() });
    this.placeDishOnTable(dish, this.orderedDishes.length - 1);
    this.activeFoodLabel = dish.name;
    this.audio?.playCelebrateChime?.();
    this.spawnFloatingHearts(4, this.getWorldVenueData().tablePos);

    if (dish.propType === 'cake') {
      this.triggerCutCake(dish);
    } else {
      this.activityMode = 'feed';
      this.activityTimer = 5.0;
      this.onToast?.(`${dish.icon} Served & feeding each other: ${dish.name} (100% Pure Veg)!`);
      this.emitUIState();
    }
    return dish;
  }

  placeDishOnTable(dish, slotIndex) {
    const worldVenue = this.getWorldVenueData();
    const tp = worldVenue.tablePos;

    // Cakes sit majestically center-stage on the table for cutting together!
    const isCake = dish.propType === 'cake';
    const angles = [0.4, 1.5, 2.5, 3.6, 4.6, 5.6, 0.95, 3.0];
    const ang = angles[slotIndex % angles.length];
    const radius = isCake ? 0.0 : (slotIndex < 4 ? 0.34 : 0.54);
    const px = tp.x + Math.cos(ang) * radius;
    const pz = tp.z + Math.sin(ang) * radius;
    const py = tp.y + 0.02;

    if (isCake && this.activeCakeGroup?.parent) {
      this.activeCakeGroup.parent.remove(this.activeCakeGroup);
      this.activeCakeGroup = null;
      this.activeCakeSlice = null;
    }

    const dishGroup = new THREE.Group();
    dishGroup.position.set(px, py, pz);

    const plateMat = new THREE.MeshStandardMaterial({ color: 0xfef9f0, roughness: 0.2, metalness: 0.12 });
    const foodMat = new THREE.MeshStandardMaterial({ color: dish.color || 0xfbbf24, roughness: 0.42, metalness: 0.06 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.8 });
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff5f7, roughness: 0.3 });

    if (isCake) {
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.05, 18), plateMat);
      stand.position.y = 0.025;
      const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.22, 0.14, 18, 1, false, 0, Math.PI * 1.65), foodMat);
      tier1.position.y = 0.12;
      const frosting = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.022, 6, 18), creamMat);
      frosting.rotation.x = Math.PI / 2;
      frosting.position.y = 0.19;
      // Cuttable wedge slice
      const slice = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.22, 0.14, 6, 1, false, Math.PI * 1.65, Math.PI * 0.35), foodMat);
      slice.position.set(0, 0.12, 0);
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.10, 6), creamMat);
      candle.position.y = 0.24;
      const cFlame = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.05, 6), new THREE.MeshBasicMaterial({ color: 0xffd166 }));
      cFlame.position.y = 0.31;
      dishGroup.add(stand, tier1, frosting, slice, candle, cFlame);
      this.activeCakeGroup = dishGroup;
      this.activeCakeSlice = slice;
    } else if (dish.propType === 'dosa') {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.18, 0.016, 16), plateMat);
      plate.position.y = 0.008;
      const roll = new THREE.Mesh(new THREE.ConeGeometry(0.068, 0.34, 10), foodMat);
      roll.rotation.z = Math.PI * 0.48;
      roll.rotation.y = 0.4;
      roll.position.y = 0.068;
      const bowl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.026, 0.032, 10), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
      bowl1.position.set(0.08, 0.032, 0.07);
      const bowl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.026, 0.032, 10), copperMat);
      bowl2.position.set(-0.08, 0.032, 0.07);
      dishGroup.add(plate, roll, bowl1, bowl2);
    } else if (dish.propType === 'golgappe') {
      const platter = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.20), plateMat);
      platter.position.y = 0.01;
      dishGroup.add(platter);
      for (let i = 0; i < 6; i++) {
        const puri = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), foodMat);
        puri.position.set(((i % 3) - 1) * 0.07, 0.048, (i < 3 ? -0.04 : 0.045));
        dishGroup.add(puri);
      }
    } else if (dish.propType === 'pizza') {
      const board = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.02, 18), copperMat);
      board.position.y = 0.01;
      const dough = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.185, 0.018, 18), new THREE.MeshStandardMaterial({ color: 0xfde047 }));
      dough.position.y = 0.028;
      const sauce = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.006, 16), foodMat);
      sauce.position.y = 0.038;
      dishGroup.add(board, dough, sauce);
    } else if (dish.propType === 'shake' || dish.propType === 'juice') {
      const glassMat = new THREE.MeshPhysicalMaterial({ color: dish.color || 0x5c2d0e, transparent: true, opacity: 0.88, roughness: 0.1 });
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.038, 0.16, 12), glassMat);
      glass.position.y = 0.085;
      const whip = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), dish.propType === 'shake' ? creamMat : foodMat);
      whip.position.y = 0.168;
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.18, 6), new THREE.MeshBasicMaterial({ color: 0xfb7185 }));
      straw.position.set(0.02, 0.21, 0);
      straw.rotation.z = -0.22;
      dishGroup.add(glass, whip, straw);
    } else if (dish.propType === 'handi' || dish.propType === 'chhole_bhature') {
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.085, 0.10, 14), copperMat);
      pot.position.y = 0.05;
      const curry = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.025, 14), foodMat);
      curry.position.y = 0.095;
      dishGroup.add(pot, curry);
      if (dish.propType === 'chhole_bhature') {
        const bhatura = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), new THREE.MeshStandardMaterial({ color: 0xfbbf24 }));
        bhatura.scale.set(1.3, 0.55, 1.1);
        bhatura.position.set(0.16, 0.045, 0);
        dishGroup.add(bhatura);
      }
    } else {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.02, 16), plateMat);
      plate.position.y = 0.01;
      dishGroup.add(plate);
      for (let i = 0; i < 4; i++) {
        const piece = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), foodMat);
        piece.scale.set(1.2, 0.72, 1.0);
        const a = (i / 4) * Math.PI * 2;
        piece.position.set(Math.cos(a) * 0.05, 0.04, Math.sin(a) * 0.05);
        dishGroup.add(piece);
      }
    }

    this.tablePropsGroup.add(dishGroup);
  }

  triggerFeedEachOther() {
    if (this.phase !== 'CAFE_DINING') return;
    this.activityMode = 'feed';
    this.activityTimer = 5.0;
    this.audio?.playCelebrateChime?.();
    this.spawnFloatingHearts(5, this.getWorldVenueData().tablePos);
    this.onToast?.(`🥄 ${this.coupleNames.partner1} & ${this.coupleNames.partner2} feed each other lovingly across the candles!`);
    this.emitUIState();
  }

  triggerCutCake(cakeDish = null) {
    if (this.phase !== 'CAFE_DINING') return;
    if (!this.activeCakeGroup) {
      const fallbackCake = cakeDish || ALL_PURE_VEG_MENU_ITEMS.find((m) => m.id === 'red_velvet_cake');
      this.orderedDishes.push({ ...fallbackCake, orderedAt: Date.now() });
      this.placeDishOnTable(fallbackCake, this.orderedDishes.length - 1);
    }
    this.activityMode = 'cake_cut';
    this.activityTimer = 6.2;
    const worldVenue = this.getWorldVenueData();
    this.particles?.emitConfetti?.(worldVenue.tablePos);
    for (let i = 0; i < 20; i++) this.particles?.emitPetal?.(worldVenue.tablePos);
    this.spawnFloatingHearts(8, worldVenue.tablePos);
    this.audio?.playCelebrateChime?.();
    this.onToast?.(`🎂 Standing together to cut ${cakeDish?.name || 'Celebration Cake'}! ♥`);
    this.emitUIState();
  }

  triggerProposal() {
    if (this.phase !== 'CAFE_DINING') return;
    this.activityMode = 'propose';
    this.activityTimer = 14.0;
    const worldVenue = this.getWorldVenueData();
    for (let i = 0; i < 24; i++) this.particles?.emitPetal?.(worldVenue.proposeCenterPos);
    this.spawnFloatingHearts(12, worldVenue.proposeCenterPos);
    this.audio?.playCelebrateChime?.();
    this.onToast?.(`💍 "Will You Marry Me?" — ${this.coupleNames.partner1} kneels beneath the Heart Balloons Arch!`);
    this.emitUIState();
  }

  triggerReturnToTable() {
    if (this.phase !== 'CAFE_DINING') return;
    this.activityMode = 'dine';
    this.activityTimer = 0;
    this.audio?.stopRomanticDuetSong?.();
    this.emitUIState();
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
    this.onToast?.(`🥂 ${this.coupleNames.partner1} & ${this.coupleNames.partner2} toast together at ${this.getVenueConfig().name}!`);
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
    this.activityTimer = 18.0;
    this.danceAngle = 0;
    this.twirlTimer = 0;

    const song = DATE_DUET_SONGS[this.songIndex % DATE_DUET_SONGS.length];
    this.audio?.playRomanticDuetSong?.(song);
    for (let i = 0; i < 24; i++) {
      this.particles?.emitPetal?.(this.getWorldVenueData().danceCenterPos);
    }
    this.spawnFloatingHearts(8, this.getWorldVenueData().danceCenterPos);
    this.onToast?.(`💃 Slow Dancing under Fairy Lights — ${this.coupleNames.partner1} ♥ ${this.coupleNames.partner2}!`);
    this.emitUIState();
  }

  triggerDanceTwirl() {
    if (this.phase !== 'CAFE_DINING') return;
    if (this.activityMode !== 'dance') {
      this.triggerSlowDance();
    }
    this.twirlTimer = 2.6;
    this.activityTimer = Math.max(this.activityTimer, 10.0);
    for (let i = 0; i < 18; i++) {
      this.particles?.emitPetal?.(this.getWorldVenueData().danceCenterPos);
    }
    this.spawnFloatingHearts(6, this.getWorldVenueData().danceCenterPos);
    this.audio?.playCelebrateChime?.();
    this.onToast?.(`💫 Romantic Spin & Twirl for ${this.coupleNames.partner2}!`);
    this.emitUIState();
  }

  returnToCarAndDrive(skipWalk = false) {
    if (!this.active) return;
    this.audio?.stopRomanticDuetSong?.();

    if (this.phase === 'HOME_ARRIVED') {
      // Launch fresh date cruise back to favorite venue
      this.selectVenue('shah_rasoi', false);
      this.phase = 'DRIVING';
      this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);
      if (this.boyRig?.root) this.boyRig.root.visible = false;
      if (this.girlRig?.root) this.girlRig.root.visible = false;
      this.updateStudioLighting(false);
      this.cameraCtrl?.setMode?.('CHASE');
      this.onToast?.(`🚗 Heading out for another Pure Veg Date!`);
      this.emitUIState();
      return;
    }

    if (skipWalk) {
      this.finishReturnEnterDriveHome();
      return;
    }

    // Start visible Return-to-Car Cutscene: Boy seats Girl first -> enters driver side!
    this.createHingedPassengerDoor(this.playerCar?.color);
    this.phase = 'CUTSCENE_RETURN';
    this.cutsceneTime = 0;
    this.doorOpenedPlayed = false;
    this.returnStepNotified = false;
    this.returnDriverNotified = false;
    this.activityMode = 'dine';
    this.resetVenueChairs();

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
    this.setPersonPosture(this.boyRig, 'stand');
    this.setPersonPosture(this.girlRig, 'stand');
    this.playerCar?.modelData?.setCrewSeatedVisible?.(false, false);
    this.onToast?.(`💑 Leaving the table — walking back to the car together...`);
    this.emitUIState();
  }

  finishReturnEnterDriveHome() {
    this.removeHingedDoor();
    if (this.boyRig?.root) this.boyRig.root.visible = false;
    if (this.girlRig?.root) this.girlRig.root.visible = false;
    this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);

    this.phase = 'DRIVE_HOME';
    this.track?.setActiveDateVenue?.('home_villa');
    if (this.playerCar?.physics) {
      this.playerCar.physics.speed = 0;
      this.playerCar.physics.speedKmh = 0;
    }
    this.updateStudioLighting(false);
    this.cameraCtrl?.setMode?.('CHASE');
    this.onToast?.(`🏡 Both seated in car! Drive safely home to Home Sweet Home ♥`);
    this.emitUIState();
  }

  enterHomeArrived() {
    this.phase = 'HOME_ARRIVED';
    const home = this.getWorldVenueData();
    if (this.playerCar?.physics) {
      const p = this.playerCar.physics;
      p.speed = 0;
      p.speedKmh = 0;
      p.velocity.set(0, 0, 0);
      p.position.copy(home.parkingPos);
      p.position.y = 0.05;
      p.rotationY = Math.atan2(
        home.pavilionPos.x - home.parkingPos.x,
        home.pavilionPos.z - home.parkingPos.z
      ) + Math.PI * 0.5;
      p.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rotationY);
      this.playerCar.mesh.position.copy(p.position);
      this.playerCar.mesh.quaternion.copy(p.quaternion);
    }

    if (!this.boyRig) {
      this.boyRig = this.createStandingPerson(false);
      this.rootGroup.add(this.boyRig.root);
    }
    if (!this.girlRig) {
      this.girlRig = this.createStandingPerson(true);
      this.rootGroup.add(this.girlRig.root);
    }
    this.playerCar?.modelData?.setCrewSeatedVisible?.(false, false);
    this.boyRig.root.visible = true;
    this.girlRig.root.visible = true;
    this.setPersonPosture(this.boyRig, 'stand');
    this.setPersonPosture(this.girlRig, 'stand');
    this.boyRig.root.position.copy(home.porchBoyPos || home.entryApproachPos);
    this.girlRig.root.position.copy(home.porchGirlPos || home.entryApproachPos);
    this.boyRig.root.lookAt(home.parkingPos);
    this.girlRig.root.lookAt(home.parkingPos);

    this.updateStudioLighting(true, home.tablePos, home.pavilionPos);
    for (let i = 0; i < 20; i++) this.particles?.emitPetal?.(home.tablePos);
    this.particles?.emitConfetti?.(home.tablePos);
    this.spawnFloatingHearts(10, home.tablePos);
    this.audio?.playCelebrateChime?.();
    this.onToast?.(`🏡 Home Sweet Home! ${this.coupleNames.partner1} ♥ ${this.coupleNames.partner2} returned home with unforgettable memories!`);
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

    if (this.phase === 'DRIVING' || this.phase === 'DRIVE_HOME') {
      const info = this.getDistanceInfo();
      if (info.distance < 15.5 && info.speedKmh < 26) {
        if (this.phase === 'DRIVE_HOME') {
          this.enterHomeArrived();
        } else {
          this.triggerArrivalCutscene(false);
        }
      }
      this.emitUIState(info);
      return;
    }

    // Arrival Cutscene: Boy exits -> Opens her door -> Walks in -> Pulls her chair back & seats her -> Sits down!
    if (this.phase === 'CUTSCENE_WALK') {
      this.cutsceneTime += dt;
      const t = this.cutsceneTime;
      const boyOutPos = this.carLocalToWorld(1.55, 0.05, -0.1, new THREE.Vector3());
      const noseBoyPos = this.carLocalToWorld(1.45, 0.05, 2.75, new THREE.Vector3());
      const noseGirlPos = this.carLocalToWorld(-1.45, 0.05, 2.75, new THREE.Vector3());
      const girlDoorStandPos = this.carLocalToWorld(-1.62, 0.05, -0.08, new THREE.Vector3());
      const girlStepOutPos = this.carLocalToWorld(-1.05, 0.05, -0.06, new THREE.Vector3());
      const midCenter = worldVenue.entryApproachPos;
      const girlBehindChairPos = worldVenue.girlChairPullPos || worldVenue.seatGirlPos;
      const boyBesideHerChairPos = worldVenue.pavGroup
        ? worldVenue.pavGroup.localToWorld(new THREE.Vector3(-0.78, 0.50, -1.78))
        : worldVenue.girlChairPullPos;
      const boyWalkAroundPos = worldVenue.pavGroup
        ? worldVenue.pavGroup.localToWorld(new THREE.Vector3(-1.45, 0.50, 0.25))
        : worldVenue.seatBoyPos;

      // Stage 1 (0 - 2.4s): Boy walks from driver side around front nose to her door
      if (t < 2.4) {
        const u = t / 2.4;
        if (u < 0.35) this.boyRig.root.position.lerpVectors(boyOutPos, noseBoyPos, u / 0.35);
        else if (u < 0.65) this.boyRig.root.position.lerpVectors(noseBoyPos, noseGirlPos, (u - 0.35) / 0.30);
        else this.boyRig.root.position.lerpVectors(noseGirlPos, girlDoorStandPos, (u - 0.65) / 0.35);
        this.setWalkCycle(this.boyRig, t * 7.5, 1);
        this.boyRig.root.lookAt(u < 0.35 ? noseBoyPos : (u < 0.65 ? noseGirlPos : girlDoorStandPos));
      }
      // Stage 2 (2.4 - 3.8s): Opens passenger car door (+Y outward) -> Girl steps out!
      else if (t < 3.8) {
        const u = (t - 2.4) / 1.4;
        this.boyRig.root.position.copy(girlDoorStandPos);
        this.boyRig.root.lookAt(girlStepOutPos);
        this.setWalkCycle(this.boyRig, 0, 0);
        this.boyRig.armR.rotation.x = -1.05 * Math.sin(Math.min(1, u * 1.4) * Math.PI * 0.5);

        if (!this.doorOpenedPlayed) {
          this.doorOpenedPlayed = true;
          this.audio?.playDoorLatch?.();
        }
        if (this.carDoorPivot) this.carDoorPivot.rotation.y = 1.08 * Math.min(1, u * 1.25);

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
      // Stage 3 (3.8 - 6.8s): Walk hand-in-hand up carpet toward dining table
      else if (t < 6.8) {
        const u = (t - 3.8) / 3.0;
        if (this.carDoorPivot) this.carDoorPivot.rotation.y = Math.max(0, 1.08 * (1 - u * 2.4));
        const sideOffset = new THREE.Vector3(-0.34, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldVenue.facingAngle);
        const startCenter = girlDoorStandPos.clone();
        const currCenter = u < 0.55
          ? startCenter.clone().lerp(midCenter, u / 0.55)
          : midCenter.clone().lerp(worldVenue.tablePos.clone().setY(worldVenue.seatGirlPos.y).addScaledVector(
            worldVenue.seatGirlPos.clone().sub(worldVenue.tablePos).setY(0).normalize(), 1.65
          ), (u - 0.55) / 0.45);
        this.boyRig.root.position.copy(currCenter).add(sideOffset);
        this.girlRig.root.position.copy(currCenter).sub(sideOffset);
        this.boyRig.root.lookAt(worldVenue.tablePos.x, currCenter.y, worldVenue.tablePos.z);
        this.girlRig.root.lookAt(worldVenue.tablePos.x, currCenter.y, worldVenue.tablePos.z);
        this.setWalkCycle(this.boyRig, t * 7.0, 1);
        this.setWalkCycle(this.girlRig, t * 7.0 + Math.PI * 0.25, 1);
        this.boyRig.armR.rotation.x = -0.35;
        this.girlRig.armL.rotation.x = -0.35;
      }
      // Stage 4 (6.8 - 9.4s): Boy pulls Girl's chair back -> Girl sits cleanly -> Boy slides chair forward!
      else if (t < 9.4) {
        const u = (t - 6.8) / 2.6;
        if (!this.chairPulledMsg) {
          this.chairPulledMsg = true;
          this.onToast?.(`🪑 ${this.coupleNames.partner1} pulls out ${this.coupleNames.partner2}'s chair to seat her first!`);
        }
        // Pull curve: 0 -> 0.35 pull out 0.72m, 0.35 -> 0.65 girl sits on pulled chair, 0.65 -> 1.0 tuck chair in!
        let pullFrac = 0;
        if (u < 0.35) pullFrac = u / 0.35;
        else if (u < 0.65) pullFrac = 1.0;
        else pullFrac = Math.max(0, 1.0 - (u - 0.65) / 0.35);

        if (worldVenue.girlChair && worldVenue.girlChairRestLocal) {
          worldVenue.girlChair.position.set(
            worldVenue.girlChairRestLocal.x,
            worldVenue.girlChairRestLocal.y,
            worldVenue.girlChairRestLocal.z - pullFrac * 0.72
          );
        }
        this.boyRig.root.position.copy(boyBesideHerChairPos);
        this.boyRig.root.lookAt(worldVenue.seatGirlPos);
        this.setWalkCycle(this.boyRig, 0, 0);
        this.boyRig.armL.rotation.x = -0.9;
        this.boyRig.armR.rotation.x = -0.9;

        const chairSlideVec = worldVenue.seatGirlPos.clone().sub(girlBehindChairPos);
        const girlCurr = worldVenue.seatGirlPos.clone().addScaledVector(
          worldVenue.seatGirlPos.clone().sub(worldVenue.tablePos).setY(0).normalize(),
          pullFrac * 0.68
        );
        this.girlRig.root.position.copy(girlCurr);
        this.girlRig.root.lookAt(worldVenue.tablePos.x, girlCurr.y, worldVenue.tablePos.z);
        if (u >= 0.34) {
          this.setPersonPosture(this.girlRig, 'sit');
          this.setWalkCycle(this.girlRig, 0, 0);
          void chairSlideVec;
        } else {
          this.setPersonPosture(this.girlRig, 'stand');
        }
      }
      // Stage 5 (9.4 - 11.4s): Boy walks gracefully to his side & takes his seat facing her across the candles!
      else if (t < 11.4) {
        const u = (t - 9.4) / 2.0;
        this.setPersonPosture(this.girlRig, 'sit');
        this.girlRig.root.position.copy(worldVenue.seatGirlPos);
        this.girlRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatGirlPos.y, worldVenue.tablePos.z);

        if (u < 0.72) {
          const w = u / 0.72;
          if (w < 0.5) this.boyRig.root.position.lerpVectors(boyBesideHerChairPos, boyWalkAroundPos, w * 2);
          else this.boyRig.root.position.lerpVectors(boyWalkAroundPos, worldVenue.seatBoyPos, (w - 0.5) * 2);
          this.boyRig.root.lookAt(worldVenue.seatBoyPos);
          this.setPersonPosture(this.boyRig, 'stand');
          this.setWalkCycle(this.boyRig, t * 6.5, 1);
        } else {
          this.boyRig.root.position.copy(worldVenue.seatBoyPos);
          this.boyRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatBoyPos.y, worldVenue.tablePos.z);
          this.setPersonPosture(this.boyRig, 'sit');
          this.setWalkCycle(this.boyRig, 0, 0);
        }
      } else {
        this.enterCafeDining();
        return;
      }

      // Close, crisp camera tracking
      const focusTarget = (t < 3.8
        ? this.boyRig.root.position
        : (t < 6.8 ? this.boyRig.root.position.clone().lerp(this.girlRig.root.position, 0.5) : worldVenue.tablePos.clone().setY(1.3)))
        .clone().add(new THREE.Vector3(0, t < 6.8 ? 1.1 : 0.0, 0));
      const camOffset = t < 3.8 ? new THREE.Vector3(-4.2, 1.55, 3.2)
        : (t < 6.8 ? new THREE.Vector3(-4.6, 1.75, 3.6) : new THREE.Vector3(3.4, 2.25, 2.4));
      this.cameraCtrl?.setExternalCameraPose?.(focusTarget.clone().add(camOffset), focusTarget, dt);
      return;
    }

    // Return-to-Car Cutscene: Walk back -> Boy opens door & seats Girl inside first -> Boy gets in driver seat!
    if (this.phase === 'CUTSCENE_RETURN') {
      this.cutsceneTime += dt;
      const t = this.cutsceneTime;
      const startBoy = worldVenue.seatBoyPos;
      const startGirl = worldVenue.seatGirlPos;
      const midCenter = worldVenue.entryApproachPos;
      const girlDoorStandPos = this.carLocalToWorld(-1.62, 0.05, -0.08, new THREE.Vector3());
      const girlInsideCarPos = this.carLocalToWorld(-0.45, 0.25, -0.06, new THREE.Vector3());
      const noseGirlPos = this.carLocalToWorld(-1.45, 0.05, 2.75, new THREE.Vector3());
      const noseBoyPos = this.carLocalToWorld(1.45, 0.05, 2.75, new THREE.Vector3());
      const driverDoorPos = this.carLocalToWorld(1.50, 0.05, -0.08, new THREE.Vector3());

      // Stage 1 (0 - 3.0s): Walk hand-in-hand back down carpet to passenger side of car
      if (t < 3.0) {
        const u = t / 3.0;
        const startC = startBoy.clone().lerp(startGirl, 0.5);
        const sideOffset = new THREE.Vector3(-0.34, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldVenue.facingAngle);
        const currC = u < 0.45
          ? startC.clone().lerp(midCenter, u / 0.45)
          : midCenter.clone().lerp(girlDoorStandPos, (u - 0.45) / 0.55);
        this.boyRig.root.position.copy(currC).add(sideOffset);
        this.girlRig.root.position.copy(currC).sub(sideOffset);
        this.boyRig.root.lookAt(girlDoorStandPos);
        this.girlRig.root.lookAt(girlDoorStandPos);
        this.setWalkCycle(this.boyRig, t * 7.0, 1);
        this.setWalkCycle(this.girlRig, t * 7.0 + Math.PI * 0.25, 1);
      }
      // Stage 2 (3.0 - 5.2s): Boy opens passenger door -> Girl gets into the car first -> Door closes
      else if (t < 5.2) {
        const u = (t - 3.0) / 2.2;
        this.boyRig.root.position.copy(girlDoorStandPos);
        this.boyRig.root.lookAt(girlInsideCarPos);
        this.setWalkCycle(this.boyRig, 0, 0);

        if (!this.doorOpenedPlayed) {
          this.doorOpenedPlayed = true;
          this.audio?.playDoorLatch?.();
        }
        if (this.carDoorPivot) {
          this.carDoorPivot.rotation.y = u < 0.72
            ? 1.08 * Math.min(1, u / 0.35)
            : Math.max(0, 1.08 * (1 - (u - 0.72) / 0.28));
        }
        if (u < 0.62) {
          this.girlRig.root.position.lerpVectors(
            this.carLocalToWorld(-1.55, 0.05, 0.32, new THREE.Vector3()),
            girlInsideCarPos,
            Math.max(0, (u - 0.2) / 0.42)
          );
          this.girlRig.root.lookAt(girlInsideCarPos);
          this.setWalkCycle(this.girlRig, t * 6.0, 0.5);
        } else if (!this.returnStepNotified) {
          this.returnStepNotified = true;
          this.girlRig.root.visible = false;
          this.playerCar?.modelData?.setCrewSeatedVisible?.(false, true);
          this.onToast?.(`💖 ${this.coupleNames.partner1} seats ${this.coupleNames.partner2} inside first & closes the door!`);
        }
      }
      // Stage 3 (5.2 - 7.6s): Boy walks around nose back to driver side & climbs in!
      else if (t < 7.6) {
        const u = (t - 5.2) / 2.4;
        if (this.carDoorPivot) this.carDoorPivot.rotation.y = 0;
        if (u < 0.35) this.boyRig.root.position.lerpVectors(girlDoorStandPos, noseGirlPos, u / 0.35);
        else if (u < 0.65) this.boyRig.root.position.lerpVectors(noseGirlPos, noseBoyPos, (u - 0.35) / 0.30);
        else if (u < 0.92) this.boyRig.root.position.lerpVectors(noseBoyPos, driverDoorPos, (u - 0.65) / 0.27);
        else if (!this.returnDriverNotified) {
          this.returnDriverNotified = true;
          this.boyRig.root.visible = false;
          this.playerCar?.modelData?.setCrewSeatedVisible?.(true, true);
        }
        this.boyRig.root.lookAt(u < 0.35 ? noseGirlPos : (u < 0.65 ? noseBoyPos : driverDoorPos));
        this.setWalkCycle(this.boyRig, t * 7.5, 1);
      } else {
        this.finishReturnEnterDriveHome();
        return;
      }

      const fPos = this.boyRig.root.visible ? this.boyRig.root.position : driverDoorPos;
      const look = fPos.clone().add(new THREE.Vector3(0, 1.0, 0));
      const camPos = look.clone().add(new THREE.Vector3(-4.8, 1.75, 4.0));
      this.cameraCtrl?.setExternalCameraPose?.(camPos, look, dt);
      return;
    }

    if (this.phase === 'HOME_ARRIVED') {
      const nowSec = performance.now() * 0.001;
      const home = this.getWorldVenueData();
      this.updateStudioLighting(true, home.tablePos, home.pavilionPos);
      this.boyRig.armR.rotation.x = -2.2 + Math.sin(nowSec * 4) * 0.25;
      this.girlRig.armL.rotation.x = -2.2 + Math.cos(nowSec * 4) * 0.25;
      const look = home.tablePos.clone().add(new THREE.Vector3(0, 0.9, 0));
      this.cameraOrbitAngle += dt * 0.16;
      const camPos = new THREE.Vector3(
        look.x + Math.cos(this.cameraOrbitAngle) * 6.2,
        look.y + 2.2,
        look.z + Math.sin(this.cameraOrbitAngle) * 6.2
      );
      this.cameraCtrl?.setExternalCameraPose?.(camPos, look, dt);
      return;
    }

    // Main Café Dining, Feeding Each Other, Cake Cutting, Proposal Corner & Dance Twirl Loop
    if (this.phase === 'CAFE_DINING') {
      const nowSec = performance.now() * 0.001;
      this.petalTimer += dt;
      if (this.activityTimer > 0) {
        this.activityTimer -= dt;
      }

      if (this.activityMode === 'propose') {
        this.updateStudioLighting(true, worldVenue.proposeCenterPos, worldVenue.proposeLookPos);
        this.setPersonPosture(this.boyRig, 'kneel');
        this.setPersonPosture(this.girlRig, 'stand');
        this.boyRig.root.position.copy(worldVenue.proposeBoyPos);
        this.girlRig.root.position.copy(worldVenue.proposeGirlPos);
        this.boyRig.root.lookAt(worldVenue.proposeGirlPos);
        this.girlRig.root.lookAt(worldVenue.proposeBoyPos);
        // Boy opens glowing diamond ring box forward!
        this.boyRig.ringBoxProp.visible = true;
        this.boyRig.armR.rotation.x = -1.25;
        this.boyRig.armL.rotation.x = -0.35;
        // Girl places hands happily near heart/cheeks nodding Yes!
        this.girlRig.armL.rotation.x = -1.45;
        this.girlRig.armR.rotation.x = -1.45;
        this.girlRig.armL.rotation.z = -0.35;
        this.girlRig.armR.rotation.z = 0.35;
        this.girlRig.head.rotation.x = Math.sin(nowSec * 3.0) * 0.14;

        if (this.petalTimer > 0.25) {
          this.petalTimer = 0;
          this.particles?.emitPetal?.(worldVenue.proposeCenterPos);
        }

        // Frame BOTH the kneeling couple AND the illuminated "Will you marry me?" Gate + Red Heart Balloons!
        const gateFrontLook = worldVenue.proposeCenterPos.clone().add(new THREE.Vector3(0, 1.55, 0));
        const forwardOut = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, (worldVenue.facingAngle || 0) - 0.62, 0));
        const camPos = worldVenue.proposeCenterPos.clone()
          .addScaledVector(forwardOut, 5.2)
          .add(new THREE.Vector3(0, 1.95, 0));
        this.cameraCtrl?.setExternalCameraPose?.(camPos, gateFrontLook, dt);
        return;
      }

      this.updateStudioLighting(true, worldVenue.tablePos, worldVenue.proposeCenterPos);

      if (this.activityMode === 'dance') {
        this.setPersonPosture(this.boyRig, 'stand');
        this.setPersonPosture(this.girlRig, 'stand');
        this.danceAngle += dt * 0.72;
        const center = worldVenue.danceCenterPos;
        const sep = 0.36;
        const bx = center.x + Math.cos(this.danceAngle) * sep;
        const bz = center.z + Math.sin(this.danceAngle) * sep;
        const gx = center.x - Math.cos(this.danceAngle) * sep;
        const gz = center.z - Math.sin(this.danceAngle) * sep;

        this.boyRig.root.position.set(bx, center.y, bz);
        this.girlRig.root.position.set(gx, center.y, gz);
        this.boyRig.root.lookAt(gx, center.y, gz);

        if (this.twirlTimer > 0) {
          // Girl twirls rapidly 720 degrees beneath Boy's raised hand!
          this.twirlTimer = Math.max(0, this.twirlTimer - dt);
          const spinProgress = (2.6 - this.twirlTimer) / 2.6;
          this.girlRig.root.rotation.y = spinProgress * Math.PI * 4;
          if (this.girlRig.skirt) this.girlRig.skirt.scale.set(1.22, 1.0, 1.22);
          this.boyRig.armL.rotation.x = -2.45;
          this.boyRig.armL.rotation.z = 0.25;
          this.girlRig.armR.rotation.x = -2.35;
        } else {
          if (this.girlRig.skirt) this.girlRig.skirt.scale.set(1, 1, 1);
          this.girlRig.root.lookAt(bx, center.y, bz);
          const sway = Math.sin(nowSec * 3.2) * 0.14;
          this.boyRig.torsoGroup.rotation.z = sway;
          this.girlRig.torsoGroup.rotation.z = -sway;
          this.boyRig.armL.rotation.x = -1.25;
          this.boyRig.armL.rotation.z = 0;
          this.boyRig.armR.rotation.x = -1.05;
          this.girlRig.armL.rotation.x = -1.05;
          this.girlRig.armR.rotation.x = -1.25;
        }
        this.setWalkCycle(this.boyRig, nowSec * 4.2, 0.38);
        this.setWalkCycle(this.girlRig, nowSec * 4.2 + 0.5, 0.38);

        if (this.petalTimer > 0.22) {
          this.petalTimer = 0;
          this.particles?.emitPetal?.(center);
        }
        this.cameraOrbitAngle += dt * 0.34;
        const lookCenter = center.clone().add(new THREE.Vector3(0, 1.15, 0));
        const camPos = new THREE.Vector3(
          lookCenter.x + Math.cos(this.cameraOrbitAngle) * 4.2,
          lookCenter.y + 1.85,
          lookCenter.z + Math.sin(this.cameraOrbitAngle) * 4.2
        );
        this.cameraCtrl?.setExternalCameraPose?.(camPos, lookCenter, dt);
        return;
      }

      if (this.activityMode === 'cake_cut') {
        // BOTH STAND SIDE-BY-SIDE TOGETHER BEHIND CAKE TABLE & CUT THE CAKE TOGETHER!
        const standB = worldVenue.standCutBoyPos || worldVenue.seatBoyPos;
        const standG = worldVenue.standCutGirlPos || worldVenue.seatGirlPos;
        this.setPersonPosture(this.boyRig, 'stand');
        this.setPersonPosture(this.girlRig, 'stand');
        this.boyRig.root.position.copy(standB);
        this.girlRig.root.position.copy(standG);
        this.boyRig.root.lookAt(worldVenue.tablePos.x, standB.y, worldVenue.tablePos.z);
        this.girlRig.root.lookAt(worldVenue.tablePos.x, standG.y, worldVenue.tablePos.z);

        const elapsed = Math.max(0, 6.2 - this.activityTimer);
        if (elapsed < 3.0) {
          // Hold shared knife together and saw gently downward into cake
          this.boyRig.knifeProp.visible = true;
          const cutMotion = -1.05 + Math.sin(nowSec * 5.2) * 0.16;
          this.boyRig.armR.rotation.x = cutMotion;
          this.boyRig.armL.rotation.x = -0.6;
          this.girlRig.armR.rotation.x = cutMotion;
          this.girlRig.armL.rotation.x = -0.5;
          if (this.activeCakeSlice && elapsed > 1.4) {
            this.activeCakeSlice.position.set(0.08, 0.13, 0.08);
          }
        } else {
          // Celebrate & feed each other sweet cake slice!
          this.boyRig.spoonProp.visible = true;
          this.girlRig.spoonProp.visible = true;
          this.boyRig.armR.rotation.x = -1.45 + Math.sin(nowSec * 4) * 0.2;
          this.girlRig.armR.rotation.x = -1.45 + Math.cos(nowSec * 4) * 0.2;
        }
        const sideDir = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, worldVenue.facingAngle || 0, 0));
        const frontDir = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, worldVenue.facingAngle || 0, 0));
        const look = worldVenue.tablePos.clone().add(new THREE.Vector3(0, 0.35, 0));
        const camPos = look.clone().addScaledVector(frontDir, 3.6).addScaledVector(sideDir, 0.9).add(new THREE.Vector3(0, 1.35, 0));
        this.cameraCtrl?.setExternalCameraPose?.(camPos, look, dt);
        return;
      }

      // Seated Intimate Candlelight Dinner across the table (Dine, Feed Each Other, Toast, Sing)
      this.setPersonPosture(this.boyRig, 'sit');
      this.setPersonPosture(this.girlRig, 'sit');
      this.boyRig.root.position.copy(worldVenue.seatBoyPos);
      this.girlRig.root.position.copy(worldVenue.seatGirlPos);
      this.boyRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatBoyPos.y, worldVenue.tablePos.z);
      this.girlRig.root.lookAt(worldVenue.tablePos.x, worldVenue.seatGirlPos.y, worldVenue.tablePos.z);
      this.boyRig.torsoGroup.rotation.z = 0;
      this.girlRig.torsoGroup.rotation.z = 0;
      this.boyRig.armL.rotation.z = 0;
      this.girlRig.armR.rotation.z = 0;

      if (this.activityMode === 'feed') {
        const phaseFeed = Math.max(0, 5.0 - this.activityTimer);
        if (phaseFeed < 2.5) {
          // Boy reaches spoon/bite lovingly across candlelit table toward Girl's smile
          this.boyRig.spoonProp.visible = true;
          this.boyRig.armR.rotation.x = -1.52 + Math.sin(nowSec * 4.5) * 0.14;
          this.boyRig.torsoGroup.rotation.x = 0.18;
          this.girlRig.torsoGroup.rotation.x = 0.14;
          this.girlRig.head.rotation.x = Math.sin(nowSec * 5) * 0.1;
          this.girlRig.armR.rotation.x = -0.8;
        } else {
          // Girl lovingly feeds Boy back across the candles!
          this.girlRig.spoonProp.visible = true;
          this.girlRig.armR.rotation.x = -1.52 + Math.sin(nowSec * 4.5) * 0.14;
          this.girlRig.torsoGroup.rotation.x = 0.18;
          this.boyRig.torsoGroup.rotation.x = 0.14;
          this.boyRig.head.rotation.x = Math.sin(nowSec * 5) * 0.1;
          this.boyRig.armR.rotation.x = -0.8;
        }
      } else if (this.activityMode === 'toast') {
        this.boyRig.torsoGroup.rotation.x = 0;
        this.girlRig.torsoGroup.rotation.x = 0;
        const raise = -1.75 + Math.sin(nowSec * 6.5) * 0.25;
        this.boyRig.armR.rotation.x = raise;
        this.girlRig.armR.rotation.x = raise;
        this.boyRig.armL.rotation.x = -0.65;
        this.girlRig.armL.rotation.x = -0.65;
      } else if (this.activityMode === 'sing') {
        this.boyRig.torsoGroup.rotation.x = 0;
        this.girlRig.torsoGroup.rotation.x = 0;
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
        this.boyRig.armL.rotation.x = -1.05 + Math.sin(nowSec * 4) * 0.2;
        this.girlRig.armR.rotation.x = -1.05 + Math.cos(nowSec * 4) * 0.2;
      } else {
        this.boyRig.torsoGroup.rotation.x = 0.06;
        this.girlRig.torsoGroup.rotation.x = 0.06;
        this.boyRig.head.rotation.y = Math.sin(nowSec * 1.4) * 0.12;
        this.girlRig.head.rotation.y = Math.cos(nowSec * 1.3) * 0.14;
        this.boyRig.armR.rotation.x = -0.85 + Math.sin(nowSec * 2.4) * 0.12;
        this.girlRig.armL.rotation.x = -0.85 + Math.cos(nowSec * 2.1) * 0.12;
      }

      // Close, crisp romantic candle-night table camera showing BOTH faces, food, and candles clearly
      this.cameraOrbitAngle += dt * 0.10;
      const sideBias = Math.cos(this.cameraOrbitAngle * 0.5) * 3.1;
      const lookCenter = worldVenue.tablePos.clone().add(new THREE.Vector3(0, 0.24, 0));
      const sideRight = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, worldVenue.facingAngle || 0, 0));
      const fwd = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, worldVenue.facingAngle || 0, 0));
      const camPos = lookCenter.clone()
        .addScaledVector(sideRight, sideBias >= 0 ? Math.max(2.3, sideBias) : Math.min(-2.3, sideBias))
        .addScaledVector(fwd, Math.sin(this.cameraOrbitAngle) * 1.4)
        .add(new THREE.Vector3(0, 1.05, 0));
      this.cameraCtrl?.setExternalCameraPose?.(camPos, lookCenter, dt);
    }
  }

  getActiveLyricLine() {
    if (this.activityMode === 'propose') {
      return {
        songTitle: '💍 Will You Marry Me?',
        singerName: `${this.coupleNames.partner1} ♥ ${this.coupleNames.partner2}`,
        text: `"${this.coupleNames.partner2}, will you make every drive & every lifetime ours?" — "YES!" ♥`
      };
    }
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
      activeFoodLabel: this.activeFoodLabel,
      lyric: this.getActiveLyricLine()
    });
  }
}
