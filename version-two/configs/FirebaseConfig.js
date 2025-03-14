import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8DMyMv0oCNztUHrT9e11mSROPlfEpjUo",
  authDomain: "travelling-sathi.firebaseapp.com",
  projectId: "travelling-sathi",
  storageBucket: "travelling-sathi.firebasestorage.app",
  messagingSenderId: "852272250087",
  appId: "1:852272250087:web:a82e97e2bc6d36a7853642",
  measurementId: "G-SCRXLYXEYG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)