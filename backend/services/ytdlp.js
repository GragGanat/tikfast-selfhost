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

        const AppError = require("../utils/AppError");

        throw new AppError(
            "Failed to retrieve video information.",
            500
        );

    }

}

async function streamDownload(url, res) {

    const subprocess = execa("yt-dlp", [
        "-o",
        "-",
        "--quiet",
        "--no-part",
        url
    ]);

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="video.mp4"'
    );

    res.setHeader(
        "Content-Type",
        "application/octet-stream"
    );

    subprocess.stdout.pipe(res);

    await subprocess;

}

module.exports = {
    extractVideo,
    streamDownload
};