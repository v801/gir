const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = 'Finding domain...'
  const errorMessage = 'Unable to get insane domain.'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://insane.domains', 'div.domain', 'h1') ((err, domain) => {
      if (err || !domain) {
        msg.edit(errorMessage)
      } else {
        msg.edit(domain)
      }
    })
  })

}

exports.help = {
  name: 'domain',
  description: 'random rhyming domain name from insane.domains',
  usage: 'domain',
  aliases: []
}
