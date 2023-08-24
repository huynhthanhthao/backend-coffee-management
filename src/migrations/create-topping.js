"use strict";

const { ToppingStatus } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Toppings", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: ToppingStatus.VALID,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0,
                allowNull: false,
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
        await queryInterface.dropTable("Toppings");
    },
};
