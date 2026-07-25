const { execa } = require("execa");

async function extractVideo(url) {

    const { stdout } = await execa("yt-dlp", [
        "-J",
        url
    ]);

    const info = JSON.parse(stdout);

    return {
        title: info.title,
        author: info.uploader || info.channel || "Unknown",
        thumbnail: info.thumbnail,
        duration: info.duration,
        platform: info.extractor,
        originalUrl: info.webpage_url
    };
}

module.exports = {
    extractVideo
};