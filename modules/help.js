exports.run = (bot, msg) => {

  const cmd = msg.content.split(' ')
  const cmdOnly = cmd.length == 1
  const options = cmd.length == 2

  if (cmdOnly) {
    msg.channel.send("asciidoc", `= Command List =\n\n[Use .help <commandname> for details]\n\n${bot.commands.map(c=>`${c.help.name}:: ${c.help.description}`).join("\n")}`)
  }
  else if (options) {
    let command = cmd[1]
    if (bot.commands.has(command)) {
      command = bot.commands.get(command)
      msg.channel.send("asciidoc", `= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`)
    }
  }

}

exports.help = {
  name : 'help',
  description: 'display help for a command.',
  usage: 'help <command>',
  aliases: []
}

exports.conf = {
  permLevel: 0
}
