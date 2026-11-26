/**
 * Velocity Rush 3D - Three.js Renderer with Procedural Environment Reflections
 * Features ACESFilmicToneMapping, follow-target PCFSoftShadowMap, UnrealBloomPass, and dynamic world themes.
 */

const SpeedVignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uVignette: { value: 0.22 },
    uChromatic: { value: 0.0 },
    uWarmth: { value: 0.08 },
    uTintR: { value: 0.0 },
    uTintG: { value: 0.94 },
    uTintB: { value: 1.0 }
  },
  vertexShader: [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
    'uniform sampler2D tDiffuse;',
    'uniform float uVignette;',
    'uniform float uChromatic;',
    'uniform float uWarmth;',
    'uniform float uTintR;',
    'uniform float uTintG;',
    'uniform float uTintB;',
    'varying vec2 vUv;',
    'void main() {',
    '  vec2 dir = vUv - vec2(0.5);',
    '  float dist = length(dir);',
    '  vec2 offset = dir * (uChromatic * dist * 0.022);',
    '  float r = texture2D(tDiffuse, clamp(vUv + offset, 0.001, 0.999)).r;',
    '  float g = texture2D(tDiffuse, vUv).g;',
    '  float b = texture2D(tDiffuse, clamp(vUv - offset, 0.001, 0.999)).b;',
    '  vec3 col = vec3(r, g, b);',
    '  col.r *= (1.0 + uWarmth * 0.09);',
    '  col.b *= (1.0 - uWarmth * 0.06);',
    '  float edge = smoothstep(0.30, 0.94, dist);',
    '  col = mix(col, col * (1.0 - uVignette * 0.78) + vec3(uTintR, uTintG, uTintB) * (uChromatic * 0.24), edge);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n')
};

const SkyDomeShader = {
  uniforms: {
    uZenith: { value: new THREE.Color(0x162447) },
    uHorizon: { value: new THREE.Color(0xf49d6e) },
    uGround: { value: new THREE.Color(0x1d261a) },
    uSunDir: { value: new THREE.Vector3(0.45, 0.35, 0.82).normalize() },
    uSunColor: { value: new THREE.Color(0xffdca8) },
    uSunIntensity: { value: 1.0 }
  },
  vertexShader: [
    'varying vec3 vWorldDir;',
    'void main() {',
    '  vWorldDir = normalize(position);',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
    'uniform vec3 uZenith;',
    'uniform vec3 uHorizon;',
    'uniform vec3 uGround;',
    'uniform vec3 uSunDir;',
    'uniform vec3 uSunColor;',
    'uniform float uSunIntensity;',
    'varying vec3 vWorldDir;',
    'void main() {',
    '  vec3 dir = normalize(vWorldDir);',
    '  float h = dir.y;',
    '  vec3 skyCol = mix(uHorizon, uZenith, pow(max(0.0, h), 0.55));',
    '  skyCol = mix(uGround, skyCol, smoothstep(-0.18, 0.06, h));',
    '  float sunDot = max(0.0, dot(dir, normalize(uSunDir)));',
    '  float sunHalo = pow(sunDot, 12.0) * 0.42 * uSunIntensity;',
    '  float sunDisc = smoothstep(0.9975, 0.9994, sunDot) * 1.45 * uSunIntensity;',
    '  skyCol += uSunColor * (sunHalo + sunDisc);',
    '  gl_FragColor = vec4(skyCol, 1.0);',
    '}'
  ].join('\n')
};

