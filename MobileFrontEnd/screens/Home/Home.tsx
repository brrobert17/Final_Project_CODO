import { SafeAreaView, View, Text } from "react-native";
import {api} from "@dbConn/axios";
import {useState} from "react";
import gStyle from "@gStyle";
import Header from "@components/Header";



const Home = () => {
    const [dd, setDd] = useState('');

    bf().then(data => {
        setDd( data);
    });

    return (
        <View style={gStyle.container}>
            <Header />
        </View>
    )
}

const bf = async () => {
    try {
        const res = await api.get('/test');
        return res.data.name;
    } catch (e) {
        console.log("error fetch front: "+e)
    }
}

export default Home;