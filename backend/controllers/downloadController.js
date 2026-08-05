const { streamDownload } = require("../services/media");
const AppError = require("../utils/AppError");

async function download(req, res) {

    const url =
        req.body?.url ||
        req.query?.url;

    if (!url) {
        throw new AppError(
            "URL is required",
            400
        );
    }

    await streamDownload(url, res);

}

module.exports = {
    download
};