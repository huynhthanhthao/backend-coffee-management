"use strict";

const { OrderStatus, OrderType } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            tableId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Tables",
                    },
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            total: {
                type: Sequelize.DECIMAL(10, 2),
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: OrderStatus.WAITING,
            },
            type: {
                type: Sequelize.INTEGER,
                defaultValue: OrderType.DINE_IN,
            },
            productList: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable("Orders");
    },
};
