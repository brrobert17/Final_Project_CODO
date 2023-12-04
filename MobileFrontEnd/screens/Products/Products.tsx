import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";
import React, {useEffect, useState} from "react";
import {useItemsCoreSingle} from "@dbConn/hooks/UseItems";
import {QueryParam} from "@interfaces";
import {ScrollView, View} from "react-native";
import gStyle from "@gStyle";
import {HeaderAddOn, HeaderSmall} from "@components/Header";
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

const Products: React.FC<ProductsPropsWithRoute> = ({route}) => {
    const queryParam: QueryParam = {
        queryKey: 'myProducts',
        limit: 10,
        category: route.params.categoryId || ''
    }
    console.log('PRODUCST: ', route.params);
    const {isLoading, isError, data} = useItemsCoreSingle(queryParam);
    //console.log('Products: ',route.params.itemId)

    // useEffect(() => {
    //     if (data) {
    //         console.log('Item: ', data);
    //     }
    // }, [data]);
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    return (
        <>
            <View style={gStyle.container}>
                <HeaderSmall scrollY={scrollOffset}/>
                <ScrollView bounces={false}
                            onScroll={(e)=>setScrollOffset(e.nativeEvent.contentOffset.y)}
                            scrollEventThrottle={5}>
                    <HeaderAddOn heading={"Categories"} categoryId={route.params.categoryId || 'root'}/>
                    {route.params.categoryId && <Breadcrumbs categoryId={route.params.categoryId}/>}
                    {data && data[0].result.length>0 &&
                            <ItemSection
                                heading={route.params.categoryName || "All products"}
                                seeMore={{
                                    func: () => console.log('hello'),
                                    img: {url: "https://picsum.photos/210", alt: "something something"}
                                }}
                                items={data[0].result}/>
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