const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong.'),
    new SlashCommandBuilder().setName('vg').setDescription('Replies with a random game name.'),
    new SlashCommandBuilder().setName('butts').setDescription('Replies with random ascii butts.'),
    new SlashCommandBuilder().setName('catface').setDescription('Replies with random ascii cat faces.'),
    new SlashCommandBuilder().setName('catfact').setDescription('Replies with a random cat fact.'),
    new SlashCommandBuilder().setName('commit').setDescription('Replies with something from whatthecommit.com.'),
    new SlashCommandBuilder().setName('devex').setDescription('Replies with a random developer excuse.'),
    new SlashCommandBuilder().setName('dinner').setDescription('Replies with dinner from whatthefuckshouldimakefordinner.com'),
    new SlashCommandBuilder().setName('ic').setDescription('Replies with a random top video from Interdimensional Cable subreddit.'),
    new SlashCommandBuilder().setName('uptime').setDescription('Replies with the bots uptime.'),
    new SlashCommandBuilder().setName('playing').setDescription('Sets the bots status to play a random game.'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
