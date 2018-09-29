import { Message } from 'discord.js';
import ESPNFF from '../util/espn-ff';
import eFF from 'espn-ff-api-2';
import db from '../util/db';

const espnFF = new ESPNFF();
/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 */
export default (message: Message) => {
    message.channel.send('I\'m ready to fumble!');
    db.getLeague(message.channel.id)
        .then((leagueId) => eFF.getLeagueScoreboard(undefined, leagueId))
        .then((scoreboard) => console.log(JSON.stringify(scoreboard, null, 4)))
        .catch((err) => console.log(err));    
};