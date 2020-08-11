const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = 'Finding commit...'
  const errorMessage = 'Unable to get commit.'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://whatthecommit.com', '#content', 'p') ((err, commit) => {
      if (err || !commit){
        msg.edit(errorMessage)
      } else {
        msg.edit(commit)
      }
    })
  })

}

exports.help = {
  name: 'commit',
  description: 'random commit message from whatthecommit.com',
  usage: 'commit',
  aliases: ['whatthecommit', 'wtc']
}
