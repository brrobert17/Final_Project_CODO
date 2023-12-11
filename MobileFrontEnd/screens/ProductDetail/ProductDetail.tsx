import BtnIsland from '@components/BtnIsland';
import ImageSlider from '@components/ImageSlider/ImageSlider';
import PriceTag from '@components/PriceTag';
import QuantitySelector from '@components/QuantitySelector';
import { SafeAreaView, ScrollView, View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Breadcrumbs from "@components/Breadcrumbs";
import React, { useEffect, useState } from "react";
import { useProduct } from "@dbConn/hooks/UseProducts";
import { RouteProp } from "@react-navigation/native";
import { StackParams } from "../../App";
import gStyle from "@gStyle";
import { HeaderSmall } from '@components/Header';
import style from "./style";
import BlobIcon from "@assets/Blob.svg";
import ItemSection from '@components/ItemSection';

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
    productId: string
}
type DetailScreenRouteProp = RouteProp<StackParams, 'Detail'>;

type DetailPropsWithRoute = {
    route: DetailScreenRouteProp,
};

const ProductDetail: React.FC<DetailPropsWithRoute> = ({ route }) => {
    const { isLoading, isError, data } = useProduct(route.params.productId as string);
    const props = route.params

    return (
        <View style={[gStyle.container, style.page]}>
            <HeaderSmall small />
            <KeyboardAvoidingView
                style={style.avoidKeyboard}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 40}
            >
                {data &&
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={style.scroll}>
                        {data?.category && <Breadcrumbs categoryId={data.category} />}
                        <Text style={style.wysiwyg}><Text style={gStyle.h1Xl}>{data.name}</Text>{data.wysiwyg ? '( WYSIWYG )' : ''}</Text>
                        <PriceTag price={data.price ? Number(data.price) : 0} />
                        <View style={style.sliderCont}>
                            <BlobIcon style={style.blob} width={591} height={485} />
                            <ImageSlider images={data.img} />
                        </View>
                        <View style={style.quantityCont}>
                            <QuantitySelector wysiwyg={data.wysiwyg} onChange={(text) => console.log("count: ", text)} />
                        </View>
                        <Text style={gStyle.basic}>{data.description}</Text>
                        <ItemSection nested itemType='Product' heading='Related' queryParams={{type: 'related',productId: props.productId, exclude: true, limit: 4}} />
                    </ScrollView>
                }
            </KeyboardAvoidingView>
            <BtnIsland price={data?.price ? Number(data.price) : 0} />
        </View>
    )
}

export default ProductDetail;