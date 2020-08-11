const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const helpMessage = 'Unable to get Pokemon Go Server Status!'
  const loadingMessage = 'Finding Pokemon Go server status...'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://cmmcd.com/PokemonGo', '.jumbotron', 'h2') ((err, status) => {
      if (err || !status) {
        console.log(`${helpMessage} (${err})`)
        msg.edit(helpMessage)
      }
      else {
        msg.edit(status)
      }
    })
  })

}

exports.help = {
  name: 'pgss',
  description: 'displays pokemongo server status',
  usage: 'pgss',
  aliases: ['pss']
}
