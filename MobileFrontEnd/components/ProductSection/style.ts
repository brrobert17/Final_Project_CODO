import { pageMargin } from "@gStyle";
import { StyleSheet } from "react-native";
import gStyle from '@gStyle';

export default StyleSheet.create({
    cont: {
        marginVertical: pageMargin,
        marginHorizontal: pageMargin
    },
    list: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 0
        
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    heading: {
        ...gStyle.h1,
        marginRight: '20%',
        marginBottom: pageMargin
    }
    
})