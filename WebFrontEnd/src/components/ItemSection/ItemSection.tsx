import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'
import { Image as IImage, OrderByParams, ProductCore, QueryParams, QueryParamsRelated } from "@interfaces";
import CategoryCard from "@components/CategoryCard";
import DropDown from "@components/DropDown";
import { capitalizeWords } from "@utils/utils";
import { useProductCores } from "@dbConn/hooks/UseProducts";
import { useCategories } from "@dbConn/hooks/UseCategories";
import { useEffect, useState } from "react";

interface Props {
    heading: string,
    itemType: 'Category' | 'Product' | ProductCore[],
    queryParams?: QueryParams | QueryParamsRelated,
    categoryId?: string,
    sorting?: boolean,
    seeMore?: {
        func: () => void,
        img: IImage
    },
    small?: boolean,
    noDecoration?: boolean
}

export const ItemSection = (props: Props) => {

    //console.log("itemType", props.itemType)

    const isProduct = props.itemType === 'Product';
    const isCategory = props.itemType === 'Category';
    const isDefault = props.queryParams?.type === 'default';
    const [orderBy,
        setOrderBy] = useState<OrderByParams | undefined>(undefined);
    const { data: productData,
        error: productError,
        isLoading: isProductLoading } = useProductCores(
            isProduct,
            isDefault ? { ...props.queryParams, orderBy: orderBy } as QueryParams : props.queryParams);
    const { data: categoryData, error: categoryError, isLoading: isCategoryLoading } = useCategories(isCategory, props.categoryId);

    // useEffect(() => {
    //     console.log(`PRODUCT:  ${JSON.stringify(productData)}`)
    // }, [productData]);

    return (
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'} onClick={props.seeMore?.func}>
                    <h2 className={props.seeMore?.func ? 'title--hover' : ''}>{capitalizeWords(props.heading)}</h2>
                    {props.noDecoration ? '' : <img src={waves} alt={'waves decoration'}></img>}
                </div>
                {props.sorting ? <DropDown onChange={(orderByObj) => setOrderBy(orderByObj)} /> : <></>}
            </div>
            <div className={`itemSectionContainer ${props.small ? 'small' : ''}`}>
                {isProduct && productData ?
                    productData.length !== 0 ? productData.map((item, index) => {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
                    })
                        :
                        <h3 className="itemSection__emptyText">V tejto kategórii momentálne nie sú žiadne produkty.</h3>
                    :
                    <></>}
                {isCategory && categoryData && categoryData.map((item, index) => {
                    return <CategoryCard key={index} name={item.name} img={item.img} id={item.id} />
                })}
                {isProduct && props.seeMore ? <CategoryCard func={props.seeMore.func} bigVariant name='Viac' img={{
                    url: props.seeMore.img.url,
                    alt: props.seeMore.img.alt
                }} /> : <></>}
                {typeof props.itemType != "string" ?
                    props.itemType.map((product) => <ProductCard name={product.name} price={product.price} img={product.img} id={product.id} />)
                    :
                    <></>}
            </div>
        </>


    )
}