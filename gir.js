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
    bot.commands.set(command.data?.name, command);
}

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
const gir = `
                 .^^.                                .^^.                
             .:~!!^.                                   :!!~:             
           ^!7?7^                                        ^7?7~:          
          ^777!.                                           ~7?7.         
         :777^                                              :!?~         
         !?!.                                                .!7.        
        ^?~                                                    !~        
       .7^            ..:^~!!7?JJJYYYYYYYYJJ??7!~^^:.          .!.       
       ~^      .:~7?Y5PGBBB#########GG##########BBBBGP5J?!^:.   .^       
      .:  :~?YPGBB###BBBBBBBBBBBBBB#7:BBBBBBBBBBBBBBBBB##BGP5Y?!:.       
      :!JPBB##BBBBBBBBBBBBBBBBBBBBB#J~BBBBBBBBBBBBBBBBBBBBBGPGGGPY:      
      5##BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGPPPPG7      
     .GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBPYBBBBBBBBBBBBBBBBBBBBBBBGPPPGY      
     ^BBBBBBBBBBBBBBBBBBBBBBBBBBBBB#7.BBBBBBBBBBBBBBBBBBBBBBBBPPPPP:     
     !BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBY7BBBBBBBBBBBBBBBBBBBBBBBBGPPPG7     
     7#BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBPPPGJ     
     7#B#BBGPPPPPGGBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGPPPPPGGPGGG5.    
     7B5J??JY55555YJJYPBBBBBBBBBBBB#?~BBBBBBBBBBBBG5YJJY55555Y?77?YP^    
     :!JG#@@@@@@@@@@&B5JYGBBBBBBBBB#7:BBBBBBBBBBPJYP#&@@@@@@@@@&#P?!.    
    ^P&@@@@@@@@@@@@@@@@@G?YBBBBBBBBBGPBBBBBBBBGJJ#@@@@@@@@@@@@@@@@@#J.   
   J@@@@@@@@@@@@@@@@@@@@@#J?BBBBBBBBBBBBBBBBBG7P&@@@@@@@@@@@@@@@&@@@@B^  
  J@@@@@@@@@@@@@@@@@@@@@@&#YJBBBBBBB5!BBBBBBG7G#@@@@@@@@@@@@@@@#::B@@@&^ 
 :&@@@@@&@@@@@@@@@@@@@@@@@##7GBBBBB#J.BBBBB#JY##@@@@@@@@@@@@@@@@57B@@@@P 
 7@@@@@5.7@@@@@@@@@@@@@@@@##?5BBBBBBPJBBBBB#7P##@@@@@@@@@@@@@@@@@@@@@@@#.
 ~@@@@@P!P@@@@@@@@@@@@@@@&B#75BBBBBBB#BBBBB#?5##@@@@@@@@@@@@@@@@@@@@@@@B 
  G@@@@@@@@@@@@@@@@@@@@@@##P!GBBBBBBGPBBBBBB57###@@@@@@@@@@@@@@@@@@@@@@7 
  :B@@@@@@@@@@@@@@@@@@@&##G!YBBBBBB#J:BBBBBBG!?B##@@@@@@@@@@@@@@@@@@@@Y  
   .Y&@@@@@@@@@@@@@@@&##BY7YBBBBBBB#5!BBBBBBB5?7P##&@@@@@@@@@@@@@@@@#!   
     ^Y#@@@@@@@@@&&&#BGY?JGBBBBBBGPPPPPPPBBBBGP5??5G##&&@@@@@@@@@&G7.    
        ^7YPPGGGGP5YJJJ5GBBBBBBBBJ!?^.  .5BBBBGGGPY?JY5PPGGGGP5J!:       
           !JYJJJY5PGBBBBBBBBBBBBBPP?^555GBBBBBBGGBBGP5JJ???JJ?:         
            ^?PB###BBBBBBBBBBBBBBBGGPJGGGGGGGGBBBBBBBBGGGGPY?~.          
               ^75GB##BBBBBP555Y!!??7^?J~?5PPPGBBBBBGGP5?~:              
                  .~?YPBB##BBBBB^J5YY7Y5?!GB###BBG5Y?~:                  
                      .:~7JYPGBG^?JYYYYJ?^5GP5J7~:.                      
                             .::.!J7!77J~.:.                             
                                ?G5?B#JP5.    Can I be a mongoose dog?
                               :PP5Y55Y5B?    Serving ${bot.users.cache.size} users in ${bot.channels.cache.size} channels on ${bot.guilds.cache.size} server(s)
                                :^~!7?JY5?                               
                                       .:                                
`
    console.log(gir);
    process.title = "gir"
})

bot.on('error', console.error)
bot.on('warn', console.warn)

bot.login(token)