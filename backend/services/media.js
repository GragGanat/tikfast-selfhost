const ytdlp = require("./ytdlp");

async function extractVideo(url) {
    return ytdlp.extractVideo(url);
}

async function streamDownload(url, res) {
    return ytdlp.streamDownload(url, res);
}

async function streamPreview(url, res) {
    return ytdlp.streamPreview(url, res);
}

module.exports = {
    extractVideo,
    streamDownload,
    streamPreview
};