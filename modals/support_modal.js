const { ChannelType, PermissionFlagsBits } = require("discord.js");
const { getSupportEmbed } = require("../utils/ticket");

module.exports = {
    id: 'support_modal',
    run: async (client, interaction) => {
        const supportReason = interaction.fields.getTextInputValue('supportReasonInput');

        try {
            const user = interaction.user
            const ticketDB = client.database.tickets.ticket
            if (ticketDB.list[user.id]) return interaction.reply({ content: 'You already have an open support ticket.', ephemeral: true })
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
                        id: client.config.support_role_id,
                        allow: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: client.user.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            })

            ticketDB.list[user.id] = {
                type: 'support',
                channel: channel.id
            }


            const supportEmbed = getSupportEmbed(client, user, supportReason)
            await channel.send(supportEmbed)

            
            await interaction.reply({
                content: `Successfully created ticket. View in ${channel}`,
                ephemeral: true
            })

            await ticketDB.save()

        } catch (e) {
            client.logger.error(e)
        }
    }
}