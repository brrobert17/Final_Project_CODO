import { Image as IImage } from '@utils/interfaces'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import style from './style'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";


export interface Props {
    name: string,
    price: string,
    img: IImage,
    added?: Date,
    id?: string
}

const ProductCard = (props: Props) => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
    const handlePress = () => {
        nav.push('Detail', { productId: props.id });
    }
    return (
        <View style={style.card}>
            <TouchableOpacity style={style.imgCont} onPress={handlePress}>
                <Image style={style.img} source={{ uri: props.img.url }} />
            </TouchableOpacity>
            <TouchableOpacity style={style.textCont} onPress={handlePress}>
                <Text style={style.name}>{props.name}</Text>
                <Text style={style.price}>{props.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard