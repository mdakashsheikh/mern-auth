// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3d67a.firebaseapp.com",
  projectId: "mern-auth-3d67a",
  storageBucket: "mern-auth-3d67a.appspot.com",
  messagingSenderId: "831631874611",
  appId: "1:831631874611:web:aa1b8d8bf1c2beb51d2146",
  measurementId: "G-4YQ24CPE4Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);