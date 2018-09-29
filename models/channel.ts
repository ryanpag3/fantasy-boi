import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    return sequelize.define('channel', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });
}