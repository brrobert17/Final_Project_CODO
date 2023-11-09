import { SafeAreaView, View, Text } from "react-native";
import gStyle from "@gStyle";
import Header from "@components/Header";



const Home = () => {
    return (
        <View style={gStyle.container}>
            <Header />
            <Text style={gStyle.basicText}>Home screen</Text>
        </View>
    )
}

export default Home;