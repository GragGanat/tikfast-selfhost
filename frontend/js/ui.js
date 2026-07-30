/******************************************************************
 *
 * TikFast Home
 * UI Module
 *
 ******************************************************************/

import { state } from "./state.js";
import { API } from "./api.js";
import { formatDuration } from "./utils.js";

export const UI = {

    //--------------------------------------------------
    // Loading
    //--------------------------------------------------

    showLoading() {

        state.loading = true;

        dom.loading.classList.remove("hidden");

        dom.resultCard.classList.add("hidden");

        dom.analyzeBtn.disabled = true;

        dom.analyzeBtn.textContent = "Analyzing Media...";

    },



    hideLoading() {

        state.loading = false;

        dom.loading.classList.add("hidden");

        dom.analyzeBtn.disabled = false;

        dom.analyzeBtn.textContent = "Analyze Media";

    },



    //--------------------------------------------------
    // Render Media
    //--------------------------------------------------

    renderMedia(media) {

        state.media = media;

        dom.videoTitle.textContent =
            media.title || "Unknown Title";

        dom.videoAuthor.textContent =
            `Creator: ${media.author}`;

        dom.mediaPlatform.textContent =
            `Platform: ${media.platform}`;

        dom.videoDuration.textContent =
            `Duration: ${formatDuration(media.duration)}`;

        dom.videoPlayer.poster =
            media.thumbnail;

        dom.videoPlayer.src =
            API.getStreamUrl(media);

        dom.resultCard.classList.remove("hidden");

    },



    //--------------------------------------------------
    // Reset
    //--------------------------------------------------

    reset() {

        state.media = null;

        dom.urlInput.value = "";

        dom.videoPlayer.pause();

        dom.videoPlayer.removeAttribute("src");

        dom.videoPlayer.load();

        dom.videoPlayer.poster = "";

        dom.videoTitle.textContent = "";

        dom.videoAuthor.textContent = "";

        dom.mediaPlatform.textContent = "";

        dom.videoDuration.textContent = "";

        dom.resultCard.classList.add("hidden");

        this.hideLoading();

    },



    //--------------------------------------------------
    // Error
    //--------------------------------------------------

    showError(message) {

        alert(message);

    },



    //--------------------------------------------------
    // Success
    //--------------------------------------------------

    showSuccess(message) {

        console.log(message);

    },



    //--------------------------------------------------
    // Download
    //--------------------------------------------------

    downloadVideo() {

        if (!state.media)
            return;

        window.open(
            API.getDownloadUrl(state.media),
            "_blank"
        );

    },



    //--------------------------------------------------
    // Audio
    //--------------------------------------------------

    downloadAudio() {

        if (!state.media)
            return;

        window.open(
            API.getAudioUrl(state.media),
            "_blank"
        );

    }

};

Object.freeze(UI);