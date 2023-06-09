const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const config = require("../config.json");

const TOKEN = process.env.token;
const CLIENT_ID = process.env.client_id;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./commands/').forEach(async dir => {

    const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));


		for(const file of files) {

				const slashCommand = require(`../commands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			
				if(slashCommand.name) {
						client.commands.set(slashCommand.name, slashCommand)
				}
		}
		
	});
;

	(async () => {
			try {
				await rest.put(
					process.env.GUILD_ID ?
					Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID) :
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				);
			} catch (error) {
				client.logger.error(error);
			}
	})();

    client.logger.loader(`${client.commands.size} commands loaded and registered`)
};