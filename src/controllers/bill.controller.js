const BillService = require("../services/bill.service");

const billService = new BillService();

class BillController {
    async createBill(Bill) {
        return await billService.createBill(Bill);
    }

    async getBills() {
        return await billService.getBills();
    }

    async getBillById() {
        return await billService.getBillById();
    }
}

module.exports = BillController;
