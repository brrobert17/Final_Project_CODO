import {Text, TouchableOpacity} from "react-native";
import {componentStyle} from "./style";
import Arrow from "@components/Arrow";
import gStyle from "@gStyle"
import {ArrowDirection} from "@components/Arrow";

export enum TextSize {
    BASIC = 1,
    H1 = 2
}

interface Props {
    name: string,
    textSize: TextSize,
    arrowDisplay?: boolean,
    arrowDirection?: ArrowDirection
}

const MenuItem = (props: Props) => {

    let selectedTextStyle;

    switch (props.textSize) {
        case TextSize.H1:
            selectedTextStyle = gStyle.h1;
            break;
        case TextSize.BASIC:
        default:
            selectedTextStyle = gStyle.basic;
            break;
    }

    const menuItemClick = () => {
        console.log("item clicked")
    }

    return (
        <TouchableOpacity style={componentStyle.menuItemContainer} onPress={menuItemClick}>
            <Text style={selectedTextStyle}>{props.name}</Text>
            {props.arrowDisplay && props.arrowDirection && <Arrow arrowDirection={props.arrowDirection}/>}
            {props.arrowDisplay && !props.arrowDirection && <Arrow/>}
        </TouchableOpacity>


    )

}

export default MenuItem;