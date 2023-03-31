module.exports = {
    name: 'ready',
    run: async (client) => {
        client.logger.loader(client.user.username + ' has awoken! GIVE HIM THE COOKIES!!!!!')
    }
}