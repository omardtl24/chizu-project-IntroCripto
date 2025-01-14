// Import the functions you need from the SDKs you need
"use client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjChI4x-adcSls7UHI0iMXDaDs2cJ727w",
  authDomain: "chizu-444720.firebaseapp.com",
  projectId: "chizu-444720",
  storageBucket: "chizu-444720.firebasestorage.app",
  messagingSenderId: "213164254512",
  appId: "1:213164254512:web:2ef6924a400a03c90c54f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth,provider };