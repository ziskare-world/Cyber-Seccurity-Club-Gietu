// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ8SehqBBSbJsCvXai6RWOw-YszVytNXY",
  authDomain: "cyber-security-club-gietu.firebaseapp.com",
  databaseURL: "https://cyber-security-club-gietu-default-rtdb.firebaseio.com",
  projectId: "cyber-security-club-gietu",
  storageBucket: "cyber-security-club-gietu.firebasestorage.app",
  messagingSenderId: "605788102781",
  appId: "1:605788102781:web:d43bd2d909c78814b09114",
  measurementId: "G-KNQFKSPSQH"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    getAnalytics(app);
  }
}

export { app };
