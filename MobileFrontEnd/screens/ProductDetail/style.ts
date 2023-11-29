import gStyle, { pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";
import { HEIGHT } from "@components/BtnIsland/style";

export default StyleSheet.create({
    page: {
        display: 'flex',

    },
    scroll: {

        paddingTop: pageMargin,
        marginHorizontal: pageMargin,
        paddingBottom: pageMargin
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
        //paddingBottom: pageMargin * 6,
        flex: 1,
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