import { StyleSheet } from "react-native"
import { backGroundColorTwo, borderRadiusBig, pageMargin } from "@gStyle"

export default StyleSheet.create({
    largeCont: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
    },
    headerCont: {
        backgroundColor: backGroundColorTwo,
        width: '100%',
        zIndex: 1000,
    },
    smallHeaderCont: {
        backgroundColor: backGroundColorTwo,
        width: '100%',
        borderBottomLeftRadius: borderRadiusBig,
        borderBottomRightRadius: borderRadiusBig,
        paddingBottom: pageMargin,
    },
    safeAreaCont: {
        marginHorizontal: pageMargin,
        overflow: 'hidden'
    },
    safeAreaContSmall: {
        marginHorizontal: pageMargin,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: pageMargin,
        overflow: 'hidden'
    },
    btnCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: pageMargin,
        marginHorizontal: -pageMargin / 2
    },
    btnContSmall: {
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        marginRight: -pageMargin / 2
    },
    logoSmall: {
        marginLeft: '-46.1%'
    },
    addOnHeaderCont: {
        backgroundColor: backGroundColorTwo,
        width: '100%',
        marginBottom: pageMargin * 2,
        borderBottomLeftRadius: borderRadiusBig,
        borderBottomRightRadius: borderRadiusBig,
        zIndex: 150,
    }
})