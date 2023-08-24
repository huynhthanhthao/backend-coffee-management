const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const productController = new ProductController();

/* Create product. */
router.post("/", async function (req, res, next) {
    try {
        const data = await productController.createProduct(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get product. */
router.get("/", async function (req, res, next) {
    try {
        const data = await productController.getProducts(req.query);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* delete product. */
router.delete("/:id", async function (req, res, next) {
    try {
        const data = await productController.deleteProduct(req.params);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
