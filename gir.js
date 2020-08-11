'use strict'

try {
  require('./config.json')
} catch (e) {
  console.log('Config file not found, make one using the example config and restart the bot.')
  process.exit()
}

const Discord = require('discord.js')
const bot = new Discord.Client({ autoReconnect: true })
const fs = require('fs')
const config = require('./config.json')
const prefix = config.prefix

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

fs.readdir('./modules/', (err, files) => {
  if (err) console.error(err)
  console.log(`loading a total of ${files.length} modules.`)
  files.forEach(f => {
    let props = require(`./modules/${f}`)
    console.log(`loading module: ${props.help.name} ✓`)
    bot.commands.set(props.help.name, props)
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name)
    })
  })
})

bot.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  let command = msg.content.split(' ')[0].slice(prefix.length)
  let cmd
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command)
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command))
  }
  if (cmd) {
    cmd.run(bot, msg, config)
  }
})

bot.on('ready', () => {
  const skele = '                       :::!~!!!!!:.\n' + '                    .xUHWH!! !!?M88WHX:.\n' + '                 .X*#M@$!!  !X!M$$$$$$WWx:.\n' + '                :!!!!!!?H! :!$!$$$$$$$$$$8X:\n' + '               !!~  ~:~!! :~!$!#$$$$$$$$$$8X:\n' + '              :!~::!H!<   ~.U$X!?R$$$$$$$$MM!\n' + '              ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!\n' + '              ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!\n' + '                !:~~~ .:!M"T#$$$$WX??#MRRMMM!\n' + '                ~?WuxiW*`   `"#$$$$8!!!!??!!!\n' + '              :X- M$$$$       `"T#$T~!8$WUXU~\n' + '             :%`  ~#$$$m:        ~!~ ?$$$$$$\n' + '           :!`.-   ~T$$$$8xx.  .xWW- ~""##*"\n' + ' .....   -~~:<` !    ~?T#$$@@W@*?$$      /`\n' + ' W$@@M!!! .!~~ !!     .:XUW$W!~ `"~:    :\n' + ' #"~~`.:x%`!!  !H:   !WM$$$$Ti.: .!WUn+!`\n' + ' :::~:!!`:X~ .: ?H.!u "$$$B$$$!W:U!T$$M~\n' + ' .~~   :X@!.-~   ?@WTWo("*$$$W$TH$! `\n' + ' Wi.~!X$?!-~    : ?$$$B$Wu("**$RM!\n' + '$R@i.~~ !     :   ~$$$$$B$$en:``\n' + '?MXT@Wx.~    :     ~"##*$$$$M~         '
  console.log(skele)
  console.log(`Serving ${bot.users.size} users, in ${bot.channels.size} channels across ${bot.guilds.size} servers.`)
  process.title = bot.user.name
})

bot.on('error', console.error)
bot.on('warn', console.warn)

bot.login(config.token)
