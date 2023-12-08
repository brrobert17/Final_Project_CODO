import './style.css';
import NavBar from "@components/NavBar";
import {navigationPages} from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';
import Button from '@components/Button';
import {useEffect, useState} from "react";
import QuantitySelector from "@components/QuantitySelector";
import {useLocation} from "react-router-dom";
import {useProduct} from "@dbConn/hooks/UseProducts";
import Breadcrumbs from "@components/Breadcrumbs";
import blob from "@assets/Blob.svg";
import LargeHeading from '@components/LargeHeading';
import ItemSection from '@components/ItemSection';
import {useCategory} from '@dbConn/hooks/UseCategories';
import {QueryParamsRelated} from "@interfaces";

export const RELATED_LIMIT = 5;

export const Product = () => {

    // Getting id from URL
    const location = useLocation();
    const productId = location.pathname.split('/').pop();

    // States
    const [quantity, setQuantity] = useState(1);
    const [queryParamsRelated, setQueryParamsRelated] = useState<QueryParamsRelated>(
        {productId: productId ? productId : '', exclude: true, limit: RELATED_LIMIT, type: 'related'}
    );

    // React query hooks
    const {isLoading: dataLoading, isError: dataError, data} = useProduct(productId as string);
    const {
        isLoading: categoryLoading,
        isError: categoryError,
        data: categoryData
    } = useCategory(data?.category ? data.category : "");
    //const { data: relatedData, error: relatedError, isLoading: relatedLoading } = useRelatedProductsCores(data ? data.id : '', 5)

    // use Effects
    useEffect(() => {
        window.scrollTo(0, 0);
        setQueryParamsRelated({productId: productId ? productId : '', exclude: true, limit: RELATED_LIMIT, type: 'related'})
    }, [location]);

    return (
        <div className='page'>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'}/>
            <div className='product__main'>
                <div className='product__breadcrumbs'>
                    {data?.category && <Breadcrumbs categoryId={data.category}/>}
                </div>
                <div className='product__left'>
                    <img className='product__left__blob' src={blob} alt='Background decoration blob'></img>
                    {data && <ImageSlider images={data.img}/>}
                </div>
                <div className='product__right'>
                    {data && <LargeHeading heading={data.name} watermark={categoryData ? categoryData.name : ''}/>}
                    <p>{data && data.description}</p>
                    <PriceTag text={data ? Number(data.price) : 0}/>
                    <QuantitySelector quantity={quantity} onChange={setQuantity}/>
                    <div className='product__btn-cont'>
                        <Button text='Add to cart' onClick={() => console.log("hello world")}/>
                        <Button secondary text='Buy now' onClick={() => console.log("hello world")}/>
                    </div>
                </div>
                <div className='product__related'>
                    <ItemSection heading={"Related Products"} itemType={'Product'} queryParams={queryParamsRelated}/>
                </div>
            </div>
        </div>
    )
}