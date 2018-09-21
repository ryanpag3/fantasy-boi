import Discord from 'discord.js';
import pConfig from './config.private.json';

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('ready');
});

bot.on('message', message => {
    console.log(message);
    const startsWith: string = message.content.split(' ')[0];
    handleCommand(startsWith);
});

bot.login(pConfig.token);

/* commands */
const handleCommand = (command: string) => {
    

    switch (command) {
        case '!help':

    }
}