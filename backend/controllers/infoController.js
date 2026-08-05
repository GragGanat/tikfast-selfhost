const { extractVideo } = require("../services/media");

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