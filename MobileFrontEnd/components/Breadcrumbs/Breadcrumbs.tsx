import {useBreadcrumbs} from "@dbConn/hooks/UseCategories";
import style from './style';
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";
import {useEffect} from "react";
import {ProductsProps} from "@screens/Products/Products";

interface Props {
    categoryId: string
}

export const Breadcrumbs = (props: Props) => {
    const {isLoading, isError, data} = useBreadcrumbs(props.categoryId as string);
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    const handlePress = (productsProps: ProductsProps) => {
        console.log('BREAD: ', props.categoryId)
        nav.navigate('Products', productsProps);
    }
    return (
        <View style={style.breadcrumbs}>
            {data?.map((c, i) => {
                return (
                    <TouchableOpacity key={i} onPress={()=>handlePress({categoryId:c.id, categoryName:c.name})}>
                        <Text style={style.breadcrumbsText}>/ {c.name} </Text>
                    </TouchableOpacity>)
            })}
        </View>
    )
}