import { NextFunction, Request, Response } from "express";
import type { RequestHandler } from "express";

export const Translator: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    switch (res.locals.type) {
        case 'product':
            res.send(res.locals.content + '- translated single product to ' + req.params.lang);
            break;
        case 'products':
            res.send(res.locals.content + '- translated multiple products to ' + req.params);
            break;
        default:
            console.log("Oops something went terribly wrong!");
            break;
    }
}



