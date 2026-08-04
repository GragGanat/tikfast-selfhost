function sanitizeFilename(title = "video") {
    return title
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "") // Remove invalid characters
        .replace(/\s+/g, " ")                  // Collapse multiple spaces
        .trim()
        .slice(0, 180);                        // Prevent extremely long names
}

module.exports = sanitizeFilename;