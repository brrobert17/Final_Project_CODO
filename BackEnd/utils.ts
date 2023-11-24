import {collection} from "@firebase/firestore";
import {categoriesCollection, db} from "./firebaseConfig";
import {doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {myCache} from "./app";
import {Category} from "../MobileFrontEnd/utils/interfaces";

export const generateRandomId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
export const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.toLocaleDateString("se");
    const time = today.toLocaleTimeString();
    return date + '-' + time;
};
export const createUniqueDocument = async (collectionPath: string): Promise<string> => {
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

//get all subCategories
export const getAllSubcategoriesCache = (categoryId: string) => {
    const categories = myCache.get('categories') as Category[];
    if (categories) {
        const category = categories.find(c => c.id === categoryId);
        const pathData = category?.path;
        const pathMap = pathData && new Map(Object.entries(pathData));
        const level = pathMap?.size || 0;
        console.log('level: ', level);
        const subCatsIds: string[] = [];
        const subCategories = categories.filter(category => category.path[level] === categoryId)
            .map(category => {
                subCatsIds.push(category.id);
                return category.name;
            });

        console.log(subCategories);
        console.log(subCatsIds);
    }

}
//get path(supraCategories)



