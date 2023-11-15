import { useContext, useEffect, useState } from "react";
import { HEADER_SCROLL_THRESHOLD, HeaderSmall } from "./Header";
import { pageMargin } from "@gStyle";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { HomeContext } from "@screens/Home/Home";
import { LayoutChangeEvent, View } from "react-native";
import _ from "lodash";
import SearchBar from "@components/SearchBar";
import ItemSection from "@components/ItemSection";
import style from "./style";

export const HeaderLarge = () => {

    const [smallHeaderHeight, setSmallHeaderHeight] = useState(0);
    const [addOnHeaderHeight, setAddOnHeaderHeight] = useState(0);
    const range = - (addOnHeaderHeight + (pageMargin * 2));
    const translateValue = useSharedValue(0);


    const scrollY = useContext(HomeContext)?.scrollOffset;
    const setHeaderHeight = useContext(HomeContext)?.setHeaderHeight;

    // Handling onLayout
    const onHeaderLayout = (e: LayoutChangeEvent) => {
        const { height } = e.nativeEvent.layout;
        if (height != 0)
            debouncedSetHeaderHeight(height);
    };

    // Debouncing onLayout
    const debouncedSetHeaderHeight = _.debounce((height: number) => {
        setSmallHeaderHeight(height);
    }, 300);




    useEffect(() => {
        if (scrollY && scrollY > HEADER_SCROLL_THRESHOLD) {
            translateValue.value = range;
            if (setHeaderHeight) setHeaderHeight(smallHeaderHeight + addOnHeaderHeight)
        } else {
            translateValue.value = smallHeaderHeight;
        }
    }, [scrollY]);

    useEffect(() => {

        console.log("combined height: ", (smallHeaderHeight + addOnHeaderHeight));
        if (setHeaderHeight) setHeaderHeight(smallHeaderHeight + addOnHeaderHeight);

    }, [smallHeaderHeight, addOnHeaderHeight]);

    useEffect(() => {
        console.log("small header height", smallHeaderHeight);
        translateValue.value = smallHeaderHeight;
    }, [smallHeaderHeight])

    useEffect(() => {
        console.log("add on header height", addOnHeaderHeight);
    }, [addOnHeaderHeight])

    const headerOnScrollAnimatedStyle = useAnimatedStyle(() => {
        return {
            top: withTiming(translateValue.value, {
                duration: 200, // Duration of the fade animation
            })
        }
    })

    return (
        <View style={style.largeCont} onLayout={onHeaderLayout}>
            <HeaderSmall />
            <Animated.View style={[headerOnScrollAnimatedStyle, style.addOnHeaderCont]} onLayout={(e) => setAddOnHeaderHeight(e.nativeEvent.layout.height)}>
                <View style={{ ...style.safeAreaCont, overflow: "visible" }}>
                    <SearchBar />
                    <ItemSection heading='Categories' items={[
                        { name: "corals", img: { url: "https://picsum.photos/201", alt: "something something" } },
                        { name: "fish", img: { url: "https://picsum.photos/202", alt: "something something" } },
                        { name: "other", img: { url: "https://picsum.photos/203", alt: "something something" } },
                    ]} />
                </View>
            </Animated.View>
        </View>
    )
}