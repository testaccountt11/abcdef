import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential, 
  User 
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGUvHusPIg0PqJ-VYcq40pSkpfCmXkdAk",
  authDomain: "portfol-950a1.firebaseapp.com",
  projectId: "portfol-950a1",
  storageBucket: "portfol-950a1.firebasestorage.app",
  messagingSenderId: "533661111877",
  appId: "1:533661111877:web:f9ff2e252722192599752c",
  measurementId: "G-Z3THS5DL17"
};

// Logging for debug purposes - we'll remove this later
console.log("Firebase config (keys hidden):", { 
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? "*** exists ***" : "*** missing ***",
  appId: firebaseConfig.appId ? "*** exists ***" : "*** missing ***"
});

// Check if all required values are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.error("Missing Firebase configuration. Check your environment variables.");
}

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Use this for better mobile experience
export const signInWithGoogleRedirect = async (): Promise<never> => {
  return signInWithRedirect(auth, googleProvider) as never;
};

// Use this for desktop experience
export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

export const registerWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  return signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth };
