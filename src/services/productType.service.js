const db = require("../../models/index");

const ApiError = require("../../utils/ApiError");

class ProductService {
    async createProductType(productType) {
        // Simple validate

        if (!productType.name) return new ApiError(400, "Vui lòng nhập tên loại sản phẩm.");

        const data = await db.productType.create(productType);

        return data;
    }

    async getProductTypes() {
        return "API OK";
    }
}

module.exports = ProductService;
