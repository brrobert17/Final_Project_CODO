import { StyleSheet } from "react-native"
import { backGroundColorTwo, borderRadiusBig, pageMargin } from "@gStyle"

export default StyleSheet.create({
    headerCont: {
        backgroundColor: backGroundColorTwo,
        width: '100%',
        borderBottomLeftRadius: borderRadiusBig,
        borderBottomRightRadius: borderRadiusBig,
        marginBottom: pageMargin * 2
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