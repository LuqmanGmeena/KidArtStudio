// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgVs6FRdJwEDi4QLnm8sIpSr9kO7gTp4o",
  authDomain: "kid-art-studio.firebaseapp.com",
  projectId: "kid-art-studio",
  storageBucket: "kid-art-studio.firebasestorage.app",
  messagingSenderId: "633629529224",
  appId: "1:633629529224:web:9e189ef98535a956c1fb3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;