const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dinner')
        .setDescription('Replies with dinner from whatthefuckshouldimakefordinner.com.'),
    async execute(bot, interaction) {
        const errorMessage = 'Unable to get dinner!';
        try {
            const response = await axios.get('http://whatthefuckshouldimakefordinner.com/');
            let $ = cheerio.load(response.data);
            const prefix = $("dt dl").text().toUpperCase();
            const dinner = $("dl dt a").text().toUpperCase();
            const dinnerUrl = $("dl dt a").attr("href");
            const dinnerMessage = `${prefix} ${dinner} ${dinnerUrl}`;
            return interaction.reply(dinnerMessage);
        } catch (error) {
            console.log(error);
            return interaction.reply(errorMessage);
        }
    },
};
