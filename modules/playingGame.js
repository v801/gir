const rgn = require('random-game-name')

exports.run = (bot, msg) => {

  const playingGameMessage = `:video_game: Now Playing: `
  const game = msg.content.split(' ')

  if (game.length == 1) {
    const randomGameString = rgn.random()
    bot.user.setGame(randomGameString)
    msg.channel.send(playingGameMessage + randomGameString)
  }
  else {
    const args = Array.prototype.slice.call(game, 1)
    const gameString = args.join(' ')
    bot.user.setGame(gameString)
    msg.channel.send(playingGameMessage + gameString)
  }

}

exports.help = {
  name: 'playing',
  description: 'change what game the bot is playing',
  usage: 'playing or playing <text>',
  aliases: []
}
