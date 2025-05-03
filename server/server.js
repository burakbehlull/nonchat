const http = require('http');
const { Server } = require('socket.io');
const eventLoader = require('./events/eventLoader.js');

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

eventLoader(io);

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('sendMessage', (data) => {
    console.log(`Received message: ${data}`);
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
