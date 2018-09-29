import { Message } from 'discord.js';
import ESPNFF from '../util/espn-ff';
import db from '../util/db';

const espnFF = new ESPNFF();

export default (message: Message) => {
    db.getLeague(message.channel.id)
        .then((leagueId) => espnFF.getMatchups(leagueId))
        .then((matchups) => message.channel.send(matchups));
};