const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dinner')
        .setDescription('Replies with dinner from whatthefuckshouldimakefordinner.com.'),
    async execute(interaction) {
    const errorMessage = 'Unable to get dinner!'
    axios.get('http://whatthefuckshouldimakefordinner.com/')
        .then((response) => {
            let $ = cheerio.load(response.data);
            const prefix = $("dt dl").text().toUpperCase();
            const dinner = $("dl dt a").text().toUpperCase();
            const dinnerUrl = $("dl dt a").attr("href");
            const dinnerMsg = `${prefix} ${dinner} ${dinnerUrl}`
            return interaction.reply(dinnerMsg);
        })
        .catch((error) => {
            console.log(error);
            return interaction.reply(errorMessage);
        });
    },
};