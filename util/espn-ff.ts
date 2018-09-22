import espnFF from 'espn-ff-api-2';
import pConfig from '../config.private.json';

export default class EspnFF {
    readonly s2Token: string = pConfig.espn.s2;
    readonly swid: string = pConfig.espn.SWID;
    cookies: object;

    constructor(cookies: object = undefined) {
        this.cookies = cookies;
    }

    getLeagueScoreboard = (leagueId: string) => {
        return espnFF.getLeagueScoreboard(this.cookies || undefined, leagueId);
    }
}