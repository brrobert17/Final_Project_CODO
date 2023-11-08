import { SafeAreaView, View, Text } from "react-native";
import {styles} from "../../style";


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.basicText}>Home screen</Text>
    </SafeAreaView>
  )
}

export default Home;