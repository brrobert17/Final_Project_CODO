import { StyleSheet } from "react-native"
import { backGroundColorTwo, pageMargin } from "@gStyle"

export default StyleSheet.create({
    headerCont: {
        backgroundColor: backGroundColorTwo,
        width: '100%',
        borderBottomLeftRadius: pageMargin,
        borderBottomRightRadius: pageMargin,
    },
    safeAreaCont: {
        marginLeft: pageMargin,
        marginRight: pageMargin
    },
    btnCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: pageMargin,
        marginHorizontal: -pageMargin / 2
    },
    logo: {
        width: '100%',
        height: 'auto',
        aspectRatio: 8 / 1,
        objectFit: 'fill'

    }
})