import {styles} from "../../style";
import {SafeAreaView, Text} from "react-native";

const Menu = () => {

    return (
        <SafeAreaView style={styles.menuContainer}>
            <Text style={styles.h1}>All Products</Text>
            <Text style={styles.h1}>Categories</Text>
            <Text style={styles.h1}>Info</Text>
            <Text style={styles.h1}>Contact</Text>
            <Text style={styles.h1}>Login</Text>
        </SafeAreaView>
    )
}

export default Menu;