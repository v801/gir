const { SlashCommandBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Replies with the bots uptime.'),
    async execute(bot, interaction) {
        const uptime = humanizeDuration(bot.uptime, { round: true });
        const uptimeMessage = `:clock2: Uptime: ${uptime}`;
        return interaction.reply(uptimeMessage);
    },
};