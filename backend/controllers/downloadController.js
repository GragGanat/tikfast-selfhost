const { execa } = require("execa");

async function download(req, res) {

    const { url } = req.body;

    const { stdout } = await execa("yt-dlp", [
        "--get-title",
        url
    ]);

    res.json({
        success: true,
        message: "Download preparation successful",
        title: stdout.trim()
    });

}

module.exports = {
    download
};