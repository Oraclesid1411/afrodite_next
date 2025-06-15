// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtM-RWuVPGEi5VuZCkIdVyr8hECnaE1ys",
    authDomain: "afrodites-b90f4.firebaseapp.com",
    projectId: "afrodites-b90f4",
    storageBucket: "afrodites-b90f4.firebasestorage.app",
    messagingSenderId: "154913486548",
    appId: "1:154913486548:web:5767e21cd9e535bc4d6d41",
    measurementId: "G-1Q9PVM89SW"
  };

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// Initialisation de Firebase Analytics (optionnel)
let analytics;
try {
  analytics = getAnalytics(app);
  console.log("Firebase Analytics initialized successfully");
} catch (error) {
  console.error("Firebase Analytics initialization failed:", error.message);
}

// Initialisation de Firebase Cloud Messaging (FCM)
let messaging;
try {
  messaging = getMessaging(app);
  console.log("Firebase Messaging initialized successfully");
} catch (error) {
  console.error("Firebase Messaging initialization failed:", error.message);
}

// Exporter les fonctionnalités nécessaires
export { messaging, getToken, onMessage, analytics ,auth };
