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

    getCloseScores = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then(payload => this.generateCloseScores(payload))
    }

    // TODO: account for no close scores
    // TODO: randomize response
    generateCloseScores = (payload) => {
        let closeScores = 'Here\'s your close scores! Any nail biters?? :cold_sweat:\n'
        for (let matchup of payload.scoreboard.matchups) {
            const teams = matchup.teams;
            if (Math.abs(teams[0].score - teams[1].score) < 15)
                closeScores += this.getScoreline(teams[0], teams[1]);
        }
        return closeScores;
    }

    getLocation = (team) => {
        return team.team.teamLocation;
    }

    getNickname = (team) => {
        return team.team.teamNickname;
    }

    getName = (team) => {
        return this.getLocation(team) + (this.getLocation(team).endsWith(' ') || this.getNickname(team).startsWith(' ') ? '' : ' ') + this.getNickname(team);
    }

    getScoreline = (teamA, teamB) => {
        return '**' + this.getName(teamA) + '** [' + teamA.score + '] vs **' + this.getName(teamB) + '** [' + teamB.score + ']\n';
    }
}