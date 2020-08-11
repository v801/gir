const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = ':thinking: Finding suitable eric...'

  function wikiTitle(cb) {

    xray('http://en.wikipedia.org/wiki/Special:Random', '#content', 'h1.firstHeading') ((err, title) => {
      if (!title || typeof title == 'undefined') {
        const message = 'Could not find article title!'
        console.log(message)
        return cb(message)
      }
      else {
        const regex = /\(.*\)/
        const titleTrimmed = title.replace(regex, '').trim()
        const titleArr = titleTrimmed.split(' ')
        if ( titleArr.length >= 3) {
          const randomWord = titleArr[Math.floor(Math.random() * titleArr.length)]
          const index = titleArr.indexOf(randomWord)
          if (~index) {
            titleArr[index] = 'Eric'
          }
          const ericStr = titleArr.join(' ')
          return cb(ericStr)
        }
        else {
          console.log(`title too short (${titleArr.length})`)
          wikiTitle(cb)
          return
        }
      }
    })

  }

  msg.channel.send(loadingMessage).then(msg => {
    wikiTitle(eric => {
      console.log(eric)
      msg.edit(eric)
    })
  })

}

exports.help = {
  name: 'e',
  description: 'gets a random wikipedia page title and replaces a random word with "eric"',
  usage: 'e',
  aliases: ['eric']
}
