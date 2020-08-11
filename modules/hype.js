const rgn = require('random-game-name')

exports.run = (bot, msg) => {

  msg.channel.send(`Eric is now hype for ${rgn.random()}`)

}

exports.help = {
  name: 'hype',
  description: 'find out what eric is hype for this time',
  usage: 'hype',
  aliases: ['h']
}
