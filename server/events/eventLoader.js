const fs = require('fs');
const path = require('path');

module.exports = (io) => {
    const eventsPath = path.join(__dirname);
    const events = [];

    fs.readdir(eventsPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const eventFiles = files
            .filter(file => file.endsWith('.js') && file !== path.basename(__filename));

        if (eventFiles.length === 0) {
            console.log('No events to load');
            return;
        }

        eventFiles.forEach(file => {
            try {
                const event = require(path.join(eventsPath, file));
                events.push(event);
            } catch (error) {
                console.error(`Event loading error ${file}:`, error);
            }
        });

        console.log('All events have been imported successfully');

        io.on('connect', (socket) => {
            events.forEach(event => {
                event(io, socket);
            });
        });
    });
};