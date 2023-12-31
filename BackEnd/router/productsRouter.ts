import express from "express";
import { fetchCollection, fetchRelated } from "../middleware";
import {
    converterProductsCollection,
    converterProductsCoreCollection, converterTagsCollection, db,
    productsCollection,
    tagsCollection
} from "../firebaseConfig";
import { doc, getDoc, getDocs, query, setDoc, updateDoc, where, deleteDoc, orderBy, limit } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { createUniqueDocument } from "../utils";

export const productsRouter = express.Router();

productsRouter.get('', fetchCollection(converterProductsCollection));

productsRouter.get('/cores', fetchCollection(converterProductsCoreCollection));

productsRouter.get('/:id/related', fetchRelated(converterProductsCollection));

productsRouter.get('/:id/related/cores', fetchRelated(converterProductsCoreCollection));

productsRouter.get('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const docRef = doc(converterProductsCollection, productId);
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

productsRouter.post('', async (req, res) => {
    try {
        let products = [];
        if (Array.isArray(req.body.products)) {
            products = req.body.products;
        } else {
            products.push(req.body.products);
            products = products.flat();
        }

        const responseMessages: string[] = [];
        const updatedTagsRefs = [];

        for (const product of products) {
            //creating document
            const uniqueId = await createUniqueDocument('products');
            const productRef = doc(converterProductsCollection, uniqueId);
            const newDoc = await setDoc(productRef, { ...product, added: new Date() });
            //tag-indexing
            for (const tagName of product.tags) {
                const tagRef = doc(converterTagsCollection, tagName);
                const querySnapshot = await getDoc(tagRef);
                if (!querySnapshot.exists()) {
                    console.log("creating new tag")
                    const newTagDocRef = doc(tagsCollection, tagName);
                    await setDoc(newTagDocRef, { products: [uniqueId] });
                    responseMessages.push(`new tag: ${tagName}`);
                } else {
                    console.log("existing tag")
                    const originalProductsArray = querySnapshot.data().products;
                    originalProductsArray.push(uniqueId);
                    updatedTagsRefs.push(tagRef);
                    await updateDoc(tagRef, {
                        products: originalProductsArray,
                    });
                }
            }
            responseMessages.push(`new product: ${productRef.id}`);
        }
        for (const tagRef of updatedTagsRefs) {
            const tagDoc = await getDoc(tagRef);
            if (tagDoc.exists()) {
                let productsArray = tagDoc.data().products;
                productsArray = Array.from(new Set(productsArray));
                await updateDoc(tagRef, { products: productsArray });
            }
        }
        res.send({ messages: responseMessages });
    } catch (e) {
        console.error("Error: ", e);
        res.status(500).send(e);
    }
});

productsRouter.delete('', async (req, res) => {
    try {
        const collectionsToReset = ['products', 'tags'];

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



