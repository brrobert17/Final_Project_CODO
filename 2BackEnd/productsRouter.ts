import express, { NextFunction, Request, Response } from 'express';

export const productsRouter = express.Router();

productsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    console.log(req.params.lang);
    res.locals.content = 'success';
    res.locals.type = 'product';
    next();
});