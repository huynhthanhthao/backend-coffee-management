const ApiError = require("../../utils/ApiError");
const ToppingService = require("../services/topping.service");

const toppingService = new ToppingService();

class ToppingController {
    async createTopping(topping) {
        return await toppingService.createTopping(topping);
    }

    async getToppings(params) {
        return await toppingService.getToppings(params);
    }

    async deleteTopping(params) {
        return await toppingService.deleteTopping(params);
    }
}

module.exports = ToppingController;
