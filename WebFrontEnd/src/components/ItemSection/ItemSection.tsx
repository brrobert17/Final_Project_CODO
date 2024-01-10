import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'
import { Image as IImage, OrderByParams, QueryParams, QueryParamsRelated } from "@interfaces";
import CategoryCard from "@components/CategoryCard";
import DropDown from "@components/DropDown";
import { capitalizeWords } from "@utils/utils";
import { useProductCores } from "@dbConn/hooks/UseProducts";
import { useCategories } from "@dbConn/hooks/UseCategories";
import { useEffect, useState } from "react";

interface Props {
    heading: string,
    itemType: 'Category' | 'Product',
    queryParams?: QueryParams | QueryParamsRelated,
    categoryId?: string,
    sorting?: boolean,
    seeMore?: {
        func: () => void,
        img: IImage
    },
    small?: boolean
}

export const ItemSection = (props: Props) => {

    const isProduct = props.itemType === 'Product';
    const isDefault = props.queryParams?.type === 'default';
    const [ orderBy,
        setOrderBy] = useState<OrderByParams | undefined>(undefined);
    const { data: productData,
        error: productError,
        isLoading: isProductLoading } = useProductCores(
            isProduct,
        isDefault ? { ...props.queryParams, orderBy: orderBy } as QueryParams : props.queryParams);
    const { data: categoryData, error: categoryError, isLoading: isCategoryLoading } = useCategories(!isProduct, props.categoryId);

    // useEffect(() => {
    //     console.log(`PRODUCT:  ${JSON.stringify(productData)}`)
    // }, [productData]);

    return (
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'} onClick={props.seeMore?.func}>
                    <h2 className={props.seeMore?.func ? 'title--hover' : ''}>{capitalizeWords(props.heading)}</h2>
                    <img src={waves} alt={'waves decoration'}></img>
                </div>
                {props.sorting ? <DropDown onChange={(orderByObj) => setOrderBy(orderByObj)} /> : <></>}
            </div>
            <div className={`itemSectionContainer ${props.small ? 'small' : ''}`}>
                {isProduct && productData ?
                    productData.length !== 0 ? productData.map((item, index) => {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
                    })
                        :
                        <h4 className="itemSection__emptyText">There are no products in this category at the moment</h4>
                    :
                    <></>}
                {!isProduct && categoryData && categoryData.map((item, index) => {
                    return <CategoryCard key={index} name={item.name} img={item.img} id={item.id} />
                })}
                {isProduct && props.seeMore ? <CategoryCard func={props.seeMore.func} bigVariant name='See More' img={{
                    url: props.seeMore.img.url,
                    alt: props.seeMore.img.alt
                }} /> : <></>}
            </div>
        </>


    )
}