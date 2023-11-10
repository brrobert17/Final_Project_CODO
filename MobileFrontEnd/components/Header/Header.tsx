import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import style from "./style";
import HeaderBtn from "./HeaderBtn/HeaderBtn";
import SearchBar from "@components/SearchBar";
import CategorySection from "@components/CategorySection";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";



const Header = () => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    return (
        <View style={style.headerCont}>
            <SafeAreaView style={style.safeAreaCont}>

                <Image style={style.logo} source={require("@assets/logo-schulz.png")}></Image>
                <View style={style.btnCont}>
                    <HeaderBtn.Cart onPress={() => console.log("action: go to cart")} />
                    <HeaderBtn.Burger onPress={() => nav.navigate('Menu', {})} />
                </View>
                <SearchBar />
                <CategorySection categories={[
                    { name: "corals", img: { url: "https://picsum.photos/201", alt: "something something" } },
                    { name: "fish", img: { url: "https://picsum.photos/202", alt: "something something" } },
                    { name: "other", img: { url: "https://picsum.photos/203", alt: "something something" } },
                ]} />
            </SafeAreaView>
        </View>
    )
}

export default Header;