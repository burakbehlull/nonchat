import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function eventLoader(io) {
  const eventsPath = __dirname;
  const eventFiles = fs.readdirSync(eventsPath).filter(
    file => file.endsWith('.js') && file !== 'eventLoader.js'
  );

  const events = [];

  for (const file of eventFiles) {
    try {
      const filePath = path.join(eventsPath, file);
      const fileUrl = pathToFileURL(filePath);
      const eventModule = await import(fileUrl);
      if (typeof eventModule.default === 'function') {
        events.push(eventModule.default);
      }
    } catch (err) {
      console.error(`Failed to load ${file}:`, err);
    }
  }

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);
    events.forEach(event => event(io, socket));
  });
}
