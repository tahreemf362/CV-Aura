import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if credentials are valid (not undefined and not empty)
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== '' &&
  firebaseConfig.authDomain
);

let app;
let auth: any;
const provider = new GoogleAuthProvider();

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
} else {
  // If not configured, we export a simulated auth driver
  console.warn("Firebase credentials not configured. CV Aura is falling back to simulated Auth for local development.");
  
  const listeners: ((user: any) => void)[] = [];
  let currentUser: any = null;

  // Restore session from localStorage if exists
  const storedUser = localStorage.getItem('aura_mock_user');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      currentUser = null;
    }
  }

  auth = {
    currentUser,
    onAuthStateChanged: (callback: (user: any) => void) => {
      listeners.push(callback);
      // Immediately run callback with current state
      setTimeout(() => callback(currentUser), 10);
      return () => {
        const idx = listeners.indexOf(callback);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    },
    // Mock methods for simulated login
    _simulateLogin: (mockUser: any) => {
      currentUser = mockUser;
      localStorage.setItem('aura_mock_user', JSON.stringify(mockUser));
      listeners.forEach((cb) => cb(currentUser));
    },
    _simulateLogout: () => {
      currentUser = null;
      localStorage.removeItem('aura_mock_user');
      listeners.forEach((cb) => cb(null));
    }
  };
}

export { auth, provider, isFirebaseConfigured };
export default auth;
