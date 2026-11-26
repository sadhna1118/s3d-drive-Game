/**
 * Velocity Rush 3D - Real-Time Multiplayer Network Client
 * Socket.io networking, room management, entity sync, latency monitoring & chat.
 */

export class NetworkClient {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.myId = null;
    this.currentRoom = null;
    this.ping = 0;
    this.lastPingSent = 0;

    // Callbacks
    this.onRoomsList = null;
    this.onRoomState = null;
    this.onPlayerReadyChange = null;
    this.onPlayerCustomizationChange = null;
    this.onRaceStartCountdown = null;
    this.onRaceGreenFlag = null;
    this.onRoomTransforms = null;
    this.onPlayerProgress = null;
    this.onPlayerLapFinished = null;
    this.onPlayerFinished = null;
    this.onRaceEnded = null;
    this.onChatMessage = null;
    this.onPlayerLeft = null;

    this.initSocket();
  }

  initSocket() {
    try {
      if (typeof io !== 'undefined') {
        this.socket = io({
          reconnection: true,
          reconnectionAttempts: 5,
          timeout: 5000
        });

        this.socket.on('connect', () => {
          this.connected = true;
          this.myId = this.socket.id;
          console.log('⚡ Connected to Velocity Rush Multiplayer Server! ID:', this.myId);
          this.startPingLoop();
        });

        this.socket.on('disconnect', () => {
          this.connected = false;
          console.log('Multiplayer disconnected.');
        });

        this.socket.on('rooms_list', (rooms) => {
          if (this.onRoomsList) this.onRoomsList(rooms);
        });

        this.socket.on('room_state', (room) => {
          this.currentRoom = room;
          if (this.onRoomState) this.onRoomState(room);
        });

        this.socket.on('player_ready_change', (data) => {
          if (this.onPlayerReadyChange) this.onPlayerReadyChange(data);
        });

        this.socket.on('player_customization_changed', (data) => {
          if (this.onPlayerCustomizationChange) this.onPlayerCustomizationChange(data);
        });

        this.socket.on('race_start_countdown', (data) => {
          if (this.onRaceStartCountdown) this.onRaceStartCountdown(data);
        });

        this.socket.on('race_green_flag', () => {
          if (this.onRaceGreenFlag) this.onRaceGreenFlag();
        });

        this.socket.on('room_transforms', (data) => {
          if (this.onRoomTransforms) this.onRoomTransforms(data.transforms);
        });

        this.socket.on('player_progress_update', (data) => {
          if (this.onPlayerProgress) this.onPlayerProgress(data);
        });

        this.socket.on('player_lap_finished', (data) => {
          if (this.onPlayerLapFinished) this.onPlayerLapFinished(data);
        });

        this.socket.on('player_finished', (data) => {
          if (this.onPlayerFinished) this.onPlayerFinished(data);
        });

        this.socket.on('race_ended', (data) => {
          if (this.onRaceEnded) this.onRaceEnded(data);
        });

        this.socket.on('chat_message', (data) => {
          if (this.onChatMessage) this.onChatMessage(data);
        });

        this.socket.on('player_left', (data) => {
          if (this.onPlayerLeft) this.onPlayerLeft(data);
        });

        this.socket.on('pong_check', (timestamp) => {
          this.ping = Date.now() - timestamp;
        });
      }
    } catch (e) {
      console.warn('Socket.io client initialization error:', e);
    }
  }

  startPingLoop() {
    setInterval(() => {
      if (this.socket && this.connected) {
        this.lastPingSent = Date.now();
        this.socket.emit('ping_check', this.lastPingSent);
      }
    }, 2000);
  }

  createRoom(data, callback) {
    if (!this.socket || !this.connected) {
      if (callback) callback({ success: false, message: 'Not connected to server' });
      return;
    }
    this.socket.emit('create_room', data, (res) => {
      if (res && res.success) {
        this.currentRoom = res.room;
      }
      if (callback) callback(res);
    });
  }

  joinRoom(code, data, callback) {
    if (!this.socket || !this.connected) {
      if (callback) callback({ success: false, message: 'Not connected to server' });
      return;
    }
    this.socket.emit('join_room', { code, ...data }, (res) => {
      if (res && res.success) {
        this.currentRoom = res.room;
      }
      if (callback) callback(res);
    });
  }

  leaveRoom() {
    if (this.socket && this.connected) {
      this.socket.emit('leave_room');
    }
    this.currentRoom = null;
  }

  toggleReady(ready) {
    if (this.socket && this.connected) {
      this.socket.emit('toggle_ready', ready);
    }
  }

  updateCustomization(carIndex, carColor, name) {
    if (this.socket && this.connected) {
      this.socket.emit('update_customization', { carIndex, carColor, name });
    }
  }

  startRace() {
    if (this.socket && this.connected) {
      this.socket.emit('start_race');
    }
  }

  sendTransform(transformData) {
    if (this.socket && this.connected) {
      this.socket.volatile.emit('player_transform', transformData);
    }
  }

  sendCheckpointPassed(checkpointIndex, lap, lapTime, splitDelta) {
    if (this.socket && this.connected) {
      this.socket.emit('checkpoint_passed', { checkpointIndex, lap, lapTime, splitDelta });
    }
  }

  sendLapCompleted(lap, lapTime) {
    if (this.socket && this.connected) {
      this.socket.emit('lap_completed', { lap, lapTime });
    }
  }

  sendFinishRace(totalTime, bestLapTime) {
    if (this.socket && this.connected) {
      this.socket.emit('finish_race', { totalTime, bestLapTime });
    }
  }

  sendChat(text) {
    if (this.socket && this.connected && text.trim().length > 0) {
      this.socket.emit('send_chat', text.trim());
    }
  }
}
