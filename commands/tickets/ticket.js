const { getTicketEmbed } = require('@utils/ticket')

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
       }
    ],
    run: async (client, interaction) => {
        const subCommand = interaction.options.getSubcommand()
        switch(subCommand) {
            case "send":
                const type = interaction.options.getString('type')
                
                if (type.toUpperCase() == "TICKET") {
                    let embed = await getTicketEmbed()
                    
                    client.channels.cache.get(client.config.ticket_channel_id).send(embed)
                    
                    return interaction.reply({ content: `Sucessfully sent embed in <#${client.config.ticket_channel_id}>`, ephemeral: true })
                }
        }
    }
}