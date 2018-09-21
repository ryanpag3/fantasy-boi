import Discord from 'discord.js';
import pConfig from './config.private.json';

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('ready');
});

bot.on('message', message => {
    console.log(message);
});

bot.login(pConfig.token);