module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	userPerms: [],
	botPerms: [],
	run: async (client, interaction) => {
		const msg = await interaction.reply('Pinging...')
		await msg.edit(`🏓 Pong!
        Latency is ${Date.now() - interaction.createdTimestamp}ms
        API Latency is ${Math.round(client.ws.ping)}ms`);
	}
};