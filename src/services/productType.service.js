const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");

const db = require("../models");

class ProductService {
    async createProductType(productType) {
        // Simple validate
        if (!productType.name)
            throw new CatchException({
                response: { status: HttpStatus.default.BAD_REQUEST },
                message: "Vui lòng nhập tên loại sản phẩm",
            });

        await db.ProductType.create(productType);

        return {};
    }

    async getProductTypes() {
        const data = await db.ProductType.findAll();

        return data;
    }
}

module.exports = ProductService;
