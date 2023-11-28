import {View, ScrollView} from "react-native";
import gStyle from "@gStyle";
import {HeaderAddOn, HeaderSmall} from "@components/Header";
import ItemSection from "@components/ItemSection";
import {useItemsCoreMulti} from "@dbConn/hooks/UseItems";
import {QueryParam} from "@utils/interfaces";
import {useMemo, useState} from "react";

const Home = () => {

    const params: QueryParam[] = [
        {queryKey: 'allProducts', limit:3},
        {queryKey: 'fishes', category: 'fishes', limit: 3},
        {queryKey: 'corals', category: 'corals', limit: 3},
        {queryKey: 'invertebrates', category: 'invertebrates', limit: 3},
        ];

    const {
        data,
        error,
        isLoading
    } = useItemsCoreMulti(params);

    const memoizedData = useMemo(() => {
        if(!data) return;

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
            <HeaderSmall scrollY={scrollOffset}/>
            <ScrollView bounces={false}
                        onScroll={(e)=>setScrollOffset(e.nativeEvent.contentOffset.y)}
                        scrollEventThrottle={5}>
                <HeaderAddOn/>
                {memoizedData?.allProductsData && memoizedData.fishData && memoizedData.coralData && memoizedData.invertebrateData &&
                <>
                <ItemSection
                    heading="All products"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/210", alt: "something something"}
                    }}
                    items={memoizedData.allProductsData}/>
                <ItemSection
                    heading="Fish"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={memoizedData.fishData}/>
                <ItemSection
                    heading="Corals"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={memoizedData.coralData}/>
                <ItemSection
                    heading="Invertebrates"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={memoizedData.invertebrateData}/>
                    </>}
            </ScrollView>
        </View>
    )
}

export default Home;