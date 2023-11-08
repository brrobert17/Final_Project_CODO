import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import Home from './screens/Home';

export type StackParams = {
  Home: {}
}

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
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
