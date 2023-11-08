import { SafeAreaView, View, Text } from "react-native";
import {styles} from "../../style";
import {api} from "../../DatabaseConn/axios";
import {useState} from "react";


const Home = () => {
    const [dd, setDd] = useState('');

    bf().then(data => {
        setDd( data);
    });

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.basic}>Home screen</Text>
        <Text style={styles.basic}>{dd}</Text>
    </SafeAreaView>
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