const express = require("express");
const router = express.Router();

const productTypeRouter = require("../routes/productType");
const productRouter = require("../routes/product");
const tableRouter = require("../routes/table");
const toppingRouter = require("../routes/topping");
const orderRouter = require("../routes/order");
const billRouter = require("../routes/bill");

router.use("/product-type", productTypeRouter);

router.use("/product", productRouter);

router.use("/table", tableRouter);

router.use("/topping", toppingRouter);

router.use("/order", orderRouter);

router.use("/bill", billRouter);

module.exports = router;
