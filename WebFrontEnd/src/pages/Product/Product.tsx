import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';
import Button from '@components/Button';
import {useEffect, useState} from "react";
import QuantitySelector from "@components/QuantitySelector";
import {useLocation} from "react-router-dom";
import {useItem} from "@dbConn/hooks/UseItems";
import {useCategories} from "@dbConn/hooks/UseCategories";
import Breadcrumbs from "@components/Breadcrumbs";

export const Product = () => {
    const location = useLocation();
    const itemId = location.pathname.split('/').pop();
    const [quantity, setQuantity] = useState(1);
    const {isLoading, isError, data} = useItem(itemId as string);
    const {isLoading:isCategoryLoading, isError:isErrorCategory, data:dataCategory } = useCategories(data?.category as string);

    useEffect(() => {
        if (data && dataCategory) {
            console.log('Item: ', data);
            console.log('Category: ', dataCategory);
        }
    }, [data, dataCategory]);

    return (
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            {dataCategory && <Breadcrumbs categories={dataCategory}/>}
            <ImageSlider />
            <PriceTag text='500' />
            <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
            <div>
                <Button text='Add to cart' onClick={() => console.log("hello world")} />
                <Button secondary text='Buy now' onClick={() => console.log("hello world")} />
            </div>
        </>
    )
}