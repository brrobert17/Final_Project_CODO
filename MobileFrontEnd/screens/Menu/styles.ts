import {StyleSheet} from "react-native";
import {backGroundColor} from "@gStyle";
export const componentStyle = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: backGroundColor,
        paddingTop: 40,
        paddingLeft: 65,
        paddingRight: 65
    },
    menuScreenContainer: {
        flex: 1,
        backgroundColor: backGroundColor,
        paddingRight: 25,
        paddingLeft: 25,
        paddingTop: 100
    },
    menuHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    menuHeaderBox: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "flex-end"
    }
});