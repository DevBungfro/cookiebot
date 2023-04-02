const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

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

exports.getCategorySelect = function (client) {
    const order_categories = client.config["order_categories"]
    const options = []

    for (const category in order_categories) {
        console.log(`Category: ${category}`);
        options.push({
            label: category,
            value: category
        })
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('category_select')
                .setPlaceholder('Nothing selected')
                .addOptions(options)
        );

    return {
        components: [row],
        ephemeral: true
    }
}

exports.getRoleSelect = function (client, category) {
    const order_roles = client.config["order_categories"][category].roles
    const options = []

    for (const category in order_roles) {
        options.push({
            label: category,
            value: category
        })
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('category_role_select')
                .setPlaceholder('Nothing selected')
                .addOptions(options)
        );

    return {
        components: [row],
        ephemeral: true
    }
}

exports.getRoleModal = function (client, chosenCategory, chosenRole) {
    const modal = new ModalBuilder()
        .setCustomId('order_modal')
        .setTitle('Order');


    const disabledCategoryInput = new TextInputBuilder()
        .setCustomId('categoryInput')
        .setLabel("What category do you want? (DO NOT CHANGE)")
        .setStyle(TextInputStyle.Short)
        .setValue(chosenCategory)

    const disabledRoleInput = new TextInputBuilder()
        .setCustomId('roleInput')
        .setLabel("What role do you want? (DO NOT CHANGE)")
        .setStyle(TextInputStyle.Short)
        .setValue(chosenRole)

    const budgetInput = new TextInputBuilder()
        .setCustomId('budgetInput')
        .setLabel("What is your budget?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)

    const explainInput = new TextInputBuilder()
        .setCustomId('explainInput')
        .setLabel("Explain in detail what you are looking for.")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
    
    const actionRow1 = new ActionRowBuilder().addComponents(disabledCategoryInput);
    const actionRow2 = new ActionRowBuilder().addComponents(disabledRoleInput)
    const actionRow3 = new ActionRowBuilder().addComponents(budgetInput)
    const actionRow4 = new ActionRowBuilder().addComponents(explainInput)

    modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

    return modal
}

exports.getOrderEmbed = function (client, user, explain, budget, roleId) {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "Cookie Development - Commission",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTitle("New Commision Request")
        .setDescription(`**User**: ${user}\n**Budget**: ${budget}\n**Explanation**: ${explain}`)
        .setColor("#ff6a00")
        .setFooter({
            text: "Cookie Development",
            iconURL: "https://cdn.discordapp.com/icons/1090830862037299240/1894dc391009fb35fae18a7638119012.png?size=240",
        })
        .setTimestamp();

    return {
        content: `<@&${roleId}>`,
        embeds: [embed]
    }
}