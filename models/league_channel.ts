import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    return sequelize.define('league_channel', {
        league_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        channel_id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });
}