import express from "express";
import {getAllSubcategoriesCache, getAllSupraCategoriesCache} from "../utils";

export const categoriesRouter = express.Router();

categoriesRouter.get("/breadcrumbs/:id", (req, res)=> {
    const categoryId = req.params.id;
    try {
        const path = getAllSupraCategoriesCache(categoryId);
        res.send(path);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
});
categoriesRouter.get("/categories/:id/subcategories", (req, res)=> {
    const categoryId = req.params.id;
    try {
        const subcategories = getAllSubcategoriesCache(categoryId as string);
        res.send(subcategories);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
});