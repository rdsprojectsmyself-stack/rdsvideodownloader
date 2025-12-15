import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// --- Configuration ---
// REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
    // TODO: Add your Firebase Config Here
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_APP.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
};

// Backend URL (Update after deploying backend to Render)
const BACKEND_URL = "https://your-backend-app.onrender.com";

// --- Initialize Firebase ---
let app, auth;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
} catch (e) {
    console.warn("Firebase config not set.");
}

// --- DOM Elements ---
const authOverlay = document.getElementById('auth-overlay');
const loginBtn = document.getElementById('google-login-btn');
const appContent = document.getElementById('app-content');
const downloadBtn = document.getElementById('download-btn');
const statusArea = document.getElementById('status-area');
const statusText = document.getElementById('status-text');
const loader = document.getElementById('loader');
const downloadLink = document.getElementById('download-link');

// --- Auth Logic ---
loginBtn.addEventListener('click', async () => {
    if (!auth) return alert("Firebase config missing!");
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login failed", error);
        alert("Login failed: " + error.message);
    }
});

if (auth) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User signed in
            authOverlay.style.display = 'none';
            appContent.style.opacity = '1';
        } else {
            // User signed out
            authOverlay.style.display = 'flex';
            appContent.style.opacity = '0';
        }
    });
}

// --- Download Logic ---
downloadBtn.addEventListener('click', async () => {
    const url = document.getElementById('video-url').value.trim();
    const format = document.getElementById('format-select').value;
    const trimStart = document.getElementById('trim-start').value;
    const trimEnd = document.getElementById('trim-end').value;

    if (!url) return alert("Please enter a valid URL");

    // UI Reset
    statusArea.classList.remove('hidden');
    loader.classList.remove('hidden');
    downloadLink.classList.add('hidden');
    statusText.textContent = "Processing... this may take a moment.";
    downloadBtn.disabled = true;

    try {
        // Call Backend API
        const response = await fetch(`${BACKEND_URL}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                format,
                trimStart,
                trimEnd
            })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Download failed");

        // Success
        loader.classList.add('hidden');
        statusText.textContent = "Ready!";
        downloadLink.href = data.downloadUrl; // Backend should return a signed URL or stream link
        downloadLink.classList.remove('hidden');

        // Auto trigger click (optional)
        // downloadLink.click();

    } catch (error) {
        loader.classList.add('hidden');
        statusText.textContent = "Error: " + error.message;
    } finally {
        downloadBtn.disabled = false;
    }
});
