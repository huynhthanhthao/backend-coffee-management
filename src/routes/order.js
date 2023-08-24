const express = require("express");
const OrderController = require("../controllers/order.controller");
const orderController = new OrderController();
const router = express.Router();

/* Create order */
router.post("/", async function (req, res, next) {
    try {
        const data = await orderController.createOrder(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get order */
router.get("/", async function (req, res, next) {
    try {
        const data = await orderController.getOrders(req.query);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get order by id*/
router.get("/:id", async function (req, res, next) {
    try {
        const data = await orderController.getOrderById(req.params);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* delete order */
router.delete("/", async function (req, res, next) {
    try {
        const data = await orderController.deleteOrder(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* update order */
router.patch("/:id/status", async function (req, res, next) {
    try {
        const data = await orderController.updateOrderStatus({ ...req.body, ...req.params });
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* update order */
router.put("/:id/product", async function (req, res, next) {
    try {
        const data = await orderController.updateOrderProduct(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* update order */
router.put("/:id/table", async function (req, res, next) {
    try {
        const data = await orderController.updateOrderProduct(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
