const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.getTicketEmbed = function getTicketEmbed() {
    const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('open_order')
					.setLabel('Order')
					.setStyle(ButtonStyle.Success),
                new ButtonBuilder()
					.setCustomId('open_support')
					.setLabel('Support')
					.setStyle(ButtonStyle.Danger),
			);

            
    const embed = new EmbedBuilder()
        .setTitle("Cookie Development Ticket Creation")
        .setDescription("Please select a button to open a ticket based on your needs.\n\n**Order:** Order something from Cookie Development\n**Support**: Open a support ticket")
        .setColor("#ff6a00")
        .setFooter({
            text: "Cookie Development",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTimestamp();

    return {
        embeds: [embed],
        components: [row]
    }
}