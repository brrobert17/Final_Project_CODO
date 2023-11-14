import { doc, getDoc } from "firebase/firestore";
import {db} from "./firebaseConfig";

const generateRandomId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
export const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.toLocaleDateString("se");
    const time = today.toLocaleTimeString();
    return date + '-' + time;
};
