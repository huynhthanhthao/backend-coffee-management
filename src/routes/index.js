const express = require("express");
const router = express.Router();

const productTypeRouter = require("../routes/productType");

router.use("/product-type", productTypeRouter);

module.exports = router;
