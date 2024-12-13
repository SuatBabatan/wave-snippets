/* eslint-disable import/no-namespace */
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'localhost',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || 'http://localhost:8080',
  projectId: 'demo-wave-snippets',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'demo-wave-snippets.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-ABCDEF123'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Connect to emulators
if (window.location.hostname === 'localhost') {
  // Configure Firestore emulator
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  });

  // For Firebase v7.x, we don't need to explicitly connect to Storage emulator
  // It will use the emulator automatically based on FIREBASE_STORAGE_EMULATOR_HOST environment variable

  // For Firebase v7.x, auth emulator is not directly supported
  // We'll use a mock implementation for auth
  const auth = firebase.auth();
  (auth as any).signInWithEmailAndPassword = async () => {
    console.log('Mock sign in - email functionality disabled');
    return Promise.resolve({
      user: {
        uid: 'mock-user-id',
        email: 'mock@example.com'
      }
    });
  };
}

// Disable analytics for local development
export const analytics = {
  logEvent: (...args: any[]) => console.log('Analytics Event:', ...args),
  setCurrentScreen: (...args: any[]) => console.log('Set Current Screen:', ...args),
  setUserId: (...args: any[]) => console.log('Set User ID:', ...args)
} as any

export { firebase }
