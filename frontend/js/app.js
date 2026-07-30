/******************************************************************
 *
 * TikFast Home
 * Main Application
 *
 ******************************************************************/

import { CONFIG } from "./config.js";
import { API } from "./api.js";
import { UI } from "./ui.js";

import {
    readClipboard,
    isValidUrl
} from "./utils.js";

const dom = {

    urlInput:
        document.getElementById("urlInput"),

    analyzeBtn:
        document.getElementById("analyzeBtn"),

    pasteBtn:
        document.getElementById("pasteBtn"),

    clearBtn:
        document.getElementById("clearBtn"),

    loading:
        document.getElementById("loading"),

    resultCard:
        document.getElementById("resultCard"),

    videoPlayer:
        document.getElementById("videoPlayer"),

    videoTitle:
        document.getElementById("videoTitle"),

    videoAuthor:
        document.getElementById("videoAuthor"),

    mediaPlatform:
        document.getElementById("mediaPlatform"),

    videoDuration:
        document.getElementById("videoDuration"),

    downloadVideoBtn:
        document.getElementById("downloadVideoBtn"),

    downloadAudioBtn:
        document.getElementById("downloadAudioBtn"),

    resetBtn:
        document.getElementById("resetBtn")

};

// Temporary bridge during migration
window.dom = dom;

document.addEventListener("DOMContentLoaded", () => {

    async function analyzeMedia() {

        const url = dom.urlInput.value.trim();

        if (!isValidUrl(url)) {

            UI.showError("Please enter a valid URL.");

            return;

        }

        try {

            UI.showLoading();

            const media = await API.analyze(url);

            UI.renderMedia(media);

        }

        catch (err) {

            console.error(err);

            UI.showError(err.message);

        }

        finally {

            UI.hideLoading();

        }

    }

    async function pasteClipboard() {

        const text = await readClipboard();

        if (text) {

            dom.urlInput.value = text;

        }

    }

    function clearInput() {

        dom.urlInput.value = "";

        dom.urlInput.focus();

    }

    function resetApp() {

        UI.reset();

    }

    dom.analyzeBtn.addEventListener("click", analyzeMedia);

    dom.pasteBtn.addEventListener("click", pasteClipboard);

    dom.clearBtn.addEventListener("click", clearInput);

    dom.resetBtn.addEventListener("click", resetApp);

    dom.downloadVideoBtn.addEventListener("click", () => UI.downloadVideo());

    dom.downloadAudioBtn.addEventListener("click", () => UI.downloadAudio());

    dom.urlInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            analyzeMedia();

        }

    });

    console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION}`);

});