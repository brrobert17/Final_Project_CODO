import { View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, LayoutChangeEvent } from "react-native";
import style from "./style";
import HeaderBtn from "./HeaderBtn/HeaderBtn";
import SearchBar from "@components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import ItemSection from "@components/ItemSection";
import BigLogo from '@assets/logo-schulz.svg';
import SmallLogo from '@assets/logo-schulz-small.svg'
import { borderRadiusBig, pageMargin } from "@gStyle";
import { ReactNode } from "react";


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

    return (
        <View style={small ? style.smallHeaderCont : style.headerCont}>
            <SafeAreaView style={small ? style.safeAreaContSmall : style.safeAreaCont}>
                <TouchableOpacity onPress={() => nav.navigate("Home", {})}>
                    {small ?
                        <SmallLogo  width={logoWidth / 2} height={logoWidth / LARGE_LOGO_ASPECT_RATIO} />
                        :
                        <BigLogo  width={logoWidth} height={logoWidth / LARGE_LOGO_ASPECT_RATIO} />
                    }
                </TouchableOpacity>
                <View style={small ? smallBtnContStyle : style.btnCont}>
                    <HeaderBtn.Cart onPress={() => console.log("action: go to cart")} />
                    <HeaderBtn.Burger onPress={() => nav.navigate('Menu', {})} />
                </View>

            </SafeAreaView>
        </View>
    )
}
export interface HeaderAddOnProps {
    heading: string,
    categoryId: string,
    breadcrumbs?: ReactNode
}
export const HeaderAddOn = (props: HeaderAddOnProps) => {
    return (
        <View style={style.addOnHeaderCont} >
            <View style={{ ...style.safeAreaCont, overflow: "visible" }}>
                <SearchBar />
                {props.breadcrumbs}
                <ItemSection heading={props.heading} itemType={'Category'} categoryId={props.categoryId} />
            </View>
        </View>
    )
}
