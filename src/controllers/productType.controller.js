const ApiError = require("../../utils/ApiError");
const ProductTypeService = require("../services/productType.service");

const productTypeService = new ProductTypeService();

class ProductTypeController {
    async createProductType(productType) {
        try {
            return await productTypeService.createProductType(productType);
        } catch (error) {
            return new ApiError(400, error);
        }
    }

    async getProductTypes() {
        return await productTypeService.getProductTypes();
    }
}

module.exports = ProductTypeController;
