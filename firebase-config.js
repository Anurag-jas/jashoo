// 🔥 Firebase Imports
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔑 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCe9eJBO5rz3A6yX1H-L8Cs5pLwuwJt04Q",
  authDomain: "jasho-5e2bc.firebaseapp.com",
  projectId: "jasho-5e2bc",
  storageBucket: "jasho-5e2bc.firebasestorage.app",
  messagingSenderId: "45582946369",
  appId: "1:45582946369:web:11f3c2dd44d6d83e64f6c0",
  measurementId: "G-KLC0T97KFV"
};

// ✅ SINGLE INIT (No error)
const app = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApp();

// 🔥 Export
export const auth = getAuth(app);
export const db = getFirestore(app);