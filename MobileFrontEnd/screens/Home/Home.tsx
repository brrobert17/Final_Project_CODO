import {View, ScrollView} from "react-native";
import gStyle from "@gStyle";
import {HeaderAddOn, HeaderSmall} from "@components/Header";
import ItemSection from "@components/ItemSection";
import {useItemsCore} from "@dbConn/hooks/UseItems";
import {QueryParam} from "@utils/interfaces";
import {useMemo, useState} from "react";

const Home = () => {

    const params: QueryParam[] = [
        {queryKey: 'allProducts', limit:3},
        {queryKey: 'fish', category: 'fish', limit: 3},
        {queryKey: 'coral', category: 'coral', limit: 3},
        {queryKey: 'invertebrate', category: 'invertebrate', limit: 3},
        ];

    const {
        data,
        error,
        isLoading
    } = useItemsCore(params);

    const memoizedData = useMemo(() => {
        if(!data) return;

        const allProductsData = data.find(d => d.queryKey === 'allProducts')?.result;
        const fishData = data.find(d => d.queryKey === 'fish')?.result;
        const coralData = data.find(d => d.queryKey === 'coral')?.result;
        const invertebrateData = data.find(d => d.queryKey === 'invertebrate')?.result;

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