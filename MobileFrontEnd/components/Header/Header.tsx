import { View, Text } from "react-native";
import style from "./style";
import gStyle from "@gStyle"
// import logo from "../../assets/logo-schulz"

const Header = () => {
  return (
    <View >
        <Text style={gStyle.basicText}>This is a header</Text>
    </View>
  )
}

export default Header;