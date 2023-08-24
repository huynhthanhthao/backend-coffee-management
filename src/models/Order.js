"use strict";
const { Model } = require("sequelize");
const { OrderStatus, OrderType } = require("../../enums");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Table, {
                foreignKey: "tableId",
                as: "table",
            });
        }
    }
    Order.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            status: DataTypes.ENUM(OrderStatus.WAITING, OrderStatus.PAID, OrderStatus.UNPAID, OrderStatus.CANCEL),
            total: DataTypes.DECIMAL(10, 2),
            type: DataTypes.ENUM(OrderType.DINE_IN, OrderType.TAKE_AWAY),
            productList: DataTypes.JSON,
            tableId: DataTypes.INTEGER,
            type: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
