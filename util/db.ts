import Sequelize from 'sequelize';
import mysql from 'mysql';
import config from '../config.json';
import pConfig from '../config.private.json';

import User from '../models/user';
import League from '../models/league';
import LeagueChannel from '../models/league_channel';

const sequelize = new Sequelize({
    database: config.database.mysql.name,
    username: pConfig.mysql.user,
    password: pConfig.mysql.password,
    dialect: config.database.mysql.dialect,
    operatorsAliases: false
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
                this.user.sync();
                this.league.sync();
                this.league_channel.sync();
            });
        });

    },

    createLeague(id: string) {

    }
}