import {collection} from "@firebase/firestore";
import {categoriesCollection, db, itemsCollection, tagsCollection} from "../firebaseConfig";
import {getDocs, addDoc, setDoc, doc, getDoc, query, where, writeBatch} from "firebase/firestore";
import express from "express";

export const utilsRouter = express.Router();
//getting an item's path
//getting a category's path is basically the same
utilsRouter.get("/catsids", async (req, res) => {
    const snap = await getDocs(categoriesCollection);
    const data = snap.docs.map(doc => {
        return {
            id: doc.id,
            name: doc.data().name,
        }
    })
    res.send(data);
});
utilsRouter.get("/path2", async (req, res) => {

    const itemS = await getDoc(doc(itemsCollection, '3i8Zb2'));
    const category = itemS.data()?.category;

    const catRef = collection(db, 'cat');
    const docRef = doc(catRef, category);
    const s = await getDoc(docRef);
    const pathData = s.data()?.path;
    const pathMap = new Map(Object.entries(pathData));
    console.log(pathMap);
    const pathNames: string[] = [];

    for (const [key, value] of pathMap) {
        console.log(value);
        const pDocRef = doc(catRef, value as string);
        const pSnap = await getDoc(pDocRef);
        pathNames.push(pSnap.data()?.name);
    }
    res.send(pathNames);
});

//getting a category's direct descendants
utilsRouter.get("/path/cat", async (req, res) => {
    const categoryId = 'Q0i1y5';
    const catRef = collection(db, 'cat');
    const docRef = doc(catRef, categoryId);
    const s = await getDoc(docRef);
    const pathData = s.data()?.path;
    const pathMap = new Map(Object.entries(pathData));
    const level = pathMap.size;
    console.log('level: ', level);
    const subCats: string[] = [];

    const querySnapshot = await getDocs(query(catRef, where(`path.${level}`, "==", categoryId)));
    querySnapshot.docs.map((doc) => {
        const pathMap2 = new Map(Object.entries(doc.data()?.path));
        pathMap2.size === level + 1 && subCats.push(doc.data().name);
    });
    console.log(subCats);
    res.send(subCats);
})
//getting all items in a specific category
//Q0i1y5 fishes
// 1. get all subcategories 2. query all items where category in gathered subcategory array

utilsRouter.get("/allincat", async (req, res) => {
    const subCatsIds = getAllSubCategories('Q0i1y5');
    const qSItems = await getDocs(query(itemsCollection, where('category', 'in', subCatsIds)));
    const items = qSItems.docs.map(doc => doc.data());
    res.send(items);
})

utilsRouter.get("/tags", async (req, res) => {
    const qs = await getDoc(doc(tagsCollection, 'fish'));
    const itemIds = qs.data()?.items;
    const items = [];
    const batchSize = 10; // Adjust based on your needs

    for (let i = 0; i < itemIds.length; i += batchSize) {
        const batch = itemIds.slice(i, i + batchSize);
        const promises = batch.map((id: string) => getDoc(doc(itemsCollection, id)));
        const snapshots = await Promise.all(promises);
        for (const snap of snapshots) {
            if (snap.exists()) {
                items.push(snap.data());
            }
        }
    }
    res.send(items);
})

utilsRouter.get('/dup', async (req, res) => {

    try {
        // Reference to the source and destination collections
        const sourceCollection = collection(db, 'cat');
        const destinationCollection = collection(db, 'categories');

        // Get all documents from the source collection
        const querySnapshot = await getDocs(sourceCollection);

        // Prepare batch for writing to the destination collection
        const batch = writeBatch(db);

        querySnapshot.forEach((doc1) => {
            const docRef = doc(destinationCollection, doc1.id); // Reference to the destination document
            batch.set(docRef, doc1.data()); // Add to batch
        });

        // Commit the batch
        await batch.commit();

    } catch (error) {
        console.error('Error duplicating collection:', error);
        res.status(500).send('Error duplicating collection.');
    }
});
utilsRouter.get("/cat", async (req, res) => {
    const ref = collection(db, 'categories');
    const s = await getDocs(ref);
    const categories = s.docs.map(doc => {
        const docData = doc.data();

        const ancestorsMap =
            docData.ancestors && new Map(docData.ancestors.map((ancestor: string, index: number) => [index, ancestor]));
        const ancestorsObject = ancestorsMap && Object.fromEntries(ancestorsMap);

        return {
            id: doc.id,
            data: {
                name: docData.name,
                path: ancestorsObject || {},
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

export const getAllSubCategories = async (categoryId: string) => {
    const docRef = doc(categoriesCollection, categoryId);
    const s = await getDoc(docRef);
    const pathData = s.data()?.path;
    const pathMap = new Map(Object.entries(pathData));
    const level = pathMap.size;
    console.log('level: ', level);
    const subCatsIds: string[] = [categoryId];

    const querySnapshot = await getDocs(query(categoriesCollection, where(`path.${level}`, "==", categoryId)));
    querySnapshot.docs.map((doc) => {
        const pathMap2 = new Map(Object.entries(doc.data()?.path));
        subCatsIds.push(doc.id);
    });

    console.log(subCatsIds);
    return(subCatsIds);
}