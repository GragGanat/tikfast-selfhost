const { streamDownload } = require("../services/ytdlp");

async function download(req, res) {

    await streamDownload(
        req.body.url,
        res
    );

}

module.exports = {
    download
};