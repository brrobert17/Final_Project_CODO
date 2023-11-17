import {StyleSheet} from "react-native";
import {backGroundColorTwo, pageMargin} from "@gStyle";
export const componentStyle = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: backGroundColorTwo,
        paddingTop: pageMargin,
        paddingHorizontal: 70
    },
    menuScreenContainer: {
        flex: 1,
        backgroundColor: backGroundColorTwo,
        paddingHorizontal: pageMargin/2,
        paddingTop: 45
    },
    menuHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    menuHeaderBox: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "flex-end",
        gap: pageMargin
    }
});