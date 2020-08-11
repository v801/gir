const rekt = require('rektangle')

exports.run = (bot, msg) => {

  const rektArr = msg.content.split(' ')

  if (rektArr.length == 1) {
    var rektMsg = rekt('rekt')
  }
  else {
    const args = Array.prototype.slice.call(rektArr, 1)
    const argsString = args.join(' ')
    rektMsg = rekt(argsString)
  }

  msg.channel.send(rektMsg)

}

exports.help = {
  name: 'rekt',
  description: 'ya rekt',
  usage: 'rekt or rekt <text>',
  aliases: []
}
