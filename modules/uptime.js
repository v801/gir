exports.run = (bot, msg) => {

  const humanizeDuration = require('humanize-duration')
  const uptime = humanizeDuration(bot.uptime, { round: true })
  const uptimeMsg = `:clock2: Uptime: ${uptime}`
  msg.channel.send(uptimeMsg)

}

exports.help = {
  name: 'uptime',
  description: 'displays bot uptime',
  usage: 'uptime',
  aliases: []
}
