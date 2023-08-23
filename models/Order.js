"use strict";
const { Model } = require("sequelize");
const { OrderStatus, OrderType } = require("../enums");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {}
    Order.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            status: DataTypes.ENUM(OrderStatus.WAITING, OrderStatus.PAID, OrderStatus.UNPAID),
            total: DataTypes.DECIMAL(10, 2),
            type: DataTypes.ENUM(OrderType.DINE_IN, OrderType.TAKE_AWAY),
            products: DataTypes.JSON,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
