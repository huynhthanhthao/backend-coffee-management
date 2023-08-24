const { transformer } = require("../../utils/server");
const ProductTypeService = require("../services/productType.service");

const productTypeService = new ProductTypeService();

class ProductTypeController {
    async createProductType(productType) {
        return transformer(await productTypeService.createProductType(productType));
    }

    async getProductTypes() {
        return transformer(await productTypeService.getProductTypes());
    }
}

module.exports = ProductTypeController;
