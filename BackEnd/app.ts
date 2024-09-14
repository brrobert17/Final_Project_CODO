import express from 'express';
import NodeCache from 'node-cache';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {productsRouter} from "./router/productsRouter";
import {imagesRouter} from "./router/imagesRouter";
import {getAllSubCategories, utilsRouter} from "./router/utilsRouter";
import {getDocs} from "firebase/firestore";
import {categoriesCollection, converterCategoriesCollection} from "./firebaseConfig";
import {getAllSubcategoriesCache, getAllSupraCategoriesCache, nestCategories, test22} from "./utils";
import {categoriesRouter} from "./router/categoriesRouter";


const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use(imagesRouter);
app.use(utilsRouter);
app.get("/test22", (req, res) => {
    test22();
})

export const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
async function initializeCache() {
    try {
        const categoriesSnapshot = await getDocs(converterCategoriesCollection);
        const categories = categoriesSnapshot.docs.map(doc => doc.data());
        const menuCategories = nestCategories(categories);
        //console.log(menuCategories);
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