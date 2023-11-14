import express from 'express';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db, itemsCollection, storage} from "./firebaseConfig";
import {createUniqueDocument, giveCurrentDateTime} from "./utils";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import multer from "multer";

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true
}));
const upload = multer({limits: { fieldSize: 25 * 1024 * 1024 }}).single('image');

app.get('/test', async (req, res) => {
    const ref = await doc(db, 'items', '00000');
    const documentSnapshot = await getDoc(ref);
    const data = documentSnapshot.data();
    res.send(data);
})

app.post('/items', async (req, res)=> {
    const docRef = doc(itemsCollection, await createUniqueDocument('items'));
    await setDoc(docRef, req.body.item);
    console.log(`new item added with id: ${docRef.id}`);
})
app.post('/images', upload, async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const dateTime = giveCurrentDateTime();
    const imageStoragePath = `itemsImages/img${dateTime}`;
    const storageRef = ref(storage, imageStoragePath);

    try {
        const snapshot = await uploadBytes(storageRef, req.file.buffer, {
            contentType: req.file.mimetype
        });
        const imgDownloadURL = snapshot && await getDownloadURL(snapshot.ref);
        console.log("Success uploading image: " + imgDownloadURL);
        res.status(200).send({ url: imgDownloadURL });
    } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).send('Error uploading the image.');
    }
});


server.listen(port, () => console.log(`CODO Backend server standby on port ${port}`));