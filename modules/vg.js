const rgn = require('random-game-name')

exports.run = (bot, msg) => {

  msg.channel.send(`${rgn.random()}`)

}

exports.help = {
  name: 'vg',
  description: 'displays a random video game name',
  usage: 'vg',
  aliases: ['game', 'vg', 'vgn']
}
