const pokemonData = require('pokemon-data')

exports.run = (bot, msg) => {

  const pokemon = pokemonData.getRandom()
  const pokemonToLowercase = pokemon.toLowerCase()
  const image = 'https://img.pokemondb.net/artwork/'+pokemonToLowercase+'.jpg'
  const pokemonMessage = `${pokemon} -- ${image}`
  msg.channel.send(pokemonMessage)

}

exports.help = {
  name: 'pokemon',
  description: 'random pokemon with image',
  usage: 'pokemon',
  aliases: []
}
