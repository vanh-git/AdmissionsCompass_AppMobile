import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const defaultFirebaseConfig = {
  apiKey: 'AIzaSyBLbkyC5-v_aGrTB1vFkfXpV3kReCZvg8k',
  authDomain: 'exe-labantuyensinh.firebaseapp.com',
  projectId: 'exe-labantuyensinh',
  storageBucket: 'exe-labantuyensinh.firebasestorage.app',
  messagingSenderId: '318816534338',
  appId: '1:318816534338:web:54c6343f0279446bac12db',
};

const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY ??
    process.env.VITE_FIREBASE_API_KEY ??
    defaultFirebaseConfig.apiKey,
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    process.env.VITE_FIREBASE_AUTH_DOMAIN ??
    defaultFirebaseConfig.authDomain,
  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ??
    process.env.VITE_FIREBASE_PROJECT_ID ??
    defaultFirebaseConfig.projectId,
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    process.env.VITE_FIREBASE_STORAGE_BUCKET ??
    defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ??
    defaultFirebaseConfig.messagingSenderId,
  appId:
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID ??
    process.env.VITE_FIREBASE_APP_ID ??
    defaultFirebaseConfig.appId,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  throw new Error(
    `Missing Firebase config values: ${missingKeys.join(', ')}.\n` +
      'Please add your Firebase credentials to mobile/.env.local or root .env.local and restart Expo.'
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
