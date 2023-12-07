import {StyleSheet} from 'react-native';
import {backGroundColor, colorPlaceholder, pageMargin} from "@gStyle";
import styles from "@gStyle";

export default StyleSheet.create({
    breadcrumbs: {
        backgroundColor: 'transparent',
        display: "flex",
        flexDirection: "row"
    },
    breadcrumbsText: {
        ...styles.small,
        color: colorPlaceholder,
        paddingVertical: 10
    }
});


