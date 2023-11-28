import BtnIsland from '@components/BtnIsland';
import ImageSlider from '@components/ImageSlider/ImageSlider';
import PriceTag from '@components/PriceTag';
import QuantitySelector from '@components/QuantitySelector';
import { SafeAreaView, View } from 'react-native';
import Breadcrumbs from "@components/Breadcrumbs";
import React, {useEffect} from "react";
import {useItem} from "@dbConn/hooks/UseItems";
import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";

const sliderImages = [
    {
        url: "https://picsum.photos/500/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/510/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/510/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/421",
        alt: "random image"
    }
]
export interface DetailProps {
    itemId?: string
}
type DetailScreenRouteProp = RouteProp<StackParams, 'Detail'>;

type DetailPropsWithRoute = {
    route: DetailScreenRouteProp,
};

const ProductDetail: React.FC<DetailPropsWithRoute> = ({route}) => {
    const {isLoading, isError, data} = useItem(route.params.itemId as string);
    console.log('DETAIL: ',route.params.itemId)

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
                <QuantitySelector wisiwyg onChange={(text) => console.log("count: ", text)} />
            </SafeAreaView>
            <BtnIsland price='500' />
        </>
    )
}

export default ProductDetail;