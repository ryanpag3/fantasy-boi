import { Message } from 'discord.js';
import ESPNFF from '../util/espn-ff';

const espnFF = new ESPNFF();

export default (message: Message) => {
    espnFF.getLeagueScoreboard('338828')
        .then((res) => {
            const matchups = generateESPNScoreboard(res);
            message.channel.send(matchups);
        });

    function generateESPNScoreboard(res: any) {
        let matchups = 'Here\'s your matchups!\n';
        for (let matchup of res.scoreboard.matchups) {
            const teamA = matchup.teams[0];
            const locationA = teamA.team.teamLocation;
            const nicknameA = teamA.team.teamNickname;
            const nameA = locationA + (locationA.endsWith(' ') || nicknameA.startsWith(' ') ? '' : ' ') + nicknameA;
            const teamB = matchup.teams[1];
            const locationB = teamB.team.teamLocation;
            const nicknameB = teamB.team.teamNickname;
            const nameB = locationB + (locationB.endsWith(' ') || nicknameB.startsWith(' ') ? '' : ' ') + nicknameB;
            matchups += '**' + nameA + '** [' + teamA.score + '] vs **' + nameB + '** [' + teamB.score + ']\n';
        }
        return matchups;
    }
};