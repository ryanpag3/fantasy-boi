import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    return sequelize.define('user', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });
}