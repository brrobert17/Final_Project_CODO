import {
    CollectionReference,
    doc,
    DocumentData,
    DocumentSnapshot,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    where
} from "firebase/firestore";
import { Request, Response } from 'express';
import { Product, QueryParams } from "../MobileFrontEnd/utils/interfaces";
import { converterProductsCollection } from "./firebaseConfig";
import { getAllSubcategoriesCache, getCategoryCache } from "./utils";
import firebase from "firebase/compat";
import OrderByDirection = firebase.firestore.OrderByDirection;

type CollectionMiddleware = (collectionRef: CollectionReference) => (req: Request, res: Response) => Promise<void>;

// export const fetchCollection: CollectionMiddleware = (collectionRef) => {
//     return async (req, res) => {
//         try {
//             const params = JSON.parse(req.query.params as string) as QueryParam[];
//             console.log("fetching: ", req.query)
//             // shortcut in case of no params
//             if(!params || !Array.isArray(params)) {
//                 const allProductsRef = query(collectionRef, orderBy('added', 'asc'));
//                 console.log("no params")
//                 const collectionSnapshot = await getDocs(allProductsRef);
//                 const products = collectionSnapshot.docs.map(doc => doc.data());
//                 res.send([{queryKey: 'allProducts', result: products}]);
//             } else {
//                 let results= [];
//                 for (const param of params) {
//                     let productsRef = query(collectionRef, orderBy('added', 'asc'));
//                     const limitIn = param.limit ? param.limit : undefined;
//                     // Apply category filter if specified
//                     // fetch the category name first
//                     if(param.category) {
//                         const categorySnap = await getDocs(query(categoriesCollection,where('name', '==',param.category)));
//                         const categoryId = categorySnap.docs[0].id;
//                         console.log(categoryId);
//                         const subCatsIds = await getAllSubCategories(categoryId);
//                         productsRef = query(productsRef, where('category', 'in', subCatsIds));
//                     }
//                     // Apply limit if specified
//                     if (limitIn && !isNaN(limitIn) && limitIn > 0) productsRef = query(productsRef, limit(limitIn));
//                     const collectionSnapshot = await getDocs(productsRef);
//                     const products = collectionSnapshot.docs.map(doc => doc.data());
//                     results.push({queryKey: param.queryKey, result: products})
//                 }
//                 res.send(results);
//             }
//         } catch (e) {
//             console.error("Error fetching documents: ", e);
//             res.status(500).send(e);
//         }
//     };
// };


export const fetchCollection: CollectionMiddleware = (collectionRef) => {
    return async (req, res) => {
        try {
            const params = req.query.params && JSON.parse(
                req.query.params as string) as QueryParams;

            // Shortcut in case of no params
            if (!params) {
                const allProductsRef = query(
                    collectionRef, orderBy('added', 'desc'));
                const collectionSnapshot = await getDocs(allProductsRef);
                const products = collectionSnapshot.docs.map(
                    doc => doc.data());
                res.send(products);
            } else {
                const query = await createQueryForParam(collectionRef, params);
                const results = query.docs.map(doc => doc.data());
                res.send(results);
            }

        } catch (e) {
            console.error("Error fetching documents: ", e);
            res.status(500).send(e);
        }
    };
};

