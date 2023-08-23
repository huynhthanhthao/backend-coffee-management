"use strict";
const { Model } = require("sequelize");
const { ProductStatus } = require("../enums");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.ProductType, {
                foreignKey: "id",
                as: "productType",
            });
        }
    }
    Product.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            description: DataTypes.STRING,
            image: DataTypes.STRING,
            price: DataTypes.INTEGER,
            status: DataTypes.ENUM(ProductStatus.INVALID, ProductStatus.VALID),
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
