/**
 * Velocity Rush 3D - Universal Input Controller
 * Supports Keyboard (WASD/Arrows), Gamepad API (Xbox/PS), and Mobile Touch Controls.
 */

export class InputManager {
  constructor(voiceManager = null) {
    this.voiceManager = voiceManager;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      handbrake: false,
      nitro: false,
      changeCam: false,
      reset: false
    };

    this.touchInput = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false,
      nitro: false
    };

    this.onCamChange = null;
    this.onResetCar = null;

    this.initKeyboard();
    this.initTouchControls();
  }

  setVoiceManager(vm) {
    this.voiceManager = vm;
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Avoid intercepting chat input
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'Space':
          this.keys.handbrake = true;
          e.preventDefault();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          this.keys.nitro = true;
          break;
        case 'KeyC':
          if (this.onCamChange) this.onCamChange();
          break;
        case 'KeyR':
          if (this.onResetCar) this.onResetCar();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'Space':
          this.keys.handbrake = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          this.keys.nitro = false;
          break;
      }
    });
  }

  initTouchControls() {
    // Touch controls mapped from DOM elements in index.html
    const btnGas = document.getElementById('touch-gas');
    const btnBrake = document.getElementById('touch-brake');
    const btnLeft = document.getElementById('touch-left');
    const btnRight = document.getElementById('touch-right');
    const btnNitro = document.getElementById('touch-nitro');
    const btnHandbrake = document.getElementById('touch-handbrake');

    const bindTouch = (elem, onStart, onEnd) => {
      if (!elem) return;
      elem.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); }, { passive: false });
      elem.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); }, { passive: false });
      elem.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(); });
      elem.addEventListener('mouseup', (e) => { e.preventDefault(); onEnd(); });
      elem.addEventListener('mouseleave', (e) => { onEnd(); });
    };

    bindTouch(btnGas, () => { this.touchInput.throttle = 1; }, () => { this.touchInput.throttle = 0; });
    bindTouch(btnBrake, () => { this.touchInput.brake = 1; }, () => { this.touchInput.brake = 0; });
    bindTouch(btnLeft, () => { this.touchInput.steer = -1; }, () => { if (this.touchInput.steer < 0) this.touchInput.steer = 0; });
    bindTouch(btnRight, () => { this.touchInput.steer = 1; }, () => { if (this.touchInput.steer > 0) this.touchInput.steer = 0; });
    bindTouch(btnNitro, () => { this.touchInput.nitro = true; }, () => { this.touchInput.nitro = false; });
    bindTouch(btnHandbrake, () => { this.touchInput.handbrake = true; }, () => { this.touchInput.handbrake = false; });
  }

  pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0];
    if (!gp) return null;

    // Standard Gamepad Mapping (Xbox/PlayStation)
    // Axes: 0 = Left Stick X (-1 left, +1 right)
    // Buttons: 7 = RT / R2 (Throttle), 6 = LT / L2 (Brake), 0 = A / Cross (Nitro), 2 = X / Square (Handbrake)
    const deadzone = 0.15;
    let steer = gp.axes[0] || 0;
    if (Math.abs(steer) < deadzone) steer = 0;

    const throttle = (gp.buttons[7] ? gp.buttons[7].value : 0) || (gp.buttons[0]?.pressed ? 1 : 0);
    const brake = (gp.buttons[6] ? gp.buttons[6].value : 0) || (gp.buttons[1]?.pressed ? 1 : 0);
    const handbrake = !!gp.buttons[2]?.pressed;
    const nitro = !!gp.buttons[3]?.pressed || !!gp.buttons[5]?.pressed; // Y or RB

    return {
      throttle,
      brake,
      steer,
      handbrake,
      nitro
    };
  }

  getState() {
    const voice = this.voiceManager ? this.voiceManager.getState() : { throttle: 0, brake: 0, steer: 0, handbrake: false, nitro: false, changeCam: false, reset: false };

    // Trigger voice actions if requested
    if (voice.changeCam && this.onCamChange) {
      this.onCamChange();
      voice.changeCam = false;
    }
    if (voice.reset && this.onResetCar) {
      this.onResetCar();
      voice.reset = false;
    }

    const gp = this.pollGamepad();
    if (gp) {
      let combinedSteer = gp.steer !== 0 ? gp.steer : (this.touchInput.steer !== 0 ? this.touchInput.steer : (this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0));
      if (combinedSteer === 0 && voice.steer !== 0) combinedSteer = voice.steer;

      return {
        throttle: Math.max(gp.throttle, this.touchInput.throttle, this.keys.forward ? 1 : 0, voice.throttle),
        brake: Math.max(gp.brake, this.touchInput.brake, this.keys.backward ? 1 : 0, voice.brake),
        steer: combinedSteer,
        handbrake: gp.handbrake || this.touchInput.handbrake || this.keys.handbrake || voice.handbrake,
        nitro: gp.nitro || this.touchInput.nitro || this.keys.nitro || voice.nitro
      };
    }

    let steer = 0;
    if (this.keys.left) steer -= 1;
    if (this.keys.right) steer += 1;
    if (this.touchInput.steer !== 0) steer = this.touchInput.steer;
    if (steer === 0 && voice.steer !== 0) steer = voice.steer;

    return {
      throttle: Math.max(this.keys.forward ? 1 : 0, this.touchInput.throttle, voice.throttle),
      brake: Math.max(this.keys.backward ? 1 : 0, this.touchInput.brake, voice.brake),
      steer,
      handbrake: this.keys.handbrake || this.touchInput.handbrake || voice.handbrake,
      nitro: this.keys.nitro || this.touchInput.nitro || voice.nitro
    };
  }
}
