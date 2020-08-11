exports.run = (bot, msg) => {
  const img = 'http://i.imgur.com/RRrv4Tl.png'
  msg.channel.send(img)
}

exports.help = {
  name: 'america',
  description: 'america!',
  usage: 'america',
  aliases: ['trump']
}
