import { pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cont: {
        marginTop: pageMargin,
        marginBottom: - pageMargin * 2
    },
    list: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",
        marginTop: pageMargin,
    }
})