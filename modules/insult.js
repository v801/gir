const request = require('request')

exports.run = (bot, msg) => {

  const userToInsult = msg.content.split(' ')
  const helpMessage = 'Try ".insult @username" or just ".insult".'
  const errorMessage = 'The API returned an unconventional response'

  if (userToInsult.length == 1) {

    request('http://quandyfactory.com/insult/json', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send(errorMessage)
          return
        }
        const data = JSON.parse(body)
        msg.channel.send(data.insult)
      }
    })

  }
  else {

    if (msg.mentions.users.length == 0) {
      msg.channel.send(helpMessage)
    }
    else {
      msg.mentions.users.forEach(user => {
        request('http://quandyfactory.com/insult/json', (error, response, body) => {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body)
            } catch (e) {
              msg.channel.send(errorMessage)
              return
            }
            const data = JSON.parse(body)
            var insultReply = `${user.toString()}, ${data.insult}`
            msg.channel.send(insultReply)
          }
        })
      })
    }

  }

}

exports.help = {
  name: 'insult',
  description: 'random insults',
  usage: 'insult or insult @username, supports multiple mentions',
  aliases: []
}
