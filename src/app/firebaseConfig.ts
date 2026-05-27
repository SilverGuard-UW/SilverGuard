import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnXnrpIu_pA83cyJHT2fmcGc70sdi15MM",
  authDomain: "silverguard-2be13.firebaseapp.com",
  projectId: "silverguard-2be13",
  storageBucket: "silverguard-2be13.firebasestorage.app",
  messagingSenderId: "556448295436",
  appId: "1:556448295436:web:70ad82d1031017d8429c29",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
