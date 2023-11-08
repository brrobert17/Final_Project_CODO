import { SafeAreaView, View, Text } from "react-native";
import gStyle from "@gStyle";
import Header from "@components/Header";



const Home = () => {
    return (
        <SafeAreaView style={gStyle.container}>
            <Text style={gStyle.basicText}>Home screen</Text>
            <Header></Header>
        </SafeAreaView>
    )
}

export default Home;