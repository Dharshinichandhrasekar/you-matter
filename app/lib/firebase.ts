import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9dFOxw_4evwkBtbFs_rlfZ4BgU1UozC8",
  authDomain: "youmatter-web-662bd.firebaseapp.com",
  projectId: "youmatter-web-662bd",
  storageBucket: "youmatter-web-662bd.firebasestorage.app",
  messagingSenderId: "448810548399",
  appId: "1:448810548399:web:3491bddc8f9bb8b015a85a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { localCache: persistentLocalCache() });