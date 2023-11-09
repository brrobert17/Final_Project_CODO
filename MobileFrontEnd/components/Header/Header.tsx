import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import style from "./style";
import gStyle from "@gStyle";
import HeaderBtn from "./HeaderBtn/HeaderBtn";
import SearchBar from "@components/SearchBar";



const Header = () => {
    return (
        <View style={style.headerCont}>
            <SafeAreaView style={style.safeAreaCont}>

                <Image style={style.logo} source={require("@assets/logo-schulz.png")}></Image>
                <View style={style.btnCont}>
                    <HeaderBtn.Cart onPress={() => console.log("action: go to cart")}/>
                    <HeaderBtn.Burger onPress={() => console.log("action: open menu")}/>
                </View>
                <SearchBar />
            </SafeAreaView>
        </View>
    )
}

export default Header;