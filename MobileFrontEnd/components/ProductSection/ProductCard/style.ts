import  gStyle, { borderRadiusBig, borderRadiusSmall, pageMargin } from "@gStyle";
import { Dimensions, StyleSheet } from "react-native";

const maxItemsPerRow = 2;
const itemWidth = (Dimensions.get('window').width / maxItemsPerRow) - (pageMargin * (1 + (1 / maxItemsPerRow)));


export default StyleSheet.create({
    card: {
        width: itemWidth,
        marginBottom: pageMargin
    },
    imgCont: {
        borderRadius: borderRadiusSmall,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        aspectRatio: 1/1
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