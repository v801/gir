const Xray = require('x-ray')
const xray = new Xray()

exports.run = (bot, msg) => {

  const loadingMessage = 'Finding daily deal from Steam...'

  msg.channel.send(loadingMessage).then(msg => {
    return xray('http://store.steampowered.com', {
      gameUrl: '.dailydeal_ctn a@href',
      regPrice: '.dailydeal_ctn .discount_original_price',
      salePrice: '.dailydeal_ctn .discount_final_price',
      percentOff: '.dailydeal_ctn .discount_pct'
    }) ((err, obj) => {
      if (err || !obj) {
        msg.edit('Unable to get daily steam deal.')
      } else {
        const gameID = /(?!\/)\d+(?=\/)/.exec(obj.gameUrl)
        const appURL = 'http://steamdb.info/app/'+gameID[0]+'/'
        return xray(appURL, 'h1') (function (err, gameName) {
          const deal = `${gameName} is ${obj.salePrice} (${obj.percentOff}) today. Regular price: ${obj.regPrice}.\n(${obj.gameUrl})`
          msg.edit(deal)
        })
      }
    })
  })

}

exports.help = {
  name: 'steamdeal',
  description: 'displays daily deal from the frontpage of store.steampowered.com',
  usage: 'steamdeal',
  aliases: ['sd']
}
