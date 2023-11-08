import {styles} from "../../style";
import {Text} from "react-native";

export enum TextSize {
    BASIC = "basic",
    H1 = "h1",
    H2 = "h2",
    H3 = "h3"
}

export enum ArrowDirection {
    UP = "up",
    RIGHT = "right",
    DOWN = "down",
    LEFT = "left"
}

{

}
const MenuItem = (name: string, textSize: TextSize, arrowDisplay: boolean, arrowDirection: ArrowDirection ) => {

    const StyledText = ({ textSize }) => {
        let selectedStyle;

        switch (textSize) {
            case TextSize.H1:
                selectedStyle = styles.h1;
                break;
            case TextSize.H2:
                selectedStyle = styles.h2;
                break;
            case TextSize.H3:
                selectedStyle = styles.h3;
                break;
            case TextSize.BASIC:
            default:
                selectedStyle = styles.basic;
                break;
        }
    return (
        <Text style={size}>All Products</Text>
    )

}

export default MenuItem;