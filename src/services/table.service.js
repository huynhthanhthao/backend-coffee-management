const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");

const { Op } = require("sequelize");
const db = require("../models");
const { TableStatus } = require("../../enums");

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

    async updateTableStatus(params) {
        await db.Table.update(
            {
                status: params.status,
            },
            {
                where: {
                    id: params.tableId,
                },
            }
        );
        return {};
    }

    async getTables(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;

        const data = await db.Table.findAll({
            limit,
            offset,
        });

        return data;
    }

    async getTableById(params) {
        console.log(1);
        const data = await db.Table.findOne({
            where: {
                status: {
                    [Op.eq]: TableStatus.VALID,
                },
                id: {
                    [Op.eq]: params.id,
                },
            },
        });
        console.log(2);

        return data;
    }
}

module.exports = TableService;
