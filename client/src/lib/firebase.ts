import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// TODO: Replace with your Firebase config from Firebase Console
// Go to Project Settings (gear icon) > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSQV_dmz7kjvKlNkpKmabLM8NdvE7Fn5M",
  authDomain: "portfolio-edu-app.firebaseapp.com",
  projectId: "portfolio-edu-app",
  storageBucket: "portfolio-edu-app.firebasestorage.app",
  messagingSenderId: "931843077358",
  appId: "1:931843077358:web:d5fc13ee173b37fcb06fff",
  measurementId: "G-7H997GKYGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app; 