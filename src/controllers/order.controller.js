const { transformer } = require("../../utils/server");
const OrderService = require("../services/order.service");

const orderService = new OrderService();

class OrderController {
    async createOrder(order) {
        return transformer(await orderService.createOrder(order));
    }

    async getOrders(params) {
        return transformer(await orderService.getOrders(params));
    }

    async getOrderById(params) {
        return transformer(await orderService.getOrderById(params));
    }

    async deleteOrder(orderId) {
        return transformer(await orderService.deleteOrder(orderId));
    }

    async updateOrderStatus(params) {
        return transformer(await orderService.updateOrderStatus(params));
    }

    async updateOrderProduct(order) {
        return transformer(await orderService.updateOrderProduct(order));
    }
}

module.exports = OrderController;
