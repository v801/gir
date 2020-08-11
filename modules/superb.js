const superb = require('superb')

exports.run = (bot, msg) => {

  msg.channel.send(superb())

}

exports.help = {
  name: 'superb',
  description: 'nice!',
  usage: 'superb',
  aliases: ['nice']
}
