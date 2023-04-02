const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ComponentType } = require("discord.js");
const { getCategorySelect, getRoleSelect, getRoleModal  } = require("@utils/ticket");

module.exports = {
    id: 'open_order',
    run: async (client, interaction) => {
        const categorySelect = await getCategorySelect(client)
        interaction.reply(categorySelect)

        const filter = m => m.customId === 'category_select' && m.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000,
            componentType: ComponentType.StringSelect
        })

        collector.on('collect', async (collected) => {
            const chosenCategory = collected.values[0]
            const roleSelect = await getRoleSelect(client, chosenCategory)

            await collected.update(roleSelect)

            // Last Selector
            const filterRole = m => m.customId === 'role_category_select' && m.user.id === interaction.user.id
            const roleCollector = interaction.channel.createMessageComponentCollector({
                filterRole,
                time: 60000,
                componentType: ComponentType.StringSelect
            })
    
            roleCollector.on('collect', async (roleCollected) => {
                const chosenRole = roleCollected.values[0]
                const roleModal = await getRoleModal(client, chosenCategory, chosenRole)

                return await roleCollected.showModal(roleModal)
            })
        })
    }

}