const express = require("express");
const TableController = require("../controllers/table.controller");
const router = express.Router();
const tableController = new TableController();

/* Create table. */
router.post("/", async function (req, res, next) {
    try {
        const data = await tableController.createTable(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get table. */
router.get("/", async function (req, res, next) {
    const data = await tableController.getTables(req.query);
    return res.json(data);
});

module.exports = router;
