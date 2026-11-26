/**
 * S3D Drive - Dual-Mode Finger & Hand Gesture Driving Controller
 * 1) Always-on Finger Touch / Pointer Swipe-Drag Gesture Pad on driving canvas
 * 2) Optional Webcam Hand & Finger Tracking (MediaPipe HandLandmarker + optical fallback)
 *    with calibrated gestureSensitivity scaling and exponential smoothing.
 */

export class GestureControlManager {
  constructor() {
    this.isCamActive = false;
    this.camSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
    this.gestureSensitivity = 1.0;

    // Touch / pointer swipe state (on canvas)
    this.touchEnabled = true;
    this.activePointerId = null;
    this.anchorX = 0;
    this.anchorY = 0;
    this.lastTapTime = 0;
    this.touchNitroUntil = 0;

    this.touchGesture = {
      active: false,
      throttle: 0,
      brake: 0,
      steer: 0,
      nitro: false,
      handbrake: false,
      label: ''
    };

    // Webcam AI / optical hand state
    this.camGesture = {
      active: false,
      throttle: 0,
      brake: 0,
      steer: 0,
      nitro: false,
      handbrake: false,
      fingers: 0,
      label: ''
    };

    this.smoothedCamSteer = 0;
    this.smoothedTouchSteer = 0;
    this.prevCenterX = null;

    this.videoEl = null;
    this.previewCanvas = null;
    this.previewCtx = null;
    this.mediaStream = null;
    this.handLandmarker = null;
    this.landmarkerLoading = false;
    this.opticalMode = false;
    this.rafId = null;
    this.lastVideoTime = -1;
    this.lastFrameSample = null;
    this.lastFeedbackKey = '';
    this.lastFeedbackAt = 0;

    this.onCamStateChange = null;
    this.onGestureFeedback = null;
    this.onError = null;
    this.onTouchVisual = null;
  }

  setSensitivity(val) {
    const num = Number(val);
    if (!Number.isNaN(num)) {
      this.gestureSensitivity = Math.min(2.0, Math.max(0.4, num));
    }
  }

