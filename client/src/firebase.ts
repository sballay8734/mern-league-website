// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-league-website.firebaseapp.com",
  projectId: "mern-league-website",
  storageBucket: "mern-league-website.appspot.com",
  messagingSenderId: "220532804503",
  appId: "1:220532804503:web:3b1c440cf0e533918292d2"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
