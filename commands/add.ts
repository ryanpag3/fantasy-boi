import { Message } from 'discord.js';
import commandHelper from '../util/command-helper';
import ESPNFF from '../util/espn-ff';
import DB from '../util/db';
import bot from '../util/bot';

const LeagueChannel = DB.league_channel;

/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 * TODO: validate league id before adding to database
 */
export default (message: Message) => {
    const content = commandHelper.removePrefixCommand(message.content, 2);

    LeagueChannel.findAll({where: {
        channel_id: message.channel.id
    }}).then((records) => {
        if (records.length > 0)
            throw 'A league already exists on channel. Don\'t like this? Send angry DMs to the developer! :angry:';
    })
    .then(() => LeagueChannel.insertOrUpdate({
        league_id: content,
        channel_id: message.channel.id,
        show_scoreboard: true,
        show_close_scores: true,
        show_trophies: true,
        show_matchups: true,
        show_power_rankings: true
    })).then((res) => {
        if (res == true)
            message.channel.send('League with id: [' + content + '] has been successfully added to ' + message.channel + '! :fist:');
        else
            message.channel.send('League already exists on ' + message.channel + '! :joy:')
    })
    .catch((err) => {
        message.channel.send('Could not add league. Reason: _' + err + '_');
    });
}