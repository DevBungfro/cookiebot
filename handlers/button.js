const fs = require('fs')
const path = require('path')

module.exports = async (client) => {
    fs.readdir(`${path.dirname(__dirname)}/buttons`, (err, files) => {
        if (err) client.logger.error(err);
        files.forEach(file => {
            const button = require(`@buttons/${file}`);
            client.buttons.set(button.id, button)
        });
        client.logger.loader(`${files.length} buttons loaded`)
    });

    
}