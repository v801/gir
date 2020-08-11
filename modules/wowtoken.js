const request = require('request')

exports.run = (bot, msg) => {

  const helpMessage = 'Try:\n```wowtoken <region> (na, eu, cn, tw, kr)```\ninfo from https://wowtoken.info'
  const loadingMessage = ':thinking: Finding wowtoken price...'
  const errorMessage = 'The API returned an unconventional response'
  const apiUrl = 'https://data.wowtoken.info/snapshot.json'
  const wowToken = msg.content.split(' ')
  const commandOnly = wowToken.length == 1
  const options = wowToken.length == 2

  msg.channel.send(loadingMessage).then(msg => {

    request(apiUrl, (error, response, body) => {

      if (!error && response.statusCode === 200) {

        try {
          JSON.parse(body)
        } catch (e) {
          msg.edit(errorMessage)
          return
        }

        const tokenPrice = JSON.parse(body)
        const tokenPriceNA = tokenPrice.NA.formatted.buy
        const tokenPriceEU = tokenPrice.EU.formatted.buy
        const tokenPriceCN = tokenPrice.CN.formatted.buy
        const tokenPriceTW = tokenPrice.TW.formatted.buy
        const tokenPriceKR = tokenPrice.KR.formatted.buy

        if (commandOnly) {
          const table = '```' +
          `Region        | Current Price\n` +
          `--------------|--------------\n` +
          `North America | ${tokenPriceNA}\n` +
          `Europe        | ${tokenPriceEU}\n` +
          `China         | ${tokenPriceCN}\n` +
          `Taiwan        | ${tokenPriceTW}\n` +
          `Korea         | ${tokenPriceKR}` +
          '```'
          msg.edit(table)
        }
        else if (options) {
          const option = wowToken[1]
          if (option == 'help') {
            msg.edit(helpMessage)
          }
          else if (option == 'na') {
            msg.edit(tokenPriceNA)
          }
          else if (option == 'eu') {
            msg.edit(tokenPriceEU)
          }
          else if (option == 'cn') {
            msg.edit(tokenPriceCN)
          }
          else if (option == 'tw') {
            msg.edit(tokenPriceTW)
          }
          else if (option == 'kr') {
            msg.edit(tokenPriceKR)
          }
          else {
            msg.edit(helpMessage)
          }
        } else {
          msg.edit(helpMessage)
        }
      }
    })
  })

}

exports.help = {
  name: 'wowtoken',
  description: 'displays current wowtoken price(s)',
  usage: 'wowtoken or wowtoken <region> (na, eu, cn, tw, kr)',
  aliases: ['token']
}
