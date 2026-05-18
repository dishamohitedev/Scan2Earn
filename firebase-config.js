// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1w9R3bLBEf4eAJL9wiNHbmn183IPBtrk",
  authDomain: "scan2earn-771b6.firebaseapp.com",
  projectId: "scan2earn-771b6",
  storageBucket: "scan2earn-771b6.firebasestorage.app",
  messagingSenderId: "511366033486",
  appId: "1:511366033486:web:6de6dd63e06088aac8131f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
};