export const fetchRelated: CollectionMiddleware = (collectionRef) => {
    return async (req, res) => {
        const productId = req.params.id;
        const limit = Number(req.query.limit);
        let productSnap: DocumentSnapshot<Product> | null = null;

        try {
            const docRef = doc(converterProductsCollection, productId);
            productSnap = await getDoc(docRef);

            if (!productSnap.exists()) {
                res.status(404).send({ message: 'Product not found' });
                return;
            }
            if (!limit) {
                res.status(400).send({ error: "Bad request", message: "Missing required query parameter: limit" });
                return;
            }

            if (productSnap && productSnap.data()) {
                const categoryId = productSnap.data()?.category
                if (categoryId) {
                    const related = await getRelatedProductsWithLimit(productId, collectionRef, limit, categoryId, [])
                    //const filteredRelated = related.filter(r => r.id != productId);
                    res.status(200).json(related.map(d => d.data()));
                }
            }
            res.status(400);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

async function getRelatedProductsWithLimit(productId: string, collectionRef: CollectionReference, limit: number, categoryId: string, previousDocs: QueryDocumentSnapshot<DocumentData>[]): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    let productsRef = query(collectionRef, orderBy('added', 'asc'));

    // Get sub-categories
    const subCatsIds = getAllSubcategoriesCache(categoryId)?.map(c => c.id);
    if (subCatsIds && subCatsIds.length >= 0) {
        productsRef = query(productsRef, where('category', 'in', [...subCatsIds, categoryId]));
    }
    // Get category parent
    const currentCategory = getCategoryCache(categoryId);
    let parentCategoryId;
    if (currentCategory && currentCategory.path) {
        const keys = Object.keys(currentCategory.path).map(Number).sort((a, b) => a - b);
        if (keys.length > 0) {
            const lastIndex = keys[keys.length - 1];
            parentCategoryId = currentCategory.path[lastIndex];
        }
    }
    // Get sub-categories products
    try {
        const snapDocs = (await getDocs(productsRef)).docs;
        const docs = [...snapDocs, ...previousDocs];

        const docSet = Array.from(new Set(docs.map(doc => doc.id)))
            .map(id => {
                return docs.find(doc => doc.id === id);
            });
        //This seems to make no difference except save a few undefined checks
        // now it does because it removes the same product
        const filteredDocs = docSet.filter((product): product is QueryDocumentSnapshot<DocumentData, DocumentData> => product !== undefined && product.id != productId);

        if (filteredDocs.length < limit && parentCategoryId) {
            // filtered docs length is 1 but it's the original product perhaps remove that
            const remainingLimit = limit - filteredDocs.length;
            const recursiveResult = await getRelatedProductsWithLimit(productId, collectionRef, remainingLimit, parentCategoryId, docs);
            if (recursiveResult) {
                const all = [...filteredDocs, ...recursiveResult];
                //console.log('LIMIT: ', limit,'ALL:::', all.map(d=> d.data()));
                const docSet = Array.from(new Set(all.map(doc => doc.id)))
                    .map(id => {
                        return all.find(doc => doc.id === id);
                    });
                //console.log('filteredDocs:  ', filteredDocsTwo.map(d=> d.data()));
                return docSet.filter((product): product is QueryDocumentSnapshot<DocumentData, DocumentData> => product !== undefined);
            }
        }
        if (docs.length > limit) {
            //console.log("limit", limit);
            //console.log("slice", filteredDocs.slice(0, limit).length);
            //console.log()
            return filteredDocs.slice(0, limit);
        }
        return filteredDocs;
    } catch (err) {
        console.error('Error fetching related products:', err);
        throw err;
    }
}

async function createQueryForParam(collectionRef: CollectionReference, params: QueryParams) {
    let productsRef = query(collectionRef);
    if (params.orderBy) {
        productsRef = query(productsRef, orderBy(params.orderBy.property, params.orderBy.direction as OrderByDirection));
    } else {
        productsRef = query(productsRef, orderBy('added', 'desc'));
    }

    // Apply category filter if specified
    if (params?.categoryId && params.categoryId != 'root') {
        // console.log('category', param)
        // let categorySnap = await getDocs(query(categoriesCollection, where('name', '==', param.category)));
        // categorySnap && console.log('cc',categorySnap.docs);
        // const categoryId = categorySnap?.docs[0].id;
        const subCatsIds = getAllSubcategoriesCache(params.categoryId)?.map(c => c.id);
        subCatsIds && [...subCatsIds, params.categoryId].length != 0 && (productsRef = query(productsRef, where('category', 'in', [...subCatsIds, params.categoryId])));
    }
    // Apply limit if specified
    if (params?.limit && !isNaN(params.limit) && params.limit > 0) {
        productsRef = query(productsRef, limit(params.limit));
    }
    if (!params.limit) {
        productsRef = query(productsRef, limit(10));
    }

    return getDocs(productsRef);
}

