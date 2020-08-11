const face = require('cool-ascii-faces')

exports.run = (bot, msg) => {

  msg.channel.send(face())

}

exports.help = {
  name: 'face',
  description: 'random ascii face',
  usage: 'face',
  aliases: []
}
