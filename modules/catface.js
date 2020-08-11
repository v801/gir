const catface = require('cat-ascii-faces')

exports.run = (bot, msg) => {

  msg.channel.send(catface())

}

exports.help = {
  name: 'catface',
  description: 'random ascii cat face',
  usage: 'catface',
  aliases: []
}
