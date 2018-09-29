import Sequelize from 'sequelize';
import mysql from 'mysql';
import config from '../config.json';
import pConfig from '../config.private.json';
import commandHelper from '../util/command-helper';

import User from '../models/user';
import League from '../models/league';
import LeagueChannel from '../models/league_channel';

const sequelize = new Sequelize({
    database: config.database.mysql.name,
    username: pConfig.mysql.user,
    password: pConfig.mysql.password,
    dialect: config.database.mysql.dialect,
    operatorsAliases: false,
    logging: false
});

const conn = mysql.createConnection({
    host: config.database.mysql.url,
    user: pConfig.mysql.user,
    password: pConfig.mysql.password
});

export default {
    user: sequelize.import('user', User),
    league: sequelize.import('league', League),
    league_channel: sequelize.import('league_channel', LeagueChannel),

    init() {
        conn.connect((err) => {
            if (err) throw err;
            conn.query('CREATE DATABASE IF NOT EXISTS ' + config.database.mysql.name, (err, result) => {
                if (err) throw err;
                if (result.warningCount != 1)
                    console.log('Database ' + config.database.mysql.name + ' has been created!');
                // table creations
                this.user.sync({alter: true});
                this.league.sync({alter: true});
                this.league_channel.sync({alter: true});
            });
        });

    },

    getLeague(channelID: string) {
         const LeagueChannel = this.league_channel;
         return LeagueChannel.findOne({where: {channel_id: channelID}})
            .then((res) => {
                if (!res) throw 'Could not find LeagueChannel with channel_id: ' + channelID;
                return res.league_id;
            })
            .catch((err) => {
                console.log('Error while getting league from m2m league_channel: ' + err);
            });
    },

    enableEvent(leagueId: string, channelId: string, event: string) {
        if (commandHelper.EVENTS[event]) event = commandHelper.EVENTS[event];
        const LeagueChannel = this.league_channel;
        return LeagueChannel.findOne({where: {
            league_id: leagueId,
            channel_id: channelId
        }}).then((record) => {
            if (!record) throw 'Could not find league to update!';
            if (record[event] == undefined) throw 'Could not find event for record';
            if (record[event] == true) throw event + ' is already enabled.';
            record[event] = true;
            record.save();
            return event + ' was enabled! :cheese:';
        });
    },

    disableEvent(leagueId: string, channelId: string, event: string) {
        if (commandHelper.EVENTS[event]) event = commandHelper.EVENTS[event];
        const LeagueChannel = this.league_channel;
        return LeagueChannel.findOne({where: {
            league_id: leagueId,
            channel_id: channelId
        }}).then((record) => {
            if (!record) throw 'Could not find league to update!';
            if (record[event] == undefined) throw 'Could not find event for record';
            if (record[event] == false) throw event + ' is already disabled.';
            record[event] = false;
            record.save();
            return event + ' was disabled.';
        });
    }
}