import {CollectionReference, getDocs, orderBy, query, limit, where, getDoc, doc} from "firebase/firestore";
import { Request, Response } from 'express';
import {ItemCoreQueryResult, ItemQueryResult, QueryParam} from "../MobileFrontEnd/utils/interfaces";
import {categoriesCollection} from "./firebaseConfig";
import {getAllSubCategories} from "./router/utilsRouter";

type CollectionMiddleware = (collectionRef: CollectionReference) => (req: Request, res: Response) => Promise<void>;

export const fetchCollection: CollectionMiddleware = (collectionRef) => {
    return async (req, res) => {

        try {
            const params = JSON.parse(req.query.params as string) as QueryParam[];
            const allProductsRef = query(collectionRef, orderBy('added', 'asc'));
            console.log("fetching: ", req.query)
            // shortcut in case of no params
            if(!params || !Array.isArray(params)) {
                console.log("no params")
                const collectionSnapshot = await getDocs(allProductsRef);
                const items = collectionSnapshot.docs.map(doc => doc.data());
                res.send([{queryKey: 'allProducts', result: items}]);
            } else {
                let results:any[] = [];
                for (const param of params) {
                    let ref = query(collectionRef, orderBy('added', 'asc'));
                    const limitIn = param.limit ? param.limit : undefined;
                    // Apply category filter if specified
                    // fetch the category name first
                    if(param.category) {
                        const categorySnap = await getDocs(query(categoriesCollection,where('name', '==',param.category)));
                        const categoryId = categorySnap.docs[0].id;
                        console.log(categoryId);
                        const subCatsIds = await getAllSubCategories(categoryId);
                        if(param.category) ref = query(ref, where('category', 'in', subCatsIds));
                    }
                    // Apply limit if specified
                    if (limitIn && !isNaN(limitIn) && limitIn > 0) ref = query(ref, limit(limitIn));
                    const collectionSnapshot = await getDocs(ref);
                    const items = collectionSnapshot.docs.map(doc => doc.data());
                    results.push({queryKey: param.queryKey, result: items})
                }
                res.send(results);
            }
        } catch (e) {
            console.error("Error fetching documents: ", e);
            res.status(500).send(e);
        }
    };
};
