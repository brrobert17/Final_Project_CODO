import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from "expo-font";
import {Inter_400Regular, Inter_600SemiBold, Inter_700Bold} from "@expo-google-fonts/inter";
import Home from './screens/Home';
import Menu from "./screens/Menu";
import {StatusBar, View} from "react-native";
import {QueryClient, QueryClientProvider} from "react-query";
import ProductDetail, {DetailProps} from '@screens/ProductDetail/ProductDetail';
import Products, {ProductsProps} from "@screens/Products/Products";
import {MenuCategory} from "@interfaces";

export type StackParams = {
    Home: {},
    Menu: { categoryId?: string },
    Detail: DetailProps,
    Products: ProductsProps
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

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#152331"}/>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: "fade"

                    }}
                    initialRouteName='Home'
                >
                    <Stack.Screen
                        name='Home'
                        component={Home}
                    />
                    <Stack.Screen
                        name='Menu'
                        component={Menu}
                        initialParams={{}}
                    />
                    <Stack.Screen
                        name='Detail'
                        component={ProductDetail}
                        initialParams={{itemId: ''}}
                    />
                    <Stack.Screen
                        name='Products'
                        component={Products}
                        initialParams={{categoryId: 'root'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>

    );
}

