import { initializeApp } from "firebase/app";
import {collection, getFirestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"
import {Item} from "../MobileFrontEnd/utils/interfaces";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const itemsConverter: FirestoreDataConverter<Item> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Item {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            added: data.added.toDate(), // Make sure 'added' is a Firebase Timestamp
            images: data.images
        };
    },
    toFirestore(item: Item): DocumentData {
        return {
            name: item.name,
            added: item.added,
            images: item.images
        };
    }
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const converterItemsCollection = collection(db, 'items').withConverter(itemsConverter);
export const itemsCollection = collection(db, 'items');
export const tagsCollection = collection(db, 'tags');
export const storage = getStorage(app);
export const auth = getAuth();

