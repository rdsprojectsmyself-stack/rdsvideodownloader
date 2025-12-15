# Universal Video Downloader (Full Stack)

A production-ready web application to download MP4 videos and MP3 audio (with trimming) from YouTube, Instagram, Facebook, and Twitter.

## Project Structure
- `frontend/`: Static site (HTML/CSS/JS). Deploy to Netlify.
- `backend/`: Node.js Express API. Deploy to Render (Docker).

## Deployment Guide

### 1. Backend Deployment (Render)
1. Push this repo to GitHub.
2. Sign up/Login to [Render](https://render.com).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repo.
5. **Important Configuration**:
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Plan**: Free
6. Click **Create Web Service**.
7. Wait for deployment. Copy the **Service URL** (e.g., `https://universal-video-downloader-xooi.onrender.com`).

### 2. Frontend Configuration
1. Open `frontend/assets/js/app.js`.
2. Update `BACKEND_URL` with your Render Service URL.
3. Update `firebaseConfig` with your Firebase project keys (Enable Google Auth).

### 3. Frontend Deployment (Netlify)
1. Login to [Netlify](https://netlify.com).
2. Click **Add new site** -> **Import from Git**.
3. Select your repo.
4. **Build settings**:
   - **Base directory**: `frontend`
   - **Publish directory**: `frontend` (or leave blank if it defaults to base)
5. Deploy.

## Features
- **Frontend**: Glassmorphism UI, Google Auth, Platform Auto-detect.
- **Backend**: `yt-dlp` for downloads, `ffmpeg` for audio conversion/trimming.
- **Security**: CORS enabled, Temp file cleanup.

## Disclaimer
This tool is for educational purposes. Do not download copyrighted material.
"# onlinevideodownloader" 
