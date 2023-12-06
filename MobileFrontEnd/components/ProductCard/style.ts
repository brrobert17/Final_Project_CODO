import gStyle, { borderRadiusBig, borderRadiusSmall, pageMargin } from "@gStyle";
import { Dimensions, StyleSheet } from "react-native";

const maxProductsPerRow = 2;
const productWidth = (Dimensions.get('window').width / maxProductsPerRow) - (pageMargin * (1 + (1 / maxProductsPerRow)));


export default StyleSheet.create({
    card: {
        width: productWidth,
        marginBottom: pageMargin
    },
    imgCont: {
        borderRadius: borderRadiusSmall,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        aspectRatio: 1 / 1
    },
    textCont: {

    },
    name: {
        ...gStyle.basicLarge,
        textTransform: 'capitalize',
        marginTop: pageMargin / 2
    },
    price: {
        ...gStyle.basic,
        color: '#FFDF01'
    }
})