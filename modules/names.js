const randomName = require('node-random-name')

exports.run = (bot, msg) => {

  const helpMessage = 'Try: `.name`'
  const msgArr = msg.content.split(' ')
  const commandOnly = msgArr.length == 1

  if (commandOnly) {
    const randomFirstName = randomName({first: true})
    msg.channel.send(randomFirstName)
  }
  else {
    msg.channel.send(helpMessage)
  }

}

exports.help = {
  name: 'name',
  description: 'random earth dwelling humanoid name',
  usage: 'name',
  aliases: ['babyname', 'babynames']
}
