// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClroCaw2AiCrJBujBp9yLhm_0vHGgnJ18",
  authDomain: "silverguard-83359.firebaseapp.com",
  projectId: "silverguard-83359",
  storageBucket: "silverguard-83359.firebasestorage.app",
  messagingSenderId: "354262470339",
  appId: "1:354262470339:web:e3323b8a88f5517030dc76",
  measurementId: "G-QCLNXX1FCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);