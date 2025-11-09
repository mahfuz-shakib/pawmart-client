// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4z-SWZCrEWmXmXw_rdXO92Z4_Cu1wwKQ",
  authDomain: "pawmart-fullstack.firebaseapp.com",
  projectId: "pawmart-fullstack",
  storageBucket: "pawmart-fullstack.firebasestorage.app",
  messagingSenderId: "117153720045",
  appId: "1:117153720045:web:7190a6f6ae79ae40694ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);