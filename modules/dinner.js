const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = 'Finding what the fuck you should make for dinner...'
  const errorMessage = 'Unable to get developer excuse.'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://whatthefuckshouldimakefordinner.com', {
      action: 'dt dl',
      meal: 'dl dt a',
      link: 'dl dt a@href'
    }) ((err, obj) => {
      if (err || !obj) {
        msg.edit(errorMessage)
      } else {
        const dinner = `${obj.action.trim()} ${obj.meal} \n ( ${obj.link} )`
        msg.edit(dinner)
      }
    })
  })

}

exports.help = {
  name: 'dinner',
  description: 'what the fuck should i make for dinner? from whatthefuckshouldimakefordinner.com',
  usage: 'dinner',
  aliases: []
}
