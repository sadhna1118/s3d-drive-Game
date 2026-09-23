# ⚡ S3D Drive – 3D Web Racing & Voice Driving

> **Flagship 3D High-Performance Web Racing Game with Speech Recognition Voice Driving Control, Adaptive AI Nemesis Rivals, 5 Dynamic Environmental Tracks, Real-Time Online Multiplayer, and Multi-Angle Cinematic Replays.**

---

## 🌟 Key Features

### 🎙️ 1. Real-Time Speech Recognition Voice Driving Control
- Real-time continuous voice navigation in **English** & **Hindi**:
  - **Speed / Accelerate**: *"Speed"*, *"Fast"*, *"Run"*, *"Go"*, *"Chal"*, *"Chalo"*, *"Bhagao"*, *"Aage"*
  - **Steer Left**: *"Left"*, *"Turn Left"*, *"Baayein"*, *"Left mud"*, *"Left lo"*
  - **Steer Right**: *"Right"*, *"Turn Right"*, *"Daayein"*, *"Right mud"*, *"Right lo"*
  - **Center Steering**: *"Straight"*, *"Center"*, *"Seedha"*, *"Seedhe"*
  - **Nitro Warp**: *"Nitro"*, *"Boost"*, *"NOS"*, *"Turbo"*, *"Tez"*
  - **Brake / Stop**: *"Brake"*, *"Stop"*, *"Halt"*, *"Ruko"*, *"Rok"*
  - **Drift**: *"Drift"*, *"Handbrake"*, *"Slide"*
  - **Reverse**: *"Reverse"*, *"Back"*, *"Peeche"*
  - **Reset**: *"Reset"*, *"Theek karo"*
  - **Camera**: *"Camera"*, *"View"*, *"Cockpit"*

### 🏎️ 2. Four Authentic Supercar Classes
- **Hyperion GT3**: Twin-turbo track weapon with active aero swan-neck spoiler.
- **Apex Hyperion X**: Quad-motor electric hypercar with Y-laser signature headlamps.
- **Phantom GT-R**: Bolted widebody tuner with custom turbo exhaust pipes & drift balance.
- **Pulse F1-Grand**: Open-wheel formula single-seater with titanium halo safety structure.

### 🛣️ 3. Five Dynamic Environmental Tracks
1. **🌇 Neon City (Night Circuit)**: High-speed street GP with holographic gantries.
2. **🌧️ Cyber City (Rain & Thunder)**: Wet reflective asphalt with thunder and reduced tire grip.
3. **🏜️ Cyber Desert (Sandstorm)**: Desert highway with air drag and shifting dunes.
4. **🪐 Orbital Ring (Space Station)**: Low-gravity zero-G lunar highway.
5. **⚙️ Industrial Core Zone**: Factory gauntlet with moving hydraulic pistons & obstacles.

### 🌐 4. Real-Time Online Multiplayer
- Custom room codes for instant multiplayer lobbies (up to 8 racers per room).
- Sub-30ms vehicle transform synchronization, drift sparks, wheel rotation, and in-game chat.

### 📊 5. Professional Telemetry & Cinematic Replays
- Real-time telemetry dashboard (Top Speed, Average Speed, Drift Distance, Nitro Time, Overtakes).
- Multi-angle director replay player (Chase, Low Asphalt, Wheel Side, Overhead Drone).
- High-res photo mode with watermarked screenshot export.

---

## 🚀 Quick Start (Local Run)

```bash
# 1. Install dependencies
npm install

# 2. Start server
node server.js
```
Open **`http://localhost:3000`** in Chrome, Edge, or Firefox.

---

## 🎮 Controls

| Action | Keyboard | Touch / Mobile | Voice Command (EN / HI) |
| :--- | :--- | :--- | :--- |
| **Accelerate** | `W` / `Up Arrow` | Gas Pedal | *"Speed"* / *"Chal"* / *"Fast"* |
| **Steer Left** | `A` / `Left Arrow` | Left Arrow | *"Left"* / *"Baayein"* |
| **Steer Right** | `D` / `Right Arrow` | Right Arrow | *"Right"* / *"Daayein"* |
| **Brake / Reverse** | `S` / `Down Arrow` | Brake Pedal | *"Brake"* / *"Stop"* / *"Ruko"* |
| **Handbrake / Drift** | `Space` | E-Brake | *"Drift"* / *"Handbrake"* |
| **Nitro Warp** | `Shift` / `N` | Nitro Button | *"Nitro"* / *"Boost"* / *"Tez"* |
| **Change Camera** | `C` | Cam Icon | *"Camera"* / *"View"* |
| **Reset Car** | `R` | — | *"Reset"* / *"Respawn"* |

---

## 🌐 Free Cloud Deployment

For deploying online with persistent WebSockets and free automatic HTTPS for Voice Mic:
1. Connect this repo to **[Render.com](https://render.com)**.
2. Build command: `npm install` | Start command: `node server.js`
3. Check **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for detailed instructions.

---

## 📄 License
MIT License. Built with Three.js, Socket.io, Express, and Web Speech API.