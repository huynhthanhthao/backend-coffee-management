const express = require("express");
const router = express.Router();
const BillController = require("../controllers/bill.controller");
const billController = new BillController();

/* Create bill */
router.post("/", async function (req, res, next) {
    try {
        const data = await billController.createBill(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get bill */
router.get("/", async function (req, res, next) {
    const data = await billController.getBills(req.query);
    return res.json(data);
});

module.exports = router;
