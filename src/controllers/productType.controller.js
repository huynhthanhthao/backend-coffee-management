const ProductTypeService = require("../services/productType.service");

const productTypeService = new ProductTypeService();

class ProductTypeController {
    async createProductType(productType) {
        return await productTypeService.createProductType(productType);
    }

    async getProductTypes() {
        return await productTypeService.getProductTypes();
    }
}

module.exports = ProductTypeController;
