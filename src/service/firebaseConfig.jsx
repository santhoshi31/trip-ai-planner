// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.evn.VITE_GOOGLE_FIREBASE_API_KEY,
  authDomain: "wander-weaver.firebaseapp.com",
  projectId: "wander-weaver",
  storageBucket: "wander-weaver.firebasestorage.app",
  messagingSenderId: "507591936345",
  appId: "1:507591936345:web:41ad0ee001df1702922448",
  measurementId: "G-NFXMX3JZVJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);