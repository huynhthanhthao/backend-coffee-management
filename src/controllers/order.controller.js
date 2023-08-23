const OrderService = require("../services/order.service");

const orderService = new OrderService();

class OrderController {
    async createOrder(order) {
        return await orderService.createOrder(order);
    }

    async getOrders() {
        return await orderService.getOrders();
    }

    async getOrderById() {
        return await orderService.getOrderById();
    }

    async deleteOrder(orderId) {
        return await orderService.deleteOrder(orderId);
    }

    async updateOrderStatus(order) {
        return await orderService.updateOrderStatus(order);
    }

    async updateOrderProduct(order) {
        return await orderService.updateOrderProduct(order);
    }
}

module.exports = OrderController;
