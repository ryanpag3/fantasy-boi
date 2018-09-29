import { Message } from 'discord.js';
import ESPNFF from '../util/espn-ff';
import eFF from 'espn-ff-api-2';
import db from '../util/db';

const espnFF = new ESPNFF();
export default (message: Message) => {
    const mArr = message.content.split(' ');
    mArr.shift(); // prefix
    mArr.shift(); // disable
    const eventType = mArr.shift();

    if (!eventType) {
        message.channel.send('No event was provided to disable. Ruh oh!');
        return;
    }


    db.getLeague(message.channel.id)
        .then((leagueId) => db.disableEvent(leagueId, message.channel.id, eventType))
        .then((res) => {
            message.channel.send(res)
        })
        .catch((err) => {
            message.channel.send('Could not disable event. Reason: ' + err);
        });
};