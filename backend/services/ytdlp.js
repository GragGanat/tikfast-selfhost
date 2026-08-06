const fs = require("fs");
const path = require("path");
const sanitizeFilename = require("../utils/filename");
const { execa } = require("execa");
const { spawn } = require("child_process");
const AppError = require("../utils/AppError");

async function extractVideo(url) {

    try {

        const { stdout } = await execa("yt-dlp", [
            "-J",
            url
        ]);

        const info = JSON.parse(stdout);

        return {

            title: info.title,
        
            author:
                info.uploader ||
                info.channel ||
                "Unknown",
        
            thumbnail:
                info.thumbnail,
        
            duration:
                info.duration,
        
            platform:
                info.extractor,
        
            originalUrl:
                info.webpage_url,
        
            streamUrl:
                `/api/stream?url=${encodeURIComponent(info.webpage_url)}`,
        
            downloadUrl:
                `/api/download?url=${encodeURIComponent(info.webpage_url)}`,
        
            audioUrl:
                `/api/audio?url=${encodeURIComponent(info.webpage_url)}`
        
        };

    } catch (err) {

        console.error("===== yt-dlp ERROR =====");
        console.error(err);
    
        if (err.stdout) {
            console.error("STDOUT:");
            console.error(err.stdout);
        }
    
        if (err.stderr) {
            console.error("STDERR:");
            console.error(err.stderr);
        }
    
        throw new AppError(
            "Failed to retrieve video information.",
            500
        );
    
    }

}

async function streamVideo(url, res, download = false) {

    let filename = "video";

    try {
        const { stdout } = await execa("yt-dlp", [
            "-J",
            url
        ]);

        const info = JSON.parse(stdout);
        filename = sanitizeFilename(info.title || "video");
    } catch (err) {
        console.warn("Unable to retrieve title, using default filename.");
    }

    const yt = spawn("yt-dlp", [
        "-o",
        "-",
        "--quiet",
        "--no-part",
        url
    ]);

    if (download) {
        res.setHeader(
            "Content-Disposition",
            `attachment; filename*=UTF-8''${encodeURIComponent(filename)}.mp4`
        );
    } else {
        res.setHeader(
            "Content-Disposition",
            "inline"
        );
    }

    res.setHeader(
        "Content-Type",
        "video/mp4"
    );

    yt.stdout.pipe(res);

    yt.stderr.on("data", data => {
        console.error(data.toString());
    });

    yt.on("close", code => {
        console.log("yt-dlp exited:", code);
    });

}

async function streamDownload(url, res) {

    const downloadId = Date.now().toString();

    const output = path.join(
        __dirname,
        "../temp",
        `${downloadId}.%(ext)s`
    );

    console.log("Starting high-quality download...");

    try {

        const { stdout, stderr } = await execa("yt-dlp", [
            "-f",
            "bestvideo+bestaudio/best",
            "--merge-output-format",
            "mp4",
            "-o",
            output,
            url
        ]);

        if (stdout) {
            console.log(stdout);
        }

        if (stderr) {
            console.log(stderr);
        }

        console.log("Download and merge completed.");

        const inputFile = path.join(
            __dirname,
            "../temp",
            `${downloadId}.mp4`
        );

        const outputFile = inputFile.replace(
            ".mp4",
            ".aac.mp4"
        );

        console.log("Converting audio to AAC...");

        await execa("ffmpeg", [
            "-y",
            "-i",
            inputFile,
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            outputFile
        ]);

        console.log("AAC conversion completed.");

        console.log("Sending:", outputFile);

        res.download(outputFile, err => {

            fs.unlink(inputFile, () => {});
            fs.unlink(outputFile, () => {});

            if (err) {
                console.error(err);
            }

        });

    } catch (err) {

        console.error("High-quality download failed.");

        if (err.stderr) {
            console.error(err.stderr);
        }

        throw new AppError(
            "Failed to download high-quality video.",
            500
        );

    }

}

async function streamPreview(url, res) {
    return streamVideo(url, res, false);
}

module.exports = {
    extractVideo,
    streamDownload,
    streamPreview
};