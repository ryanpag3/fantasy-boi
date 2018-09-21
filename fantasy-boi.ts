import { EventEmitter } from 'events';
import Discord from 'discord.js';
import pConfig from './config.private.json';
import EspnFF from './util/espn-ff';

let bot = new Discord.Client();
let espnFF = new EspnFF();
const emitter = new EventEmitter();

bot.on('ready', () => {
    console.log('Fantasy Boi has been initialized successfully!');
});

bot.on('message', message => {
    const command = message.content.split(' ')[0];
    console.log(command);
    emitter.emit(command, message);
});

bot.login(pConfig.token);

emitter.on('!help', (message) => {
    console.log('fuck yeh');
    message.reply('help called for!');
});