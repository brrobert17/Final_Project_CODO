import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";
import React, {useEffect} from "react";
import {useItem} from "@dbConn/hooks/UseItems";
import {SafeAreaView} from "react-native";
import Breadcrumbs from "@components/Breadcrumbs";
import ImageSlider from "@components/ImageSlider/ImageSlider";
import PriceTag from "@components/PriceTag";
import BtnIsland from "@components/BtnIsland";

export interface ProductsProps {
    categoryId?: string
}
type ProductsScreenRouteProp = RouteProp<StackParams, 'Products'>;

type ProductsPropsWithRoute = {
    route: ProductsScreenRouteProp,
};

const Products: React.FC<ProductsPropsWithRoute> = ({route}) => {
    const {isLoading, isError, data} = useItem(route.params.itemId as string);
    console.log('Products: ',route.params.itemId)

    useEffect(() => {
        if (data) {
            console.log('Item: ', data);
        }
    }, [data]);
    return (
        <>
            <SafeAreaView>
                {data?.category && <Breadcrumbs categoryId={data.category}/>}
                <ImageSlider images={sliderImages} />
                <PriceTag price='500' />
            </SafeAreaView>
            <BtnIsland price='500' />
        </>
    )
}

export default ProductDetail;