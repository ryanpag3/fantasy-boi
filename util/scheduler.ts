import { Client, Channel, DiscordAPIError, TextChannel } from 'discord.js';
import pConfig from '../config.private.json';
import config from '../config.json';
import { CronJob } from 'cron';

const LOCALE = 'America/Los_Angeles';

export default class Scheduler {
    constructor() { }

    load = () => {
        console.log('loading scheduler jobs');
        const startNow = true;
        /* jobs */
        // guild.setDefaultMessageNotification('ALL', 'test');
        new CronJob('* * * * *', () => {
            this.testCron();
        }, null, startNow, LOCALE)
    }

    testCron = () => {
        const bot = new Client();
        bot.login(pConfig.token).then(() => {
            const guilds = bot.guilds;
            guilds.map(guild => {
                guild.channels
                guild.channels.map(channel => {
                    if (guild.channels.get(channel.id).type == 'text')
                        (guild.channels.get(channel.id) as TextChannel).send('oh fuck does this actually work');
                })
            })
        });
    }

}

