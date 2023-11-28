import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";
import React, {useEffect} from "react";
import {useItem, useItemsCoreSingle} from "@dbConn/hooks/UseItems";
import {QueryParam} from "@interfaces";

export interface ProductsProps {
    categoryId?: string
}

type ProductsScreenRouteProp = RouteProp<StackParams, 'Products'>;

type ProductsPropsWithRoute = {
    route: ProductsScreenRouteProp,
};

const Products: React.FC<ProductsPropsWithRoute> = ({route}) => {
    const queryParam: QueryParam[] = [{
        queryKey: 'myProducts',
        limit: 10,
        category: route.params.categoryId || ''

    }]
    const {isLoading, isError, data} = useItemsCoreSingle(queryParam);
    //console.log('Products: ',route.params.itemId)

    useEffect(() => {
        if (data) {
            console.log('Item: ', data);
        }
    }, [data]);
    return (
        <>
            {/*<SafeAreaView>*/}
            {/*    {data?.category && <Breadcrumbs categoryId={data.category}/>}*/}
            {/*    <ImageSlider images={sliderImages} />*/}
            {/*    <PriceTag price='500' />*/}
            {/*</SafeAreaView>*/}
            {/*<BtnIsland price='500' />*/}
        </>
    )
}

export default Products;