const { SlashCommandBuilder } = require('discord.js');
const rgn = require('random-game-name');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playgame')
		.setDescription('Change what game the bot is playing.'),
	async execute(interaction) {
    // bot.user.setActivity('test activity', { type: 'PLAYING' } );
    const playingGameMessage = ':video_game: Now Playing: ' + rgn();
		return interaction.reply(playingGameMessage);
	},
};