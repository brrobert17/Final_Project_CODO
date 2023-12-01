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
            props.action();
        }
        else if (props.id) {
            console.log('...id', props.id)
            nav.push('Menu', {categoryId: props.id});
        } else {
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

    return (
        <TouchableOpacity style={componentStyle.menuItemContainer} onPress={() => menuItemClick()}>
            <Text style={textStyle}>{props.name}</Text>
            {arrow && <Arrow arrowDirection={arrow} opaque={opaque}/>}
        </TouchableOpacity>
    )
}

export default MenuItem;