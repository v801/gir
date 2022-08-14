const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catfact')
        .setDescription('Random catfact.'),
    async execute(bot, interaction) {
        const errorMessage = 'Unable to connect to Catfacts!';
        try {
            const response = await axios.get('https://catfact.ninja/fact');
            const catfact = response.data.fact;
            return interaction.reply(catfact);
        } catch (error) {
            console.log(error);
            return interaction.reply(errorMessage);
        }
    },
};
