const ApiError = require("../../utils/ApiError");
const ProductService = require("../services/product.service");

const productService = new ProductService();

class ProductController {
    async createProduct(product) {
        return await productService.createProduct(product);
    }

    async getProducts(params) {
        return await productService.getProducts(params);
    }

    async deleteProduct(params) {
        return await productService.deleteProduct(params);
    }
}

module.exports = ProductController;
