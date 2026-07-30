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

router.get(
    "/download",
    download
);

module.exports = router;