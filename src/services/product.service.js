const { Op } = require("sequelize");
const db = require("../models");
const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");
const { ProductStatus } = require("../../enums");

class ProductService {
    async createProduct(product) {
        // Simple validation
        if (!product.name) {
            throw new CatchException({
                response: { status: HttpStatus.default.BAD_REQUEST },
                message: "Vui lòng nhập tên sản phẩm.",
            });
        }

        await db.Product.create(product);
        return {};
    }

    async getProducts(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;

        const data = await db.Product.findAll({
            where: {
                status: {
                    [Op.eq]: ProductStatus.VALID,
                },
            },
            limit,
            offset,
        });

        return data;
    }

    async deleteProduct(params) {
        await db.Product.destroy({
            where: {
                id: params.id,
            },
        });

        return {};
    }
}

module.exports = ProductService;
