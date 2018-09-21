import espnFF from 'espn-ff-api';
import pConfig from '../config.private.json';

export default class EspnFF {
    readonly s2Token: string = pConfig.espn.s2;
    readonly swid: string = pConfig.espn.SWID;
    cookies: object;

    constructor() {
        this.cookies = {
            espnS2: this.s2Token,
            SWID: this.swid
        }
    }

    getLeagueScoreboard = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies, leagueId);
    }
}