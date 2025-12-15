import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDF29KhztlUDdXl9GeIQtnrmNQK6oEIPgs",
    authDomain: "universalvideodownloader-66e50.firebaseapp.com",
    projectId: "universalvideodownloader-66e50",
    storageBucket: "universalvideodownloader-66e50.firebasestorage.app",
    messagingSenderId: "696924429772",
    appId: "1:696924429772:web:9d57a1df0d99b6f954d169"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
