import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from "expo-font";
import {Inter_400Regular, Inter_600SemiBold, Inter_700Bold} from "@expo-google-fonts/inter";
import Home from './screens/Home';
import Menu from "./screens/Menu";
import {MenuProps} from "@screens/Menu/Menu";

export type StackParams = {
    Home: {},
    Menu: MenuProps
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

    const menuProps: MenuProps = {
        menu: [
            {name: 'All Products'},
            {
                name: 'Categories',
                menu: [
                    {name: 'Fishes'},
                    {name: 'Corals'},
                    {name: 'Invertebrates'},
                    {name: 'Accessories'}
                ]
            },
            {name: 'Info'},
            {name: 'Contact'},
            {name: 'Login'}
        ]
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='Menu'
            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Menu'
                    component={Menu}
                    initialParams={menuProps}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

