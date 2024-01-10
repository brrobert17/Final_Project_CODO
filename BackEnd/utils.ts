import {db} from "./firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import {myCache} from "./app";
import {Category, CategoryCore, MenuCategory} from "../MobileFrontEnd/utils/interfaces";

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

//get a single category by id (I don't know if cache is necessary)
export const getCategoryCache = (categoryId: string) => {
    const categories = myCache.get('categories') as Category[];

    if (categories) {
        return categories.find(c => c.id === categoryId);
    }
}

//get all subCategories
export const getAllSubcategoriesCache = (categoryId: string) => {
    const categories = myCache.get('categories') as Category[];
    if (categories) {
        let subCategories = [];
        const subCatCores: CategoryCore[] = [];
        if (categoryId === 'root') {
            subCategories = categories.filter(category => !category.path[0]);
        } else {
            const category = categories.find(c => c.id === categoryId);
            const pathData = category?.path;
            const pathMap = pathData && new Map(Object.entries(pathData));
            const level = pathMap?.size || 0;
            subCategories = categories.filter(category => category.path[level] === categoryId);
        }
        // subCategories.forEach(c => {
        //     subCatCores.push({
        //         id: c.id,
        //         name: c.name
        //     })
        // })
        // console.log(subCategories);
        // console.log(subCatCores);
        return (subCategories);
    }
}
export const getDirectSubcategoriesCache = (categoryId: string) => {
    const categories = myCache.get('categories') as Category[];
    if (categories) {
        let subCategories = [];
        if (categoryId === 'root') {
            subCategories = categories.filter(category => !category.path[0]);
        } else {
            const category = categories.find(c => c.id === categoryId);
            const pathData = category?.path;
            const pathMap = pathData && new Map(Object.entries(pathData));
            const level = pathMap?.size || 0;
            subCategories = categories.filter(category => category.path[level] === categoryId
            && !category.path[level+1]);
        }
        return (subCategories);
    }
}
//get path(supraCategories)
export const getAllSupraCategoriesCache = (categoryId: string) => {
    const categories = myCache.get('categories') as Category[];
    if (categories) {
        const category = categories.find(c => c.id === categoryId);
        const pathData = category?.path;
        const pathMap = pathData && new Map(Object.entries(pathData));
        const supraCategories: CategoryCore[] = [];
        pathMap?.forEach((value, key) => {
            const pathName = categories.find(c => c.id === value);
            pathName && supraCategories.push({
                id: value,
                name: pathName.name
            });
        });
        category?.name && category.id && supraCategories.push({id:category.id, name:category.name});
        return (supraCategories)
    }
}

export const nestCategories = (categories: Category[], parentId: string | null = null, level: number = 0): MenuCategory[] => {
    const currentLevelCategories = categories.filter(c => parentId ? Object.keys(c.path).length === level && c.path[level - 1] === parentId : Object.keys(c.path).length === level);
    let currentLevelMenuCategories: MenuCategory[] = [];
    if (currentLevelCategories.length === 0) {
        return currentLevelMenuCategories;
    } else {
        currentLevelMenuCategories = currentLevelCategories.map(c => {
            const newCategory: MenuCategory = {
                id: c.id,
                name: c.name,
                level: level + 1,
            };
            const children = nestCategories(categories, c.id, level + 1)
            children.length > 0 && (newCategory.children = children);

            return newCategory;
        })
    }
    return currentLevelMenuCategories;
}

