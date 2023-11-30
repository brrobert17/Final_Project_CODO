import express from 'express';
import NodeCache from 'node-cache';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {itemsRouter} from "./router/itemsRouter";
import {imagesRouter} from "./router/imagesRouter";
import {getAllSubCategories, utilsRouter} from "./router/utilsRouter";
import {getDocs} from "firebase/firestore";
import {categoriesCollection, converterCategoriesCollection} from "./firebaseConfig";
import {getAllSubcategoriesCache, getAllSupraCategoriesCache, nestCategories} from "./utils";
import {categoriesRouter} from "./router/categoriesRouter";
import {Category, MenuCategory} from "../MobileFrontEnd/utils/interfaces";


const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));

app.use(itemsRouter);
app.use(imagesRouter);
app.use(utilsRouter);
app.use(categoriesRouter);

export const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
async function initializeCache() {
    try {
        const categoriesSnapshot = await getDocs(converterCategoriesCollection);
        const categories = categoriesSnapshot.docs.map(doc => doc.data());
        const menuCategories = nestCategories(categories);
        myCache.set('categories', categories);
        myCache.set('menuCategories', menuCategories);
        console.log('Categories cache set.');
    } catch (error) {
        console.error('Failed to initialize cache:', error);
    }
}

server.listen(port, () => {
    console.log(`CODO Backend server standby on port ${port}`);
    initializeCache();
});