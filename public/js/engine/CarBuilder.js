/**
 * Velocity Rush 3D - Ultra-Realistic 3D Automotive Builder
 * High-detail curved chassis, wheel arches, side mirrors, projector LED lights,
 * drilled carbon brake rotors, and clearcoat metallic shaders.
 */

export const CAR_CONFIGS = [
  {
    id: 'hyperion_gt',
    name: 'Hyperion GT3',
    type: 'GT Supercar',
    description: 'Precision-engineered twin-turbo flat-6 with active aero downforce & swan-neck wing.',
    defaultColor: '#00f0ff',
    stats: { topSpeed: 90, accel: 86, handling: 88, nitro: 85 },
    physics: { maxSpeed: 230, accelPower: 115, handling: 2.8, driftGrip: 0.92, weight: 1450 }
  },
  {
    id: 'apex_cyber',
    name: 'Apex Hyperion X',
    type: 'Quad-Motor Hypercar',
    description: 'Faceted carbon hypercar with Y-signature laser lighting & active aero tunnels.',
    defaultColor: '#ff0055',
    stats: { topSpeed: 98, accel: 95, handling: 80, nitro: 92 },
    physics: { maxSpeed: 255, accelPower: 135, handling: 2.5, driftGrip: 0.88, weight: 1600 }
  },
  {
    id: 'phantom_drift',
    name: 'Phantom GT-R',
    type: 'Widebody Tuner',
    description: 'Twin-turbo widebody beast with bolted fender flares, quad round LEDs, & drift balance.',
    defaultColor: '#ffaa00',
    stats: { topSpeed: 85, accel: 82, handling: 98, nitro: 90 },
    physics: { maxSpeed: 220, accelPower: 110, handling: 3.3, driftGrip: 0.98, weight: 1300 }
  },
  {
    id: 'formula_pulse',
    name: 'Pulse F1-Grand',
    type: 'Open-Wheel Formula',
    description: 'Ultra-lightweight ground-effect formula racer with halo safety titanium & aero wings.',
    defaultColor: '#00ff88',
    stats: { topSpeed: 96, accel: 100, handling: 94, nitro: 88 },
    physics: { maxSpeed: 248, accelPower: 140, handling: 3.1, driftGrip: 0.90, weight: 950 }
  }
];

export const TINT_COLORS = [
  { name: 'Smoked Dark', color: 0x051525, opacity: 0.80 },
  { name: 'Chameleon Cyan', color: 0x004466, opacity: 0.85 },
  { name: 'Gold Mirror', color: 0x443311, opacity: 0.80 },
  { name: 'Crystal Clear', color: 0x223344, opacity: 0.40 }
];

