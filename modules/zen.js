const zen = [
  'It\'s not fully shipped until it\'s fast.',
  'Practicality beats purity.',
  'Avoid administrative distraction.',
  'Mind your words, they are important.',
  'Non-blocking is better than blocking.',
  'Design for failure.',
  'Half measures are as bad as nothing at all.',
  'Favor focus over features.',
  'Approachable is better than simple.',
  'Encourage flow.',
  'Anything added dilutes everything else.',
  'Speak like a human.',
  'Responsive is better than fast.',
  'Keep it logically awesome.'
]

exports.run = (bot, msg) => {

  const randomZen = zen[Math.floor(Math.random() * zen.length)]
  msg.channel.send(randomZen)

}

exports.help = {
  name: 'zen',
  description: 'random zen, originally from api.github.com/zen',
  usage: 'zen',
  aliases: []
}
