import express from 'express';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {doc, getDoc} from 'firebase/firestore';
import {db} from "./firebaseConfig";

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true
}));

app.get('/test', async (req, res) => {
    const ref = await doc(db, 'items', '00000');
    const documentSnapshot = await getDoc(ref);
    const data = documentSnapshot.data();
    res.send(data);
})


server.listen(port, () => console.log(`CODO Backend server standby on port ${port}`));