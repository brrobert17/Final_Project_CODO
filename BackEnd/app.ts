import express from 'express';
import cors from "cors";
import "dotenv/config"
import * as http from "http";
import 'firebase/firestore';
import {itemsRouter} from "./router/itemsRouter";
import {imagesRouter} from "./router/imagesRouter";
import {utilsRouter} from "./router/utilsRouter";


const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));

app.use(itemsRouter);
app.use(imagesRouter);
app.use(utilsRouter);

server.listen(port, () => console.log(`CODO Backend server standby on port ${port}`));