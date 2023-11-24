import express from "express";
import { fetchCollection } from "../middleware";
import {
    converterItemsCollection,
    converterItemsCoreCollection, converterTagsCollection, db,
    itemsCollection,
    tagsCollection
} from "../firebaseConfig";
import { doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc, orderBy, limit } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { generateRandomId } from "../utils";

export const itemsRouter = express.Router();

itemsRouter.get('/items', fetchCollection(converterItemsCollection));

itemsRouter.get('/items/cores', fetchCollection(converterItemsCoreCollection));

itemsRouter.get('/items1', async (req, res) => {
    const ref = query(itemsCollection, orderBy('added', 'asc'), limit(3));
    const ref2 = query(itemsCollection, orderBy('added', 'asc'), where('category', '==', 'fish'), limit(3));
    const ref3 = query(itemsCollection, orderBy('added', 'asc'), where('category', '==', 'coral'), limit(3));

    const s = await getDocs(ref);
    const s2 = await getDocs(ref2);
    const s3 = await getDocs(ref3);

    const items = s.docs.map(doc => doc.data());
    const items2 = s2.docs.map(doc => doc.data());
    const items3 = s3.docs.map(doc => doc.data());

    res.send({ items, items2, items3 });
})

itemsRouter.get('/items/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const docRef = doc(itemsCollection, productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(docSnap.data());
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }

})

itemsRouter.post('/items', async (req, res) => {
    try {
        let items = [];
        if (Array.isArray(req.body.items)) {
            items = req.body.items;
        } else {
            items.push(req.body.items);
            items = items.flat();
        }

        const responseMessages: string[] = [];
        const updatedTagsRefs = [];

        for (const item of items) {
            //creating document
            const uniqueId = await createUniqueDocument('items');
            const itemRef = doc(converterItemsCollection, uniqueId);
            const newDoc = await setDoc(itemRef, { ...item, added: new Date() });
            //tag-indexing
            for (const tagName of item.tags) {
                const tagRef = doc(converterTagsCollection, tagName);
                const querySnapshot = await getDoc(tagRef);
                if (!querySnapshot.exists()) {
                    console.log("creating new tag")
                    const newTagDocRef = doc(tagsCollection, tagName);
                    await setDoc(newTagDocRef, { items: [uniqueId] });
                    responseMessages.push(`new tag: ${tagName}`);
                } else {
                    console.log("existing tag")
                    const originalItemsArray = querySnapshot.data().items;
                    originalItemsArray.push(uniqueId);
                    updatedTagsRefs.push(tagRef);
                    await updateDoc(tagRef, {
                        items: originalItemsArray,
                    });
                }
            }
            responseMessages.push(`new item: ${itemRef.id}`);
        }
        for (const tagRef of updatedTagsRefs) {
            const tagDoc = await getDoc(tagRef);
            if (tagDoc.exists()) {
                let itemsArray = tagDoc.data().items;
                itemsArray = Array.from(new Set(itemsArray));
                await updateDoc(tagRef, { items: itemsArray });
            }
        }
        res.send({ messages: responseMessages });
    } catch (e) {
        console.error("Error: ", e);
        res.status(500).send(e);
    }
});

itemsRouter.delete('/items', async (req, res) => {
    try {
        const collectionsToReset = ['items', 'tags'];

        for (const collName of collectionsToReset) {
            const collectionRef = collection(db, collName);
            const querySnapshot = await getDocs(collectionRef);

            // Deleting each document in the collection
            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
            }

            // Creating and then deleting a dummy document
            const dummyDocRef = doc(collectionRef, 'dummy');
            await setDoc(dummyDocRef, { dummy: true });
            await deleteDoc(dummyDocRef);
        }

        res.status(200).send('Collections reset successfully.');
    } catch (error) {
        console.error('Error resetting collections:', error);
        res.status(500).send('Internal Server Error');
    }
});


const createUniqueDocument = async (collectionPath: string): Promise<string> => {
    let uniqueId = generateRandomId();
    let docRef = doc(db, collectionPath, uniqueId);
    let docSnap = await getDoc(docRef);

    while (docSnap.exists()) {
        uniqueId = generateRandomId();
        docRef = doc(db, collectionPath, uniqueId);
        docSnap = await getDoc(docRef);
    }
    return uniqueId;
};


