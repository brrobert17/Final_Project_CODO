import { StyleSheet } from "react-native";
import gStyle, { borderRadiusBig, borderRadiusSmall, colorPrimary, colorSecondary, pageMargin } from "@gStyle";

export default StyleSheet.create({
    cont: {
        paddingVertical: pageMargin / 2,
        paddingHorizontal: pageMargin,
        backgroundColor: colorPrimary,
        borderRadius: borderRadiusBig * 2,
        display: 'flex',
        justifyContent: 'center'
    },
    contLeft: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    contRight: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    constSecondary: {
        backgroundColor: colorSecondary
    },
    text: {
        ...gStyle.basic,
        fontFamily: 'Inter_600SemiBold',
    },
    textSecondary: {
        color: "black"
    }

});