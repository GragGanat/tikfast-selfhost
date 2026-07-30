/******************************************************************
 *
 * TikFast Home
 * API Module
 *
 ******************************************************************/
import { CONFIG } from "./config.js";

export const API = {

    //--------------------------------------------------
    // Analyze Media
    //--------------------------------------------------

    async analyze(url) {

        const response = await fetch(

            `${CONFIG.API_BASE}/info`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    url
                })

            }

        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            throw new Error(

                data.error ||
                "Unable to analyze media."

            );

        }

        return data.video;

    },



    //--------------------------------------------------
    // Download URL
    //--------------------------------------------------

    getDownloadUrl(media) {

        return CONFIG.SERVER + media.downloadUrl;

    },



    //--------------------------------------------------
    // Stream URL
    //--------------------------------------------------

    getStreamUrl(media) {

        return CONFIG.SERVER + media.streamUrl;

    },



    //--------------------------------------------------
    // Audio URL
    //--------------------------------------------------

    getAudioUrl(media) {

        return CONFIG.SERVER + media.audioUrl;

    },



    //--------------------------------------------------
    // Health Check
    //--------------------------------------------------

    async health() {

        try {

            const response = await fetch(

                `${CONFIG.API_BASE}/health`

            );

            return response.ok;

        }

        catch {

            return false;

        }

    }

};

Object.freeze(API);