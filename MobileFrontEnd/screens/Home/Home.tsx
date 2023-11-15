import { SafeAreaView, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { api } from "@dbConn/axios";
import React, { createContext, useState } from "react";
import gStyle, { pageMargin } from "@gStyle";
import { HeaderAddOn, HeaderSmall } from "@components/Header";
import ItemSection from "@components/ItemSection";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';


type HomeContextType = {
    scrollOffset: number;
    setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
    headerHeight: number,
};

export const HomeContext = createContext<HomeContextType | null>(null);

const Home = () => {

    // States
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    // Event Handlers
    const scrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        setScrollOffset(e.nativeEvent.contentOffset.y);
    }

    // JSX
    return (
        <HomeContext.Provider value={{ scrollOffset, setHeaderHeight, headerHeight }}>
            <View style={gStyle.container}>
                <HeaderSmall />
                <ScrollView
                    onScroll={scrollHandler}
                    scrollEventThrottle={5}
                    bounces={false}
                >
                    <HeaderAddOn />

                    <ItemSection
                        heading="Corals"
                        seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/210", alt: "something something" } }}
                        items={[
                            { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/201", alt: "something something" } },
                            { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/202", alt: "something something" } },
                            { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/203", alt: "something something" } }
                        ]} />
                    <ItemSection
                        heading="Fish"
                        seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/203", alt: "something something" } }}
                        items={[
                            { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/206", alt: "something something" } },
                            { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/204", alt: "something something" } },
                            { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/205", alt: "something something" } }
                        ]} />
                    <ItemSection
                        heading="Invertibrates"
                        seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/202", alt: "something something" } }}
                        items={[
                            { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/207", alt: "something something" } },
                            { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/208", alt: "something something" } },
                            { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/209", alt: "something something" } }
                        ]} />
                </ScrollView>

            </View>
        </HomeContext.Provider>
    )
}


export default Home;