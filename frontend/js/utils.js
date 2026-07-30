/******************************************************************
 *
 * TikFast Home
 * Utility Functions
 *
 ******************************************************************/

export function formatDuration(seconds) {

    if (!seconds || isNaN(seconds)) {
        return "Unknown";
    }

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${mins}:${String(secs).padStart(2, "0")}`;

}

export async function readClipboard() {

    try {

        return await navigator.clipboard.readText();

    } catch (err) {

        console.error(err);

        return "";

    }

}

export function isValidUrl(url) {

    try {

        new URL(url);

        return true;

    } catch {

        return false;

    }

}

export function detectPlatform(url) {

    const host = url.toLowerCase();

    if (host.includes("tiktok")) return "TikTok";
    if (host.includes("youtube") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("reddit")) return "Reddit";
    if (host.includes("twitter") || host.includes("x.com")) return "X";

    return "Unknown";

}

export function debounce(callback, delay = 300) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => callback(...args), delay);

    };

}