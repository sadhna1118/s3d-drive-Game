/**
 * Velocity Rush 3D - Three.js Renderer with Procedural Environment Reflections
 * Features ACESFilmicToneMapping, PCFSoftShadowMap, UnrealBloomPass, and specular CubeMap reflections.
 */

export class GameRenderer {
  constructor(container) {
    this.container = container || document.getElementById('canvas-container') || document.body;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05070e);
    this.scene.fog = new THREE.FogExp2(0x05070e, 0.0018);

    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
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
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.ACESFilmicToneMapping) this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      if (THREE.sRGBEncoding) this.renderer.outputEncoding = THREE.sRGBEncoding;
    } catch (eOpt) {
      console.warn('WebGL post-init options fallback:', eOpt);
    }

    if (this.container && this.renderer.domElement) {
      this.container.appendChild(this.renderer.domElement);
    }

    // 3. Procedural Specular Environment CubeMap for Realistic Car Reflections
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

    // 4. Post-Processing Bloom Composer
    this.composer = null;
    this.bloomPass = null;
    this.usePostProcessing = false;
    this.initPostProcessing();

    // 5. Lighting
    this.initLighting();

    window.addEventListener('resize', () => this.onResize());
  }

  generateEnvironmentMap() {
    // Generate a sleek cyber/studio environment reflection cubemap
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Gradient Sky to Dark Horizon
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#0a1526');
    grad.addColorStop(0.4, '#0f223d');
    grad.addColorStop(0.7, '#1b0e24');
    grad.addColorStop(1, '#05070e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Neon horizon light streaks for car body reflections
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(0, 160, 512, 8);
    ctx.fillStyle = '#ff0077';
    ctx.fillRect(0, 175, 512, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(100, 40, 120, 20);
    ctx.fillRect(320, 40, 140, 20);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }

  initLighting() {
    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0x334466, 0.95);
    this.scene.add(ambientLight);

    // Main Sun/Moon Key Light
    const dirLight = new THREE.DirectionalLight(0xddeeff, 1.6);
    dirLight.position.set(120, 220, 90);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 650;
    dirLight.shadow.camera.left = -200;
    dirLight.shadow.camera.right = 200;
    dirLight.shadow.camera.top = 200;
    dirLight.shadow.camera.bottom = -200;
    dirLight.shadow.bias = -0.0004;
    this.scene.add(dirLight);

    // Cyber Rim Light (Pink/Magenta Accent)
    const rimLight = new THREE.DirectionalLight(0xff0077, 0.75);
    rimLight.position.set(-140, 90, -120);
    this.scene.add(rimLight);

    // Fill Light (Cyan Accent)
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 0.5);
    fillLight.position.set(140, 50, -100);
    this.scene.add(fillLight);
  }

  initPostProcessing() {
    try {
      if (window.THREE && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass && THREE.ShaderPass && THREE.CopyShader && THREE.LuminosityHighPassShader) {
        this.composer = new THREE.EffectComposer(this.renderer);

        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.75, // bloom strength
          0.40, // bloom radius
          0.80  // bloom threshold
        );
        this.composer.addPass(this.bloomPass);
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

  render() {
    try {
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
