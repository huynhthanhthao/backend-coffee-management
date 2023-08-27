const db = require("../models");

class BillService {
    async createBill(bill) {
        const billExist = await this.getBillByOrderId({ id: bill.orderId });
        if (!billExist) await db.Bill.create(bill);

        return {};
    }

    async getBills(params) {
        const page = +params.page || 1;
        const limit = +params.limit || 20;
        const offset = (page - 1) * limit;

        const data = await db.Bill.findAll({
            limit,
            offset,
        });

        return data;
    }

    async getBillByOrderId(params) {
        const data = await db.Bill.findOne({
            where: {
                orderId: params.id,
            },
        });
        return data;
    }
}

module.exports = BillService;
