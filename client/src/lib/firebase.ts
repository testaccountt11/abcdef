import { initializeApp } from 'firebase/app';
import { getAuth, browserPopupRedirectResolver, initializeAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Validate required environment variables
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing required Firebase configuration variables:', missingVars.join(', '));
  console.error('Please check your .env file and ensure all Firebase variables are set.');
}

// Initialize Firebase with available config
const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey || 'dummy-api-key',
  authDomain: requiredEnvVars.authDomain || 'dummy-auth-domain',
  projectId: requiredEnvVars.projectId || 'dummy-project-id',
  storageBucket: requiredEnvVars.storageBucket || 'dummy-storage-bucket',
  messagingSenderId: requiredEnvVars.messagingSenderId || 'dummy-sender-id',
  appId: requiredEnvVars.appId || 'dummy-app-id',
  measurementId: requiredEnvVars.measurementId || 'dummy-measurement-id'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics only if measurementId is available
export const analytics = requiredEnvVars.measurementId ? getAnalytics(app) : null;

// Initialize Firebase Authentication with custom config
export const auth = initializeAuth(app, {
  popupRedirectResolver: browserPopupRedirectResolver
});

export default app; 