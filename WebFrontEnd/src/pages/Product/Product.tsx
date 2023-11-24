import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';
import Button from '@components/Button';

export const Product = () => {
    return (
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div>
                Single Product
            </div>
            <ImageSlider />
            <PriceTag text='500' />
            <div>
                <Button text='Add to cart' onClick={() => console.log("hello world")} />
                <Button secondary text='Buy now' onClick={() => console.log("hello world")} />
            </div>
        </>
    )
}