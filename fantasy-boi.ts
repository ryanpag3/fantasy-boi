import { EventEmitter } from 'events';
import Discord from 'discord.js';
import { prefix } from './config.json';
import pConfig from './config.private.json';
import Scheduler from './util/scheduler';

let bot = new Discord.Client();
const emitter = new EventEmitter();

/* ready listener */
bot.on('ready', () => {
    console.log('Fantasy Boi has been initialized successfully!');
    bot.user.setActivity(`Serving ${bot.guilds.size} server(s)`);
});

/* message listener */
bot.on('message', message => {
    const messageArr = message.content.split(' ');
    const command = messageArr[0] + ' ' + messageArr[1]; // risky, fix

    const isBot = message.author.bot;
    if (isBot) {
        // console.log('command received from bot, ignoring!');
        return;
    }

    const startsWithPrefix = message.content.indexOf(prefix) !== 0;
    if (startsWithPrefix) {
        // console.log('does not start with prefix')
        return;
    }

    // console.log('command: ' + command);
    emitter.emit(command, message);
});

/* import commands */
import help from './commands/help';
import test from './commands/test';

/* 
  load listeners 
  format: (command, handler)
*/
emitter.on(prefix + 'help', help);
emitter.on(prefix + 'h', help);
emitter.on(prefix + 'test', test);

/* start scheduler */
const scheduler = new Scheduler();
scheduler.load();

/* When this baby hits 88mph, we're going to see some serious shit! */
bot.login(pConfig.token);

