import { Client, Channel, TextChannel } from 'discord.js';
import pConfig from '../config.private.json';

const bot = new Client();

export default {
    sendMessage: (channelId: string, message: string) => {
        return bot.login(pConfig.token)
            .then(() => bot.channels.find(x => x.id === channelId))
            .then((channel: TextChannel) => channel.send(message));
    }
}