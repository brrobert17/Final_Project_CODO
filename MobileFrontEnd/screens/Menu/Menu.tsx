import MenuItem from "@components/MenuItem";
import React from "react";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackParams} from "../../App";
import {SafeAreaView} from "react-native-safe-area-context";
import {HeaderBtn} from "@components/Header";
import {View} from "react-native";
import {componentStyle} from "@screens/Menu/styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MenuCategory} from "@interfaces";

type MenuScreenRouteProp = RouteProp<StackParams, 'Menu'>;

type MenuPropsWithRoute = {
    route: MenuScreenRouteProp,
};

const Menu: React.FC<MenuPropsWithRoute> = ({route}) => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <SafeAreaView style={componentStyle.menuScreenContainer}>
            <View style={componentStyle.menuHeader}>
                <View style={componentStyle.menuHeaderBox}>
                    <HeaderBtn.Fish onPress={()=> nav.navigate('Home', {})}/>
                </View>
                <View style={componentStyle.menuHeaderBox}>
                    <HeaderBtn.Exit onPress={()=> nav.goBack()}/>
                    <HeaderBtn.Cart onPress={()=> console.log("CART")}/>
                </View>

            </View>
            <View style={componentStyle.menuContainer}>
                {/*condition for menu title*/}
                {route.params.name && <MenuItem name={route.params.name}/>}
                {/*condition for a subMenu*/}
                {route.params.children && route.params.children.map((menuItem: MenuCategory, index: number) => (
                    <MenuItem key={index} name={menuItem.name} children={menuItem.children} level={menuItem.level}/>
                ))}
            </View>
        </SafeAreaView>

    )
}

export default Menu;