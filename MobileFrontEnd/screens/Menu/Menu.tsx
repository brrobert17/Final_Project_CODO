import {SafeAreaView} from "react-native";
import MenuItem from "../../components/MenuItem";
import {TextSize} from "@components/MenuItem/MenuItem";
import gStyle from "@gStyle";
import {ArrowDirection} from "@components/Arrow/Arrow";

const Menu = () => {

    return (
        <SafeAreaView style={gStyle.menuContainer}>
            <MenuItem name="All products" textSize={TextSize.H1} arrowDisplay={true} arrowDirection={ArrowDirection.UP}/>
            <MenuItem name="Categories" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Info" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Contact" textSize={TextSize.H1} arrowDisplay={true}/>
            <MenuItem name="Login" textSize={TextSize.H1} arrowDisplay={true}/>
        </SafeAreaView>
    )
}

export default Menu;