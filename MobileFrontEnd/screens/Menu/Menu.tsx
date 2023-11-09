import {SafeAreaView, Text} from "react-native";
import MenuItem from "@components/MenuItem";
import {TextSize} from "@components/MenuItem/MenuItem";
import gStyle from "@gStyle";
import React from "react";
import {RouteProp} from "@react-navigation/native";
import {StackParams} from "../../App";
export interface MenuProps {
    name?: string,
    menu?: MenuProps[]
}

type MenuScreenRouteProp = RouteProp<StackParams, 'Menu'>;

type MenuPropsWithRoute = {
    route: MenuScreenRouteProp,
};

const Menu: React.FC<MenuPropsWithRoute> = ({route}) => {
    return (
        <SafeAreaView style={gStyle.menuContainer}>
            {route.params.menu && route.params.menu.map((menuItem: MenuProps, index:number) => (
                menuItem.menu ?
                     menuItem.name && <MenuItem key={index} name={menuItem.name} textSize={TextSize.H1} arrowDisplay={true}  menuProps={menuItem.menu}/>
                    : menuItem.name && <MenuItem key={index} name={menuItem.name} textSize={TextSize.H1} arrowDisplay={true} />
            ))}
        </SafeAreaView>
    )
}

export default Menu;