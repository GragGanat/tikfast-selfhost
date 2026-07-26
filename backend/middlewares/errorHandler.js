const config = require("../config");

module.exports = function errorHandler(err, req, res, next) {

    console.error(err);

    const response = {
        success: false,
        error: err.message || "Internal Server Error"
    };

    if (config.nodeEnv === "development") {
        response.stack = err.stack;
    }

    res
        .status(err.statusCode || 500)
        .json(response);

};