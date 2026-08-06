const { Readable } = require("stream");
const AppError = require("../utils/AppError");

const API_URL = "https://www.tikwm.com/api/";

async function extractVideo(url) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            url
        })
    });

    if (!response.ok) {
        throw new AppError(
            "TikWM request failed.",
            500
        );
    }

    const json = await response.json();

    if (!json.data) {
        throw new AppError(
            "TikWM returned no data.",
            500
        );
    }

    return {

        title:
            json.data.title,

        author:
            json.data.author?.nickname ||
            "Unknown",

        thumbnail:
            json.data.cover,

        duration:
            json.data.duration,

        platform:
            "TikWM",

        originalUrl:
            url,

        downloadUrl:
        `/api/download?url=${encodeURIComponent(url)}`,

        videoUrl:
            json.data.play,

        musicUrl:
            json.data.music

    };

}

async function streamDownload(url, res) {

    console.log("TikWM streamDownload called");

    const info = await extractVideo(url);

    const response = await fetch(info.videoUrl);

    if (!response.ok) {
        throw new AppError(
            "Failed to download from TikWM.",
            500
        );
    }

    res.setHeader(
        "Content-Disposition",
        `attachment; filename*=UTF-8''${encodeURIComponent(info.title)}.mp4`
    );

    res.setHeader(
        "Content-Type",
        "video/mp4"
    );

    Readable.fromWeb(response.body).pipe(res);

}

module.exports = {
    extractVideo,
    streamDownload
};