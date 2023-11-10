import { pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cont: {
        marginVertical: pageMargin,
        marginHorizontal: pageMargin
    },
    list: {
        marginTop: pageMargin,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    }
    
})