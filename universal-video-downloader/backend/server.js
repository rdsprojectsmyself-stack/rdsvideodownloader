const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Universal Video Downloader Backend is Running');
});

// Download API
app.post('/api/download', async (req, res) => {
    const { url, format, trimStart, trimEnd } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const uniqueId = Date.now();
        const outputName = `download_${uniqueId}`;
        const outputDir = path.join(__dirname, 'downloads');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        let cmd = '';

        if (format === 'mp3') {
            // Audio Download & Convert
            // yt-dlp -x --audio-format mp3 -o "downloads/output.%(ext)s" URL
            // Adding trimming via post-processor would be complex with standard CLI, 
            // so we download first then use ffmpeg if trimming is requested.

            const rawOutput = path.join(outputDir, `${outputName}.mp3`);

            // Basic download command
            cmd = `yt-dlp -x --audio-format mp3 -o "${path.join(outputDir, outputName + '.%(ext)s')}" "${url}"`;

            // Execute yt-dlp
            await executeCommand(cmd);

            let finalFile = rawOutput;

            // Optional: Trim Logic
            if (trimStart || trimEnd) {
                const trimmedFile = path.join(outputDir, `${outputName}_trimmed.mp3`);

                let ffmpegArgs = [];
                if (trimStart) ffmpegArgs.push(`-ss ${trimStart}`);
                if (trimEnd) ffmpegArgs.push(`-to ${trimEnd}`);

                const trimCmd = `ffmpeg -i "${rawOutput}" ${ffmpegArgs.join(' ')} -c copy "${trimmedFile}"`;
                await executeCommand(trimCmd);

                // Cleanup raw file
                if (fs.existsSync(rawOutput)) fs.unlinkSync(rawOutput);
                finalFile = trimmedFile;
            }

            // Stream file back
            return res.download(finalFile, 'audio.mp3', (err) => {
                // Cleanup after download
                setTimeout(() => {
                    if (fs.existsSync(finalFile)) fs.unlinkSync(finalFile);
                }, 10000);
            });

        } else {
            // Video Download (MP4)
            // Note: yt-dlp best video+audio merge requires ffmpeg installed
            const rawOutput = path.join(outputDir, `${outputName}.mp4`);
            cmd = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "${path.join(outputDir, outputName + '.%(ext)s')}" "${url}"`;

            await executeCommand(cmd);

            return res.download(rawOutput, 'video.mp4', (err) => {
                setTimeout(() => {
                    if (fs.existsSync(rawOutput)) fs.unlinkSync(rawOutput);
                }, 10000);
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Download failed or backend error", details: error.message });
    }
});

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Exec error: ${error}`);
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
