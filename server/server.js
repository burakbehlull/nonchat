import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import eventLoader from './events/eventLoader.js';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

eventLoader(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server başlatılıyor: http://localhost:${PORT}`);
});
