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
            // this.testCron();
        }, null, startNow, LOCALE)
    }

    testCron = () => {
        
    }

}

