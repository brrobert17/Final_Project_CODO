import { backGroundColorTwo, borderRadiusSmall, colorPlaceholder, colorSelector, colorSeparator, pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cont: {
        width: 215,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colorSelector,
        borderRadius: borderRadiusSmall
    },
    symbolCont: {
        width: '20%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCont: {
        
        width: '60%',
        marginVertical: pageMargin / 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        

    },
    text: {
        color: 'white'
    },
    symbol: {
        color: "white",
    },
    separator: {
        width: 1,
        backgroundColor: colorSeparator,
        marginVertical: pageMargin / 2,
    },
    symbolDisabled: {
        color: colorPlaceholder
    }
});