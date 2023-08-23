const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const productController = new ProductController();

/* Create product. */
router.post("/", async function (req, res, next) {
    const data = await productController.createProductType(req.body);
    return res.json(data);
});

/* Get product. */
router.get("/", async function (req, res, next) {
    const data = await productController.getProductTypes();
    return res.json(data);
});

/* delete product. */
router.delete("/", async function (req, res, next) {
    const data = await productController.deleteProduct(req.body);
    return res.json(data);
});

module.exports = router;
