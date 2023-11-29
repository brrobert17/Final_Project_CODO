import gStyle, { backGroundColorTwo, pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";

export const HEIGHT = 90;

export default StyleSheet.create({
    cont: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: backGroundColorTwo,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        padding: pageMargin,
        justifyContent: 'space-between'
    },
    btnCont: {
        display: "flex",
        flexDirection: "row",

    },
    priceCont: {
        display: 'flex',
        justifyContent: 'center'
    },
    price: {
        ...gStyle.h1
    }
});