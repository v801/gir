const { SlashCommandBuilder } = require('discord.js');
const butts = require('butts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('butts')
        .setDescription('Replies with ascii butts!'),
    async execute(bot, interaction) {
        butts(butt => {
            const randomButt = '```'+`${butt.toString()}`+'```'
            return interaction.reply(randomButt);
        })
    },
};