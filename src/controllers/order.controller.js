const OrderService = require("../services/order.service");

const orderService = new OrderService();

class OrderController {
    async createOrder(order) {
        return await orderService.createOrder(order);
    }

    async getOrders(params) {
        return await orderService.getOrders(params);
    }

    async getOrderById(params) {
        return await orderService.getOrderById(params);
    }

    async deleteOrder(orderId) {
        return await orderService.deleteOrder(orderId);
    }

    async updateOrderStatus(params) {
        return await orderService.updateOrderStatus(params);
    }

    async updateOrderProduct(order) {
        return await orderService.updateOrderProduct(order);
    }
}

module.exports = OrderController;
