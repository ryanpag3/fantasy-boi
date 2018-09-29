import { Message } from 'discord.js';

export default (message: Message) => {
    const help = `
        __Fantasy Boi Reference__
        For full documentation, refer to https://github.com/ryanpage42/fantasy-boi
        \`!fb help\`
        
        Manage Leagues
        \`!fb add <league id>\`
        \`!fb remove <league id>\`

        Manage Scheduled Events
        \`!fb disable <event>\`
        \`!fb enable <event>\`

        Display Information
        \`!fb scores\`
        \`!fb rankings\`
        \`!fb close-scores\`
        \`!fb trophies\` 
    `;

    message.channel.send(help);
}