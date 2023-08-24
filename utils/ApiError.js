const HttpStatus = require("http-status-codes");

class ExceptionResponse {
    constructor(status = HttpStatus.default.BAD_GATEWAY, message = "Dữ liệu không hợp lệ!", data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class CatchException extends ExceptionResponse {
    constructor(error) {
        super(error?.response?.status, error.message);
    }
}

module.exports = {
    ExceptionResponse,
    CatchException,
};
