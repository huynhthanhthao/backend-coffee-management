module.exports.transformer = function (result) {
    return {
        status: 200,
        message: "Gọi API thành công.",
        data: result,
    };
};
