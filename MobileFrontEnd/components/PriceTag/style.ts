import { StyleSheet } from "react-native";
import gStyle, { pageMargin } from "@gStyle";

export default StyleSheet.create({
    cont: {
        height: 'auto',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: 220
    },
    icon: {
        
        
    },
    price: {
        position: "absolute",
        ...gStyle.h1Xl,
        color: "black",
        padding: pageMargin
    }
});