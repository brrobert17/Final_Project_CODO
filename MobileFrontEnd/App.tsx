import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {styles} from "./style";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.basicText}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

