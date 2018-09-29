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
        let matchups = 'Here\'s your team scores for the week of ' + date.toLocaleDateString() + '\n';
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
                // console.log(body);
                let matchups = 'Yo, found your matchups. :fist:\n'
                for (let matchup of body) {
                    const teams = matchup.teams;
                    matchups += this.getMatchup(teams[0], teams[1]);
                }
                return matchups;
            });
    }

    getPowerRankings = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then((body) => {
                return this.generatePowerRankings(body);
            });
    }

    generatePowerRankings = (leagueInfo: any) => {
        const scoringPeriodStartDate = new Date(leagueInfo.scoreboard.dateFirstProGameOfScoringPeriod);
        const matchups = leagueInfo.scoreboard.matchups;
        let players = this.generatePlayers(matchups);
        let rankingsMsg = 'Here are your power rankings for the week of ' + scoringPeriodStartDate.toLocaleDateString() + '. These are decided based on points earned and margin of victory using a 20/80 weight.\n';
        players.map((player) => {
            rankingsMsg += (player.rank > 0 && player.rank < 4 ? this.getMedal(player.rank) + ' ' : '        ') + player.rank + '. **' + player.name + '** (' + player.powerScore.toFixed(0) + ')\n';
        });
        rankingsMsg += 'Congratulations to those who performed well this week. Better luck next time to the losers!';
        return rankingsMsg;
    }

    getMedal = (rank) => {
        if (rank == 1)
            return ':first_place:'
        if (rank == 2)
            return ':second_place:'
        if (rank == 3)
            return ':third_place:';
    }

    generatePlayers = (matchups: any) => {
        let p = [];
        for (let matchup of matchups) {
            for (let i = 0; i < matchup.teams.length; i++) {
                p.push({
                    abbrev: matchup.teams[i].teamAbbrev,
                    name: this.getName(matchup.teams[i]),
                    margin: this.getWinMargin(matchup.teams[i], matchup.teams[i == 0 ? 1 : 0]),
                    points: matchup.teams[i].score,
                    powerScore: null,
                    rank: null
                })
            }
        }
        return this.rankPlayers(p);
    }

    rankPlayers = (players: any) => {
        players = this.generatePowerScore(players);
        players = this.sortByPowerScore(players);

        for (let i = 0; i < players.length; i++) {
            players[i].rank = i+1;
        }

        return players;
    }

    generatePowerScore = (players: any) => {
        players = players.map((player) => {
            let powerScore = 0;
            powerScore += player.margin * 80;
            powerScore += player.points * 20
            powerScore = powerScore / 100;
            player.powerScore = powerScore;
            return player;
        });
        return players;
    }

    sortByPowerScore = (players: any) => {
        players = players.sort((a, b) => {
            if (a.powerScore > b.powerScore) return -1;
            if (a.powerScore < b.powerScore) return 1;
            return 0;
        });
        return players;
    }

    /**
     * subtract first from second
     */
    getWinMargin = (teamA, teamB) => {
        return teamA.score - teamB.score;
    }

    getLeagueRankings = (leagueId) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId)
            .then((body) => {
                let teams = [];
                body.scoreboard.matchups.map(matchup => teams = teams.concat(matchup.teams));
                teams.sort((a, b) => {
                    if (a.team.record.overallStanding > b.team.record.overallStanding) return 1;
                    if (a.team.record.overallStanding < b.team.record.overallStanding) return -1;
                    return 0;
                });

                teams = teams.map(team => {
                    return {
                        rank: team.team.record.overallStanding,
                        abbrev: team.team.teamAbbrev,
                        name: this.getName(team)
                    }
                });

                return teams;
            })
    }

    generateRankingsMsg = (rankings) => {
        let msg = 'Here is your overall league rankings so far.\n';
        for (let ranking of rankings) {
            msg += '**#' + ranking.rank + '** ' + ranking.name + ' (_' + ranking.abbrev + '_)\n';
        }
        return msg;
    }
}