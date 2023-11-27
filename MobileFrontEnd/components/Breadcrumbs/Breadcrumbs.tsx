import {useCategories} from "@dbConn/hooks/UseCategories";
import style from './style';
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";

interface Props {
    categoryId: string
}

export const Breadcrumbs = (props: Props) => {
    const {isLoading, isError, data} = useCategories(props.categoryId as string);
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    const handlePress = () => {
        console.log('BREAD: ', props.categoryId)
    }
    return (
        <View style={style.breadcrumbs}>
            {data?.map((c, i) => {
                return (
                    <TouchableOpacity key={i} onPress={handlePress}>
                        <Text style={style.breadcrumbsText}>/ {c.name} </Text>
                    </TouchableOpacity>)
            })}
        </View>
    )
}