  attachSurface(surfaceEl, videoEl = null, previewCanvas = null) {
    this.videoEl = videoEl;
    this.previewCanvas = previewCanvas;
    this.previewCtx = previewCanvas ? previewCanvas.getContext('2d') : null;

    if (!surfaceEl || this._surfaceAttached) return;
    this._surfaceAttached = true;

    const isUiElement = (target) => {
      if (!target || typeof target.closest !== 'function') return false;
      return !!target.closest('button, input, select, .interactive, .modal-overlay, .touch-controls-layer, .hud-top-bar');
    };

    const getPoint = (e) => {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY, count: e.touches.length, id: e.touches[0].identifier };
      }
      return { x: e.clientX, y: e.clientY, count: 1, id: e.pointerId ?? 'mouse' };
    };

    const onStart = (e) => {
      if (!this.touchEnabled || isUiElement(e.target)) return;
      const inDrive = typeof window !== 'undefined' &&
        (window.gameApp?.state === 'RACING' || window.gameApp?.state === 'COUNTDOWN') &&
        !window.gameApp?.isPaused;
      if (!inDrive) return;

      const pt = getPoint(e);
      if (e.touches && e.touches.length >= 2) {
        // Two-finger press triggers Nitro + Drift cleanly
        this.touchGesture.nitro = true;
        this.emitFeedback('NITRO FLICK 🔥', 'TWO-FINGER BOOST', '🔥');
        return;
      }
      if (this.activePointerId !== null) return;

      const now = performance.now();
      if (now - this.lastTapTime < 280) {
        this.touchNitroUntil = now + 1800;
        this.emitFeedback('NITRO TAP 🔥', 'DOUBLE-TAP BOOST', '🔥');
      }
      this.lastTapTime = now;

      this.activePointerId = pt.id;
      this.anchorX = pt.x;
      this.anchorY = pt.y;
      this.touchGesture.active = true;
      this.onTouchVisual?.(true, pt.x, pt.y, pt.x, pt.y);
    };

    const onMove = (e) => {
      if (this.activePointerId === null) return;
      let pt = null;
      if (e.touches) {
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === this.activePointerId) {
            pt = { x: e.touches[i].clientX, y: e.touches[i].clientY, count: e.touches.length };
            break;
          }
        }
        if (!pt) return;
      } else {
        if ((e.pointerId ?? 'mouse') !== this.activePointerId) return;
        pt = { x: e.clientX, y: e.clientY, count: 1 };
      }

      const dx = pt.x - this.anchorX;
      const dy = pt.y - this.anchorY;
      this.applyTouchVector(dx, dy, pt.count >= 2);
      this.onTouchVisual?.(true, this.anchorX, this.anchorY, pt.x, pt.y);
    };

    const onEnd = () => {
      if (this.activePointerId === null) return;
      this.activePointerId = null;
      this.resetTouchGesture();
      this.onTouchVisual?.(false, 0, 0, 0, 0);
    };

    surfaceEl.addEventListener('pointerdown', onStart, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onEnd, { passive: true });
    window.addEventListener('pointercancel', onEnd, { passive: true });
    surfaceEl.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    window.addEventListener('touchcancel', onEnd, { passive: true });
  }

  /**
   * Computes smooth finger swipe steering & throttle/brake from pixel delta.
   * Exposed publicly for deterministic testing and calibration.
   */
  applyTouchVector(dx = 0, dy = 0, multiTouch = false) {
    const deadzonePx = 8;
    const fullSteerRange = 125 / Math.max(0.4, this.gestureSensitivity);
    const fullDriveRange = 72 / Math.max(0.65, Math.sqrt(this.gestureSensitivity));

    let rawSteer = 0;
    if (Math.abs(dx) > deadzonePx) {
      const mag = Math.min(1, (Math.abs(dx) - deadzonePx) / Math.max(30, fullSteerRange));
      // Smooth non-linear center precision curve
      rawSteer = Math.sign(dx) * Math.pow(mag, 1.18);
    }

    let throttle = 0;
    let brake = 0;
    if (-dy > deadzonePx + 4) {
      throttle = Math.min(1, (-dy - deadzonePx) / Math.max(25, fullDriveRange));
    } else if (dy > deadzonePx + 6) {
      brake = Math.min(1, (dy - deadzonePx) / Math.max(25, fullDriveRange));
    } else if (Math.abs(dx) > deadzonePx * 2) {
      // Gentle forward cruise while steering with finger swipe
      throttle = 0.72;
    }

    const nitroBoost = multiTouch || performance.now() < this.touchNitroUntil;
    this.touchGesture.active = true;
    this.touchGesture.steer = Math.max(-1, Math.min(1, rawSteer));
    this.touchGesture.throttle = nitroBoost ? 1.0 : throttle;
    this.touchGesture.brake = brake;
    this.touchGesture.nitro = nitroBoost;
    this.touchGesture.handbrake = multiTouch && Math.abs(rawSteer) > 0.55;
  }

  resetTouchGesture() {
    this.touchGesture.active = false;
    this.touchGesture.throttle = 0;
    this.touchGesture.brake = 0;
    this.touchGesture.steer = 0;
    this.touchGesture.handbrake = false;
    this.touchGesture.nitro = performance.now() < this.touchNitroUntil;
  }

  async toggleCamera() {
    if (this.isCamActive) {
      this.stopCamera();
      return false;
    }
    return this.startCamera();
  }

  async startCamera() {
    if (!this.camSupported) {
      this.onError?.('Webcam requires HTTPS or localhost in a modern browser. Screen finger swipe is still active!');
      return false;
    }
    if (this.isCamActive) return true;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
        audio: false
      });

      if (this.videoEl) {
        this.videoEl.srcObject = this.mediaStream;
        await this.videoEl.play().catch(() => {});
      }

      this.isCamActive = true;
      this.opticalMode = false;
      this.onCamStateChange?.(true, 'LOADING AI...');

      await this.ensureHandLandmarker();
      this.onCamStateChange?.(true, this.opticalMode ? 'OPTICAL HAND' : 'FINGER AI READY');
      this.startDetectionLoop();
      return true;
    } catch (err) {
      this.stopCamera();
      this.onError?.('Camera permission blocked/unavailable — screen finger swipe gestures are active!');
      return false;
    }
  }

  stopCamera() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => {
        try { t.stop(); } catch (e) {}
      });
      this.mediaStream = null;
    }
    if (this.videoEl) {
      try { this.videoEl.srcObject = null; } catch (e) {}
    }
    this.isCamActive = false;
    this.camGesture = { active: false, throttle: 0, brake: 0, steer: 0, nitro: false, handbrake: false, fingers: 0, label: '' };
    this.smoothedCamSteer = 0;
    this.lastFrameSample = null;
    this.onCamStateChange?.(false, 'OFF');
  }

  async ensureHandLandmarker() {
    if (this.handLandmarker || this.landmarkerLoading) return;
    this.landmarkerLoading = true;
    try {
      const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm');
      const fileset = await vision.FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
      );
      this.handLandmarker = await vision.HandLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.45,
        minHandPresenceConfidence: 0.45,
        minTrackingConfidence: 0.45
      });
    } catch (e) {
      // Fallback gracefully to zero-dependency optical fingertip motion tracking
      this.opticalMode = true;
    } finally {
      this.landmarkerLoading = false;
    }
  }

  startDetectionLoop() {
    const tick = () => {
      if (!this.isCamActive) return;
      this.rafId = requestAnimationFrame(tick);

      if (!this.videoEl || this.videoEl.readyState < 2) return;
      const nowMs = performance.now();

      if (this.handLandmarker) {
        if (this.videoEl.currentTime !== this.lastVideoTime) {
          this.lastVideoTime = this.videoEl.currentTime;
          try {
            const res = this.handLandmarker.detectForVideo(this.videoEl, nowMs);
            if (res?.landmarks?.length > 0) {
              this.processLandmarks(res.landmarks[0]);
              this.drawLandmarkPreview(res.landmarks[0]);
            } else {
              this.decayCamGesture();
              this.drawLandmarkPreview(null);
            }
          } catch (e) {
            this.opticalMode = true;
            this.handLandmarker = null;
          }
        }
      } else {
        this.processOpticalHandFrame();
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  countExtendedFingers(lm) {
    if (!lm || lm.length < 21) return 0;
    let count = 0;
    const wrist = lm[0];
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    // Thumb: tip further from pinky MCP (17) than thumb IP (3)
    if (dist(lm[4], lm[17]) > dist(lm[3], lm[17]) * 1.15) count++;
    // Index (8), Middle (12), Ring (16), Pinky (20) vs PIP joints (6, 10, 14, 18)
    const pairs = [[8, 6], [12, 10], [16, 14], [20, 18]];
    for (const [tipIdx, pipIdx] of pairs) {
      if (dist(lm[tipIdx], wrist) > dist(lm[pipIdx], wrist) * 1.09) count++;
    }
    return count;
  }

  /**
   * Maps 21 normalized MediaPipe hand landmarks into calibrated analog steering & finger actions.
   */
  processLandmarks(lm) {
    const fingers = this.countExtendedFingers(lm);
    // Mirror horizontally for natural selfie view: moving hand right in real space -> right steer (+)
    const palmX = 1 - lm[9].x;
    const indexX = 1 - lm[8].x;
    const targetX = fingers === 1 ? indexX : (palmX * 0.6 + indexX * 0.4);

    // Also incorporate index-finger tilt vector for natural wrist steering
    const dxTilt = (1 - lm[8].x) - (1 - lm[5].x);
    const dyTilt = lm[5].y - lm[8].y;
    const tiltRatio = dyTilt > 0.04 ? Math.max(-1, Math.min(1, dxTilt / dyTilt)) : 0;

    const offsetFromCenter = (targetX - 0.5) * 2.15;
    const blended = offsetFromCenter * 0.72 + tiltRatio * 0.45;
    const deadzone = 0.08;
    let rawSteer = 0;
    if (Math.abs(blended) > deadzone) {
      const mag = Math.min(1, ((Math.abs(blended) - deadzone) / (1 - deadzone)) * (0.75 + 0.45 * this.gestureSensitivity));
      rawSteer = Math.sign(blended) * Math.pow(mag, 1.12);
    }
    this.smoothedCamSteer += (rawSteer - this.smoothedCamSteer) * 0.34;

    let throttle = 0;
    let brake = 0;
    let nitro = false;
    let handbrake = false;
    let label = 'HAND READY';

    if (fingers === 0) {
      brake = 1.0;
      label = '✊ FIST • BRAKE';
      this.emitFeedback('FIST BRAKE 🛑', 'GESTURE STOP', '✊');
    } else if (fingers === 1) {
      throttle = 0.85;
      label = '☝️ 1 FINGER • CRUISE STEER';
      this.emitFeedback('1-FINGER STEER ☝️', 'PRECISION GUIDE', '☝️');
    } else if (fingers === 2) {
      throttle = 1.0;
      nitro = true;
      label = '✌️ 2 FINGERS • NITRO';
      this.emitFeedback('PEACE NITRO 🔥', '2-FINGER BOOST', '✌️');
    } else if (fingers === 3) {
      throttle = 0.88;
      handbrake = true;
      label = '🤟 3 FINGERS • DRIFT';
      this.emitFeedback('DRIFT GESTURE 🌀', '3-FINGER SLIDE', '🌀');
    } else {
      throttle = 1.0;
      label = '🖐️ OPEN PALM • FULL GAS';
      this.emitFeedback('OPEN PALM ⚡', 'FULL THROTTLE', '🖐️');
    }

    this.camGesture = {
      active: true,
      throttle,
      brake,
      steer: Math.max(-1, Math.min(1, this.smoothedCamSteer)),
      nitro,
      handbrake,
      fingers,
      label
    };
  }

  processOpticalHandFrame() {
    if (!this.previewCtx || !this.previewCanvas || !this.videoEl) return;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;
    this.previewCtx.save();
    this.previewCtx.scale(-1, 1);
    this.previewCtx.drawImage(this.videoEl, -w, 0, w, h);
    this.previewCtx.restore();

    const frame = this.previewCtx.getImageData(0, 0, w, h).data;
    let sumX = 0;
    let sumY = 0;
    let weightSum = 0;

    if (this.lastFrameSample && this.lastFrameSample.length === frame.length) {
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const i = (y * w + x) * 4;
          const diff = Math.abs(frame[i] - this.lastFrameSample[i])
            + Math.abs(frame[i + 1] - this.lastFrameSample[i + 1])
            + Math.abs(frame[i + 2] - this.lastFrameSample[i + 2]);
          if (diff > 65) {
            sumX += x * diff;
            sumY += y * diff;
            weightSum += diff;
          }
        }
      }
    }
    this.lastFrameSample = new Uint8ClampedArray(frame);

    if (weightSum > 25000) {
      const cx = (sumX / weightSum) / w;
      const cy = (sumY / weightSum) / h;
      const raw = (cx - 0.5) * 2.2 * (0.7 + 0.4 * this.gestureSensitivity);
      const steer = Math.max(-1, Math.min(1, Math.abs(raw) > 0.1 ? raw : 0));
      this.smoothedCamSteer += (steer - this.smoothedCamSteer) * 0.25;
      this.camGesture = {
        active: true,
        throttle: cy > 0.72 ? 0 : 0.88,
        brake: cy > 0.72 ? 0.9 : 0,
        steer: this.smoothedCamSteer,
        nitro: cy < 0.22,
        handbrake: false,
        fingers: 5,
        label: cy > 0.72 ? 'OPTICAL BRAKE' : 'OPTICAL STEER'
      };
      this.previewCtx.strokeStyle = '#00f0ff';
      this.previewCtx.lineWidth = 2;
      this.previewCtx.beginPath();
      this.previewCtx.arc(cx * w, cy * h, 10, 0, Math.PI * 2);
      this.previewCtx.stroke();
    } else {
      this.decayCamGesture();
    }
  }

  decayCamGesture() {
    this.smoothedCamSteer *= 0.84;
    this.camGesture.throttle *= 0.85;
    this.camGesture.brake *= 0.7;
    this.camGesture.nitro = false;
    this.camGesture.handbrake = false;
    this.camGesture.steer = Math.abs(this.smoothedCamSteer) < 0.03 ? 0 : this.smoothedCamSteer;
    if (this.camGesture.throttle < 0.05) this.camGesture.throttle = 0;
    if (this.camGesture.brake < 0.05) this.camGesture.brake = 0;
    this.camGesture.active = Math.abs(this.camGesture.steer) > 0.03 || this.camGesture.throttle > 0;
    this.camGesture.label = 'SHOW HAND TO DRIVE';
  }

  drawLandmarkPreview(lm) {
    if (!this.previewCtx || !this.previewCanvas || !this.videoEl) return;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;
    this.previewCtx.save();
    this.previewCtx.scale(-1, 1);
    this.previewCtx.drawImage(this.videoEl, -w, 0, w, h);
    this.previewCtx.restore();

    if (!lm) return;
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]
    ];
    this.previewCtx.strokeStyle = '#00f0ff';
    this.previewCtx.lineWidth = 1.6;
    connections.forEach(([a, b]) => {
      this.previewCtx.beginPath();
      this.previewCtx.moveTo((1 - lm[a].x) * w, lm[a].y * h);
      this.previewCtx.lineTo((1 - lm[b].x) * w, lm[b].y * h);
      this.previewCtx.stroke();
    });
    this.previewCtx.fillStyle = '#ffaa00';
    for (let i = 0; i < lm.length; i++) {
      this.previewCtx.beginPath();
      this.previewCtx.arc((1 - lm[i].x) * w, lm[i].y * h, i === 8 ? 3.5 : 2, 0, Math.PI * 2);
      this.previewCtx.fill();
    }
  }

  emitFeedback(title, desc, icon) {
    const now = performance.now();
    if (this.lastFeedbackKey === title && now - this.lastFeedbackAt < 900) return;
    this.lastFeedbackKey = title;
    this.lastFeedbackAt = now;
    this.onGestureFeedback?.(title, desc, icon);
  }

  getState() {
    const hasTouch = this.touchGesture.active || performance.now() < this.touchNitroUntil;
    const hasCam = this.isCamActive && this.camGesture.active;
    if (!hasTouch && !hasCam) {
      return { active: false, throttle: 0, brake: 0, steer: 0, nitro: false, handbrake: false, label: '' };
    }
    const steer = hasTouch ? this.touchGesture.steer : this.camGesture.steer;
    return {
      active: true,
      throttle: Math.max(hasTouch ? this.touchGesture.throttle : 0, hasCam ? this.camGesture.throttle : 0),
      brake: Math.max(hasTouch ? this.touchGesture.brake : 0, hasCam ? this.camGesture.brake : 0),
      steer: Math.max(-1, Math.min(1, steer)),
      nitro: (hasTouch && this.touchGesture.nitro) || (hasCam && this.camGesture.nitro),
      handbrake: (hasTouch && this.touchGesture.handbrake) || (hasCam && this.camGesture.handbrake),
      label: hasCam ? this.camGesture.label : 'FINGER SWIPE'
    };
  }
}
