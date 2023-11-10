import { StyleSheet } from "react-native";

export const backGroundColor = '#000F1E';
export const backGroundColorTwo = '#152331';
export const colorInput = '#47596A';
export const colorPlaceholder = '#CCC';

export const pageMargin = 20;
export const borderRadiusSmall = 6;
export const borderRadiusBig = pageMargin;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backGroundColor,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    menuContainer: {
        flex: 1,
        backgroundColor: backGroundColor,
        justifyContent: 'center',
        paddingLeft: 90,
        paddingRight: 90
    },
    basic: {
        color: '#fff',
        fontFamily: 'Inter_400Regular',
        fontSize: 16
    },
    basicLarge: {
        color: '#fff',
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
    },
    h1: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 25
    }
});
