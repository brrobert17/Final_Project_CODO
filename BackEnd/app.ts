import express from 'express';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {itemsRouter} from "./router/itemsRouter";
import {imagesRouter} from "./router/imagesRouter";
import {collection} from "@firebase/firestore";
import {db, itemsCollection} from "./firebaseConfig";
import {getDocs, addDoc, setDoc, doc, getDoc} from "firebase/firestore";

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

app.get("/path2", async(req,res)=>{

    const itemS = await getDoc(doc(itemsCollection, '3i8Zb2'));
    const category = itemS.data()?.category;

    const catRef = collection(db, 'cat');
    const docRef = doc(catRef, category);
    const s = await getDoc(docRef);
    const pathData = s.data()?.path;
    const pathMap = new Map(Object.entries(pathData));
    console.log(pathMap);
    const pathNames:string[] = [];

    for (const [key,value] of pathMap) {
        console.log(value);
        const pDocRef = doc(catRef, value as string);
        const pSnap = await getDoc(pDocRef);
        pathNames.push(pSnap.data()?.name);
    }
    res.send(pathNames);
});

app.get("/path/cat", async(req,res)=>{
    const categoryId= 'Q0i1y5';
    const catRef = collection(db, 'cat');
    const docRef = doc(catRef, categoryId);
    const s = await getDoc(docRef);
    const pathData = s.data()?.path;
    const pathMap = new Map(Object.entries(pathData));
    console.log('level: ',pathMap.size);
    const subCats:string[] = [];

    //now I need to query all categories where the path includes the categoryId as level(pathMap.size) property

    // for (const [key,value] of pathMap) {
    //     console.log(value);
    //     const pDocRef = doc(catRef, value as string);
    //     const pSnap = await getDoc(pDocRef);
    //     pathNames.push(pSnap.data()?.name);
    // }
    res.send(subCats);
})


// app.get("/cat", async(req, res) => {
//         const ref = collection(db, 'categories');
//         const s= await getDocs(ref);
//         const categories = s.docs.map(doc => {
//             const docData = doc.data();
//
//             const ancestorsMap =
//                 docData.ancestors && new Map(docData.ancestors.map((ancestor: string, index:number) => [index, ancestor]));
//             const ancestorsObject = ancestorsMap && Object.fromEntries(ancestorsMap);
//             if(ancestorsObject){
//                 return {
//                     name: docData.name,
//                     path: ancestorsObject,
//                     items: []
//                 };
//             } else {
//                 return {
//                     name: docData.name,
//                     path: {},
//                     items: []
//                 };
//             }
//
//         });
//         console.log(categories);
//         res.send(categories);
// })
app.get("/cat", async (req, res) => {
    const ref = collection(db, 'categories');
    const s = await getDocs(ref);
    const categories = s.docs.map(doc => {
        const docData = doc.data();

        const ancestorsMap =
            docData.ancestors && new Map(docData.ancestors.map((ancestor:string, index:number) => [index, ancestor]));
        const ancestorsObject = ancestorsMap && Object.fromEntries(ancestorsMap);

        return {
            id: doc.id,
            data: {
                name: docData.name,
                path: ancestorsObject || {},
                items: []
            }
        };
    });

    const catRef = collection(db, 'cat');
    try {
        await Promise.all(categories.map(cat => {
            const docRef = doc(catRef, cat.id);
            return setDoc(docRef, cat.data);
        }));
        console.log("Categories added to 'cat' collection with matching IDs");
        res.send(categories.map(cat => cat.data));
    } catch (error) {
        console.error("Error adding categories: ", error);
        res.status(500).send(error);
    }
});


server.listen(port, () => console.log(`CODO Backend server standby on port ${port}`));