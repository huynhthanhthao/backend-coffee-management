"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        static associate(models) {
            Bill.belongsTo(models.Order, {
                foreignKey: "orderId",
                as: "order",
            });
        }
    }
    Bill.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
        },
        {
            sequelize,
            modelName: "Bill",
        }
    );
    return Bill;
};
