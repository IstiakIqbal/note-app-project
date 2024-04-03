// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHGozMAJ5NYuamUAw3r-IeD0XKiFc2Isg",
  authDomain: "test-c9894.firebaseapp.com",
  projectId: "test-c9894",
  storageBucket: "test-c9894.appspot.com",
  messagingSenderId: "1078320187969",
  appId: "1:1078320187969:web:5cfdbb8654d93cae0394c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)