const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

exports.getTicketEmbed = function () {
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

exports.getSupportEmbed = function (client, user, supportReason) {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "Cookie Development - Support",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTitle("New Support Request")
        .setDescription(`**User**: ${user}\n**Reason**: ${supportReason}`)
        .setColor("#ff6a00")
        .setFooter({
            text: "Cookie Development",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTimestamp();

    return {
        content: `<@&${client.config.support_role_id}>`,
        embeds: [embed]
    }
}

exports.getServicesEmbed = function () {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "Cookie Bot",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTitle("Our services at Cookie Development")
        .setDescription("**Development:**\n\n— FiveM Development\n— Web Development\n— Plugin Developer\n— Bot Developer\n\n**Setups:**\n\n— Configurator\n— System Administrator\n— Discord Setup\n\n**Video:**\n\n— Video Editor\n\n**Hosting:**\n\n— FiveM Hosting\n— Minecraft Hosting\n— Bot Hosting")
        .setColor("#ff6a00")
        .setFooter({
            text: "Cookie Development",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTimestamp();

    return {
        embeds: [embed]
    }
}