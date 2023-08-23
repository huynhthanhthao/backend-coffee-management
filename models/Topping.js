"use strict";
const { Model } = require("sequelize");
const { ToppingStatus } = require("../enums");
module.exports = (sequelize, DataTypes) => {
    class Topping extends Model {}
    Topping.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            image: DataTypes.STRING,
            status: DataTypes.ENUM(ToppingStatus.INVALID, ToppingStatus.VALID),
            price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Topping",
        }
    );
    return Topping;
};
