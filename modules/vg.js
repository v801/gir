const { SlashCommandBuilder } = require('discord.js');
const rgn = require('random-game-name');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vg')
        .setDescription('Replies with a random video game name.'),
    async execute(bot, interaction) {
        return interaction.reply(rgn());
    },
};