import {NextFunction, Request, Response} from "express";
import type {RequestHandler} from "express";
import {Product} from "./Interfaces/dbInterfaces";
import {converterLanguagesCollection} from "./firebaseConfig";

export const Translator: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    switch (res.locals.type) {
        case 'product':
            const translatedProduct = await translateProduct(res.locals.content, req.params.lang);
            //
            return res.json(translatedProduct);
        case 'products':
            res.send(res.locals.content + '- translated multiple products to ' + req.params.lang);
            break;
        case 'categories':
            res.send(res.locals.content + '- translated multiple categories to ' + req.params.lang);
            break;
        case 'category':
            res.send(res.locals.content + '- translated single category to ' + req.params.lang);
            break;
        default:
            console.log("Oops something went terribly wrong!");
            break;
    }
}

const translateProduct = async (product: Product, language: string) => {
    const snap = await converterLanguagesCollection.doc(language).collection('products').doc(product.id).get();
    const doc = snap.data();
    return doc && {
        ...product,
        ...doc,
        img: product.img.map((img, index) => {
            return {...img, alt: doc.img[index].alt}
        })
    }
}



