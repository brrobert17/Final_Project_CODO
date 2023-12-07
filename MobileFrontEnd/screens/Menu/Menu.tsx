import MenuItem from "@components/MenuItem";
import React, {useEffect, useState} from "react";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {StackParams} from "../../App";
import {SafeAreaView} from "react-native-safe-area-context";
import {HeaderBtn} from "@components/Header";
import {View} from "react-native";
import {componentStyle} from "@screens/Menu/styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {MenuCategory} from "@interfaces";
import {useMenuCategories} from "@dbConn/hooks/UseCategories";
import {useQueryClient} from "react-query";

type MenuScreenRouteProp = RouteProp<StackParams, 'Menu'>;

type MenuPropsWithRoute = {
    route: MenuScreenRouteProp,
};

const Menu: React.FC<MenuPropsWithRoute> = ({route}) => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    const {isLoading, isError,data} = useMenuCategories();
    const menuItemsRoot: MenuCategory[] = [
        {name: 'All Products', level: 0, action: (nav)=> nav?.navigate('Products', {categoryId: ''})},
        {name: 'Categories', level: 0, id: 'root'},
        {name: 'Info', level: 0, action: ()=> console.log('Info')},
        {name: 'Contact', level: 0, action: ()=> console.log('Contact')},
        {name: 'Login', level: 0, action: ()=> console.log('Login')}
    ]
    const [menuItems, setMenuItems] = useState<MenuCategory[]>(menuItemsRoot);
    const [menuTitle, setMenuTitle] = useState('');
    //console.log('MENU ITEMS state: ', menuItems);

    useEffect(() => {
        if(data) {
            menuItems[1].children = data;
            if (route.params.categoryId) {
                console.log('xes ID : ', route.params.categoryId);
                const selectedMenu = menuItems?.find(m => m.id === route.params.categoryId);
                selectedMenu?.children && (setMenuItems(selectedMenu.children));
                selectedMenu?.name && (setMenuTitle(selectedMenu.name));
                console.log('Selected:',selectedMenu)
            }
        }
    }, [data, route.params.categoryId]);

    //! potential danger zone
    const handleExit =()=> {
        const routes = nav.getState().routes;
        for (let i = routes.length - 1; i >= 0; i--) {
            if (routes[i].name === 'Menu') {
                nav.pop();
            } else {
                break; // Stop popping when a screen with a different name is encountered
            }
        }
    }

    return (
        <SafeAreaView style={componentStyle.menuScreenContainer}>
            <View style={componentStyle.menuHeader}>
                <View style={componentStyle.menuHeaderBox}>
                    <HeaderBtn.Fish onPress={() => nav.navigate('Home', {})}/>
                </View>
                <View style={componentStyle.menuHeaderBox}>
                    <HeaderBtn.Exit onPress={handleExit}/>
                    <HeaderBtn.Cart onPress={() => console.log("CART")}/>
                </View>

            </View>
            <View style={componentStyle.menuContainer}>
                {/*condition for menu title*/}
                {menuTitle && <MenuItem name={menuTitle}/>}
                {/*condition for a subMenu*/}
                {menuItems.map((menuItem: MenuCategory, index: number) => (
                    <MenuItem key={index} name={menuItem.name} level={menuItem.level} id={menuItem.id} action={menuItem.action}/>
                ))}
            </View>
        </SafeAreaView>

    )
}

export default Menu;