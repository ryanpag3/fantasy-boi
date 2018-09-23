import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    return sequelize.define('league', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });
}