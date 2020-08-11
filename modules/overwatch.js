const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const helpMessage = 'Usage: ```.overwatch rank battlenetuser#1234```'
  const loadingMessage = 'Finding Overwatch competitive rank...'
  const overwatch = msg.content.split(' ')
  const commandOnly = overwatch.length == 1
  const options = overwatch.length >= 2

  if ( commandOnly ) {
    msg.channel.send(helpMessage)
  }
  else if ( options ) {
    const action = overwatch[1]
    const username = overwatch[2]
    if ( action === 'rank' && username ) {
      const userID = username.split('#')[1]
      const usernameString = username.split('#')[0]
      if (!userID) {
        msg.channel.send(helpMessage)
      }
      else {
        const url = `https://playoverwatch.com/en-gb/career/pc/us/${usernameString}-${userID}`
        msg.channel.send(loadingMessage).then(msg => {
          return xray(url, 'div.competitive-rank', '.h6') ((err, rank) => {
            if (!rank) {
              msg.edit(`${usernameString} has no competitive rank yet!`)
            }
            else {
              const rankMessage = `${usernameString}'s competitive rank: ${rank}`
              msg.edit(rankMessage)
            }
          })
        })
      }
    }
    else {
      msg.channel.send(helpMessage)
    }
  }
  else {
    msg.channel.send(helpMessage)
  }

}

exports.help = {
  name: 'overwatch',
  description: 'displays overwatch rank',
  usage: 'overwatch rank <battlenetuser#1234>',
  aliases: ['ow']
}
