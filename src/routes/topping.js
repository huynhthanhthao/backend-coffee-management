const express = require("express");
const ToppingController = require("../controllers/topping.controller");
const toppingController = new ToppingController();

/* Create topping */
router.post("/", async function (req, res, next) {
    const data = await toppingController.createTopping(req.body);
    return res.json(data);
});

/* Get topping */
router.get("/", async function (req, res, next) {
    const data = await toppingController.getTopping();
    return res.json(data);
});

module.exports = router;
