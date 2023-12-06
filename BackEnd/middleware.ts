import {
    CollectionReference,
    getDocs,
    orderBy,
    query,
    limit,
    where,
    doc,
    getDoc,
    DocumentSnapshot,
    DocumentData,
    QueryDocumentSnapshot
} from "firebase/firestore";
import { Request, Response } from 'express';
import { Item, QueryParam } from "../MobileFrontEnd/utils/interfaces";
import { categoriesCollection, converterItemsCollection } from "./firebaseConfig";
import { getAllSubCategories } from "./router/utilsRouter";
import { getAllSubcategoriesCache, getCategoryCache } from "./utils";
import { myCache } from "./app";

type CollectionMiddleware = (collectionRef: CollectionReference) => (req: Request, res: Response) => Promise<void>;

// export const fetchCollection: CollectionMiddleware = (collectionRef) => {
//     return async (req, res) => {
//         try {
//             const params = JSON.parse(req.query.params as string) as QueryParam[];
//             console.log("fetching: ", req.query)
//             // shortcut in case of no params
//             if(!params || !Array.isArray(params)) {
//                 const allItemsRef = query(collectionRef, orderBy('added', 'asc'));
//                 console.log("no params")
//                 const collectionSnapshot = await getDocs(allItemsRef);
//                 const items = collectionSnapshot.docs.map(doc => doc.data());
//                 res.send([{queryKey: 'allProducts', result: items}]);
//             } else {
//                 let results= [];
//                 for (const param of params) {
//                     let itemsRef = query(collectionRef, orderBy('added', 'asc'));
//                     const limitIn = param.limit ? param.limit : undefined;
//                     // Apply category filter if specified
//                     // fetch the category name first
//                     if(param.category) {
//                         const categorySnap = await getDocs(query(categoriesCollection,where('name', '==',param.category)));
//                         const categoryId = categorySnap.docs[0].id;
//                         console.log(categoryId);
//                         const subCatsIds = await getAllSubCategories(categoryId);
//                         itemsRef = query(itemsRef, where('category', 'in', subCatsIds));
//                     }
//                     // Apply limit if specified
//                     if (limitIn && !isNaN(limitIn) && limitIn > 0) itemsRef = query(itemsRef, limit(limitIn));
//                     const collectionSnapshot = await getDocs(itemsRef);
//                     const items = collectionSnapshot.docs.map(doc => doc.data());
//                     results.push({queryKey: param.queryKey, result: items})
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
            const params = req.query.params && JSON.parse(req.query.params as string) as QueryParam[];
            //console.log("fetching: ", req.query);

            // Shortcut in case of no params
            if (!params || !Array.isArray(params)) {
                //console.log("fetching all products")
                const allItemsRef = query(collectionRef, orderBy('added', 'asc'));
                const collectionSnapshot = await getDocs(allItemsRef);
                const items = collectionSnapshot.docs.map(doc => doc.data());
                res.send([{queryKey: 'allProducts', result: items}]);
            } else {
                //console.log("fetching specific categories")
                const queries = params.map(param => createQueryForParam(collectionRef, param));
                const resultsArray = await Promise.all(queries);
                const results = resultsArray.map((collectionSnapshot, index) => {
                    const currentParam = params[index];
                    const filteredDocs = currentParam?.exclude
                        ? collectionSnapshot.docs.filter(doc => doc.id !== currentParam.exclude)
                        : collectionSnapshot.docs;
                    const items = filteredDocs.map(doc => doc.data());
                    return { queryKey: currentParam?.queryKey, result: items };
                });
                //console.log("results", resultsArray.map(res => { return res.docs.map((r) => r.data()) }))
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
        const itemId = req.params.id;
        const limit = Number(req.query.limit);
        let itemSnap: DocumentSnapshot<Item, DocumentData> | null = null;

        try {
            const docRef = doc(converterItemsCollection, itemId);
            itemSnap = await getDoc(docRef);

            if (!itemSnap.exists()) {
                res.status(404).send({ message: 'Product not found' });
                return;
            }
            if (!limit) {
                res.status(400).send({ error: "Bad request", message: "Missing required query parameter: limit" });
                return;
            }

            if (itemSnap && itemSnap.data()) {
                const categoryId = itemSnap.data()?.category
                if (categoryId) {
                    const related = await getRelatedItemsWithLimit(itemId, collectionRef, limit, categoryId, [])
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

async function getRelatedItemsWithLimit(itemId: string, collectionRef: CollectionReference, limit: number, categoryId: string, previousDocs: QueryDocumentSnapshot<DocumentData>[]): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    let itemsRef = query(collectionRef, orderBy('added', 'asc'));

    // Get sub-categories
    const subCatsIds = getAllSubcategoriesCache(categoryId)?.map(c => c.id);
    if (subCatsIds && subCatsIds.length >= 0) {
        itemsRef = query(itemsRef, where('category', 'in', [...subCatsIds, categoryId]));
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
    // Get sub-categories items
    try {
        const snapDocs = (await getDocs(itemsRef)).docs;
        const docs = [...snapDocs, ...previousDocs];

        const docSet = Array.from(new Set(docs.map(doc => doc.id)))
            .map(id => {
                return docs.find(doc => doc.id === id);
            });
        //This seems to make no difference except save a few undefined checks
        // now it does because it removes the same item
        const filteredDocs = docSet.filter((item): item is QueryDocumentSnapshot<DocumentData, DocumentData> => item !== undefined && item.id != itemId);

        if (filteredDocs.length < limit && parentCategoryId) {
            // filtered docs length is 1 but it's the original item perhaps remove that
            const remainingLimit = limit - filteredDocs.length;
            const recursiveResult = await getRelatedItemsWithLimit(itemId, collectionRef, remainingLimit, parentCategoryId, docs);
            if (recursiveResult) {
                const all = [...filteredDocs, ...recursiveResult];
                //console.log('LIMIT: ', limit,'ALL:::', all.map(d=> d.data()));
                const docSet = Array.from(new Set(all.map(doc => doc.id)))
                    .map(id => {
                        return all.find(doc => doc.id === id);
                    });
                const filteredDocsTwo = docSet.filter((item): item is QueryDocumentSnapshot<DocumentData, DocumentData> => item !== undefined);
                //console.log('filteredDocs:  ', filteredDocsTwo.map(d=> d.data()));
                return filteredDocsTwo;
            }
        }
        if (docs.length > limit) {
            //console.log("limit", limit);
            //console.log("slice", filteredDocs.slice(0, limit).length);
            const slicedDocs = filteredDocs.slice(0, limit);
            //console.log()
            return slicedDocs;
        }
        return filteredDocs;
    } catch (err) {
        console.error('Error fetching related items:', err);
        throw err;
    }
}

async function createQueryForParam(collectionRef: CollectionReference, param: QueryParam) {
    let itemsRef = query(collectionRef, orderBy('added', 'asc'));

    // Apply category filter if specified
    if (param?.category && param.category != 'root') {
        // console.log('categpry', param)
        // let categorySnap = await getDocs(query(categoriesCollection, where('name', '==', param.category)));
        // categorySnap && console.log('cc',categorySnap.docs);
        // const categoryId = categorySnap?.docs[0].id;
        const subCatsIds = getAllSubcategoriesCache(param.category)?.map(c => c.id);
        subCatsIds && [...subCatsIds, param.category].length != 0 && (itemsRef = query(itemsRef, where('category', 'in', [...subCatsIds, param.category])));
    }
    // Apply limit if specified
    if (param?.limit && !isNaN(param.limit) && param.limit > 0) {
        itemsRef = query(itemsRef, limit(param.limit));
    }

    return getDocs(itemsRef);
}

