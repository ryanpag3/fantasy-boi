import {
    CronJob
} from 'cron';
import DB from './db';
import bot from './bot';
import ESPNFF from './espn-ff';

const LeagueChannel = DB.league_channel;

const LOCALE = 'America/Los_Angeles';

export default class Scheduler {
    constructor() { }

    load = () => {
        console.log('loading scheduler jobs');
        const startNow = true;
        /* jobs */
        new CronJob('* * * * *', () => {
            // this.testCron();
        }, null, startNow, LOCALE);

        new CronJob('* * * * *', () => {
            this.showMatchups();
        }, null, startNow, LOCALE);

        new CronJob('* * * * *', () => {
            this.showCloseScores();
        }, null, startNow, LOCALE);
    }

    testCron = () => {
        LeagueChannel.findAll({})
            .then((results: any) => {
                for (let result of results) {
                    bot.sendMessage(result.channel_id, result.league_id);
                }
            })
    }

    showMatchups = () => {

    }

    showCloseScores = () => {
        LeagueChannel.findAll({})
            .then((results: any) => {
                for (let result of results) {
                    const espnFF = new ESPNFF();
                    espnFF.getCloseScores(result.league_id)
                        .then((scores) => {
                            bot.sendMessage(result.channel_id, scores);
                        });
                }
            })
    }

    showTrophies = () => {
        // todo
    }

    showScoreboard = () => {
        // todo
    }

    showBoxScore = () => {
        // todo
    }

}