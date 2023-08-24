const express = require("express");
const router = express.Router();
const ToppingController = require("../controllers/topping.controller");
const toppingController = new ToppingController();

/* Create topping */
router.post("/", async function (req, res, next) {
    try {
        const data = await toppingController.createTopping(req.body);
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

/* Get topping */
router.get("/", async function (req, res, next) {
    const data = await toppingController.getToppings(req.query);
    return res.json(data);
});

/* Delete topping */
router.delete("/:id", async function (req, res, next) {
    const data = await toppingController.deleteTopping(req.params);
    return res.json(data);
});

module.exports = router;
