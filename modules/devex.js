const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = 'Finding excuse...'
  const errorMessage = 'Unable to get developer excuse.'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://developerexcuses.com', '.wrapper', 'a') ((err, excuse) => {
      if (err || !excuse) {
        msg.edit(errorMessage)
      } else {
        msg.edit(excuse)
      }
    })
  })

}

exports.help = {
  name: 'devex',
  description: 'random developer excuses from developerexcuses.com!',
  usage: 'devex',
  aliases: []
}
