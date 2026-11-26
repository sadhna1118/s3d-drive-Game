const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
app.disable('x-powered-by');

const allowedOrigin = process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',').map(s => s.trim()) : '*';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST']
  },
  maxHttpBufferSize: 1e5 // 100 KB cap per socket payload
});

const PORT = process.env.PORT || 3000;
const MAX_ROOMS = 150;

// HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), payment=(), usb=()');
  next();
});

app.use(express.json({ limit: '16kb' }));
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'Invalid JSON payload' });
  }
  return next(err);
});

function cleanText(val, fallback = '', maxLen = 24) {
  if (typeof val !== 'string') return fallback;
  const cleaned = val.replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim().slice(0, maxLen);
  return cleaned || fallback;
}

function cleanHexColor(val, fallback = '#00f0ff') {
  return (typeof val === 'string' && /^#[0-9a-fA-F]{6}$/.test(val.trim())) ? val.trim() : fallback;
}

function finiteNum(val, fallback = 0, min = -1e5, max = 1e5) {
  return (typeof val === 'number' && Number.isFinite(val)) ? Math.min(max, Math.max(min, val)) : fallback;
}

function isSafePublicHttpsUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || !rawUrl.startsWith('https://') || rawUrl.includes('.m3u8')) return false;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return false;
    if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)) return false;
    if (host === '::1' || host.startsWith('[') || host.startsWith('fe80') || host.startsWith('fc') || host.startsWith('fd')) return false;
    return true;
  } catch (e) {
    return false;
  }
}

function sanitizeTransform(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    x: finiteNum(raw.x, 0, -50000, 50000),
    y: finiteNum(raw.y, 0.5, -500, 5000),
    z: finiteNum(raw.z, 0, -50000, 50000),
    qx: finiteNum(raw.qx, 0, -1.1, 1.1),
    qy: finiteNum(raw.qy, 0, -1.1, 1.1),
    qz: finiteNum(raw.qz, 0, -1.1, 1.1),
    qw: finiteNum(raw.qw, 1, -1.1, 1.1),
    speed: finiteNum(raw.speed, 0, -200, 600),
    steer: finiteNum(raw.steer, 0, -2, 2),
    wheelRot: finiteNum(raw.wheelRot, 0, -1e6, 1e6),
    nitro: !!raw.nitro,
    drift: !!raw.drift,
    crashing: !!raw.crashing,
    lap: Math.max(1, Math.min(99, Math.trunc(finiteNum(raw.lap, 1, 1, 99)))),
    checkpoint: Math.max(0, Math.min(200, Math.trunc(finiteNum(raw.checkpoint, 0, 0, 200))))
  };
}

// Client Error Telemetry Endpoint (bounded & sanitized)
app.post('/api/client-error', (req, res) => {
  const body = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
  const safeErr = {
    message: cleanText(body.message, 'Unknown error', 240),
    source: cleanText(body.source, 'client', 140),
    line: finiteNum(body.line, 0, 0, 100000)
  };
  console.log('🚨 CLIENT ERROR REPORTED:', JSON.stringify(safeErr));
  res.json({ ok: true });
});

// Live Indian FM Directory Proxy (queries Radio-Browser for verified playable HTTPS MP3/AAC India stations)
app.get('/api/radio/india', async (req, res) => {
  try {
    const q = cleanText(String(req.query.q || ''), '', 48);
    const url = q
      ? `https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(q)}&hidebroken=true&order=clickcount&reverse=true&limit=36`
      : 'https://de1.api.radio-browser.info/json/stations/search?countrycode=IN&hidebroken=true&order=clickcount&reverse=true&limit=50';
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'S3DDriveGame/1.0' },
      signal: AbortSignal.timeout(6500)
    });
    if (!upstream.ok) return res.status(502).json({ stations: [], error: 'Upstream radio directory error' });
    const raw = await upstream.json();
    const stations = (Array.isArray(raw) ? raw : [])
      .filter((s) => s && s.lastcheckok === 1 && isSafePublicHttpsUrl(s.url_resolved))
      .slice(0, 32)
      .map((s) => ({
        id: `in_${cleanText(String(s.stationuuid || ''), Math.random().toString(36).slice(2, 8), 40)}`,
        name: `🔴 ${cleanText(s.name, 'Indian FM', 52)}`,
        genre: [
          cleanText(s.language, 'hindi', 20),
          cleanText(s.codec, 'MP3', 10),
          s.bitrate ? `${Math.max(0, Math.min(512, Number(s.bitrate) || 0))}k` : ''
        ].filter(Boolean).join(' • '),
        streamUrl: s.url_resolved,
        isLive: true
      }));
    res.json({ stations });
  } catch (err) {
    res.status(502).json({ stations: [], error: 'Upstream radio service unavailable' });
  }
});

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rooms State Management
const rooms = new Map();

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getPublicRooms() {
  const list = [];
  rooms.forEach((room, code) => {
    list.push({
      code: room.code,
      name: room.name,
      hostName: room.players.get(room.hostId)?.name || 'Unknown',
      playerCount: room.players.size,
      maxPlayers: room.maxPlayers,
      trackId: room.trackId,
      laps: room.laps,
      state: room.state
    });
  });
  return list;
}

