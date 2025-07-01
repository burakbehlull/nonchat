import { nanoid } from 'nanoid';

const rooms = {};

export default (io, socket) => {
  const userId = socket.handshake.query.userId;
  socket.data.userId = userId;

  socket.on('createRoom', ({ name, password, limit }, callback) => {
    const roomId = nanoid(8);
    rooms[roomId] = {
      name: name,
      password: password || null,
      limit: limit || 10,
      ownerId: socket.id,
      members: {},
      banned: [],
    };

    rooms[roomId].members[socket.id] = {
      userId,
      name: "Nobody"
    };

    socket.join(roomId);
	
	io.to(roomId).emit('roomUsers', getUsers(roomId));

    callback({ success: true, roomId });
  });

  socket.on('joinRoom', ({ roomId, password }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false, message: 'Room not found.' });
	
    if (room.banned.includes(userId)) {
      return callback({ success: false, message: 'You are banned.' });
    }

    if (room.password && room.password !== password) {
      return callback({ success: false, message: 'Wrong password.' });
    }

    if (Object.keys(room.members).length >= room.limit) {
      return callback({ success: false, message: 'Room is full.' });
    }
	
	if (!room) return callback({ success: false, message: 'Room no longer exists.' });


    room.members[socket.id] = {
      userId,
      name: "Nobody"
    };

    socket.join(roomId);
    callback({ success: true, room });

    io.to(roomId).emit('roomUsers', getUsers(roomId));
  });

  socket.on('getRoomInfo', ({ roomId }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false, message: 'Room not found.' });
    const isOwner = socket.id === room.ownerId;
    callback({
      success: true,
      isOwner,
      name: room.name,
      limit: room.limit,
      passwordProtected: !!room.password,
	  users: getUsers(roomId)
    });
  });

  socket.on('changeName', ({ roomId, newName, targetSocketId }) => {
    const room = rooms[roomId];
    if (!room) return;

    const isSelf = socket.id === targetSocketId;
    const isOwner = room.ownerId === socket.id;

    if (!isSelf && !isOwner) return;

    if (!room.members[targetSocketId]) return;

    room.members[targetSocketId].name = newName;

    io.to(roomId).emit('roomUsers', getUsers(roomId));
  });

  socket.on('updateRoom', ({ roomId, name, limit, password }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false });
    if (room.ownerId !== socket.id) return callback({ success: false, message: 'Not authorized.' });

    room.name = name || room.name;
    room.limit = limit || room.limit;
   
    if (password === "" || password === null) {
		room.password = null;
	} else if (typeof password === 'string') {
		room.password = password;
	}

    callback({ success: true,  room: {
      ...room,
		passwordProtected: !!room.password
	  }	
	});
  });

  socket.on("kickUser", ({ roomId, targetSocketId }, callback) => {
    const room = rooms[roomId];
    if (!room) return;

    const target = room.members[targetSocketId];
    if (!target) return;

    if (!room.banned.includes(target.userId)) {
      room.banned.push(target.userId);
    }

    const targetSocket = io.sockets.sockets.get(targetSocketId);
    if (targetSocket) {
      targetSocket.leave(roomId);
      targetSocket.emit("bannedFromRoom", { roomId });
    }

    delete room.members[targetSocketId];
    io.to(roomId).emit("roomUsers", getUsers(roomId));

    callback?.({ success: true });
  });

  socket.on('sendMessage', ({ roomId, message }, callback) => {
    const room = rooms[roomId];
    if (!room) return;

    const member = room.members[socket.id];
    const name = member?.name || "Anonim";
    const role = room.ownerId === socket.id ? 'owner' : 'member';

    const msg = {
      id: nanoid(6),
      from: socket.id,
      name,
      content: message,
      role,
      timestamp: new Date().toISOString(),
    };

    io.to(roomId).emit('receiveMessage', msg);
    callback?.({ success: true });
  });

  function getUsers(roomId) {
    const room = rooms[roomId];
    if (!room) return [];
    return Object.entries(room.members).map(([id, member]) => ({
      id,
      name: member.name,
      role: id === room.ownerId ? 'owner' : 'member'
    }));
  }

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.members[socket.id]) {
        delete room.members[socket.id];
        io.to(roomId).emit('roomUsers', getUsers(roomId));

        if (Object.keys(room.members).length === 0) {
          io.to(roomId).emit('roomClosed');
          delete rooms[roomId];
        }
      }
    }
  });
};
