
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRHMzv5pUSBoGUjgk_9_tnS26tgsbytEY",
  authDomain: "trip-genie-dbf59.firebaseapp.com",
  projectId: "trip-genie-dbf59",
  storageBucket: "trip-genie-dbf59.appspot.com",
  messagingSenderId: "862491333607",
  appId: "1:862491333607:web:ab7c8b20ebc98fd39ae342",
  measurementId: "G-VDZ1SM5BGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);