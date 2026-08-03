FROM node:24-bookworm-slim

# -----------------------------
# Versions
# -----------------------------
ARG YTDLP_VERSION=2026.07.04

# -----------------------------
# System packages
# -----------------------------
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# Python virtual environment
# -----------------------------
RUN python3 -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

# -----------------------------
# Install pinned yt-dlp
# -----------------------------
RUN pip install --no-cache-dir yt-dlp==${YTDLP_VERSION}

# Verify installation
RUN yt-dlp --version

# -----------------------------
# Node application
# -----------------------------
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]