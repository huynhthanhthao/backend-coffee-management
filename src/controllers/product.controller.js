const ProductService = require("../services/product.service");

const productService = new ProductService();

class ProductController {
    async createProduct(product) {
        return await productService.createProduct(product);
    }

    async getProduct() {
        return await productService.getProduct();
    }

    async deleteProduct(productId) {
        return await productService.deleteProduct(productId);
    }
}

module.exports = ProductController;
