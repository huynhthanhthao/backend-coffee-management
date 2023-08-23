const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const orderController = new OrderController();

/* Create order */
router.post("/", async function (req, res, next) {
    const data = await orderController.createOrder(req.body);
    return res.json(data);
});

/* Get order */
router.get("/", async function (req, res, next) {
    const data = await orderController.getOrders();
    return res.json(data);
});

/* Get order by id*/
router.get("/:id", async function (req, res, next) {
    const data = await orderController.getOrderById(req.params);
    return res.json(data);
});

/* delete order */
router.delete("/", async function (req, res, next) {
    const data = await orderController.deleteOrder(req.body);
    return res.json(data);
});

/* update order */
router.put("/:id/status", async function (req, res, next) {
    const data = await orderController.updateOrderStatus(req.body);
    return res.json(data);
});

/* update order */
router.put("/:id/product", async function (req, res, next) {
    const data = await orderController.updateOrderProduct(req.body);
    return res.json(data);
});

/* update order */
router.put("/:id/table", async function (req, res, next) {
    const data = await orderController.updateOrderProduct(req.body);
    return res.json(data);
});

module.exports = router;
