const { streamPreview } = require("../services/ytdlp");
const AppError = require("../utils/AppError");

async function stream(req, res) {

    const url =
        req.query?.url ||
        req.body?.url;

    if (!url) {
        throw new AppError(
            "URL is required",
            400
        );
    }

    await streamPreview(url, res);

}

module.exports = {
    stream
};