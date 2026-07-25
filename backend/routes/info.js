const express = require("express");
const router = express.Router();
const { extractVideo } = require("../services/ytdlp");

router.post("/info", async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                error: "URL is required"
            });
        }

        const video = await extractVideo(url);

        res.json({
            success: true,
            video
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: "Unable to analyze video"
        });

    }

});

module.exports = router;