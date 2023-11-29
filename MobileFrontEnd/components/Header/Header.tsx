import { View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, LayoutChangeEvent } from "react-native";
import style from "./style";
import HeaderBtn from "./HeaderBtn/HeaderBtn";
import SearchBar from "@components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import ItemSection from "@components/ItemSection";
import BigLogo from '@assets/logo-schulz.svg';
import { borderRadiusBig, pageMargin } from "@gStyle";


export const LARGE_LOGO_ASPECT_RATIO = 8; // 8 to 1 ratio
export const SMALL_LOGO_ASPECT_RATIO = 4.36; // 4.36 to 1 ratio
export const HEADER_SCROLL_THRESHOLD = 10;
 interface Props {
     scrollY?: number,
     small?: boolean
 }

export const HeaderSmall = (props: Props) => {

    const small = props.small ? true : props.scrollY ? props.scrollY > HEADER_SCROLL_THRESHOLD : false;
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    const smallBtnContStyle = small ? style.btnContSmall : {}

    const logoWidth = Dimensions.get('window').width - (pageMargin * 2);

    /* const logoOffset = useSharedValue(0);

    useEffect(() => {
        logoOffset.value = small ? 46.1 : 0;
    }, [small]);

    const logoAnimatedStyle = useAnimatedStyle(() => {
        return {
            marginLeft: withTiming(logoOffset.value, { duration: 200 }),

        }
    }) */



    return (
        <View style={small ? style.smallHeaderCont : style.headerCont}>
            <SafeAreaView style={small ? style.safeAreaContSmall : style.safeAreaCont}>

                <BigLogo style={small ? style.logoSmall : /* logoAnimatedStyle */ smallBtnContStyle} width={logoWidth} height={logoWidth / LARGE_LOGO_ASPECT_RATIO} />
                <View style={small ? smallBtnContStyle : style.btnCont}>
                    <HeaderBtn.Cart onPress={() => console.log("action: go to cart")} />
                    <HeaderBtn.Burger onPress={() => nav.navigate('Menu', {})} />
                </View>

            </SafeAreaView>
        </View>
    )
}
export interface HeaderAddOnProps {

}
export const HeaderAddOn = (props:HeaderAddOnProps) => {
    return (
        <View style={ style.addOnHeaderCont} >
                <View style={{ ...style.safeAreaCont, overflow: "visible" }}>
                    <SearchBar />
                    <ItemSection heading='Categories' items={[
                        { name: "fishes",id: "Q0i1y5", img: { url: "https://picsum.photos/201", alt: "something something" } },
                        { name: "corals",id: 'rUm6nc', img: { url: "https://picsum.photos/202", alt: "something something" } },
                        { name: "invertebrates", id: 'aRu8ro', img: { url: "https://picsum.photos/203", alt: "something something" } },
                    ]} />
                </View>
        </View>
    )
}
