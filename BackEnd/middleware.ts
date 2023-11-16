import {CollectionReference, getDocs, orderBy, query, limit, where} from "firebase/firestore";
import { Request, Response } from 'express';
import {ItemCoreQueryResult, ItemQueryResult, QueryParam} from "../MobileFrontEnd/utils/interfaces";

type CollectionMiddleware = (collectionRef: CollectionReference) => (req: Request, res: Response) => Promise<void>;

export const fetchCollection: CollectionMiddleware = (collectionRef) => {
    return async (req, res) => {

        try {

            const params = JSON.parse(req.query.params as string) as QueryParam[];
            const allProductsRef = query(collectionRef, orderBy('added', 'asc'));
            console.log("trying: ", req.query)
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
                    if(param.category) ref = query(ref, where('category', '==', param.category));
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
