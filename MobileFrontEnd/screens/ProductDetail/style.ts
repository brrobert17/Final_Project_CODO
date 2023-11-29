import gStyle, { pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";
import { HEIGHT } from "@components/BtnIsland/style";

export default StyleSheet.create({
    scroll: {

        paddingTop: pageMargin,
        marginHorizontal: pageMargin,
        paddingBottom: HEIGHT * 3
    },
    wysiwyg: {
        ...gStyle.basicLarge,
        color: 'gray'
    },
    quantityCont: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: pageMargin * 2
    },
    avoidKeyboard: {
        paddingBottom: pageMargin * 6
    },
    sliderCont: {
        marginTop: pageMargin,
        position: 'relative'
    },
    blob: {
        position: 'absolute',
        top: -30,
        left: -130,
    },
})