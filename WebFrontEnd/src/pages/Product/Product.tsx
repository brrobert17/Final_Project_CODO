import './style.css';
import NavBar from "@components/NavBar";
import { navigationPages } from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';
import Button from '@components/Button';
import { useEffect, useState } from "react";
import QuantitySelector from "@components/QuantitySelector";
import { useLocation } from "react-router-dom";
import { useProduct } from "@dbConn/hooks/UseProducts";
import Breadcrumbs from "@components/Breadcrumbs";
import blob from "@assets/Blob.svg";
import LargeHeading from '@components/LargeHeading';
import ItemSection from '@components/ItemSection';
import { useCategory } from '@dbConn/hooks/UseCategories';
import { QueryParamsRelated } from "@interfaces";
import { WysiwygIndicator } from '@components/WysiwygIndicator/WysiwygIndicator';
import { StockIndicator } from '@components/indicators/StockIndicator';

export const RELATED_LIMIT = 5;

export const Product = () => {

    // Getting id from URL
    const location = useLocation();
    const productId = location.pathname.split('/').pop();

    // States
    const [quantity, setQuantity] = useState(1);
    const [queryParamsRelated, setQueryParamsRelated] = useState<QueryParamsRelated>(
        { productId: productId ? productId : '', exclude: true, limit: RELATED_LIMIT, type: 'related' }
    );

    // React query hooks
    const { isLoading: dataLoading, isError: dataError, data } = useProduct(productId as string);
    const {
        isLoading: categoryLoading,
        isError: categoryError,
        data: categoryData
    } = useCategory(data?.category ? data.category : "");

    // use Effects
    useEffect(() => {
        window.scrollTo(0, 0);
        setQueryParamsRelated({ productId: productId ? productId : '', exclude: true, limit: RELATED_LIMIT, type: 'related' })
    }, [location]);

    return (
        <div className='page'>
            <NavBar size={'small'} pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
            <div className={`product__main ${data?.description && data.description.trim() !== '' ? 'has-description' : ''}`}>
                <div className='product__breadcrumbs'>
                    {data?.category && <Breadcrumbs categoryId={data.category} />}
                </div>
                <div className='product__show'>
                    <img className='product__show__blob' src={blob} alt='Background decoration blob'></img>
                    {data && <ImageSlider images={data.img} />}
                </div>

                <div className='product__heading'>
                    {data && <LargeHeading heading={data.name} watermark={categoryData ? categoryData.name : ''} />}
                    <div className='product__heading-info'>
                        <div className='product__id' 
                            title="Kopírovať kliknutím"
                            onClick={() => {
                                if (data?.id) {
                                    navigator.clipboard.writeText(data.id);
                                }
                            }}>
                            <svg className="product__id-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <rect x="6" y="6" width="9" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" fill="#1F2B37" />
                                <rect x="10" y="10" width="9" height="9" rx="2" strokeLinecap="round" strokeLinejoin="round" fill="#1F2B37" />
                            </svg>
                            <span>{data?.id}</span>
                        </div>
                        {data?.wysiwyg && <WysiwygIndicator />}
                    </div>
                </div>
                {data?.description && data.description.trim() !== '' && (
                    <div className='product__description'>
                        <p>{data.description}</p>
                    </div>
                )}
                <div className='product__pricetag'>
                    <StockIndicator stock={data?.stock || 0} isWysiwyg={data?.wysiwyg} />
                    <PriceTag text={data ? Number(data.price) : 0} />
                </div>
                {/* <div className='product__quantity-select'>
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                </div> */}
                {/*<div className='product__btn-cont'>*/}
                {/*    <Button text='Add to cart' onClick={() => console.log("hello world")} />*/}
                {/*    <Button secondary text='Buy now' onClick={() => console.log("hello world")} />*/}
                {/*</div>*/}
                <div className='product__related'>
                    <ItemSection heading={"Related Products"} itemType={'Product'} queryParams={queryParamsRelated} />
                </div>
            </div>
        </div>
    )
}