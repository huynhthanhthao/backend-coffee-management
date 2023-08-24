const db = require("../models");

class BillService {
    async createBill(bill) {
        await db.Bill.create(bill);

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

    async getBillById() {
        return "API OK";
    }
}

module.exports = BillService;
