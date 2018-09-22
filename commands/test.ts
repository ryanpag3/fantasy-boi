import { Message } from 'discord.js';

/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 */
export default (message: Message) => {
    message.channel.send('I\'m ready to fumble!');
};