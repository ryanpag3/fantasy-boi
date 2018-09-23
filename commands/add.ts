import { Message } from 'discord.js';
import commandHelper from '../util/command-helper';
import ESPNFF from '../util/espn-ff';
import DB from '../util/db';
import bot from '../util/bot';

const LeagueChannel = DB.league_channel;

/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 */
export default (message: Message) => {
    const content = commandHelper.removePrefixCommand(message.content, 2);
    console.log(content);
    LeagueChannel.insertOrUpdate({
        league_id: content,
        channel_id: message.channel.id
    }).then((res) => {
        if (res == true)
            message.channel.send('League has been successfully added to ' + message.channel + '! :fist:');
        else
            message.channel.send('League already exists on ' + message.channel + '! :joy:')
    })
}