const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commit')
        .setDescription('Replies with a something from whatthecommit.com.'),
    async execute(bot, interaction) {
        const errorMessage = 'Unable to get commit.'
        try {
            const response = await axios.get('http://whatthecommit.com/index.txt');
            const commit = response.data.toString().trim();
            return interaction.reply(commit);
        } catch (error) {
            console.log(error);
            return interaction.reply(errorMessage);
        }
    },
};
