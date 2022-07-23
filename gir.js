'use strict'

try {
  require('./config.json')
} catch (e) {
  console.log('Config file not found, make one using the example config and restart the bot.');
  process.exit();
}
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const bot = new Client({ intents: [GatewayIntentBits.Guilds], autoReconnect: true });

bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'modules')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
	const command = require(filePath);
  bot.commands.set(command.data.name, command);
}

bot.once('ready', () => {
  console.log('Ready!');
})

bot.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = bot.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})


bot.on('ready', () => {
  const skele = '                       :::!~!!!!!:.\n' + '                    .xUHWH!! !!?M88WHX:.\n' + '                 .X*#M@$!!  !X!M$$$$$$WWx:.\n' + '                :!!!!!!?H! :!$!$$$$$$$$$$8X:\n' + '               !!~  ~:~!! :~!$!#$$$$$$$$$$8X:\n' + '              :!~::!H!<   ~.U$X!?R$$$$$$$$MM!\n' + '              ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!\n' + '              ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!\n' + '                !:~~~ .:!M"T#$$$$WX??#MRRMMM!\n' + '                ~?WuxiW*`   `"#$$$$8!!!!??!!!\n' + '              :X- M$$$$       `"T#$T~!8$WUXU~\n' + '             :%`  ~#$$$m:        ~!~ ?$$$$$$\n' + '           :!`.-   ~T$$$$8xx.  .xWW- ~""##*"\n' + ' .....   -~~:<` !    ~?T#$$@@W@*?$$      /`\n' + ' W$@@M!!! .!~~ !!     .:XUW$W!~ `"~:    :\n' + ' #"~~`.:x%`!!  !H:   !WM$$$$Ti.: .!WUn+!`\n' + ' :::~:!!`:X~ .: ?H.!u "$$$B$$$!W:U!T$$M~\n' + ' .~~   :X@!.-~   ?@WTWo("*$$$W$TH$! `\n' + ' Wi.~!X$?!-~    : ?$$$B$Wu("**$RM!\n' + '$R@i.~~ !     :   ~$$$$$B$$en:``\n' + '?MXT@Wx.~    :     ~"##*$$$$M~         '
  console.log(skele)
  console.log(`Serving ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels across ${bot.guilds.cache.size} servers.`)
  // process.title = bot.user.name

})

bot.on('error', console.error)
bot.on('warn', console.warn)

bot.login(token)