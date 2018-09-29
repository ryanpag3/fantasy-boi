import {
    Sequelize,
    DataTypes
} from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    return sequelize.define('league_channel', {
        league_id: DataTypes.STRING,
        channel_id: DataTypes.STRING,
        show_scoreboard: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        show_close_scores: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        show_trophies: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        show_matchups: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        show_power_rankings: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
}