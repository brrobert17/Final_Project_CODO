import {Text, TouchableOpacity} from "react-native";
import {componentStyle} from "./style";
import Arrow from "@components/Arrow";
import gStyle from "@gStyle";
import {ArrowDirection} from "@components/Arrow/Arrow";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";
import {MenuCategory} from "@interfaces";

const MenuItem = (props: MenuCategory) => {

    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();

    const menuItemClick = () => {
        if(props.action){
            console.log('action')
            props.action(nav);
        }
        else if (props.id === 'root') {
            console.log('root')
            nav.push('Menu', {categoryId: props.id});
        }
        else if(props.id){
            console.log('action333')
            nav.navigate('Products', {categoryId: props.id})
        }else {
            if (!props.level) {
                console.log('back')
                nav.goBack();
            } else {
                console.log('ney')
                nav.navigate('Home', {});
            }
        }
    }
    let textStyle;
    let arrow;
    let opaque;
    if (props.level === undefined) {
        textStyle = {...gStyle.h1, opacity: 0.5};
        arrow = ArrowDirection.DOWN
        opaque = true;
    } else if (props.level >= 1) {
        textStyle = gStyle.basicLarge;
    } else if (props.level === 0) {
        textStyle = gStyle.h1;
        arrow = ArrowDirection.RIGHT;
    }
    if (!props.name) {
        return null;
    }

    return (
                <TouchableOpacity style={componentStyle.menuItemContainer} onPress={() => menuItemClick()}>
                    <Text style={textStyle}>
                        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                    </Text>
                    {arrow && <Arrow arrowDirection={arrow} opaque={opaque}/>}
                </TouchableOpacity>
            )
}

export default MenuItem;