const fs = require('fs')
const path = require('path')

module.exports = async (client) => {
    fs.readdir(`${path.dirname(__dirname)}/events`, (err, files) => {
        if (err) client.logger.error(err);
        files.forEach(file => {
            const event = require(`@events/${file}`);
            let eventName = event.name
            client.on(eventName, event.run.bind(null, client))
        });
        client.logger.loader(`${files.length} events loaded`)
    });

    
}