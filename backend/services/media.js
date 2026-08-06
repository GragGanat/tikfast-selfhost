function isTikTok(url) {
    return /tiktok\.com|vm\.tiktok\.com/i.test(url);
}

const tikwm = require("./tikwm");

const ytdlp = require("./ytdlp");

async function extractVideo(url) {

    if (isTikTok(url)) {
        return tikwm.extractVideo(url);
    }

    return ytdlp.extractVideo(url);

}

async function streamDownload(url, res) {

    if (isTikTok(url)) {
        return tikwm.streamDownload(url, res);
    }

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