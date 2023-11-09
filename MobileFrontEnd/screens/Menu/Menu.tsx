import {styles} from "../../style";
import {SafeAreaView} from "react-native";
import MenuItem from "../../components/MenuItem";
import {ArrowDirection, TextSize} from "../../components/MenuItem/MenuItem";

const Menu = () => {

    return (
        <SafeAreaView style={styles.menuContainer}>
            <MenuItem name="All products" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Categories" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Info" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Contact" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Login" textSize={TextSize.H1} arrowDisplay={true}/>
        </SafeAreaView>
    )
}

export default Menu;