import Heading from "components/Heading";
import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'
import {Image as IImage, QueryParams} from "@interfaces";
import type { ProductProps } from '@components/ProductCard'
import type { CategoryProps } from '@components/CategoryCard'
import CategoryCard from "@components/CategoryCard";
import DropDown from "@components/DropDown";
import {capitalizeWords} from "@utils/utils";
import {useProductsCores} from "@dbConn/hooks/UseProducts";
import {useCategories} from "@dbConn/hooks/UseCategories";

interface Props {
    heading: string,
    itemType: 'Category' | 'Product',
    queryParams?: QueryParams,
    categoryId?: string,
    sorting?: boolean,
    seeMore?: {
        func: ()=>void,
        img: IImage
    },
    small?: boolean
}

export const ItemSection = (props: Props) => {

    const isProduct = props.itemType === 'Product'

    const {data: productData, error:productError, isLoading:isProductLoading} = useProductsCores(isProduct, props.queryParams);
    const {data: categoryData, error:categoryError, isLoading:isCategoryLoading} = useCategories(!isProduct, props.categoryId);

    return (
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'} onClick={props.seeMore?.func}>
                    <h2 className={props.seeMore?.func ? 'title--hover': ''}>{capitalizeWords(props.heading)}</h2>
                    <img src={waves} alt={'waves decoration'}></img>
                </div>
                {props.sorting ? <DropDown onChange={(foo) => console.log(foo)} /> : <></>}
            </div>
            <div className={`itemSectionContainer ${props.small && 'small'}`}>
                {productData && productData.map((item, index) => {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
                })}
                {categoryData && categoryData.map((item, index)=> {
                    return <CategoryCard key={index} name={item.name} img={item.img} id={item.id}/>
                })}
                {isProduct && props.seeMore ? <CategoryCard func={props.seeMore.func} bigVariant name='See More' img={{
                    url: props.seeMore.img.url,
                    alt: props.seeMore.img.alt
                }}/> : <></>}
            </div>
        </>


    )
}