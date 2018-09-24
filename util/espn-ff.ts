import espnFF from 'espn-ff-api-2';

export default class EspnFF {
    cookies: object;

    constructor(cookies: object = undefined) {
        this.cookies = cookies;
    }

    /**
     * get a formatted league scoreboard
     */
    getLeagueScoreboard = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then((payload) => {
                return this.generateLeagueScoreboard(payload);
            });
    }

    /**
     * generate a scoreboard from the raw api payload
     */
    generateLeagueScoreboard = (payload) => {
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

    getMatchup = (teamA, teamB) => {
        return '**' + this.getName(teamA) + '** vs **' + this.getName(teamB) + '**\n';
    }

    getTrophies = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then((scoreboard) => {
                let trophies = 'Here are your trophies for this week! Remember, always blame the kicker! :wink:\n';
                trophies += '----------------------------\n';
                trophies += this.getHighScore(scoreboard);
                trophies += this.getLowScore(scoreboard);
                trophies += this.getBiggestWin(scoreboard);
                trophies += this.getClosestWin(scoreboard);
                trophies += '----------------------------\n';
                return trophies;
            });
    }

    getHighScore = (scoreboard) => {
        let highScore = {
            score: 0,
            response: ''
        };
        for (let matchup of scoreboard.scoreboard.matchups) {
            const teams = matchup.teams;
            if (teams[0].score > highScore.score || teams[1].score > highScore.score) {
                const higherTeam = teams[0].score < teams[1].score ? teams[1] : teams[0];
                highScore.score = higherTeam.score;
                highScore.response = ':trophy: Highest Score -> **' + this.getName(higherTeam) + '** with score [' + higherTeam.score + ']\n';
            }
        }
        return highScore.response;
    }

    getLowScore = (scoreboard) => {
        let lowScore = {
            score: 9999,
            response: ''
        };
        for (let matchup of scoreboard.scoreboard.matchups) {
            const teams = matchup.teams;
            if (teams[0].score < lowScore.score || teams[1].score < lowScore.score) {
                const lowerTeam = teams[0].score > teams[1].score ? teams[1] : teams[0];
                lowScore.score = lowerTeam.score;
                lowScore.response = ':trophy: Lowest Score -> **' + this.getName(lowerTeam) + '** with score [' + lowerTeam.score + ']\n';
            }
        }
        return lowScore.response;
    }

    getBiggestWin = (scoreboard) => {
        let biggestWin = {
            diff: 0,
            response: ''
        };
        for (let matchup of scoreboard.scoreboard.matchups) {
            const teams = matchup.teams;
            const diff = Math.abs(teams[0].score - teams[1].score);
            if (diff > biggestWin.diff) {
                biggestWin.diff = diff;
                biggestWin.response = ':trophy: Biggest Win [' + diff.toFixed(2) + '] -> ' + this.getScoreline(teams[0], teams[1]);
            }
        }
        return biggestWin.response;
    }

    getClosestWin = (scoreboard) => {
        let closestWin = {
            diff: 9999,
            response: ''
        };
        for (let matchup of scoreboard.scoreboard.matchups) {
            const teams = matchup.teams;
            const diff = Math.abs(teams[0].score - teams[1].score);
            if (diff < closestWin.diff) {
                closestWin.diff = diff;
                closestWin.response = ':trophy: Closest Win [' + diff.toFixed(2) + '] -> ' + this.getScoreline(teams[0], teams[1]);
            }
        }
        return closestWin.response;
    }

    getMatchups = (leagueId: string) => {
        return espnFF.getMatchups(this.cookies || undefined, leagueId)
            .then((body) => {
                console.log(body);
                let matchups = 'Yo, found your matchups. :fist:\n'
                for (let matchup of body) {
                    const teams = matchup.teams;
                    matchups += this.getMatchup(teams[0], teams[1]);
                }
                return matchups;
            });
    }

    getBoxScores = (leagueId: string) => {
        return espnFF.getBoxScore(this.cookies || undefined, leagueId)
            .then((body) => {
                console.log(body);
            });
    }
}