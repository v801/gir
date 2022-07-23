const { SlashCommandBuilder } = require('discord.js');
const catface = require('cat-ascii-faces');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catface')
        .setDescription('Replies with a random ascii cat face!'),
    async execute(interaction) {
        return interaction.reply(catface());
    },
};