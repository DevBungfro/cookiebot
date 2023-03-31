require('dotenv').config()
require('module-alias/register')
const { Client, Collection, GatewayIntentBits, IntentsBitField, Events } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})


client.commands = new Collection()
client.buttons = new Collection()
client.cooldown = new Collection()

client.logger = require('@utils/logger')
client.config = require('@root/config.json')

const handlers = ["event", "command", "button"]

handlers.forEach(handler => {
    require(`@root/handlers/${handler}`)(client);
});

client.login(process.env.token)