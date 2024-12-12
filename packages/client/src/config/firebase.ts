/* eslint-disable import/no-namespace */
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  databaseURL: 'fake-database-url',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-sender-id',
  appId: 'fake-app-id',
  measurementId: 'fake-measurement-id',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Disable analytics for local development
export const analytics = {
  logEvent: (...args: any[]) => console.log('Analytics Event:', ...args),
  setCurrentScreen: (...args: any[]) => console.log('Set Current Screen:', ...args),
  setUserId: (...args: any[]) => console.log('Set User ID:', ...args)
} as any

export { firebase }