export class CarBuilder {
  static createCar(carIndex = 0, hexColor = '#00f0ff', visualMods = {}) {
    const safeIdx = Math.abs(parseInt(carIndex) || 0) % CAR_CONFIGS.length;
    const config = CAR_CONFIGS[safeIdx] || CAR_CONFIGS[0];
    const group = new THREE.Group();
    group.name = `car_${config.id || 'default'}`;

    const rimStyle = Math.abs(parseInt(visualMods?.rimStyle) || 0) % 3;
    const safeTintIdx = Math.abs(parseInt(visualMods?.tint) || 0) % TINT_COLORS.length;
    const tintConfig = TINT_COLORS[safeTintIdx] || TINT_COLORS[0];

    // --- High-Fidelity Automotive Materials ---
    const bodyColor = new THREE.Color(hexColor || '#00f0ff');
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: bodyColor,
      metalness: 0.88,
      roughness: 0.15,
      envMapIntensity: 1.4
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.6,
      roughness: 0.35
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: tintConfig.color,
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: tintConfig.opacity,
      envMapIntensity: 1.8
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.98,
      roughness: 0.08
    });

    const glowColor = new THREE.Color(hexColor);
    const underglowMaterial = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.85
    });

    const headlampLensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const taillampMat = new THREE.MeshBasicMaterial({ color: 0xff0033 });
    const orangeIndicatorMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

    const wheels = [];
    const exhaustPipes = [];

    // Construct specific realistic 3D vehicle
    switch (carIndex % 4) {
      case 0:
        this.buildHyperionGT(group, bodyMaterial, carbonMaterial, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
        break;
      case 1:
        this.buildApexCyber(group, bodyMaterial, carbonMaterial, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
        break;
      case 2:
        this.buildPhantomDrift(group, bodyMaterial, carbonMaterial, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
        break;
      case 3:
        this.buildFormulaPulse(group, bodyMaterial, carbonMaterial, glassMaterial, chromeMaterial, headlampLensMat, taillampMat, orangeIndicatorMat, wheels, exhaustPipes, rimStyle);
        break;
    }

    // Neon Underglow Plate
    const underglowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 3.8), underglowMaterial);
    underglowMesh.rotation.x = -Math.PI / 2;
    underglowMesh.position.y = 0.08;
    group.add(underglowMesh);

    // Realistic Headlight Spotlights projecting onto track
    const leftLight = new THREE.SpotLight(0xffffff, 1.4, 45, Math.PI / 5, 0.35);
    leftLight.position.set(-0.65, 0.48, 1.8);
    leftLight.target.position.set(-0.65, 0, 12);
    group.add(leftLight, leftLight.target);

    const rightLight = new THREE.SpotLight(0xffffff, 1.4, 45, Math.PI / 5, 0.35);
    rightLight.position.set(0.65, 0.48, 1.8);
    rightLight.target.position.set(0.65, 0, 12);
    group.add(rightLight, rightLight.target);

    group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    let underglowTimer = 0;
    const underglowMode = visualMods.underglowMode || 'pulse';

    return {
      mesh: group,
      wheels,
      exhaustPipes,
      bodyMaterial,
      underglowMaterial,
      glassMaterial,
      config,
      updateColor: (newHex) => {
        const col = new THREE.Color(newHex);
        bodyMaterial.color.copy(col);
        underglowMaterial.color.copy(col);
      },
      updateUnderglowAnimation: (dt) => {
        underglowTimer += dt;
        if (underglowMode === 'pulse') {
          underglowMaterial.opacity = 0.45 + Math.sin(underglowTimer * 4) * 0.45;
        } else if (underglowMode === 'rainbow') {
          underglowMaterial.color.setHSL((underglowTimer * 0.2) % 1.0, 1.0, 0.5);
        }
      }
    };
  }

  // =========================================
  // REALISTIC WHEELS & CROSS-DRILLED BRAKES
  // =========================================
  static createRealisticWheel(radius = 0.38, width = 0.28, rimStyle = 0) {
    const wheelGroup = new THREE.Group();

    // 1. Low-Profile Racing Rubber Tire with Tread
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 32);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 0.9,
      metalness: 0.05
    });
    const tire = new THREE.Mesh(tireGeo, tireMat);
    wheelGroup.add(tire);

    // Outer Tire Sidewall Bevel Rings
    const sidewallL = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.92, radius * 0.08, 8, 24),
      tireMat
    );
    sidewallL.rotation.y = Math.PI / 2;
    sidewallL.position.x = width * 0.48;
    wheelGroup.add(sidewallL);

    // 2. Realistic Cross-Drilled Brake Disc Rotor
    const rotorGeo = new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, width * 0.35, 20);
    rotorGeo.rotateZ(Math.PI / 2);
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.95,
      roughness: 0.25
    });
    const rotor = new THREE.Mesh(rotorGeo, rotorMat);
    wheelGroup.add(rotor);

    // Red Multi-Piston Brembo Caliper
    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xcc0000,
      metalness: 0.7,
      roughness: 0.25
    });
    const caliper = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.4, radius * 0.42, radius * 0.32),
      caliperMat
    );
    caliper.position.set(0, radius * 0.32, 0);
    wheelGroup.add(caliper);

    // 3. Forged Alloy Rims
    const rimMat = new THREE.MeshStandardMaterial({
      color: (rimStyle === 1) ? 0x00f0ff : (rimStyle === 2 ? 0xddaa33 : 0xcccccc),
      metalness: 0.95,
      roughness: 0.12
    });

    const rimLip = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.78, radius * 0.78, width * 1.02, 24, 1, true),
      rimMat
    );
    rimLip.rotateZ(Math.PI / 2);
    wheelGroup.add(rimLip);

    // Center Hub with Titanium Lug Nuts
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, width * 1.04, 12),
      rimMat
    );
    hub.rotateZ(Math.PI / 2);
    wheelGroup.add(hub);

    if (rimStyle === 0) {
      // Sport 5-Spoke Wheels
      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, radius * 0.72, 0.045), rimMat);
        spoke.rotation.x = (s / 5) * Math.PI * 2;
        wheelGroup.add(spoke);
      }
    } else if (rimStyle === 1) {
      // Cyber Turbine Aero Blades
      for (let s = 0; s < 7; s++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(width * 1.0, radius * 0.74, 0.05), rimMat);
        blade.rotation.x = (s / 7) * Math.PI * 2;
        blade.rotation.y = 0.25; // angled turbine twist
        wheelGroup.add(blade);
      }
    } else {
      // Deep Dish Multi-Spoke Mesh
      for (let s = 0; s < 12; s++) {
        const meshSpoke = new THREE.Mesh(new THREE.BoxGeometry(width * 0.96, radius * 0.72, 0.025), rimMat);
        meshSpoke.rotation.x = (s / 12) * Math.PI * 2;
        wheelGroup.add(meshSpoke);
      }
    }

    return { group: wheelGroup, tire };
  }

  // =========================================
  // 1. HYPERION GT3 (PORSCHE 911 GT3 RS INSPIRED)
  // =========================================
  static buildHyperionGT(group, bodyMat, carbonMat, glassMat, chromeMat, headMat, tailMat, indicMat, wheels, exhausts, rimStyle) {
    // 1. Lower Main Chassis
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.38, 4.2), bodyMat);
    chassis.position.y = 0.34;
    group.add(chassis);

    // 2. Curved Teardrop Roof & Glass Greenhouse
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.44, 2.0), glassMat);
    roof.position.set(0, 0.72, -0.15);
    group.add(roof);

    // Sloped Front Windshield Frame
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.32, 0.9), glassMat);
    windshield.position.set(0, 0.62, 0.9);
    windshield.rotation.x = 0.45;
    group.add(windshield);

    // Fastback Rear Engine Cover
    const rearDeck = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.28, 1.2), bodyMat);
    rearDeck.position.set(0, 0.58, -1.2);
    rearDeck.rotation.x = -0.25;
    group.add(rearDeck);

    // 3. Widebody Flared Rear Wheel Arches (Muscular Haunches)
    const rearArchL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.45, 1.3), bodyMat);
    rearArchL.position.set(-0.96, 0.42, -1.25);
    const rearArchR = rearArchL.clone();
    rearArchR.position.x = 0.96;
    group.add(rearArchL, rearArchR);

    // 4. Sloped Hood with Dual Air Extraction Ducts
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.2, 1.35), bodyMat);
    hood.position.set(0, 0.44, 1.35);
    hood.rotation.x = 0.09;
    group.add(hood);

    // Hood Black Vent Inserts
    const hoodVentL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.5), carbonMat);
    hoodVentL.position.set(-0.4, 0.53, 1.35);
    const hoodVentR = hoodVentL.clone();
    hoodVentR.position.x = 0.4;
    group.add(hoodVentL, hoodVentR);

    // 5. Front Bumper with Honeycomb Air Dam & Splitter
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.3, 0.6), bodyMat);
    frontBumper.position.set(0, 0.26, 2.0);
    const centerGrille = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.1), carbonMat);
    centerGrille.position.set(0, 0.24, 2.31);
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.05, 0.55), carbonMat);
    splitter.position.set(0, 0.12, 2.1);
    group.add(frontBumper, centerGrille, splitter);

    // Side Aero Canards
    const canardL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.25), carbonMat);
    canardL.position.set(-0.95, 0.26, 2.05);
    canardL.rotation.z = 0.3;
    const canardR = canardL.clone();
    canardR.position.x = 0.95;
    canardR.rotation.z = -0.3;
    group.add(canardL, canardR);

    // 6. Aerodynamic Side View Mirrors
    const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.14), bodyMat);
    mirrorL.position.set(-0.88, 0.68, 0.65);
    const mirrorR = mirrorL.clone();
    mirrorR.position.x = 0.88;
    group.add(mirrorL, mirrorR);

    // 7. Projector LED Headlights with Glass Housing
    const hlL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.08, 16), headMat);
    hlL.rotateX(Math.PI / 2);
    hlL.position.set(-0.62, 0.48, 2.05);
    const hlR = hlL.clone();
    hlR.position.x = 0.62;
    group.add(hlL, hlR);

    // 8. Swan-Neck Mounted Carbon GT Wing
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.05, 0.42), carbonMat);
    wingBlade.position.set(0, 0.96, -1.95);
    wingBlade.rotation.x = -0.08;

    const swanNeckL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.48, 0.15), carbonMat);
    swanNeckL.position.set(-0.55, 0.78, -1.9);
    swanNeckL.rotation.x = 0.2;
    const swanNeckR = swanNeckL.clone();
    swanNeckR.position.x = 0.55;

    const wingEndL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.46), carbonMat);
    wingEndL.position.set(-0.92, 0.96, -1.95);
    const wingEndR = wingEndL.clone();
    wingEndR.position.x = 0.92;
    group.add(wingBlade, swanNeckL, swanNeckR, wingEndL, wingEndR);

    // 9. Full-Width Slim Taillight Light Bar & Rear Diffuser
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.06, 0.06), tailMat);
    tailBar.position.set(0, 0.48, -2.11);
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.22, 0.4), carbonMat);
    diffuser.position.set(0, 0.18, -2.05);
    group.add(tailBar, diffuser);

    // Dual Center-Exit Titanium Exhaust Pipes
    const exhL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.15, 12), chromeMat);
    exhL.rotateX(Math.PI / 2);
    exhL.position.set(-0.12, 0.26, -2.15);
    const exhR = exhL.clone();
    exhR.position.x = 0.12;
    group.add(exhL, exhR);

    exhausts.push(new THREE.Vector3(-0.12, 0.26, -2.18), new THREE.Vector3(0.12, 0.26, -2.18));

    this.attachRealisticWheels(group, wheels, 0.94, 1.3, -1.3, 0.38, rimStyle);
  }

  // =========================================
  // 2. APEX HYPERION X (LAMBORGHINI / BUGATTI BOLIDE)
  // =========================================
  static buildApexCyber(group, bodyMat, carbonMat, glassMat, chromeMat, headMat, tailMat, indicMat, wheels, exhausts, rimStyle) {
    // Sharp Wedge Monocoque
    const bodyGeo = new THREE.CylinderGeometry(0.9, 1.15, 4.3, 6);
    bodyGeo.rotateX(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.42;
    body.scale.set(0.95, 0.36, 1.0);
    group.add(body);

    // Low Cyber Cockpit Dome
    const domeGeo = new THREE.ConeGeometry(0.85, 2.4, 6);
    domeGeo.rotateX(Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, glassMat);
    dome.position.set(0, 0.68, -0.05);
    dome.scale.set(0.9, 0.35, 1.0);
    group.add(dome);

    // Roof Air Snorkel Scoop
    const snorkel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.8), carbonMat);
    snorkel.position.set(0, 0.88, -0.3);
    group.add(snorkel);

    // Central Dorsal Aero Fin
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 1.9), carbonMat);
    fin.position.set(0, 0.84, -1.0);
    group.add(fin);

    // Y-Shaped LED Matrix Headlights
    const hlLeftY1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.06), headMat);
    hlLeftY1.position.set(-0.65, 0.44, 2.12);
    hlLeftY1.rotation.z = 0.35;
    const hlLeftY2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.05, 0.06), headMat);
    hlLeftY2.position.set(-0.65, 0.32, 2.12);
    hlLeftY2.rotation.z = -0.35;

    const hlRightY1 = hlLeftY1.clone();
    hlRightY1.position.x = 0.65;
    hlRightY1.rotation.z = -0.35;
    const hlRightY2 = hlLeftY2.clone();
    hlRightY2.position.x = 0.65;
    hlRightY2.rotation.z = 0.35;
    group.add(hlLeftY1, hlLeftY2, hlRightY1, hlRightY2);

    // Side Air Tunnels / Pods
    const sidePodL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.32, 2.4), carbonMat);
    sidePodL.position.set(-1.0, 0.34, -0.1);
    const sidePodR = sidePodL.clone();
    sidePodR.position.x = 1.0;
    group.add(sidePodL, sidePodR);

    // Rear Aero Lightblade
    const tailBlade = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.06, 0.08), tailMat);
    tailBlade.position.set(0, 0.46, -2.14);

    // Extreme Quad Diffuser Strakes
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.25, 0.5), carbonMat);
    diffuser.position.set(0, 0.18, -2.05);
    group.add(tailBlade, diffuser);

    // Quad Titanium Exhaust Tips
    const exh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 12), chromeMat);
    exh1.rotateX(Math.PI / 2);
    exh1.position.set(-0.35, 0.38, -2.18);
    const exh2 = exh1.clone(); exh2.position.x = -0.18;
    const exh3 = exh1.clone(); exh3.position.x = 0.18;
    const exh4 = exh1.clone(); exh4.position.x = 0.35;
    group.add(exh1, exh2, exh3, exh4);

    exhausts.push(new THREE.Vector3(-0.26, 0.38, -2.2), new THREE.Vector3(0.26, 0.38, -2.2));

    this.attachRealisticWheels(group, wheels, 0.98, 1.4, -1.4, 0.38, rimStyle);
  }

  // =========================================
  // 3. PHANTOM GT-R (WIDEBODY NISSAN GT-R / SUPRA)
  // =========================================
  static buildPhantomDrift(group, bodyMat, carbonMat, glassMat, chromeMat, headMat, tailMat, indicMat, wheels, exhausts, rimStyle) {
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.46, 4.1), bodyMat);
    mainBody.position.y = 0.38;
    group.add(mainBody);

    // Fastback Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.48, 1.9), glassMat);
    roof.position.set(0, 0.76, -0.2);
    group.add(roof);

    // Muscular Hood with Twin Power Bulges & Vents
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.22, 1.45), bodyMat);
    hood.position.set(0, 0.48, 1.3);
    hood.rotation.x = 0.07;
    group.add(hood);

    // Bolted-on Widebody Fender Flares
    const fenderFL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.4, 1.1), bodyMat);
    fenderFL.position.set(-0.96, 0.4, 1.25);
    const fenderFR = fenderFL.clone(); fenderFR.position.x = 0.96;
    const fenderRL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.44, 1.3), bodyMat);
    fenderRL.position.set(-0.98, 0.42, -1.25);
    const fenderRR = fenderRL.clone(); fenderRR.position.x = 0.98;
    group.add(fenderFL, fenderFR, fenderRL, fenderRR);

    // Aggressive Front Splitter with Metallic Support Tie-Rods
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.06, 0.6), carbonMat);
    splitter.position.set(0, 0.14, 2.05);

    const tieRodL = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28), chromeMat);
    tieRodL.position.set(-0.4, 0.26, 2.22);
    tieRodL.rotation.x = 0.4;
    const tieRodR = tieRodL.clone(); tieRodR.position.x = 0.4;
    group.add(splitter, tieRodL, tieRodR);

    // Side Mirrors
    const mirL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.12), carbonMat);
    mirL.position.set(-0.9, 0.7, 0.55);
    const mirR = mirL.clone(); mirR.position.x = 0.9;
    group.add(mirL, mirR);

    // Massive GT Drift Wing
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.06, 0.45), carbonMat);
    wingBlade.position.set(0, 1.05, -1.85);
    wingBlade.rotation.x = -0.12;

    const wingPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.14), chromeMat);
    wingPillarL.position.set(-0.6, 0.8, -1.8);
    const wingPillarR = wingPillarL.clone(); wingPillarR.position.x = 0.6;
    group.add(wingBlade, wingPillarL, wingPillarR);

    // Iconic Quad Round LED Taillights
    for (let i = 0; i < 4; i++) {
      const isRight = i >= 2;
      const inner = (i % 2 === 1);
      const x = (isRight ? 1 : -1) * (inner ? 0.38 : 0.65);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 8, 16), tailMat);
      ring.position.set(x, 0.48, -2.06);
      group.add(ring);
    }

    // Quad Burnt-Blue Titanium Exhausts
    const exhL1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 12), chromeMat);
    exhL1.rotateX(Math.PI / 2);
    exhL1.position.set(-0.55, 0.22, -2.12);
    const exhL2 = exhL1.clone(); exhL2.position.x = -0.38;
    const exhR1 = exhL1.clone(); exhR1.position.x = 0.38;
    const exhR2 = exhL1.clone(); exhR2.position.x = 0.55;
    group.add(exhL1, exhL2, exhR1, exhR2);

    exhausts.push(new THREE.Vector3(-0.46, 0.22, -2.15), new THREE.Vector3(0.46, 0.22, -2.15));

    this.attachRealisticWheels(group, wheels, 0.98, 1.25, -1.25, 0.38, rimStyle);
  }

  // =========================================
  // 4. PULSE F1-GRAND (MODERN OPEN-WHEEL FORMULA)
  // =========================================
  static buildFormulaPulse(group, bodyMat, carbonMat, glassMat, chromeMat, headMat, tailMat, indicMat, wheels, exhausts, rimStyle) {
    // Tapered Monocoque Nosecone
    const noseGeo = new THREE.ConeGeometry(0.42, 4.0, 8);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, bodyMat);
    nose.position.set(0, 0.34, 0.2);
    nose.scale.set(0.9, 0.42, 1.0);
    group.add(nose);

    // Titanium Halo Cockpit Safety Structure
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 8, 18, Math.PI), carbonMat);
    halo.rotateX(Math.PI / 2);
    halo.position.set(0, 0.64, 0.1);

    const haloCentralPillar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.03), carbonMat);
    haloCentralPillar.position.set(0, 0.52, 0.45);
    group.add(halo, haloCentralPillar);

    // Driver Helmet & Visor
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.9 }));
    helmet.position.set(0, 0.58, -0.15);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.12), new THREE.MeshStandardMaterial({ color: 0x051525, metalness: 0.95 }));
    visor.position.set(0, 0.58, -0.06);
    group.add(helmet, visor);

    // Top Engine Airbox Intake Scoop
    const airbox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.5), bodyMat);
    airbox.position.set(0, 0.78, -0.45);
    group.add(airbox);

    // Multi-Element Front Wing & Endplates
    const fWingMain = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.04, 0.48), carbonMat);
    fWingMain.position.set(0, 0.14, 2.05);

    const fEndplateL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.55), bodyMat);
    fEndplateL.position.set(-1.08, 0.2, 2.05);
    const fEndplateR = fEndplateL.clone(); fEndplateR.position.x = 1.08;
    group.add(fWingMain, fEndplateL, fEndplateR);

    // Sidepods with Radiator Louvers
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 1.8), bodyMat);
    sideL.position.set(-0.68, 0.3, -0.3);
    const sideR = sideL.clone(); sideR.position.x = 0.68;
    group.add(sideL, sideR);

    // Multi-Element Rear Wing & DRS Actuator
    const rWing = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.05, 0.44), carbonMat);
    rWing.position.set(0, 0.94, -1.85);

    const rPlateL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.48, 0.5), bodyMat);
    rPlateL.position.set(-0.83, 0.85, -1.85);
    const rPlateR = rPlateL.clone(); rPlateR.position.x = 0.83;
    group.add(rWing, rPlateL, rPlateR);

    // Flashing Rain LED Beacon
    const rainBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), tailMat);
    rainBeacon.position.set(0, 0.32, -1.98);
    group.add(rainBeacon);

    // Single Central Exhaust Pipe
    const exh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.18, 12), chromeMat);
    exh.rotateX(Math.PI / 2);
    exh.position.set(0, 0.5, -1.95);
    group.add(exh);

    exhausts.push(new THREE.Vector3(0, 0.5, -2.0));

    this.attachRealisticWheels(group, wheels, 1.12, 1.45, -1.45, 0.38, rimStyle, true);
  }

  // Attach 4 Realistic Wheels with Double Wishbones
  static attachRealisticWheels(group, wheelArray, trackHalfWidth, frontZ, rearZ, radius, rimStyle = 0, hasSuspensionArms = false) {
    const wheelPositions = [
      { name: 'FL', x: -trackHalfWidth, y: radius, z: frontZ, isFront: true },
      { name: 'FR', x: trackHalfWidth, y: radius, z: frontZ, isFront: true },
      { name: 'RL', x: -trackHalfWidth, y: radius, z: rearZ, isFront: false },
      { name: 'RR', x: trackHalfWidth, y: radius, z: rearZ, isFront: false }
    ];

    wheelPositions.forEach((wp) => {
      const wheelObj = this.createRealisticWheel(radius, 0.28, rimStyle);
      const steerPivot = new THREE.Group();
      steerPivot.position.set(wp.x, wp.y, wp.z);

      if (wp.x > 0) wheelObj.group.rotation.y = Math.PI;

      steerPivot.add(wheelObj.group);
      group.add(steerPivot);

      if (hasSuspensionArms) {
        // Upper & Lower A-Arm Wishbones
        const armUpper = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, trackHalfWidth * 0.75, 6),
          new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9 })
        );
        armUpper.rotateZ(Math.PI / 2);
        armUpper.position.set(wp.x * 0.5, wp.y + 0.12, wp.z);

        const armLower = armUpper.clone();
        armLower.position.y = wp.y - 0.12;
        group.add(armUpper, armLower);
      }

      wheelArray.push({
        pivot: steerPivot,
        wheelMesh: wheelObj.group,
        isFront: wp.isFront,
        isRight: wp.x > 0
      });
    });
  }
}
