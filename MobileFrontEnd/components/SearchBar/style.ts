import { borderRadiusSmall, colorInput, pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";
import gStyle from "@gStyle";


const verticalMargin = 6;
export const iconSize = 15;

export default StyleSheet.create({
    cont: {
        width: '100%',
        marginVertical: pageMargin,
    },
    input: {
        ...gStyle.basic,
        backgroundColor: colorInput,
        paddingVertical: verticalMargin,
        paddingLeft: pageMargin,
        paddingRight: pageMargin * 2 + iconSize,
        borderRadius: borderRadiusSmall,
    },
    icon: {
        position: 'absolute',
        right: pageMargin,
        top: verticalMargin + 2
    }
});