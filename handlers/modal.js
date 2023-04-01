const fs = require('fs')
const path = require('path')

module.exports = async (client) => {
    fs.readdir(`${path.dirname(__dirname)}/modals`, (err, files) => {
        if (err) client.logger.error(err);
        files.forEach(file => {
            const modal = require(`@modals/${file}`);
            client.modals.set(modal.id, modal)
        });
        client.logger.loader(`${files.length} modals loaded`)
    });

    
}