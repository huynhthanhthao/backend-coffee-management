const Sequelize = require("sequelize");

class DatabaseConnection {
    static async connect() {
        const databaseName = "cafe_management";
        const username = "root";
        const password = null;
        const options = {
            host: "localhost",
            dialect: "mysql",
            logging: false,
        };

        const sequelize = new Sequelize(databaseName, username, password, options);

        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
}

module.exports = DatabaseConnection;
