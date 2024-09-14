import express, { NextFunction, Request, Response } from 'express';

export const categoriesRouter = express.Router({mergeParams: true});

categoriesRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    console.log(req.params.lang);
    res.locals.content = 'success';
    res.locals.type = 'category';
    next();
});