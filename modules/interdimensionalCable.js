const request = require('request')

exports.run = (bot, msg) => {

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomChar = chars[Math.floor(Math.random()*26)]
  const randomNum = Math.floor(Math.random() * 900) + 100
  const dimension = `${randomChar}-${randomNum}`
  const loadingMessage = `Connecting to Dimension ${dimension}...`
  const errorMessage = 'The API returned an unconventional response'

  msg.channel.send(loadingMessage).then(msg => {

    const url = 'https://www.reddit.com/r/InterdimensionalCable/search.json?q=site%3Ayoutube.com+OR+site%3Ayoutu.be&restrict_sr=on&limit=50'

    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.edit(errorMessage)
          return
        }
        let videos = []
        const redditUrls = JSON.parse(body)
        redditUrls.data.children.forEach(child => {
          videos.push(child.data.url)
        })
        const randomVideo = videos[Math.floor(Math.random()*videos.length)]
        const msgConnected = `Connected to Dimension ${dimension}.\n${randomVideo}`
        msg.edit(msgConnected)
      }
    })

  })

}

exports.help = {
  name: 'idc',
  description: 'random top video from the Interdimensional Cable subreddit',
  usage: 'idc',
  aliases: ['ic']
}
