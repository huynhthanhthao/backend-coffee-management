const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");

const { Op } = require("sequelize");
const db = require("../models");
const { ToppingStatus } = require("../../enums");

class ToppingService {
    async createTopping(topping) {
        // Simple validation
        if (!topping.name) {
            throw new CatchException({
                response: { status: HttpStatus.default.BAD_REQUEST },
                message: "Vui lòng nhập tên topping.",
            });
        }
        await db.Topping.create(topping);
        return {};
    }

    async getToppings(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;

        const data = await db.Topping.findAll({
            where: {
                status: {
                    [Op.eq]: ToppingStatus.VALID,
                },
            },
            limit,
            offset,
        });

        return data;
    }

    async deleteTopping(params) {
        console.log(params);
        await db.Topping.destroy({
            where: {
                id: params.id,
            },
        });

        return {};
    }
}

module.exports = ToppingService;