io.on('connection', (socket) => {
  let currentRoomCode = null;

  // Send current room list
  socket.emit('rooms_list', getPublicRooms());

  // Ping pong for latency monitoring
  socket.on('ping_check', (timestamp) => {
    socket.emit('pong_check', timestamp);
  });

  // Create Room
  socket.on('create_room', (rawData, callback) => {
    const data = (rawData && typeof rawData === 'object') ? rawData : {};
    if (currentRoomCode) handleLeave();
    if (rooms.size >= MAX_ROOMS) {
      if (typeof callback === 'function') callback({ success: false, message: 'Server room capacity reached. Try again shortly.' });
      return;
    }

    const code = generateRoomCode();
    const room = {
      code,
      name: cleanText(data.name, `Grand Prix ${code}`, 28),
      hostId: socket.id,
      maxPlayers: Math.min(Math.max(Math.trunc(finiteNum(data.maxPlayers, 6, 2, 8)), 2), 8),
      trackId: cleanText(data.trackId, 'delhi_live', 32),
      laps: Math.min(Math.max(Math.trunc(finiteNum(data.laps, 3, 1, 10)), 1), 10),
      state: 'lobby', // 'lobby' | 'countdown' | 'racing' | 'finished'
      startTime: null,
      players: new Map()
    };

    const hostPlayer = {
      id: socket.id,
      name: cleanText(data.playerName, 'Player 1', 16),
      carIndex: Math.max(0, Math.trunc(finiteNum(data.carIndex, 0, 0, 50))),
      carColor: cleanHexColor(data.carColor, '#00f0ff'),
      isHost: true,
      ready: true,
      gridSlot: 0,
      lap: 1,
      checkpoint: 0,
      finished: false,
      totalTime: 0,
      bestLapTime: 0,
      state: {
        x: 0, y: 0.5, z: 0,
        qx: 0, qy: 0, qz: 0, qw: 1,
        speed: 0, steer: 0,
        wheelRot: 0,
        nitro: false, drift: false,
        gear: 1, rpm: 1000
      }
    };

    room.players.set(socket.id, hostPlayer);
    rooms.set(code, room);
    currentRoomCode = code;

    socket.join(code);
    io.emit('rooms_list', getPublicRooms());

    if (typeof callback === 'function') {
      callback({
        success: true,
        room: {
          code: room.code,
          name: room.name,
          hostId: room.hostId,
          maxPlayers: room.maxPlayers,
          trackId: room.trackId,
          laps: room.laps,
          state: room.state,
          players: Array.from(room.players.values())
        },
        playerId: socket.id
      });
    }
  });

  // Join Room
  socket.on('join_room', (rawData, callback) => {
    const data = (rawData && typeof rawData === 'object') ? rawData : {};
    const code = cleanText(data.code, '', 10).toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      if (typeof callback === 'function') callback({ success: false, message: 'Room not found.' });
      return;
    }

    if (currentRoomCode && currentRoomCode !== code) handleLeave();

    if (room.players.size >= room.maxPlayers) {
      if (typeof callback === 'function') callback({ success: false, message: 'Room is already full.' });
      return;
    }

    if (room.state !== 'lobby') {
      if (typeof callback === 'function') callback({ success: false, message: 'Race already in progress.' });
      return;
    }

    const gridSlot = room.players.size;
    const player = {
      id: socket.id,
      name: cleanText(data.playerName, `Racer ${gridSlot + 1}`, 16),
      carIndex: Math.max(0, Math.trunc(finiteNum(data.carIndex, gridSlot % 4, 0, 50))),
      carColor: cleanHexColor(data.carColor, '#ff0055'),
      isHost: false,
      ready: false,
      gridSlot,
      lap: 1,
      checkpoint: 0,
      finished: false,
      totalTime: 0,
      bestLapTime: 0,
      state: {
        x: 0, y: 0.5, z: 0,
        qx: 0, qy: 0, qz: 0, qw: 1,
        speed: 0, steer: 0,
        wheelRot: 0,
        nitro: false, drift: false,
        gear: 1, rpm: 1000
      }
    };

    room.players.set(socket.id, player);
    currentRoomCode = code;
    socket.join(code);

    io.to(code).emit('room_state', {
      code: room.code,
      name: room.name,
      hostId: room.hostId,
      maxPlayers: room.maxPlayers,
      trackId: room.trackId,
      laps: room.laps,
      state: room.state,
      players: Array.from(room.players.values())
    });

    io.emit('rooms_list', getPublicRooms());

    if (typeof callback === 'function') {
      callback({
        success: true,
        room: {
          code: room.code,
          name: room.name,
          hostId: room.hostId,
          maxPlayers: room.maxPlayers,
          trackId: room.trackId,
          laps: room.laps,
          state: room.state,
          players: Array.from(room.players.values())
        },
        playerId: socket.id
      });
    }
  });

  // Toggle Ready
  socket.on('toggle_ready', (ready) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      player.ready = !!ready;
      io.to(currentRoomCode).emit('player_ready_change', {
        id: socket.id,
        ready: player.ready
      });
    }
  });

  // Update Customization
  socket.on('update_customization', (data) => {
    if (!currentRoomCode || !data || typeof data !== 'object') return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      if (data.carIndex !== undefined) player.carIndex = Math.max(0, Math.trunc(finiteNum(data.carIndex, player.carIndex, 0, 50)));
      if (data.carColor !== undefined) player.carColor = cleanHexColor(data.carColor, player.carColor);
      if (data.name !== undefined) player.name = cleanText(data.name, player.name, 16);

      io.to(currentRoomCode).emit('player_customization_changed', {
        id: socket.id,
        carIndex: player.carIndex,
        carColor: player.carColor,
        name: player.name
      });
    }
  });

  // Start Race (Host only)
  socket.on('start_race', () => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room || room.hostId !== socket.id) return;

    room.state = 'countdown';
    const countdownStart = Date.now() + 200;
    room.startTime = countdownStart + 1350;

    // Reset player race stats & assign grid positions
    let slot = 0;
    room.players.forEach((p) => {
      p.gridSlot = slot++;
      p.lap = 1;
      p.checkpoint = 0;
      p.finished = false;
      p.totalTime = 0;
      p.bestLapTime = 0;
    });

    io.to(currentRoomCode).emit('race_start_countdown', {
      countdownStart,
      raceStartTime: room.startTime,
      players: Array.from(room.players.values())
    });

    const targetRoomCode = currentRoomCode;
    setTimeout(() => {
      if (rooms.get(targetRoomCode) === room) {
        room.state = 'racing';
        io.to(targetRoomCode).emit('race_green_flag');
      }
    }, 1550);
  });

  // Player Physics & Transform Broadcast (High Frequency, strictly schema-validated)
  socket.on('player_transform', (rawState) => {
    if (!currentRoomCode) return;
    const clean = sanitizeTransform(rawState);
    if (!clean) return;
    const room = rooms.get(currentRoomCode);
    if (!room || room.state !== 'racing') return;

    const player = room.players.get(socket.id);
    if (player) {
      player.state = clean;
    }
  });

  // Checkpoint Triggered
  socket.on('checkpoint_passed', (data) => {
    if (!currentRoomCode || !data || typeof data !== 'object') return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      player.checkpoint = Math.max(0, Math.trunc(finiteNum(data.checkpointIndex, player.checkpoint, 0, 200)));
      player.lap = Math.max(1, Math.trunc(finiteNum(data.lap, player.lap, 1, 99)));

      io.to(currentRoomCode).emit('player_progress_update', {
        id: socket.id,
        lap: player.lap,
        checkpoint: player.checkpoint,
        lapTime: finiteNum(data.lapTime, 0, 0, 36000),
        splitDelta: finiteNum(data.splitDelta, 0, -3600, 3600)
      });
    }
  });

  // Lap Completed
  socket.on('lap_completed', (data) => {
    if (!currentRoomCode || !data || typeof data !== 'object') return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      const lapTime = finiteNum(data.lapTime, 0, 0.1, 36000);
      player.lap = Math.max(1, Math.trunc(finiteNum(data.lap, player.lap, 1, 99)));
      if (!player.bestLapTime || lapTime < player.bestLapTime) {
        player.bestLapTime = lapTime;
      }

      io.to(currentRoomCode).emit('player_lap_finished', {
        id: socket.id,
        name: player.name,
        lap: player.lap,
        lapTime,
        bestLapTime: player.bestLapTime
      });
    }
  });

  // Player Finished Race
  socket.on('finish_race', (data) => {
    if (!currentRoomCode || !data || typeof data !== 'object') return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player && !player.finished) {
      player.finished = true;
      player.totalTime = finiteNum(data.totalTime, 0, 0.1, 86400);
      player.bestLapTime = finiteNum(data.bestLapTime, player.bestLapTime || 0, 0, 36000);

      // Check current position among finished racers
      const finishedCount = Array.from(room.players.values()).filter(p => p.finished).length;

      io.to(currentRoomCode).emit('player_finished', {
        id: socket.id,
        name: player.name,
        position: finishedCount,
        totalTime: player.totalTime,
        bestLapTime: player.bestLapTime
      });

      // Check if all players finished
      const allFinished = Array.from(room.players.values()).every(p => p.finished);
      if (allFinished) {
        room.state = 'finished';
        io.to(currentRoomCode).emit('race_ended', {
          podium: Array.from(room.players.values())
            .filter(p => p.finished)
            .sort((a, b) => a.totalTime - b.totalTime)
        });
      }
    }
  });

  // In-Game Chat
  socket.on('send_chat', (text) => {
    if (!currentRoomCode || typeof text !== 'string') return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    const sanitized = cleanText(text, '', 100);
    if (sanitized.length > 0) {
      io.to(currentRoomCode).emit('chat_message', {
        senderId: socket.id,
        senderName: player?.name || 'Racer',
        senderColor: player?.carColor || '#00f0ff',
        text: sanitized,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  });

  // Leave Room
  function handleLeave() {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) {
      currentRoomCode = null;
      return;
    }

    room.players.delete(socket.id);
    socket.leave(currentRoomCode);

    if (room.players.size === 0) {
      rooms.delete(currentRoomCode);
    } else {
      // If host left, elect new host
      if (room.hostId === socket.id) {
        const nextHostId = room.players.keys().next().value;
        room.hostId = nextHostId;
        const newHost = room.players.get(nextHostId);
        if (newHost) newHost.isHost = true;
      }

      io.to(currentRoomCode).emit('player_left', {
        id: socket.id,
        newHostId: room.hostId,
        players: Array.from(room.players.values())
      });
    }

    currentRoomCode = null;
    io.emit('rooms_list', getPublicRooms());
  }

  socket.on('leave_room', handleLeave);
  socket.on('disconnect', handleLeave);
});

// Server Tick Loop for Low-Latency Interpolation (45 Hz)
setInterval(() => {
  rooms.forEach((room, code) => {
    if (room.state === 'racing') {
      const transforms = {};
      room.players.forEach((player, id) => {
        transforms[id] = player.state;
      });
      io.to(code).volatile.emit('room_transforms', {
        timestamp: Date.now(),
        transforms
      });
    }
  });
}, 1000 / 45);

server.listen(PORT, () => {
  console.log(`🚀 S3D Drive Server running at http://localhost:${PORT}`);
});
