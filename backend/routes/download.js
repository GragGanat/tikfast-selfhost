const express = require("express");

const router = express.Router();

const validateUrl = require("../middlewares/validateUrl");

const {
    download
} = require("../controllers/downloadController");

router.post(
    "/download",
    validateUrl,
    download
);

module.exports = router;