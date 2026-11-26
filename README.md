# ⚡ S3D Drive – 3D Web Racing & Open World Driving

[![Live Preview](https://img.shields.io/badge/LIVE%20PREVIEW-%E2%96%B6%20PLAY%20NOW-00b4d8?style=for-the-badge)](https://s3d-drive-game-1.onrender.com)

> **Live Game URL:** [https://s3d-drive-game-1.onrender.com](https://s3d-drive-game-1.onrender.com)

> **3D High-Performance Browser Racing Game featuring 10 Sculpted & Real GLB Vehicles, Unified Real-Time New Delhi Open World, Realistic Model-Specific Engine Acoustics, Horn & Indicator FX, Local Music + Live Indian FM Radio, Cinematic Crash Physics, and Real-Time Socket.IO Multiplayer.**

---

## 🌟 Highlights

- **10 Distinct Vehicles (`Ferrari 458 Italia`, `Lamborghini Aventador`, `Bugatti Chiron Pur Sport`, `Rolls-Royce Spectre`, `McLaren P1 GTR`, `Mahindra Thar 4x4`, `Mahindra Scorpio-N`, `Tata Safari`, `Phantom GT-R`, `Pulse F1-Grand`)** calibrated up to `399 km/h` with PBR clearcoat materials, interiors, projector headlamps, glowing brake rotors, HSRP plates, and custom aero/rim/tint mods.
- **Unified New Delhi Circuit & Climates**: Live clock-driven sky/sun (`Delhi Live`) plus Sunny, Golden Sunset, Monsoon Rain, Winter Fog, and Neon Night, featuring Kartavya Path, India Gate, Lodhi Gazebo, animated Delhi Metro trains, and open-world vistas.
- **Car-Specific WebAudio Engine Synth & FX**: Warm class-tuned engine harmonics, blow-off valve, shift thud, heavy layered crash audio, plus dual-tone car horn (`H`) and mechanical relay turn-signal / hazard blinkers (`Z` / `X` / `F`) synced to 3D corner emitters.
- **Music & Live Indian FM Player**: Stream Indian live radio stations or play your own local MP3/WAV/M4A files directly from your device with automatic source switching and independent Car Sound (`M`) and Music (`B`) mute controls.
- **Full Cinematic Crash Physics**: High-speed impacts launch rivals spinning and tumbling with 3D debris fragments, sparks, smoke trails, barrier rebounds, chain pileups, directional camera kick, and brief impact slow-motion before clean recovery.
- **Real-Time Online Multiplayer**: Custom 5-character room codes, live 45 Hz transform sync, leaderboard standings, and sanitized in-game chat.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js
```

Open **`http://localhost:3000`** in Chrome, Edge, or Firefox.

> [!NOTE]
> Use `PORT` and optional `ALLOWED_ORIGIN` environment variables in production. Never store API keys or tokens in client files, `.env` files tracked by Git, or documentation.

---

## 🎮 Controls

| Action | Keyboard | HUD / Touch |
| :--- | :--- | :--- |
| **Accelerate** | `W` / `Up Arrow` | Gas Pedal |
| **Steer Left / Right** | `A` / `D` or `Left` / `Right` | Left / Right Touch |
| **Brake / Reverse** | `S` / `Down Arrow` | Brake Pedal |
| **Handbrake / Drift** | `Space` | `DRIFT` Button |
| **Nitro Boost** | `Shift` / `N` | `NITRO` Button |
| **Manual Shift Up / Down** | `E` / `Q` (`PgUp` / `PgDn`) | `▲` / `▼` Paddles |
| **Horn** | `H` (Hold) | `📢 HORN` Button |
| **Left / Right / Hazard Indicator** | `Z` / `X` / `F` | `◀` / `▶` / `⚠` Buttons |
| **Change Camera / Reset** | `C` / `R` | Cam Icon |
| **Mute Car FX / Music** | `M` / `B` | `🏎️ CAR` / `🎵 MUSIC` |
| **Voice Commands / Pause** | `V` / `Esc` | Mic / Pause Icons |

---

## 📄 License
MIT License. Built with Express, Socket.IO, Three.js, and Web Audio API.
