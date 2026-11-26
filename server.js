const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Client Error Telemetry Endpoint
app.post('/api/client-error', (req, res) => {
  console.log('🚨 CLIENT ERROR REPORTED:', JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
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
  socket.on('create_room', (data, callback) => {
    const code = generateRoomCode();
    const room = {
      code,
      name: data.name || `Grand Prix ${code}`,
      hostId: socket.id,
      maxPlayers: Math.min(Math.max(data.maxPlayers || 6, 2), 8),
      trackId: data.trackId || 'cyber_circuit',
      laps: data.laps || 3,
      state: 'lobby', // 'lobby' | 'countdown' | 'racing' | 'finished'
      startTime: null,
      players: new Map()
    };

    const hostPlayer = {
      id: socket.id,
      name: (data.playerName || 'Player 1').trim().substring(0, 16),
      carIndex: data.carIndex ?? 0,
      carColor: data.carColor || '#00f0ff',
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

    if (callback) {
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
  socket.on('join_room', (data, callback) => {
    const code = (data.code || '').toUpperCase().trim();
    const room = rooms.get(code);

    if (!room) {
      if (callback) callback({ success: false, message: 'Room not found.' });
      return;
    }

    if (room.players.size >= room.maxPlayers) {
      if (callback) callback({ success: false, message: 'Room is already full.' });
      return;
    }

    if (room.state !== 'lobby') {
      if (callback) callback({ success: false, message: 'Race already in progress.' });
      return;
    }

    const gridSlot = room.players.size;
    const player = {
      id: socket.id,
      name: (data.playerName || `Racer ${gridSlot + 1}`).trim().substring(0, 16),
      carIndex: data.carIndex ?? (gridSlot % 4),
      carColor: data.carColor || '#ff0055',
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

    if (callback) {
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
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      if (data.carIndex !== undefined) player.carIndex = data.carIndex;
      if (data.carColor !== undefined) player.carColor = data.carColor;
      if (data.name !== undefined) player.name = data.name.trim().substring(0, 16);

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
    const countdownStart = Date.now() + 1000; // 1s buffer before 3, 2, 1, GO
    room.startTime = countdownStart + 4000;

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

    setTimeout(() => {
      if (rooms.get(currentRoomCode) === room) {
        room.state = 'racing';
        io.to(currentRoomCode).emit('race_green_flag');
      }
    }, 5000);
  });

  // Player Physics & Transform Broadcast (High Frequency)
  socket.on('player_transform', (state) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room || room.state !== 'racing') return;

    const player = room.players.get(socket.id);
    if (player) {
      player.state = state;
    }
  });

  // Checkpoint Triggered
  socket.on('checkpoint_passed', (data) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      player.checkpoint = data.checkpointIndex;
      player.lap = data.lap;

      io.to(currentRoomCode).emit('player_progress_update', {
        id: socket.id,
        lap: player.lap,
        checkpoint: player.checkpoint,
        lapTime: data.lapTime,
        splitDelta: data.splitDelta
      });
    }
  });

  // Lap Completed
  socket.on('lap_completed', (data) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player) {
      player.lap = data.lap;
      if (!player.bestLapTime || data.lapTime < player.bestLapTime) {
        player.bestLapTime = data.lapTime;
      }

      io.to(currentRoomCode).emit('player_lap_finished', {
        id: socket.id,
        name: player.name,
        lap: data.lap,
        lapTime: data.lapTime,
        bestLapTime: player.bestLapTime
      });
    }
  });

  // Player Finished Race
  socket.on('finish_race', (data) => {
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    if (player && !player.finished) {
      player.finished = true;
      player.totalTime = data.totalTime;
      player.bestLapTime = data.bestLapTime;

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
    if (!currentRoomCode) return;
    const room = rooms.get(currentRoomCode);
    if (!room) return;

    const player = room.players.get(socket.id);
    const sanitized = (text || '').trim().substring(0, 100);
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
  const handleLeave = () => {
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
  };

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
