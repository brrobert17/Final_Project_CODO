import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useFonts} from "expo-font";
import {Inter_400Regular, Inter_600SemiBold, Inter_700Bold} from "@expo-google-fonts/inter";
import Home from './screens/Home';

export type StackParams = {
  Home: {}
}

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {

    let [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Home'
      >
        <Stack.Screen
          name='Home'
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

