import { colorInput, pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";
import gStyle from "@gStyle";

const borderRadius = 6;
const verticalMargin = 6;
export const iconSize = 15;

export default StyleSheet.create({
    cont: {
        width: '100%',
        marginBottom: pageMargin,
    },
    input: {
        ...gStyle.basic,
        backgroundColor: colorInput,
        paddingVertical: verticalMargin,
        paddingLeft: pageMargin,
        paddingRight: pageMargin * 2 + iconSize,
        borderRadius: borderRadius,
    },
    icon: {
        position: 'absolute',
        right: pageMargin,
        top: verticalMargin + 2
    }
});