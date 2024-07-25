// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDANWFGj1RYmeABs0lXQ71KUkUjtCeFGdw",
  authDomain: "notes-app-1d1d9.firebaseapp.com",
  projectId: "notes-app-1d1d9",
  storageBucket: "notes-app-1d1d9.appspot.com",
  messagingSenderId: "839948420192",
  appId: "1:839948420192:web:0a2762c374a1d50913af05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();