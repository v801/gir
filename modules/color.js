const randomColor = require('randomcolor')

exports.run = (bot, msg) => {

  const color = randomColor()
  const colorCode = color.split('#')[1]
  const colorUppercase = color.toUpperCase()
  const url = `(http://www.colorhexa.com/${colorCode})`
  const colorMessage = `${colorUppercase} \n ${url}`
  msg.channel.send(colorMessage)

}

exports.help = {
  name: 'color',
  description: 'random hex color',
  usage: 'color',
  aliases: ['randomcolor']
}
