import express from "express";
import {getAllSupraCategoriesCache} from "../utils";

export const categoriesRouter = express.Router();

categoriesRouter.get("/bread/:id", (req, res)=> {
    const categoryId = req.params.id;

    try {
        const path = getAllSupraCategoriesCache(categoryId);
        res.send(path);
    } catch (e) {
        console.error("Error: ", e);
        res.status(404).send(e);
    }
})