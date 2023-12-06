import express from "express";
import {
    getAllSubcategoriesCache,
    getAllSupraCategoriesCache,
    getCategoryCache,
    getDirectSubcategoriesCache, nestCategories
} from "../utils";
import {myCache} from "../app";

export const categoriesRouter = express.Router();

categoriesRouter.get("/categories/:id/breadcrumbs", (req, res) => {
    const categoryId = req.params.id;
    try {
        const path = getAllSupraCategoriesCache(categoryId);
        res.send(path);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
});
categoriesRouter.get("/categories/:id/subcategories", (req, res) => {
    const categoryId = req.params.id;
    try {
        const subcategories = getDirectSubcategoriesCache(categoryId as string);
        res.send(subcategories);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
});
categoriesRouter.get("/categories/:id", (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = getCategoryCache(categoryId as string);
        res.send(category);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
});
categoriesRouter.get("/categories", (req, res) => {
    const menuCategoriesCache = myCache.get('menuCategories');
    res.send(menuCategoriesCache);
});