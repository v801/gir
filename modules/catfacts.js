const request = require('request')

exports.run = (bot, msg) => {

  const loadingMessage = ':thinking: Finding catfact...'
  const errorMessage = 'The API returned an unconventional response'

  msg.channel.send(loadingMessage).then(msg => {
    request('https://catfact.ninja/fact', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.edit(errorMessage)
          return
        }
        const catFact = JSON.parse(body)
        msg.edit(catFact.fact)
      }
    })
  })

}

exports.help = {
  name: 'catfacts',
  description: 'random cat facts',
  usage: 'catfacts',
  aliases: ['catfact']
}
