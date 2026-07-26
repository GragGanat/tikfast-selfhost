const { extractVideo } = require("../services/ytdlp");

async function getVideoInfo(req, res) {

    const video = await extractVideo(req.body.url);

    res.json({
        success: true,
        video
    });

}

module.exports = {
    getVideoInfo
};