"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductType extends Model {}
    ProductType.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            name: DataTypes.STRING,
            code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ProductType",
        }
    );
    return ProductType;
};
