const TableService = require("../services/table.service");

const tableService = new TableService();

class TableController {
    async createTable(table) {
        return await tableService.createTable(table);
    }

    async getTables(params) {
        return await tableService.getTables(params);
    }
}

module.exports = TableController;
