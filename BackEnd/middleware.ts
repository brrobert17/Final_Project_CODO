import { CollectionReference, getDocs, orderBy, query, limit, where } from "firebase/firestore";
import { Request, Response } from 'express';
import { QueryParam } from "../MobileFrontEnd/utils/interfaces";
import { categoriesCollection } from "./firebaseConfig";
import { getAllSubCategories } from "./router/utilsRouter";
import { getAllSubcategoriesCache } from "./utils";

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
            const params = JSON.parse(req.query.params as string) as QueryParam[];
            console.log("fetching: ", req.query);

            // Shortcut in case of no params
            if (!params || !Array.isArray(params)) {
                console.log("fetching all products")
                const allItemsRef = query(collectionRef, orderBy('added', 'asc'));
                const collectionSnapshot = await getDocs(allItemsRef);
                const items = collectionSnapshot.docs.map(doc => doc.data());
                res.send([{ queryKey: 'allProducts', result: items }]);
            } else {
                console.log("fetching specific categories")
                const queries = params.map(param => createQueryForParam(collectionRef, param));
                const resultsArray = await Promise.all(queries);
                const results = resultsArray.map((collectionSnapshot, index) => {
                    const items = collectionSnapshot.docs.map(doc => doc.data());
                    return { queryKey: params[index].queryKey, result: items };
                });
                console.log("results", resultsArray.map(res => { return res.docs.map((r) => r.data()) }))
                res.send(results);
            }
        } catch (e) {
            console.error("Error fetching documents: ", e);
            res.status(500).send(e);
        }
    };
};

async function createQueryForParam(collectionRef: CollectionReference, param: QueryParam) {
    let itemsRef = query(collectionRef, orderBy('added', 'asc'));

    // Apply category filter if specified
    if (param.category) {
        const categorySnap = await getDocs(query(categoriesCollection, where('name', '==', param.category)));
        const categoryId = categorySnap.docs[0].id;
        const subCatsIds = getAllSubcategoriesCache(categoryId)?.map(c => c.id);
        console.log('scI:  ', subCatsIds)
        subCatsIds && [...subCatsIds, categoryId].length != 0 && (itemsRef = query(itemsRef, where('category', 'in', [...subCatsIds, categoryId])));
    }
    // Apply limit if specified
    if (param.limit && !isNaN(param.limit) && param.limit > 0) {
        itemsRef = query(itemsRef, limit(param.limit));
    }
    return getDocs(itemsRef);
}

