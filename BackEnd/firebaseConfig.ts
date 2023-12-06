import { initializeApp } from "firebase/app";
import {collection, getFirestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, DocumentData} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"
import {Category, Product, ProductCore, Tag} from "../MobileFrontEnd/utils/interfaces";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const productsConverter: FirestoreDataConverter<Product> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Product {
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
    toFirestore(product: Product): DocumentData {
        return {
            name: product.name,
            added: product.added,
            img: product.img,
            price: product.price,
            description: product.description,
            wysiwyg: product.wysiwyg,
            stock: product.stock,
            category: product.category
        };
    }
};

const productsCoreConverter: FirestoreDataConverter<ProductCore> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): ProductCore {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            price: data.price,
            img: data.img[0]
        };
    },
    toFirestore(product: ProductCore): DocumentData {
        return {
            name: product.name,
            img: product.img
        };
    }
};

const tagsConverter: FirestoreDataConverter<Tag> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Tag {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            products: data.products
        };
    },
    toFirestore(tagging: Tag): DocumentData {
        return {
            products: tagging.products
        };
    }
};

const categoriesConverter: FirestoreDataConverter<Category> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Category {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            name: data.name,
            path: data.path,
            img: data.img
        };
    },
    toFirestore(category: Category): DocumentData {
        return {
            name: category.name,
            path: category.path,
            img: category.img
        };
    }
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const converterProductsCollection = collection(db, 'products').withConverter(productsConverter);
export const converterProductsCoreCollection = collection(db, 'products').withConverter(productsCoreConverter);
export const productsCollection = collection(db, 'products');
export const converterTagsCollection = collection(db, 'tags').withConverter(tagsConverter);
export const tagsCollection = collection(db, 'tags');
export const categoriesCollection = collection(db, 'categories');
export const converterCategoriesCollection = collection(db, 'categories').withConverter(categoriesConverter);
export const storage = getStorage(app);
export const auth = getAuth();

