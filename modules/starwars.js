const starwars = require('starwars')

exports.run = (bot, msg) => {

  msg.channel.send(starwars())

}

exports.help = {
  name: 'starwars',
  description: 'random starwars quotes',
  usage: 'starwars',
  aliases: ['sw']
}
