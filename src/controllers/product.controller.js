const { transformer } = require("../../utils/server");
const ProductService = require("../services/product.service");

const productService = new ProductService();

class ProductController {
    async createProduct(product) {
        return transformer(await productService.createProduct(product));
    }

    async getProducts(params) {
        return transformer(await productService.getProducts(params));
    }

    async deleteProduct(params) {
        return transformer(await productService.deleteProduct(params));
    }
}

module.exports = ProductController;
