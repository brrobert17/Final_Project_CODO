import MenuItem from "@components/MenuItem";
import {MenuLevel} from "@components/MenuItem/MenuItem";
import React from "react";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackParams} from "../../App";
import {SafeAreaView} from "react-native-safe-area-context";
import {HeaderBtn} from "@components/Header";
import {View} from "react-native";
import {componentStyle} from "@screens/Menu/styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


export interface MenuProps {
    name?: string,
    level?: MenuLevel,
    menu?: MenuProps[]
}

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
                {route.params.menu && route.params.menu.map((menuItem: MenuProps, index: number) => (
                    <MenuItem key={index} name={menuItem.name} menu={menuItem.menu} level={menuItem.level}/>
                    // menuItem.menu ?
                    //      menuItem.name && <MenuItem key={index}  menuProps={menuItem}/>
                    //     : menuItem.name && <MenuItem key={index} name={menuItem.name} />
                ))}
            </View>
        </SafeAreaView>

    )
}

export default Menu;