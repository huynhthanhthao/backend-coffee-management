const { Op } = require("sequelize");
const db = require("../models");
const HttpStatus = require("http-status-codes");
const { CatchException } = require("../../utils/ApiError");
const { ProductStatus, ToppingStatus, OrderType, OrderStatus, TableStatus } = require("../../enums");
const BillService = require("../services/bill.service");
const TableService = require("./table.service");
const billService = new BillService();
const tableService = new TableService();

class OrderService {
    calculateTotal(productList) {
        const total = productList.reduce((currentTotal, productItem) => {
            const basePrice = parseFloat(productItem.product.price);
            const toppingPrice = productItem.topping ? parseFloat(productItem.topping.price) : 0;
            return (basePrice + toppingPrice) * productItem.amount + currentTotal;
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

                let toppingDetail;

                if (productItem.toppingId) {
                    toppingDetail = await db.Topping.findOne({
                        where: {
                            status: {
                                [Op.eq]: ToppingStatus.VALID,
                            },
                            id: productItem.toppingId,
                        },
                        attributes: ["id", "name", "price"],
                    });
                }

                return {
                    product: productDetail.dataValues,
                    topping: toppingDetail?.dataValues,
                    amount: productItem.amount,
                };
            })
        );
    }

    async createOrder(order) {
        // Simple validation
        if (!order || !order?.productList) {
            throw new CatchException({
                response: { status: 400 },
                message: "Thiếu dữ liệu.",
            });
        }

        // Kiểm tra bàn có khả dụng
        const table = await tableService.getTableById({ id: order.tableId });

        if (!table)
            throw new CatchException({
                response: { status: 400 },
                message: "Bàn không hợp lệ hoặc đang được sử dụng.",
            });

        const productList = await this.getProductListDetail(order.productList);

        const total = this.calculateTotal(productList, order.amount);

        if (total !== parseFloat(order.total))
            throw new CatchException({
                response: { status: 400 },
                message: "Tổng tiền không hợp lệ.",
            });

        await Promise.all([
            db.Order.create(order),
            tableService.updateTableStatus({ tableId: order.tableId, status: TableStatus.INVALID }),
        ]);

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
                exclude: ["tableId"],
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
                billService.createBill({ orderDetail: order, employee, orderId: order.id, total: order.total }),
                tableService.updateTableStatus({ tableId: order.table.id, status: TableStatus.VALID }),
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
