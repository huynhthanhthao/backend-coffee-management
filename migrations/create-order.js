"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("order", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            table: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "table",
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
            },
            type: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("order");
    },
};
