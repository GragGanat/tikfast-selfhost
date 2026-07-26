const AppError = require("../utils/AppError");

module.exports = function validateUrl(req, res, next) {

    const { url } = req.body;

    if (!url) {
        return next(new AppError("URL is required", 400));
    }

    try {
        new URL(url);
    } catch {
        return next(new AppError("Invalid URL", 400));
    }

    next();
};