export class GameRenderer {
  constructor(container) {
    this.container = container || document.getElementById('canvas-container') || document.body;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05070e);
    this.scene.fog = new THREE.FogExp2(0x05070e, 0.0014);

    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      2400
    );
    this.scene.add(this.camera);

    // 2. WebGL Renderer with tiered fallbacks
    try {
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        failIfMajorPerformanceCaveat: false
      });
    } catch (e1) {
      console.warn('High-performance WebGL failed, falling back to basic WebGL:', e1);
      try {
        this.renderer = new THREE.WebGLRenderer({
          antialias: false,
          failIfMajorPerformanceCaveat: false
        });
      } catch (e2) {
        console.error('All WebGL context creation attempts failed:', e2);
        throw new Error('WebGL is not supported or hardware acceleration is disabled in your browser. Please enable hardware acceleration in your browser settings.');
      }
    }

    try {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.ACESFilmicToneMapping) this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      if (THREE.sRGBEncoding) this.renderer.outputEncoding = THREE.sRGBEncoding;
    } catch (eOpt) {
      console.warn('WebGL post-init options fallback:', eOpt);
    }

    if (this.container && this.renderer.domElement) {
      this.container.appendChild(this.renderer.domElement);
    }

    // 3. Procedural Specular Environment CubeMap for Realistic Clearcoat Car Reflections
    try {
      const texture = this.generateEnvironmentMap();
      if (texture && window.THREE && THREE.PMREMGenerator) {
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        if (typeof pmremGenerator.compileEquirectangularShader === 'function') {
          pmremGenerator.compileEquirectangularShader();
        }
        this.envMap = pmremGenerator.fromEquirectangular(texture).texture;
        this.scene.environment = this.envMap;
        texture.dispose();
        pmremGenerator.dispose();
      } else if (texture) {
        this.envMap = texture;
        this.scene.environment = this.envMap;
      }
    } catch (e) {
      console.warn('Environment map generation fallback:', e);
    }

    // 4. Lighting
    this.ambientLight = null;
    this.hemiLight = null;
    this.dirLight = null;
    this.dirLightTarget = new THREE.Object3D();
    this.rimLight = null;
    this.fillLight = null;
    this.skyDome = null;
    this.skyMat = null;
    this.dirOffset = new THREE.Vector3(90, 150, 70);
    this.initLighting();
    this.initSkyDome();

    // 5. Post-Processing Bloom + Speed Vignette Composer
    this.composer = null;
    this.bloomPass = null;
    this.vignettePass = null;
    this.usePostProcessing = false;
    this.speedFxEnabled = true;
    this.qualityLevel = 'high';
    this.initPostProcessing();

    window.addEventListener('resize', () => this.onResize());
  }

  generateEnvironmentMap() {
    // High-resolution studio + golden-hour HDRI reflection map for automotive clearcoat paint & chrome
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0.0, '#182442');
    grad.addColorStop(0.24, '#364d75');
    grad.addColorStop(0.42, '#7d92ad');
    grad.addColorStop(0.495, '#f6b376');
    grad.addColorStop(0.515, '#2b2427');
    grad.addColorStop(0.68, '#171b24');
    grad.addColorStop(1.0, '#090b10');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Smooth diffused overhead studio softboxes for crisp curved automotive reflections
    const drawSoftBox = (cx, cy, rx, ry, innerCol, midCol) => {
      const rg = ctx.createRadialGradient(cx, cy, rx * 0.1, cx, cy, rx);
      rg.addColorStop(0, innerCol);
      rg.addColorStop(0.55, midCol);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawSoftBox(420, 165, 360, 75, 'rgba(255, 250, 240, 0.92)', 'rgba(255, 244, 224, 0.36)');
    drawSoftBox(1024, 130, 420, 68, 'rgba(255, 252, 248, 0.96)', 'rgba(218, 236, 255, 0.34)');
    drawSoftBox(1620, 170, 340, 75, 'rgba(255, 230, 195, 0.85)', 'rgba(255, 195, 130, 0.30)');
    drawSoftBox(680, 390, 520, 52, 'rgba(255, 204, 138, 0.55)', 'rgba(255, 165, 95, 0.14)');
    drawSoftBox(1480, 410, 480, 48, 'rgba(170, 215, 255, 0.45)', 'rgba(120, 185, 255, 0.12)');

    // Crisp horizon specular seam
    const hor = ctx.createLinearGradient(0, 492, 0, 528);
    hor.addColorStop(0, 'rgba(255, 210, 145, 0)');
    hor.addColorStop(0.5, 'rgba(255, 224, 175, 0.85)');
    hor.addColorStop(1, 'rgba(25, 22, 26, 0.95)');
    ctx.fillStyle = hor;
    ctx.fillRect(0, 492, 2048, 36);

    // Subtle city skyline horizon bounce
    ctx.fillStyle = 'rgba(24, 22, 30, 0.72)';
    for (let x = 0; x < 2048; x += 64) {
      const h = 30 + ((x * 53) % 72);
      ctx.fillRect(x, 505 - h, 42, h);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    if (THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  initLighting() {
    this.ambientLight = new THREE.AmbientLight(0x3a4d70, 0.55);
    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0x6699cc, 0x10141f, 0.85);
    this.scene.add(this.hemiLight);

    // Primary Sun/Moon Key Light with car-following shadow frustum
    this.dirLight = new THREE.DirectionalLight(0xeef6ff, 1.55);
    this.dirLight.position.copy(this.dirOffset);
    this.scene.add(this.dirLightTarget);
    this.dirLight.target = this.dirLightTarget;

    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 420;
    this.dirLight.shadow.camera.left = -85;
    this.dirLight.shadow.camera.right = 85;
    this.dirLight.shadow.camera.top = 85;
    this.dirLight.shadow.camera.bottom = -85;
    this.dirLight.shadow.bias = -0.0005;
    this.scene.add(this.dirLight);

    // Cyber Rim Light
    this.rimLight = new THREE.DirectionalLight(0xff2288, 0.7);
    this.rimLight.position.set(-140, 80, -120);
    this.scene.add(this.rimLight);

    // Cool Fill Light
    this.fillLight = new THREE.DirectionalLight(0x00e5ff, 0.55);
    this.fillLight.position.set(140, 50, -100);
    this.scene.add(this.fillLight);
  }

  updateShadowTarget(worldPos) {
    if (!this.dirLight || !this.dirLightTarget || !worldPos) return;
    // Snap shadow center slightly to reduce shadow edge shimmer
    const snap = 2;
    const sx = Math.round(worldPos.x / snap) * snap;
    const sy = Math.round(worldPos.y / snap) * snap;
    const sz = Math.round(worldPos.z / snap) * snap;
    this.dirLightTarget.position.set(sx, sy, sz);
    this.dirLight.position.set(
      sx + this.dirOffset.x,
      sy + this.dirOffset.y,
      sz + this.dirOffset.z
    );
  }

  initSkyDome() {
    try {
      const skyGeo = new THREE.SphereGeometry(1650, 32, 20);
      this.skyMat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(SkyDomeShader.uniforms),
        vertexShader: SkyDomeShader.vertexShader,
        fragmentShader: SkyDomeShader.fragmentShader,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false
      });
      this.skyDome = new THREE.Mesh(skyGeo, this.skyMat);
      this.skyDome.frustumCulled = false;
      this.scene.add(this.skyDome);
    } catch (e) {
      console.warn('SkyDome fallback:', e);
    }
  }

  setWorldTheme(preset) {
    if (!preset) return;
    if (this.scene.background && this.scene.background.setHex) {
      this.scene.background.setHex(preset.skyColor ?? 0x05070e);
    }
    if (this.scene.fog && this.scene.fog.color && this.scene.fog.color.setHex) {
      this.scene.fog.color.setHex(preset.fogColor ?? 0x05070e);
      this.scene.fog.density = preset.fogDensity ?? 0.00135;
    }
    if (this.ambientLight && preset.ambientLight !== undefined) {
      this.ambientLight.color.setHex(preset.ambientLight);
      if (preset.ambientIntensity !== undefined) this.ambientLight.intensity = preset.ambientIntensity;
    }
    if (this.dirLight && preset.dirLight !== undefined) {
      this.dirLight.color.setHex(preset.dirLight);
      if (preset.dirIntensity !== undefined) this.dirLight.intensity = preset.dirIntensity;
      if (preset.sunDir && Array.isArray(preset.sunDir)) {
        const sVec = new THREE.Vector3(preset.sunDir[0], Math.max(0.18, preset.sunDir[1]), preset.sunDir[2]).normalize();
        this.dirOffset.copy(sVec).multiplyScalar(195);
      }
    }
    if (this.hemiLight) {
      this.hemiLight.color.setHex(preset.hemiSky ?? 0x6699cc);
      this.hemiLight.groundColor.setHex(preset.hemiGround ?? 0x10141f);
      if (preset.hemiIntensity !== undefined) this.hemiLight.intensity = preset.hemiIntensity;
    }
    if (this.rimLight && preset.rimColor !== undefined) {
      this.rimLight.color.setHex(preset.rimColor);
    }
    if (this.fillLight && preset.fillColor !== undefined) {
      this.fillLight.color.setHex(preset.fillColor);
    }
    if (this.skyMat && this.skyMat.uniforms) {
      const u = this.skyMat.uniforms;
      u.uZenith.value.setHex(preset.skyColor ?? 0x141d38);
      u.uHorizon.value.setHex(preset.horizonColor ?? preset.fogColor ?? 0xe8945e);
      u.uGround.value.setHex(preset.hemiGround ?? 0x1a2018);
      u.uSunColor.value.setHex(preset.sunColor ?? preset.dirLight ?? 0xffd599);
      u.uSunIntensity.value = preset.sunIntensity !== undefined ? preset.sunIntensity : 1.0;
      if (preset.sunDir && Array.isArray(preset.sunDir)) {
        u.uSunDir.value.set(preset.sunDir[0], preset.sunDir[1], preset.sunDir[2]).normalize();
      }
    }
    if (this.vignettePass?.uniforms?.uWarmth) {
      this.vignettePass.uniforms.uWarmth.value = preset.warmth !== undefined ? preset.warmth : 0.1;
    }
  }

  initPostProcessing() {
    try {
      if (window.THREE && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass && THREE.ShaderPass && THREE.CopyShader && THREE.LuminosityHighPassShader) {
        this.composer = new THREE.EffectComposer(this.renderer);

        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.42, // crisp neon bloom without washing out the track
          0.35, // bloom radius
          0.82  // high threshold so only lights/neon glow
        );
        this.composer.addPass(this.bloomPass);

        this.vignettePass = new THREE.ShaderPass(SpeedVignetteShader);
        this.composer.addPass(this.vignettePass);
        this.usePostProcessing = true;
      } else {
        this.usePostProcessing = false;
      }
    } catch (e) {
      console.warn('Post-processing composer disabled:', e);
      this.usePostProcessing = false;
      this.composer = null;
    }
  }

  applyGraphicsSettings(settings = {}) {
    const shadowQ = settings.shadowQuality || 'ultra';
    const bloomMode = settings.bloomMode || 'cinematic';
    const speedFx = settings.speedFxEnabled !== false;
    const exposure = Number(settings.exposure) || 1.15;
    const resScale = Number(settings.resolutionScale) || 1.5;

    this.speedFxEnabled = speedFx;
    this.qualityLevel = settings.graphicsPreset || 'high';

    if (this.renderer) {
      this.renderer.toneMappingExposure = exposure;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      this.renderer.setPixelRatio(Math.max(0.5, dpr * (resScale / Math.max(1, dpr))));

      const wantShadows = shadowQ !== 'off';
      this.renderer.shadowMap.enabled = wantShadows;
      if (this.dirLight) {
        this.dirLight.castShadow = wantShadows;
        const mapSize = shadowQ === 'ultra' ? 2048 : 1024;
        if (this.dirLight.shadow.mapSize.width !== mapSize) {
          this.dirLight.shadow.mapSize.set(mapSize, mapSize);
          if (this.dirLight.shadow.map) {
            this.dirLight.shadow.map.dispose();
            this.dirLight.shadow.map = null;
          }
        }
      }
      this.renderer.shadowMap.needsUpdate = true;
    }

    if (this.bloomPass) {
      this.bloomPass.enabled = (bloomMode !== 'off');
      if (bloomMode === 'cinematic') {
        this.bloomPass.strength = 0.48;
        this.bloomPass.radius = 0.38;
        this.bloomPass.threshold = 0.80;
      } else if (bloomMode === 'subtle') {
        this.bloomPass.strength = 0.25;
        this.bloomPass.radius = 0.28;
        this.bloomPass.threshold = 0.86;
      }
    }

    if (this.vignettePass) {
      this.vignettePass.enabled = speedFx;
      if (!speedFx) {
        this.vignettePass.uniforms.uChromatic.value = 0;
        this.vignettePass.uniforms.uVignette.value = 0;
      }
    }

    this.usePostProcessing = !!(this.composer && (bloomMode !== 'off' || speedFx));
    this.onResize();
  }

  setSpeedEffect(speedRatio = 0, isNitroActive = false, nitroMode = 'twin_overboost') {
    if (!this.vignettePass || !this.speedFxEnabled) return;
    const u = this.vignettePass.uniforms;
    const targetVig = 0.18 + Math.min(0.45, speedRatio * 0.28 + (isNitroActive ? 0.16 : 0));
    const targetChrom = isNitroActive ? (nitroMode === 'hyper_warp' ? 0.95 : 0.65) : Math.max(0, (speedRatio - 0.65) * 0.65);

    u.uVignette.value = THREE.MathUtils.lerp(u.uVignette.value, targetVig, 0.12);
    u.uChromatic.value = THREE.MathUtils.lerp(u.uChromatic.value, targetChrom, 0.14);

    if (nitroMode === 'hyper_warp') {
      u.uTintR.value = 1.0; u.uTintG.value = 0.15; u.uTintB.value = 0.65;
    } else if (nitroMode === 'twin_overboost') {
      u.uTintR.value = 1.0; u.uTintG.value = 0.68; u.uTintB.value = 0.05;
    } else {
      u.uTintR.value = 0.0; u.uTintG.value = 0.94; u.uTintB.value = 1.0;
    }
  }

  setQuality(level = 'high') {
    const isHigh = level === 'high' || level === 'ultra';
    this.applyGraphicsSettings({
      graphicsPreset: level,
      shadowQuality: isHigh ? 'ultra' : 'off',
      bloomMode: isHigh ? 'cinematic' : 'off',
      speedFxEnabled: isHigh,
      exposure: isHigh ? 1.15 : 1.1,
      resolutionScale: isHigh ? 1.5 : 1.0
    });
  }

  onResize() {
    try {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if (this.composer) {
        this.composer.setSize(w, h);
      }
    } catch (e) {
      console.warn('onResize fallback:', e);
    }
  }

  setBloomEnabled(enabled) {
    this.usePostProcessing = !!(enabled && this.composer);
  }

  setCafeAmbienceMode(enabled) {
    if (this.bloomPass) {
      if (enabled) {
        if (this._savedBloomStrength === undefined) this._savedBloomStrength = this.bloomPass.strength;
        if (this._savedBloomThreshold === undefined) this._savedBloomThreshold = this.bloomPass.threshold;
        this.bloomPass.strength = 0.14;
        this.bloomPass.threshold = 0.94;
      } else if (this._savedBloomStrength !== undefined) {
        this.bloomPass.strength = this._savedBloomStrength;
        this.bloomPass.threshold = this._savedBloomThreshold ?? 0.82;
      }
    }
    if (this.renderer) {
      if (enabled) {
        if (this._savedExposure === undefined) this._savedExposure = this.renderer.toneMappingExposure;
        this.renderer.toneMappingExposure = Math.min(this._savedExposure || 1.0, 0.94);
      } else if (this._savedExposure !== undefined) {
        this.renderer.toneMappingExposure = this._savedExposure;
      }
    }
    if (this.dirLight) {
      if (enabled) {
        if (this._savedDirIntensity === undefined) this._savedDirIntensity = this.dirLight.intensity;
        this.dirLight.intensity = Math.min(this._savedDirIntensity || 1.0, 0.52);
      } else if (this._savedDirIntensity !== undefined) {
        this.dirLight.intensity = this._savedDirIntensity;
      }
    }
  }

  render() {
    try {
      if (this.skyDome && this.camera) {
        this.skyDome.position.copy(this.camera.position);
      }
      if (this.usePostProcessing && this.composer) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    } catch (e) {
      this.usePostProcessing = false;
      try {
        this.renderer.render(this.scene, this.camera);
      } catch (renderErr) {
        // Suppress repeated frame render noise
      }
    }
  }
}
