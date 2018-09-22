import { Message } from 'discord.js';

export default (message: Message) => {
    message.channel.send('Help has been called!');
}