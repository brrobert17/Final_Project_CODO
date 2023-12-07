import { RouteProp } from "@react-navigation/native";
import { StackParams } from "../../App";
import React, { useEffect, useState } from "react";
import { useProductsCoreSingle } from "@dbConn/hooks/UseProducts";
import { QueryParam } from "@interfaces";
import { ScrollView, View, Text } from "react-native";
import gStyle from "@gStyle";
import style from './style';
import { HeaderAddOn, HeaderSmall } from "@components/Header";
import ItemSection from "@components/ItemSection";
import Breadcrumbs from "@components/Breadcrumbs";

export interface ProductsProps {
    categoryId?: string,
    categoryName?: string
}

type ProductsScreenRouteProp = RouteProp<StackParams, 'Products'>;

type ProductsPropsWithRoute = {
    route: ProductsScreenRouteProp,
};

const Products: React.FC<ProductsPropsWithRoute> = ({ route }) => {
    const queryParam: QueryParam = {
        queryKey: 'myProducts',
        limit: 10,
        category: route.params.categoryId || 'root'
    }
    console.log('PRODUCST: ', route.params);
    const { isLoading, isError, data } = useProductsCoreSingle(queryParam);
    //console.log('Products: ',route.params.productId)

    useEffect(() => {
        if (data) {
            console.log('Product: ', data);
        }
    }, [data]);
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    return (
        <>
            <View style={gStyle.container}>
                <HeaderSmall scrollY={scrollOffset} />
                <ScrollView 
                    bounces={false}
                    onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
                    scrollEventThrottle={5}>
                    <HeaderAddOn breadcrumbs={route.params.categoryId && <Breadcrumbs categoryId={route.params.categoryId} />} heading={"Categories"} categoryId={route.params.categoryId || 'root'} />
                    
                    {data && data[0].result.length > 0 ?
                        <ItemSection
                            heading={route.params.categoryName || "All products"}
                            items={data[0].result} />
                    :
                        <View style={style.noDataCont}>
                            <Text style={[gStyle.basicLarge, {textAlign: 'center'}]} >There are no Products in this category yet!</Text>
                        </View>
                    }
                </ScrollView>
            </View>
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