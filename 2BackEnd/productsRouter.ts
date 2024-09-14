import express, {NextFunction, Request, Response} from 'express';
import {converterProductsCollection, productsCollection} from "./firebaseConfig";

export const productsRouter = express.Router({mergeParams: true});

productsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    console.log(req.params.lang);
    const doc = await converterProductsCollection.doc(req.params.id).get();
    res.locals.content = doc.data();
    res.locals.type = 'product';
    next();
});