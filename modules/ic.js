const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ic')
        .setDescription('Random top video from Interdimensional Cable subreddit.'),
    async execute(bot, interaction) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomChar = chars[Math.floor(Math.random()*26)];
        const randomNum = Math.floor(Math.random() * 900) + 100;
        const dimension = `${randomChar}-${randomNum}`;
        const errorMessage = 'Unable to connect to Interdimensional Cable!';
        try {
            const response = await axios.get('https://www.reddit.com/r/InterdimensionalCable/search.json?q=site%3Ayoutube.com+OR+site%3Ayoutu.be&restrict_sr=on&limit=50');
            const data = response.data.data;
            let videos = [];
            data.children.forEach(child => {
                videos.push(child.data.url);
            })
            const randomVideo = videos[Math.floor(Math.random()*videos.length)];
            const msgConnected = `Connected to Dimension ${dimension}.\n${randomVideo}`;
            return interaction.reply(msgConnected);
        } catch (error) {
            console.log(error);
            return interaction.reply(errorMessage);
        }
    },
};