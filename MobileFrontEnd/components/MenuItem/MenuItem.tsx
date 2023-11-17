import {Text, TouchableOpacity} from "react-native";
import {componentStyle} from "./style";
import Arrow from "@components/Arrow";
import gStyle from "@gStyle";
import {ArrowDirection} from "@components/Arrow/Arrow";
import {MenuProps} from "@screens/Menu/Menu";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";


export enum MenuLevel {
    TOP = 1,
    SECOND = 2
}

interface Props {
    name: string,
    level: MenuLevel,
    menuProps?: MenuProps[]
}

const MenuItem = (props: MenuProps) => {

    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();

    const menuItemClick = () => {
        console.log("item clicked");
        if (props.menu) {
            nav.push('Menu', props);
            console.log('props:  ' +props.menu)
        } else {
            if(!props.level) {
                nav.goBack();
            } else {
                nav.navigate('Home', {});
            }
        }
    }
    let textStyle;
    let arrow;
    let opaque;
    if(props.level === MenuLevel.TOP) {
        textStyle = gStyle.h1;
        arrow = ArrowDirection.RIGHT;
    } else if(props.level === MenuLevel.SECOND) {
        textStyle = gStyle.basicLarge;
    } else {
        textStyle = {...gStyle.h1, opacity: 0.5};
        arrow = ArrowDirection.DOWN
        opaque = true;
    }


    return (
        <TouchableOpacity style={componentStyle.menuItemContainer} onPress={()=>menuItemClick()}>
            <Text style={textStyle}>{props.name}</Text>
            {arrow && <Arrow arrowDirection={arrow} opaque={opaque}/>}
        </TouchableOpacity>


    )

}

export default MenuItem;