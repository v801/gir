const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong.'),
    new SlashCommandBuilder().setName('vg').setDescription('Replies with a random game name.'),
    new SlashCommandBuilder().setName('butts').setDescription('Replies with random ascii butts.'),
    new SlashCommandBuilder().setName('catface').setDescription('Replies with random ascii cat faces.'),
    new SlashCommandBuilder().setName('commit').setDescription('Replies with something from whatthecommit.com.'),
    new SlashCommandBuilder().setName('devex').setDescription('Replies with a random developer excuse.'),
    new SlashCommandBuilder().setName('dinner').setDescription('Replies with dinner from whatthefuckshouldimakefordinner.com'),
    new SlashCommandBuilder().setName('ic').setDescription('Random top video from Interdimensional Cable subreddit.'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);