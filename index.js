require('dotenv').config()
require('module-alias/register')
const { Client, Collection, GatewayIntentBits, IntentsBitField, Events, Partials } = require('discord.js')
const { ReactionRole } = require("discordjs-reaction-role");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
})

const reactionConfig = [
    { messageId: "1091559564870160414", reaction: "📢", roleId: "1091033227436761219" },
    { messageId: "1091559564870160414", reaction: "📰", roleId: "1091033228099461190" },
    { messageId: "1091559564870160414", reaction: "🎉", roleId: "1091550963711623328" },
]

const rr = new ReactionRole(client, reactionConfig)


client.commands = new Collection()
client.buttons = new Collection()
client.modals = new Collection()
client.database = require('@utils/database')

client.logger = require('@utils/logger')
client.config = require('@root/config.json')

const handlers = ["event", "command", "button", "modal"]

handlers.forEach(handler => {
    require(`@root/handlers/${handler}`)(client);
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.id === reactionConfig[0].messageId) {
        const member = await reaction.message.guild.members.fetch(user.id);
        if (!member) {
            return;
        }
        await member.roles.add('1091550427406938164')
    }
})

client.login(process.env.token)