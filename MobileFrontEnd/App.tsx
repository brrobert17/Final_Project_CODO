import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import Home from './screens/Home';
import Menu from "./screens/Menu";
import { MenuProps } from "@screens/Menu/Menu";
import { MenuLevel } from "@components/MenuItem/MenuItem";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetail from '@screens/ProductDetail/ProductDetail';

export type StackParams = {
    Home: {},
    Menu: MenuProps,
    Detail: {}
}

const Stack = createNativeStackNavigator<StackParams>();
const queryClient = new QueryClient();


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
            { name: 'All Products', level: MenuLevel.TOP },
            {
                name: 'Categories',
                level: MenuLevel.TOP,
                menu: [
                    { name: 'Fishes', level: MenuLevel.SECOND },
                    { name: 'Corals', level: MenuLevel.SECOND },
                    { name: 'Invertebrates', level: MenuLevel.SECOND },
                    { name: 'Accessories', level: MenuLevel.SECOND }
                ]
            },
            { name: 'Info', level: MenuLevel.TOP },
            { name: 'Contact', level: MenuLevel.TOP },
            { name: 'Login', level: MenuLevel.TOP }
        ]
    }

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#152331"} />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: "fade"

                    }}
                    initialRouteName='Detail'
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
                    <Stack.Screen
                        name='Detail'
                        component={ProductDetail}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>

    );
}

