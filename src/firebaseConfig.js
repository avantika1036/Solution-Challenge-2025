import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBg-KbvgzuC0JOE-BLLb03BcTD1U2EsYIo",
    authDomain: "solution-challenge-2025-58ad5.firebaseapp.com",
    projectId: "solution-challenge-2025-58ad5",
    storageBucket: "solution-challenge-2025-58ad5.firebasestorage.app",
    messagingSenderId: "316186448341",
    appId: "1:316186448341:web:1cb4ca3dcfe90c6173ed5c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
