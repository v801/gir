const butts = require('butts')

exports.run = (bot, msg) => {

  butts(butt => {
    const randomButt = '```'+`${butt.toString()}`+'```'
    msg.channel.send(randomButt)
  })

}

exports.help = {
  name: 'butts',
  description: 'sweet ascii butts',
  usage: 'butts',
  aliases: ['butt']
}
