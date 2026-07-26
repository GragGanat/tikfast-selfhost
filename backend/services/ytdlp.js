const { execa } = require("execa");

async function extractVideo(url) {

    try {

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

    } catch {

        throw new Error("Failed to retrieve video information.");

    }

}

module.exports = {
    extractVideo
};