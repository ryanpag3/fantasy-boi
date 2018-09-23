import { Message } from 'discord.js';
import ESPNFF from '../util/espn-ff';

const espnFF = new ESPNFF();
/**
 * this is a basic template for a command function
 * it also allows user to test if it's working
 */
export default (message: Message) => {
    message.channel.send('I\'m ready to fumble!');
    espnFF.getLeagueScoreboard('338828')
        .then((res) => {
            for (let matchup of res.scoreboard.matchups) {
                const teamA = matchup.teams[0];
                const locationA = teamA.team.teamLocation;
                const nicknameA = teamA.team.teamNickname;
                const nameA = locationA + (locationA.endsWith(' ') || nicknameA.startsWith(' ') ? '' : ' ') + nicknameA;
                const teamB = matchup.teams[1];
                const locationB = teamB.team.teamLocation;
                const nicknameB = teamB.team.teamNickname;
                const nameB = locationB + (locationB.endsWith(' ') || nicknameB.startsWith(' ') ? '' : ' ') + nicknameB;
                console.log(nameA + ' vs ' + nameB);
            }
        });
};