const textanary = require('textanary')

exports.run = (bot, msg) => {

  let commandMessage
  const helpMessage = 'Usage: ```.binary [text OR valid binary]```'
  const msgArr = msg.content.split(' ')

  if (msgArr.length == 1) {
    msg.channel.send(helpMessage)
  }
  else {
    const args = Array.prototype.slice.call(msgArr, 1)
    const argsString = args.join(' ')
    const rx = /^((1|0))/
    const startsWithZeroOrOne = argsString.match(rx) != null
    console.log(`${argsString}, starts with 0 or 1: ${startsWithZeroOrOne}`)
    if (startsWithZeroOrOne) {
      try {
        commandMessage = textanary({to: "text", data: `${argsString}`})
        console.log(`converted message: ${commandMessage}`)
      } catch (err) {
        commandMessage = err.message
        console.log(`error message: ${err.message}`)
      }
    }
    else {
      try {
        commandMessage = textanary({to: "binary", data: `${argsString}`})
        console.log(`converted message: ${commandMessage}`)
      } catch (err) {
        commandMessage = err.message
        console.log(`error message: ${err.message}`)
      }
    }
  }

  msg.channel.send(commandMessage)

}

exports.help = {
  name: 'binary',
  description: 'convert binary to text or text to binary',
  usage: 'binary <msg>',
  aliases: []
}
