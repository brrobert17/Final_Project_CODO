import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    up: {
        transform: [{rotateZ: "-90deg"}]
    },
    down: {
        transform: [{rotateZ: "90deg"}]
    },
    left: {
        transform: [{rotateZ: "180deg"}]
    }
})