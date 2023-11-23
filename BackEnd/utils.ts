import {collection} from "@firebase/firestore";
import {db} from "./firebaseConfig";
import {getDocs} from "firebase/firestore";

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

// for (let i = 0; i < 20; i++) {
//     console.log(generateRandomId());
// }

export const allCategoriesIds = async ()=> {
    const ref = collection(db, 'categories');
    const s= await getDocs(ref);
    const categories = s.docs.map(doc=> {
        return {
            id: doc.id,
            data: doc.data()
        }
    })
    console.log(categories);
}


