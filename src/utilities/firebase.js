import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: "codeit-bd909.firebaseapp.com",
    projectId: "codeit-bd909",
    storageBucket: "codeit-bd909.appspot.com",
    messagingSenderId: "1019468243111",
    appId: "1:1019468243111:web:c4a952727459c01859fb82"
  };

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}
export const db = getFirestore(app)