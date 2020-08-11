const flip = require('flip')

exports.run = (bot, msg) => {

  const face = '(╯°□°）╯︵'
  const toFlip = msg.content.split(' ')
  if (toFlip.length == 1) {
    var flipped = '┻━┻'
  }
  else {
    const args = Array.prototype.slice.call(toFlip, 1)
    const argsString = args.join(' ')
    var flipped = flip(argsString)
  }
  const flippy = `${face} ${flipped}`
  msg.channel.send(flippy)

}

exports.help = {
  name: 'flip',
  description: 'flip a table or text!',
  usage: 'flip or flip <text>',
  aliases: []
}
