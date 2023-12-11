import gStyle, { pageMargin } from '@gStyle';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cont: {
        marginTop: pageMargin,
        marginBottom: - pageMargin * 2
    },
    contMargin: {
        marginHorizontal: pageMargin,
        marginVertical: pageMargin
    },
    nestedCont: {
        marginVertical: pageMargin
    },
    list: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",
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
    },
    noDataCont: {
        marginTop: pageMargin * 5,
        marginHorizontal: pageMargin,

    },
    emptyHeadingCont: {
        minHeight: pageMargin * 2
    }
})