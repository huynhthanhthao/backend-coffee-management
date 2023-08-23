"use strict";
const { Model } = require("sequelize");
const { TableStatus } = require("../enums");
module.exports = (sequelize, DataTypes) => {
    class Table extends Model {}
    Table.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            code: DataTypes.STRING,
            note: DataTypes.STRING,
            status: DataTypes.ENUM(TableStatus.INVALID, TableStatus.VALID),
        },
        {
            sequelize,
            modelName: "Table",
        }
    );
    return Table;
};
