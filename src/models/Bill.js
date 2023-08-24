"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {}
    Bill.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            order: DataTypes.JSON,
            employee: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Bill",
        }
    );
    return Bill;
};
