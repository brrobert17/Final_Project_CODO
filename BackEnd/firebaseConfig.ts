import { initializeApp } from "firebase/app";
import {collection, getFirestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"
import {Item, ItemCore, TagOut} from "../MobileFrontEnd/utils/interfaces";
import {it} from "node:test";

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
            added: data.added.toDate(),
            img: data.img,
            price: data.price,
            description: data.description,
            wysiwyg: data.wysiwyg,
            stock: data.stock,
            category: data.category
        };
    },
    toFirestore(item: Item): DocumentData {
        return {
            name: item.name,
            added: item.added,
            img: item.img,
            price: item.price,
            description: item.description,
            wysiwyg: item.wysiwyg,
            stock: item.stock,
            category: item.category
        };
    }
};

const itemsCoreConverter: FirestoreDataConverter<ItemCore> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): ItemCore {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            price: data.price,
            img: data.img[0]
        };
    },
    toFirestore(item: ItemCore): DocumentData {
        return {
            name: item.name,
            img: item.img
        };
    }
};

const tagsConverter: FirestoreDataConverter<TagOut> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): TagOut {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            items: data.items
        };
    },
    toFirestore(tagging: TagOut): DocumentData {
        return {
            items: tagging.items
        };
    }
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const converterItemsCollection = collection(db, 'items').withConverter(itemsConverter);
export const converterItemsCoreCollection = collection(db, 'items').withConverter(itemsCoreConverter);
export const itemsCollection = collection(db, 'items');
export const converterTagsCollection = collection(db, 'tags').withConverter(tagsConverter);
export const tagsCollection = collection(db, 'tags');
export const categoriesCollection = collection(db, 'categories');
export const storage = getStorage(app);
export const auth = getAuth();

