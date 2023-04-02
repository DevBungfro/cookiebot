const { PermissionFlagsBits, ChannelType } = require("discord.js");
const { getOrderEmbed } = require('@utils/ticket')

module.exports = {
    id: 'order_modal',
    run: async (client, interaction) => {
        const categoryInput = interaction.fields.getTextInputValue('categoryInput');
        const roleInput = interaction.fields.getTextInputValue('roleInput');
        const budgetInput = interaction.fields.getTextInputValue('budgetInput');
        const explainInput = interaction.fields.getTextInputValue('explainInput');

        const categories = client.config.order_categories

        if (categoryInput in categories) {
            if (roleInput in categories[categoryInput].roles) {
                if (!isNaN(parseInt(budgetInput))) {
                    const user = interaction.user
                    const ticketDB = client.database.tickets.ticket
                    if (ticketDB.list[user.id]) return interaction.reply({ content: 'You already have an open support or order ticket.', ephemeral: true })

                    const roleID = client.config.order_categories[categoryInput].roles[roleInput]

                    const channel = await interaction.guild.channels.create({
                        name: user.tag,
                        type: ChannelType.GuildText,
                        parent: client.config.ticket_category_id,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone,
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: roleID,
                                allow: [PermissionFlagsBits.ViewChannel]
                            },
                            {
                                id: client.user.id,
                                allow: [PermissionFlagsBits.ViewChannel],
                            },
                        ],
                        
                    })

                    ticketDB.list[user.id] = {
                        type: 'order',
                        category: categoryInput,
                        role: roleInput,
                        channel: channel.id,
                        budget: budgetInput
                    }

                    const supportEmbed = getOrderEmbed(client, user, explainInput, `$${budgetInput}`, roleID)
                    await channel.send(supportEmbed)
        
                    
                    await interaction.reply({
                        content: `Successfully created ticket. View in ${channel}`,
                        ephemeral: true
                    })
        
                    await ticketDB.save()
                } else {
                    return interaction.reply({ content: `${budgetInput} is not a valid number, please try again.`, ephemeral: true })
                }
            } else {
                return interaction.reply({ content: 'Cannot find role, please try again.', ephemeral: true })
            }
        } else {
            return interaction.reply({ content: 'Cannot find category, please try again.', ephemeral: true })
        }
    }
}