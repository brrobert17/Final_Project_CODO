import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image as IImage, QueryParams, QueryParamsRelated } from '@utils/interfaces'
import style from './style';
import gStyle, { pageMargin } from '@gStyle';
import Dropdown from '@components/DropDown'
import CategoryCard, { CategoryProps } from '@components/CategoryCard';
import ProductCard, { ProductProps } from '@components/ProductCard';
import { capitalizeWords } from '@utils/utils';
import { useProductCores } from "@dbConn/hooks/UseProducts";
import { useCategories } from "@dbConn/hooks/UseCategories";

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
    nested?: boolean
}

const ItemSection = (props: Props) => {

    const isProduct = props.itemType === 'Product';
    console.log('isProduct', isProduct, "props", props);
    const { data: productData, error: productError, isLoading: isProductLoading } = useProductCores(isProduct, props.queryParams);
    const { data: categoryData, error: categoryError, isLoading: isCategoryLoading } = useCategories(!isProduct, props.categoryId);
    useEffect(() => {
        console.log(`PRODUCT:  ${JSON.stringify(productData)}`)
    }, [productData]);
    const pseudoWidth = (Dimensions.get('window').width / 3) - (pageMargin * (1 + (1 / 3)));

    return (
        <View style={isProduct ? props.nested ? style.nestedCont : style.contMargin : style.cont} >
            <View style={style.header}>
                {props.seeMore
                    ?
                    <TouchableOpacity onPress={props.seeMore.func}>
                        <Text style={style.heading}>{capitalizeWords(props.heading)}</Text>
                    </TouchableOpacity>
                    :
                    <Text style={style.heading}>{capitalizeWords(props.heading)}</Text>
                }

                {props.sorting ? <Dropdown onChange={(foo) => console.log(foo)} /> : <></>}
            </View>
            <View style={style.list}>
                {isProduct && productData ?
                    productData.length !== 0 ? productData.map((item, index) => {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
                    })
                        :
                        <View style={style.noDataCont}>
                            <Text style={[gStyle.basicLarge, { textAlign: 'center' }]} >There are no Products in this category yet!</Text>
                        </View>
                    :
                    <></>}
                {!isProduct && categoryData && categoryData.map((item, index) => {
                    return <CategoryCard key={index} name={item.name} img={item.img} id={item.id} />
                })}
                {isProduct && props.seeMore ? <CategoryCard seeMoreVariant func={props.seeMore.func} name='See More' img={{
                    url: props.seeMore.img.url,
                    alt: props.seeMore.img.alt
                }} /> : <></>}
                {!isProduct && categoryData && categoryData.length % 3 === 2 && <View style={{ width: pseudoWidth }}></View>}
            </View>
        </View>
    );
};

export default ItemSection;