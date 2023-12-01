import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';
import Button from '@components/Button';
import { useEffect, useState } from "react";
import QuantitySelector from "@components/QuantitySelector";
import { useLocation } from "react-router-dom";
import { useItem, useItemsCoreSingle, useRelatedItems, useRelatedItemsCores } from "@dbConn/hooks/UseItems";
import Breadcrumbs from "@components/Breadcrumbs";
import blob from "@assets/Blob.svg";
import LargeHeading from '@components/LargeHeading';
import ItemSection from '@components/ItemSection';
import { useCategory } from '@dbConn/hooks/UseCategories';


export const Product = () => {

    const location = useLocation();
    const itemId = location.pathname.split('/').pop();
    const [quantity, setQuantity] = useState(1);
    const { isLoading: dataLoading, isError: dataError, data } = useItem(itemId as string);
    const { isLoading: categoryLoading, isError: categoryError, data: categoryData } = useCategory(data?.category ? data.category : "")
    const { data: relatedData, error: relatedError, isLoading: relatedLoading } = useRelatedItemsCores(data ? data.id : '', 2)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className='page'>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div className='product__main'>
                <div className='product__breadcrumbs'>
                    {data?.category && <Breadcrumbs categoryId={data.category} />}
                </div>
                <div className='product__left'>
                    <img className='product__left__blob' src={blob} alt='Background decoration blob'></img>
                    {data && <ImageSlider images={data.img} />}
                </div>
                <div className='product__right'>
                    {data && <LargeHeading heading={data.name} watermark={categoryData ? categoryData.name : ''} />}
                    <p>{data && data.description}</p>
                    <PriceTag text={data ? Number(data.price) : 0} />
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                    <div className='product__btn-cont'>
                        <Button text='Add to cart' onClick={() => console.log("hello world")} />
                        <Button secondary text='Buy now' onClick={() => console.log("hello world")} />
                    </div>
                </div>
                <div className='product__related'>
                    {relatedData && <ItemSection heading={"Related Products"} items={relatedData} />}
                </div>
            </div>
        </div>
    )
}