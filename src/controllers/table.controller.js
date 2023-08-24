const { transformer } = require("../../utils/server");
const TableService = require("../services/table.service");

const tableService = new TableService();

class TableController {
    async createTable(table) {
        return transformer(await tableService.createTable(table));
    }

    async getTables(params) {
        return transformer(await tableService.getTables(params));
    }
}

module.exports = TableController;
