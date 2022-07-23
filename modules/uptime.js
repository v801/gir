const { SlashCommandBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Replies with the bots uptime.'),
    async execute(bot, interaction) {
        const uptime = humanizeDuration(bot.uptime, { round: true });
        const uptimeMessagePrefix = `:clock2: ${uptime} `;
        const uptimeMessageSuffixes = [
            "since the most recent cord pull.",
            "SINCE THE GREAT POWER SURGE. :zap: :zap: :zap:",
            "have elapsed since ^C^C^C^C^C.",
            "since the last catastrophic failure."
        ];
        const randomSuffix = uptimeMessageSuffixes[Math.floor(Math.random()*uptimeMessageSuffixes.length)];
        const uptimeMessage = uptimeMessagePrefix + randomSuffix;
        return interaction.reply(uptimeMessage);
    },
};