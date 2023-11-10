import { StyleSheet } from "react-native";
import gStyle, { borderRadiusSmall, pageMargin } from "@gStyle";

export default StyleSheet.create({
    card: {
        height: 80,
        width: 100,
        backgroundColor: 'gray',
        borderRadius: borderRadiusSmall,
        marginBottom: pageMargin,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        ...gStyle.basicLarge,
        zIndex: 10,
        fontFamily: 'Inter_600SemiBold',
        textTransform: 'capitalize'
    },
    img: {
        width: '100%',
        height: '100%',
        zIndex: 0,
        position: 'absolute'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        zIndex: 5,
        position: 'absolute'
    }
});