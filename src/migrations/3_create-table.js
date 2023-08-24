"use strict";

const { TableStatus } = require("../../enums");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Tables", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.STRING,
            },
            note: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: TableStatus.VALID,
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
        await queryInterface.dropTable("Tables");
    },
};
