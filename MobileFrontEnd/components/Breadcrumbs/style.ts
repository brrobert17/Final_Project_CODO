import {StyleSheet} from 'react-native';
import {backGroundColor, colorPlaceholder, pageMargin} from "@gStyle";
import styles from "@gStyle";

export default StyleSheet.create({
    breadcrumbs: {
        marginLeft: pageMargin,
        backgroundColor: backGroundColor,
        display: "flex",
        flexDirection: "row"
    },
    breadcrumbsText: {
        ...styles.small,
        color: colorPlaceholder,
        paddingVertical: 10
    }
});


