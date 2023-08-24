const { Op } = require("sequelize");
const db = require("../models");
const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");

const {} = require("../../utils/server");
const { ProductStatus, ToppingStatus, OrderType, OrderStatus } = require("../../enums");

const BillService = require("../services/bill.service");
const billService = new BillService();

class OrderService {
    calculateTotal(productList) {
        const total = productList.reduce((currentTotal, productItem) => {
            const totalTopping = productItem.toppingList.reduce((sum, topping) => sum + parseFloat(topping.price), 0);

            return (parseFloat(productItem.product.price) + totalTopping) * productItem.amount + currentTotal;
        }, 0);

        return total;
    }

    async getProductListDetail(productList) {
        return await Promise.all(
            productList.map(async (productItem) => {
                const productDetail = await db.Product.findOne({
                    where: {
                        status: {
                            [Op.eq]: ProductStatus.VALID,
                        },
                        id: productItem.productId,
                    },
                    attributes: ["id", "name", "price"],
                });

                if (!productDetail)
                    throw new CatchException({
                        response: { status: HttpStatus.default.NOT_FOUND },
                        message: "Sản phẩm không tồn tại.",
                    });
                const toppingListDetail = await db.Topping.findAll({
                    where: {
                        status: {
                            [Op.eq]: ToppingStatus.VALID,
                        },
                        id: productItem.toppingIds,
                    },
                    attributes: ["id", "name", "price"],
                });

                if (toppingListDetail.length !== productItem.toppingIds.length) {
                    throw new CatchException({
                        response: { status: HttpStatus.default.NOT_FOUND },
                        message: "Topping không tồn tại.",
                    });
                }

                return {
                    product: productDetail.dataValues,
                    toppingList: toppingListDetail.map((topping) => topping.dataValues),
                    amount: productItem.amount,
                };
            })
        );
    }

    async createOrder(order) {
        // Simple validation
        if (!order || !order?.productList || !order.tableId) {
            throw new CatchException({
                response: { status: 400 },
                message: "Thiếu dữ liệu.",
            });
        }

        const productList = await this.getProductListDetail(order.productList);

        const total = this.calculateTotal(productList, order.amount);

        if (total !== parseFloat(order.total))
            throw new CatchException({
                response: { status: 400 },
                message: "Tổng tiền không hợp lệ.",
            });
        await db.Order.create(order);
        return {};
    }

    async getOrders(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;
        const type = params.type;
        const status = params.status;

        const data = await db.Order.findAll({
            where: {
                type: type ? { [Op.eq]: type } : { [Op.not]: null },
                status: status ? { [Op.eq]: status } : { [Op.not]: null },
            },
            include: [
                {
                    model: db.Table,
                    as: "table",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            limit,
            offset,
            attributes: {
                exclude: ["tableId", "productList"],
            },
        });

        return data;
    }

    async getOrderById(params) {
        const order = await db.Order.findOne({
            where: {
                id: params.id,
            },
            include: [
                {
                    model: db.Table,
                    as: "table",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["tableId"],
            },
        });

        if (!order)
            throw new CatchException({
                response: { status: 400 },
                message: "Đơn hàng không tồn tại.",
            });

        const productList = await this.getProductListDetail(JSON.parse(order.dataValues.productList));

        return { ...order.dataValues, productList };
    }

    async deleteOrder(params) {
        return "API OK";
    }

    async updateOrderStatus(params) {
        if (!params.status)
            throw new CatchException({
                response: { status: 400 },
                message: "Không tìm thấy trạng thái.",
            });
        if (params.status == OrderStatus.PAID) {
            const order = await this.getOrderById(params);
            const employee = "Nguyen Van A";

            await Promise.all([
                billService.createBill({ order, employee }),
                db.Order.update(
                    { status: params.status },
                    {
                        where: {
                            id: params.id,
                        },
                    }
                ),
            ]);
        } else
            await db.Order.update(
                { status: params.status },
                {
                    where: {
                        id: params.id,
                    },
                }
            );

        return {};
    }

    async updateOrderProduct(order) {
        return "API OK";
    }
}

module.exports = OrderService;
