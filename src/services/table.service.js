const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");

const { Op } = require("sequelize");
const db = require("../models");

class TableService {
    async createTable(table) {
        // Simple validation
        if (!table.name) {
            throw new CatchException({
                response: { status: HttpStatus.default.BAD_REQUEST },
                message: "Vui lòng nhập số/tên bàn.",
            });
        }

        await db.Table.create(table);
        return {};
    }

    async getTables(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;

        const data = await db.Table.findAll({
            where: {
                status: {
                    [Op.gt]: 0,
                },
            },
            limit,
            offset,
        });

        return data;
    }
}

module.exports = TableService;
