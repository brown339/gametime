import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics requires window object
export const analytics =
  typeof window !== 'undefined'
    ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
    : null;

export const firestore = getFirestore(app);
