// firebase-config.js — uses CDN imports (no bundler needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1W9R3bLBEf4eAJL9wiNHbmn183IPBtrk",
  authDomain: "scan2earn-771b6.firebaseapp.com",
  projectId: "scan2earn-771b6",
  storageBucket: "scan2earn-771b6.firebasestorage.app",
  messagingSenderId: "511366033486",
  appId: "1:511366033486:web:6de6dd63e06088aac8131f"
};

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