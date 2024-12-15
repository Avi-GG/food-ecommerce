import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBdOFockT6NqtQTMLc0vc0fCXUjrUmL6cI",
    authDomain: "food-app-16d04.firebaseapp.com",
    projectId: "food-app-16d04",
    storageBucket: "food-app-16d04.firebasestorage.app",
    messagingSenderId: "235064382378",
    appId: "1:235064382378:web:84a90142e1c909bf6491d3",
    measurementId: "G-5K15D9L8H3"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;