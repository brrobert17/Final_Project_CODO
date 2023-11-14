import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const itemsCollection = collection(db, 'items');
export const storage = getStorage(app);
export const auth = getAuth();

