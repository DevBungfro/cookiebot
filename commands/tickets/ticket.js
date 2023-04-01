const { getTicketEmbed, getServicesEmbed } = require('@utils/ticket')

module.exports = {
    name: 'ticket',
    description: 'Main ticket command',
    userPerms: ["Administrator"],
    botPerms: [],
    options: [
        {
            name: 'send',
            description: 'Sends ticket embed to specified config channel',
            type: 1,
            options: [
                {
                    name: 'type',
                    description: 'Type of embed to send (ticket | services)',
                    required: true,
                    type: 3
                }
            ]
        },
        {
            name: 'close',
            description: 'Sends ticket embed to specified config channel',
            type: 1,
        }
    ],
    run: async (client, interaction) => {
        const subCommand = interaction.options.getSubcommand()
        switch (subCommand) {
            case "send":
                const type = interaction.options.getString('type')

                if (type.toUpperCase() == "TICKET") {
                    let embed = await getTicketEmbed()

                    client.channels.cache.get(client.config.ticket_channel_id).send(embed)

                    return interaction.reply({ content: `Sucessfully sent embed in <#${client.config.ticket_channel_id}>`, ephemeral: true })
                } else if (type.toUpperCase() == "SERVICES") {
                    let embed = await getServicesEmbed()

                    client.channels.cache.get(client.config.services_channel_id).send(embed)

                    return interaction.reply({ content: `Sucessfully sent embed in <#${client.config.services_channel_id}>`, ephemeral: true })
                } else {
                    return interaction.reply({ content: `Ticket type ${type} not found.`, ephemeral: true })

                }
            case "close": {
                const ticketDB = client.database.tickets.ticket
                const channel = interaction.channel
                let userID = null

                Object.keys(ticketDB.list).forEach(function (key) {
                    const info = ticketDB.list[key]

                    if (info.channel == channel.id) userID = key;
                });

                if (userID) {
                    delete ticketDB.list[userID]

                    await channel.delete()
                    await ticketDB.save()
                } else {
                    interaction.reply({
                        content: 'This channel is not a ticket',
                        ephemeral: true
                    })
                }
            }
        }
    }
}