const { SlashCommandBuilder } = require('discord.js');
const rgn = require('random-game-name');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playing')
        .setDescription('Change what game the bot is playing.'),
    async execute(bot, interaction) {
        const errorMessage = 'Unable to set game.';
        try {
            const game = rgn();
            const playingGameMessage = `:video_game: Now Playing: ${game}`;
            await bot.user.setActivity(game);
            return interaction.reply(playingGameMessage);
        } catch (error) {
            console.log(error);
            return interaction.reply(errorMessage);
        }
    },
};