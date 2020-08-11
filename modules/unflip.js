const flip = require('flip')

exports.run = (bot, msg) => {

  const face = 'ノ( º _ ºノ)'
  const toUnflip = msg.content.split(' ')
  let unflipped
  if (toUnflip.length == 1) {
    unflipped = '┻━┻'
  }
  else {
    const args = Array.prototype.slice.call(toUnflip, 1)
    const argsString = args.join(' ')
    unflipped = argsString
  }
  const unflippy = `${unflipped} ${face}`
  msg.channel.send(unflippy)

}

exports.help = {
  name: 'unflip',
  description: 'unflip text or a table!',
  usage: 'unflip or unflip <text>',
  aliases: []
}
