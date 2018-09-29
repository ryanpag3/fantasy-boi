import {
    Message
} from 'discord.js';
import commandHelper from '../util/command-helper';
import DB from '../util/db';

const LeagueChannel = DB.league_channel;

/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 */
export default (message: Message) => {
    const content = commandHelper.removePrefixCommand(message.content, 2);
    LeagueChannel.destroy({
        where: {
            league_id: content,
            channel_id: message.channel.id
        }
    }).then((res) => {
        if (res == 0)
            message.channel.send('League could not be found for specified channel. :sweat_smile:')
        else
            message.channel.send('League with id: [' + content + '] was successfully deleted from the channel! :persevere:')
    })
}