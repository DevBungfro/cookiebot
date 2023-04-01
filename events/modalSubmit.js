const { PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (!interaction.isModalSubmit()) return;
        const modal = client.modals.get(interaction.customId);

        try {
            if (modal) {
                modal.run(client, interaction)
            }
        } catch (error) {
            console.log(error);
        }
    }
}