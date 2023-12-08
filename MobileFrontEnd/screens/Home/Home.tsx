import { View, ScrollView } from "react-native";
import gStyle from "@gStyle";
import { HeaderAddOn, HeaderSmall } from "@components/Header";
import ItemSection from "@components/ItemSection";
import { useProductsCoreMulti } from "@dbConn/hooks/UseProducts";
import { QueryParams } from "@utils/interfaces";
import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";

const Home = () => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();

    const params: QueryParams[] = [
        { queryKey: 'allProducts', limit: 3 },
        { queryKey: 'fishes', categoryId: 'Q0i1y5', limit: 3 },
        { queryKey: 'corals', categoryId: 'rUm6nc', limit: 3 },
        { queryKey: 'invertebrates', categoryId: 'aRu8ro', limit: 3 },
    ];

    const {
        data,
        error,
        isLoading
    } = useProductsCoreMulti(params);

    const memoizedData = useMemo(() => {
        if (!data) return;

        const allProductsData = data.find(d => d.queryKey === 'allProducts')?.result;
        const fishData = data.find(d => d.queryKey === 'fishes')?.result;
        const coralData = data.find(d => d.queryKey === 'corals')?.result;
        const invertebrateData = data.find(d => d.queryKey === 'invertebrates')?.result;

        return { allProductsData, fishData, coralData, invertebrateData };
    }, [data]);

    if (isLoading) {
        console.log('loading');
    } else if (error) {
        console.error('error: ', error);
    } else {
        console.log('success');
    }

    const [scrollOffset, setScrollOffset] = useState<number>(0);

    return (
        <View style={gStyle.container}>
            <HeaderSmall scrollY={scrollOffset} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={5}>
                <HeaderAddOn heading={"Categories"} categoryId={'root'} />
                {memoizedData?.allProductsData && memoizedData.fishData && memoizedData.coralData && memoizedData.invertebrateData &&
                    <>
                        <ItemSection
                            heading="All products"
                            seeMore={{
                                func: () => nav.push('Products', { categoryId: 'root', categoryName: 'All products' }),
                                img: { url: "https://picsum.photos/210", alt: "something something" }
                            }}
                            items={memoizedData.allProductsData} />
                        <ItemSection
                            heading="Fish"
                            seeMore={{
                                func: () => nav.push('Products', { categoryId: 'Q0i1y5', categoryName: 'Fishes' }),
                                img: { url: "https://picsum.photos/203", alt: "something something" }
                            }}
                            items={memoizedData.fishData} />
                        <ItemSection
                            heading="Corals"
                            seeMore={{
                                func: () => nav.push('Products', { categoryId: 'rUm6nc', categoryName: 'Corals' }),
                                img: { url: "https://picsum.photos/203", alt: "something something" }
                            }}
                            items={memoizedData.coralData} />
                        <ItemSection
                            heading="Invertebrates"
                            seeMore={{
                                func: () => nav.push('Products', { categoryId: 'aRu8ro', categoryName: 'Invertebrates' }),
                                img: { url: "https://picsum.photos/203", alt: "something something" }
                            }}
                            items={memoizedData.invertebrateData} />
                    </>}
            </ScrollView>
        </View>
    )
}

export default Home;