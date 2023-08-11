// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtOcQ_2HXpR4IVKJn4vkEsgjrj34kkqCY",
    authDomain: "react-firebase-chat-app-17747.firebaseapp.com",
    projectId: "react-firebase-chat-app-17747",
    storageBucket: "react-firebase-chat-app-17747.appspot.com",
    messagingSenderId: "344107541755",
    appId: "1:344107541755:web:c33963a5912851d2b9bc5e",
    measurementId: "G-QEE6Y5R524",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
