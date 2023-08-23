const TopppingService = require("../services/topping.service");

const topppingService = new TopppingService();

class ToppingController {
    async createTopping(topping) {
        return await topppingService.createTopping(topping);
    }

    async getTopping() {
        return await topppingService.getToppings();
    }
}

module.exports = ToppingController;
