const { transformer } = require("../../utils/server");
const BillService = require("../services/bill.service");

const billService = new BillService();

class BillController {
    async createBill(Bill) {
        return transformer(await billService.createBill(Bill));
    }

    async getBills(params) {
        return transformer(await billService.getBills(params));
    }

    async getBillById() {
        return await billService.getBillById();
    }
}

module.exports = BillController;
