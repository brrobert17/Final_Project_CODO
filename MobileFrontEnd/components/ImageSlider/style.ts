import { borderRadiusSmall, pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cont: {

    },
    img: {
        borderRadius: borderRadiusSmall,
        marginRight: pageMargin,
        width: 100,
        height: 100
    },
    bigImg: {
        width: '100%',
        aspectRatio: 1/1,
        borderRadius: borderRadiusSmall,
        marginBottom: pageMargin
    }
})