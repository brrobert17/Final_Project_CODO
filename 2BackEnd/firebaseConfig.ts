import { Category, Product, ProductCore, Tag } from "../MobileFrontEnd/utils/interfaces";
import { Language } from "./Interfaces/translatorInterfaces";
import admin, { firestore, ServiceAccount } from 'firebase-admin';

import serviceAccount from './schulz-shop-firebase-adminsdk-72eg2-5f9a8ed093.json';

// Initialize Firebase Admin SDK with the service account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: "https://schulz-shop.firebaseio.com"
});

// Create Firestore instance
const db = admin.firestore();

// FirestoreDataConverter for Product
const productsConverter: firestore.FirestoreDataConverter<Product> = {
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Product {
        const data = snapshot.data();
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
    toFirestore(product: Product): firestore.DocumentData {
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

// FirestoreDataConverter for ProductCore
const productsCoreConverter: firestore.FirestoreDataConverter<ProductCore> = {
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): ProductCore {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            price: data.price,
            img: data.img[0]
        };
    },
    toFirestore(product: ProductCore): firestore.DocumentData {
        return {
            name: product.name,
            img: product.img
        };
    }
};

// FirestoreDataConverter for Tag
const tagsConverter: firestore.FirestoreDataConverter<Tag> = {
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Tag {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            products: data.products
        };
    },
    toFirestore(tag: Tag): firestore.DocumentData {
        return {
            products: tag.products
        };
    }
};

// FirestoreDataConverter for Category
const categoriesConverter: firestore.FirestoreDataConverter<Category> = {
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Category {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            path: data.path,
            img: data.img
        };
    },
    toFirestore(category: Category): firestore.DocumentData {
        return {
            name: category.name,
            path: category.path,
            img: category.img
        };
    }
};

// FirestoreDataConverter for Language
const languagesConverter: firestore.FirestoreDataConverter<Language> = {
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Language {
        const data = snapshot.data();
        return {
            abbr: snapshot.id,
            meta: data.meta,
            categories: data.categories,
            products: data.products
        };
    },
    toFirestore(language: Language): firestore.DocumentData {
        return {
            meta: language.meta,
            categories: language.categories,
            products: language.products
        };
    }
};

// Firestore collection references with converters
export const productsCollection = db.collection('products');
export const converterProductsCollection = db.collection('products').withConverter(productsConverter);
export const converterProductsCoreCollection = db.collection('products').withConverter(productsCoreConverter);

export const categoriesCollection = db.collection('categories');
export const converterCategoriesCollection = db.collection('categories').withConverter(categoriesConverter);

export const languagesCollection = db.collection('languages');
export const converterLanguagesCollection = db.collection('languages').withConverter(languagesConverter);
