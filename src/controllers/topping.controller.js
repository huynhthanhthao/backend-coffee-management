const ApiError = require("../../utils/ApiError");
const { transformer } = require("../../utils/server");
const ToppingService = require("../services/topping.service");

const toppingService = new ToppingService();

class ToppingController {
    async createTopping(topping) {
        return transformer(await toppingService.createTopping(topping));
    }

    async getToppings(params) {
        return transformer(await toppingService.getToppings(params));
    }

    async deleteTopping(params) {
        return transformer(await toppingService.deleteTopping(params));
    }
}

module.exports = ToppingController;
