const request = require('request')

exports.run = (bot, msg, config) => {

  const helpMessage = 'Try ".lastfm username".'
  const loadingMessage = 'Finding most recent track...'
  const errorMessage = 'The API returned an unconventional response'

  const lastfm = msg.content.split(' ')
  const noArgs = lastfm.length == 1
  const tooManyArgs = lastfm.length >= 3

  if ( noArgs || tooManyArgs ) {
    msg.channel.send(helpMessage)
  }
  else {
    const args = Array.prototype.slice.call(lastfm, 1)
    const user = args.toString()
    const endpoint = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${config.lastfm_key}&format=json`

    msg.channel.send(loadingMessage).then(msg => {
      request(endpoint, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            JSON.parse(body)
          } catch (e) {
            msg.edit(errorMessage)
            return
          }
          const data = JSON.parse(body)
          if (data.error) {
            msg.edit(`Error: ${data.message}`)
          } else {
            const track = data.recenttracks.track[0]
            if (!track) {
              msg.edit(`${user} hasn't scrobbled any tracks yet!`)
            } else {
              const artist = track.artist['#text']
              const song = track.name
              const img = track.image[3]['#text']
              msg.edit(`${artist} - ${song} \n ${img}`)
            }
          }
        }
      })
    })

  }

}

exports.help = {
  name: 'lastfm',
  description: 'displays the last track a lastfm user played!',
  usage: 'lastfm <username>',
  aliases: []
}
