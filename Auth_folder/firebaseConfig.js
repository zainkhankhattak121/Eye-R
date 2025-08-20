// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDM9DFDYdv9wAgXCWz-E-1fgkAjrBa56Bs",
  authDomain: "with-camera.firebaseapp.com",
  projectId: "with-camera",
  storageBucket: "with-camera.firebasestorage.app",
  messagingSenderId: "727795324833",
  appId: "1:727795324833:android:517a4e4b0d7289d3ab9de0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { auth, googleProvider, db }; // Export db for Firestore
