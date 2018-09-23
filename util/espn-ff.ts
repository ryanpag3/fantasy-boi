import espnFF from 'espn-ff-api-2';
import pConfig from '../config.private.json';

export default class EspnFF {
    readonly s2Token: string = pConfig.espn.s2;
    readonly swid: string = pConfig.espn.SWID;
    cookies: object;

    constructor(cookies: object = undefined) {
        this.cookies = cookies;
    }

    /**
     * get a formatted league scoreboard
     */
    getLeagueMatchups = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then((payload) => {
                return this.generateLeagueMatchups(payload);
            });
    }

    /**
     * generate a scoreboard from the raw api payload
     */
    generateLeagueMatchups = (payload) => {
        const date = new Date();
        this.setToLastThursday(date);
        let matchups = 'Here\'s your matchups for the week of ' + date.toLocaleDateString() + '\n';
        for (let matchup of payload.scoreboard.matchups) {
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

    setToLastThursday = (d) => {
        return d.setDate(d.getDate() - d.getDay() + 4);
    }
}