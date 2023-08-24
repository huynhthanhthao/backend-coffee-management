const express = require("express");
const router = express.Router();
const ProductTypeController = require("../controllers/productType.controller");
const productTypeController = new ProductTypeController();

/* Create product type. */
router.post("/", async function (req, res, next) {
    try {
        const data = await productTypeController.createProductType(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get product type. */
router.get("/", async function (req, res, next) {
    const data = await productTypeController.getProductTypes();
    return res.json(data);
});

module.exports = router;
