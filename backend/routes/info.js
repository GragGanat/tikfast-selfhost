const express = require("express");
const router = express.Router();

const { extractVideo } = require("../services/ytdlp");
const validateUrl = require("../middlewares/validateUrl");

router.post("/info", validateUrl, async (req, res) => {

    const video = await extractVideo(req.body.url);

    res.json({
        success: true,
        video
    });

});

module.exports = router;