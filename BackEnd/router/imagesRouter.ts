import express from "express";
import {giveCurrentDateTime} from "../utils";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebaseConfig";
import multer from "multer";

export const imagesRouter = express.Router();

const upload = multer({limits: {fieldSize: 25 * 1024 * 1024}}).single('image');
imagesRouter.post('/images', upload, async (req, res) => {
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
        res.status(200).send({url: imgDownloadURL});
    } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).send('Error uploading the image.');
    }
});
