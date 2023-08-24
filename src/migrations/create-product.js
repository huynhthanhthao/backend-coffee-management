"use strict";
const { ProductStatus } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            productTypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "ProductTypes",
                    },
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            code: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: ProductStatus.VALID,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Products");
    },
};
