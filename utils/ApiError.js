class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }

    toJSON() {
        return {
            meta: {
                code: this.statusCode,
            },
            message: this.message,
        };
    }
}

module.exports = ApiError;
