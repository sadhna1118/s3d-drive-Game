/**
 * Velocity Rush 3D - GLB / GLTF Real Car Model Loader & Auto-Rigger
 * Loads Draco-compressed and standard GLB car models, normalizes scale/orientation/grounding,
 * binds paintable body & glass tint materials, and rigs steering & rolling wheel pivots.
 */

const GLTF_TEMPLATE_CACHE = new Map();
let _sharedGltfLoader = null;

function getGltfLoader() {
  if (_sharedGltfLoader) return _sharedGltfLoader;
  if (typeof THREE === 'undefined' || !THREE.GLTFLoader) return null;

  const loader = new THREE.GLTFLoader();
  if (THREE.DRACOLoader) {
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('libs/draco/');
    loader.setDRACOLoader(dracoLoader);
  }
  _sharedGltfLoader = loader;
  return loader;
}

export class GLBCarLoader {
  static isSupported() {
    return typeof THREE !== 'undefined' && !!THREE.GLTFLoader;
  }

  static preload(urls = []) {
    urls.forEach((url) => {
      if (url) {
        this.loadRawTemplate(url).catch(() => {});
      }
    });
  }

  static loadRawTemplate(url) {
    if (!url) return Promise.reject(new Error('No GLB URL specified'));
    if (GLTF_TEMPLATE_CACHE.has(url)) {
      return GLTF_TEMPLATE_CACHE.get(url);
    }

    const loader = getGltfLoader();
    if (!loader) {
      return Promise.reject(new Error('GLTFLoader is not loaded'));
    }

    const promise = new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf.scene),
        undefined,
        (err) => {
          GLTF_TEMPLATE_CACHE.delete(url);
          reject(err);
        }
      );
    });

    GLTF_TEMPLATE_CACHE.set(url, promise);
    return promise;
  }

  /**
   * Loads (from cache or network/blob) and returns a normalized, rigged instance for CarBuilder.
   */
  static async loadRiggedCar(url, options = {}) {
    const template = await this.loadRawTemplate(url);
    const clonedRoot = template.clone(true);
    return this.normalizeAndRig(clonedRoot, options);
  }

  static normalizeAndRig(rawRoot, options = {}) {
    const {
      targetLength = 4.45,
      yawOffset = null,
      bodyMaterialNames = [],
      glassMaterialNames = [],
      tailMaterialNames = [],
      wheelSpec = null,
      hideNodes = ['Obj_Shadow_Plane', 'shadow_plane', 'ShadowPlane']
    } = options;

    const container = new THREE.Group();
    const modelWrap = new THREE.Group();
    modelWrap.add(rawRoot);
    container.add(modelWrap);

    // 1. Remove baked flat shadow planes that fight with dynamic road shadows
    const toRemove = [];
    rawRoot.traverse((obj) => {
      if (obj.name && hideNodes.some((h) => obj.name.toLowerCase() === h.toLowerCase())) {
        toRemove.push(obj);
      }
    });
    toRemove.forEach((obj) => obj.parent?.remove(obj));

    // 2. Orient front toward +Z
    if (typeof yawOffset === 'number') {
      modelWrap.rotation.y = yawOffset;
    } else {
      modelWrap.updateMatrixWorld(true);
      const initBox = new THREE.Box3().setFromObject(modelWrap);
      const initSize = new THREE.Vector3();
      initBox.getSize(initSize);
      if (initSize.x > initSize.z * 1.12) {
        modelWrap.rotation.y = Math.PI / 2;
      }
    }

    // 3. Scale to match game chassis scale (~4.45m long) and ground tires at y = 0
    modelWrap.updateMatrixWorld(true);
    const box1 = new THREE.Box3().setFromObject(modelWrap);
    const size1 = new THREE.Vector3();
    box1.getSize(size1);
    const currentLen = Math.max(size1.z, 0.01);
    const scaleFactor = targetLength / currentLen;
    modelWrap.scale.setScalar(scaleFactor);

    modelWrap.updateMatrixWorld(true);
    const box2 = new THREE.Box3().setFromObject(modelWrap);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);

    modelWrap.position.x -= center2.x;
    modelWrap.position.z -= center2.z;
    modelWrap.position.y -= box2.min.y;
    container.updateMatrixWorld(true);

    // 4. Bind mutable cloned paint, glass, and taillight materials
    const paintMaterials = [];
    const glassMaterials = [];
    const tailMaterials = [];
    const clonedMatMap = new Map();

    const cloneAndUpgradeMat = (mat, kind) => {
      if (!mat) return mat;
      if (clonedMatMap.has(mat)) return clonedMatMap.get(mat);
      const cloned = mat.clone();
      if (kind === 'paint') {
        if ('clearcoat' in cloned) {
          cloned.clearcoat = 1.0;
          cloned.clearcoatRoughness = 0.045;
        }
        if ('envMapIntensity' in cloned) cloned.envMapIntensity = 1.95;
        paintMaterials.push(cloned);
      } else if (kind === 'glass') {
        cloned.transparent = true;
        if ('clearcoat' in cloned) cloned.clearcoat = 1.0;
        if ('envMapIntensity' in cloned) cloned.envMapIntensity = 2.0;
        glassMaterials.push(cloned);
      } else if (kind === 'tail') {
        tailMaterials.push(cloned);
      }
      clonedMatMap.set(mat, cloned);
      return cloned;
    };

    const matchesList = (name, list) => {
      if (!name || !list.length) return false;
      const lower = name.toLowerCase();
      return list.some((entry) => lower === entry.toLowerCase());
    };

    rawRoot.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.castShadow = true;
      obj.receiveShadow = true;

      const assignMat = (mat) => {
        if (!mat) return mat;
        const mName = mat.name || '';
        const nName = obj.name || '';

        if (
          matchesList(mName, bodyMaterialNames) ||
          (!bodyMaterialNames.length && /body|paint|carpaint|exterior/i.test(mName + ' ' + nName))
        ) {
          return cloneAndUpgradeMat(mat, 'paint');
        }
        if (
          matchesList(mName, glassMaterialNames) ||
          (!glassMaterialNames.length && /glass|windscreen|windshield|window/i.test(mName + ' ' + nName))
        ) {
          return cloneAndUpgradeMat(mat, 'glass');
        }
        if (
          matchesList(mName, tailMaterialNames) ||
          (!tailMaterialNames.length && /tail|brake|lights_red/i.test(mName + ' ' + nName))
        ) {
          return cloneAndUpgradeMat(mat, 'tail');
        }
        if ('envMapIntensity' in mat) {
          const c = mat.clone();
          c.envMapIntensity = /rim|wheel|chrome|metal|alloy|disc/i.test(mName + ' ' + nName) ? 1.8 : 1.35;
          return c;
        }
        return mat;
      };

      if (Array.isArray(obj.material)) {
        obj.material = obj.material.map(assignMat);
      } else {
        obj.material = assignMat(obj.material);
      }
    });

    // 5. Rig Steering & Rolling Wheel Pivots
    const wheels = [];
    container.updateMatrixWorld(true);

    const findNode = (name) => {
      let found = null;
      rawRoot.traverse((o) => {
        if (!found && o.name === name) found = o;
      });
      return found;
    };

    const rigCorner = (steerTarget, spinTarget, isFront, isRight) => {
      const refObj = spinTarget || steerTarget;
      if (!refObj) return;
      const wBox = new THREE.Box3().setFromObject(refObj);
      const wCenter = new THREE.Vector3();
      wBox.getCenter(wCenter);

      const steerPivot = new THREE.Group();
      steerPivot.position.copy(wCenter);
      container.add(steerPivot);

      const spinPivot = new THREE.Group();
      steerPivot.add(spinPivot);

      if (steerTarget && steerTarget !== spinTarget) {
        steerPivot.attach(steerTarget);
      }
      if (spinTarget) {
        spinPivot.attach(spinTarget);
      }

      wheels.push({
        pivot: steerPivot,
        wheelMesh: spinPivot,
        isFront,
        isRight,
        isGLB: true
      });
    };

    if (Array.isArray(wheelSpec) && wheelSpec.length > 0) {
      wheelSpec.forEach((ws) => {
        const steerNode = ws.steerNode ? findNode(ws.steerNode) : null;
        const spinNode = ws.spinNode ? findNode(ws.spinNode) : null;
        rigCorner(steerNode, spinNode, ws.isFront, ws.isRight);
      });
    } else {
      // Generic wheel auto-detection for user-imported GLB cars
      const candidates = [];
      rawRoot.traverse((o) => {
        if (o.name && /^(wheel|tyre|tire)_[fr][lr]$/i.test(o.name)) {
          candidates.push(o);
        }
      });
      if (candidates.length === 0) {
        rawRoot.traverse((o) => {
          if (o.isMesh && /wheel|tyre|tire|rim/i.test(o.name || '') && !/steer/i.test(o.name || '')) {
            candidates.push(o);
          }
        });
      }
      candidates.slice(0, 8).forEach((node) => {
        const wBox = new THREE.Box3().setFromObject(node);
        const wCenter = new THREE.Vector3();
        wBox.getCenter(wCenter);
        rigCorner(null, node, wCenter.z > 0, wCenter.x < 0);
      });
    }

    return {
      group: container,
      wheels,
      paintMaterials,
      glassMaterials,
      tailMaterials
    };
  }
}
