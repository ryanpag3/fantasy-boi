import { CronJob } from 'cron';
import DB from './db';
import bot from './bot';

const LeagueChannel = DB.league_channel;

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
        LeagueChannel.findAll({})
            .then((results: any) => {
                for (let result of results) {
                    bot.sendMessage(result.channel_id, result.league_id);
                }
            })
    }

}

