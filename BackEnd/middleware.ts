import {CollectionReference, getDocs, orderBy, query, limit, where} from "firebase/firestore";
import { Request, Response } from 'express';

type CollectionMiddleware = (collectionRef: CollectionReference) => (req: Request, res: Response) => Promise<void>;

export const fetchCollection: CollectionMiddleware = (collectionRef) => {
    return async (req, res) => {
        try {
            const limitIn = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

            let ref = query(collectionRef, orderBy('added', 'asc'));
            // Apply category filter if specified
            if(req.query.category) ref = query(ref, where('category', '==', req.query.category));
            console.log(req.query.category);
            // Apply limit if specified
            if (limitIn && !isNaN(limitIn) && limitIn > 0) ref = query(ref, limit(limitIn));

            const collectionSnapshot = await getDocs(ref);
            const items = collectionSnapshot.docs.map(doc => doc.data());

            res.send(items);
        } catch (e) {
            console.error("Error fetching documents: ", e);
            res.status(500).send(e);
        }
    };
};
