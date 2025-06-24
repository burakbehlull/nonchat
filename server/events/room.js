import { nanoid } from 'nanoid';

const rooms = {};

export default (io, socket) => {
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

    rooms[roomId].members[socket.id] = 'Nobody';
    socket.join(roomId);

    callback({ success: true, roomId });
  });

  socket.on('joinRoom', ({ roomId, password }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false, message: 'Room not found.' });
    if (room.banned.includes(socket.id)) return callback({ success: false, message: 'You are banned.' });
    if (room.password && room.password !== password) return callback({ success: false, message: 'Wrong password.' });
    if (Object.keys(room.members).length >= room.limit) return callback({ success: false, message: 'Room is full.' });

    room.members[socket.id] = 'Nobody';
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
    });
  });

  socket.on('changeName', ({ roomId, newName, targetSocketId }) => {
	  const room = rooms[roomId];
	  if (!room) return;

	  if (socket.id === targetSocketId) {
		if (!room.members[socket.id]) return;
		room.members[socket.id] = newName;
	  }

	  else if (room.ownerId === socket.id) {
		if (!room.members[targetSocketId]) return;
		room.members[targetSocketId] = newName;
	  } else {
		return
	  }

	  io.to(roomId).emit('roomUsers', getUsers(roomId));
  });

  socket.on('updateRoom', ({ roomId, name, limit }, callback) => {
    const room = rooms[roomId];
    if (!room) return callback({ success: false });
    if (room.ownerId !== socket.id) return callback({ success: false, message: 'Not authorized.' });
    room.name = name || room.name;
    room.limit = limit || room.limit;
    callback({ success: true, room });
  });

  socket.on("kickUser", ({ roomId, targetSocketId }, callback) => {
	  const room = rooms[roomId];
	  if (!room) return;

	  const targetUser = room.members[targetSocketId];
	  if (!targetUser) return;

	  if (!room.banned.includes(targetSocketId)) {
		room.banned.push(targetSocketId);
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

    const name = room.members[socket.id] || "Anonim";
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
    if (callback) callback({ success: true });
  });

  function getUsers(roomId) {
    const room = rooms[roomId];
    if (!room) return [];
    return Object.entries(room.members).map(([id, name]) => ({
      id,
      name,
      role: id === room.ownerId ? 'owner' : 'member'
    }));
  }

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.members[socket.id]) {
        delete room.members[socket.id];
        io.to(roomId).emit('roomUsers', getUsers(roomId));
        if (Object.keys(room.members).length === 0) delete rooms[roomId];
      }
    }
  });
};
