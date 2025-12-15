FROM node:18-slim

# Install system dependencies (Python, FFmpeg, curl)
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg curl && \
    apt-get clean

# Install yt-dlp (latest)
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# App Directory
WORKDIR /app

# Install Node deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Environment
ENV PORT=10000
EXPOSE 10000

# Start
CMD ["node", "server.js"]
