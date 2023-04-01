const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    id: 'open_support',
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('support_modal')
            .setTitle('Support');


        const input1 = new TextInputBuilder()
            .setCustomId('supportReasonInput')
            .setLabel("What do you need support for?")
            .setStyle(TextInputStyle.Paragraph);

        const actionRow1 = new ActionRowBuilder().addComponents(input1);

        modal.addComponents(actionRow1);

        return await interaction.showModal(modal)
    }
}