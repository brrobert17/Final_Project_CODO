import express from 'express';
import cors from 'cors';
import { Translator } from './translator';
import { productsRouter } from './productsRouter';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));


app.use('/api/v1/:lang/products', productsRouter);
app.use(Translator);

app.listen(5000, () => {
    console.log('2backend is running on port 5000')
});

