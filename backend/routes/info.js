const express = require("express");

const router = express.Router();

const validateUrl = require("../middlewares/validateUrl");

const {
    getVideoInfo
} = require("../controllers/infoController");

router.post(
    "/info",
    validateUrl,
    getVideoInfo
);

module.exports = router;