const { PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (!interaction.isButton()) return;
        const button = client.buttons.get(interaction.customId);

        try {
            if (button) {
                button.run(client, interaction)
            }
        } catch (error) {
            console.log(error);
        }
    }
}