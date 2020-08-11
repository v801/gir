const phrases = [
  'Here\'s a fresh BLT!',
  'Have a tasty Chicken Carbonara!',
  'It\'s dangerous to go alone, take this Pastrami sandwich.',
  'Everyone loves Chicken Parmesan!',
  'I hope you like Reuben sandwiches.',
  'You\'re a little late, all I have is this PB&J.',
  'Have a Turkey & Swiss!',
  'I made this Tuna Melt for you, with love.',
  'dou told me to give you a Chicken Salad sandwich.',
  'You won a Manwich.',
  'Enjoy this Club sandwich on me!'
]

exports.run = (bot, msg) => {

  const sandwich = phrases[Math.floor(Math.random() * phrases.length)]
  msg.channel.send(sandwich)

}

exports.help = {
  name: 'sandwich',
  description: 'random sandwiches',
  usage: 'sandwich',
  aliases: ['sandvich']
}
