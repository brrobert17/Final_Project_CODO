import { Image as IImage } from '@utils/interfaces'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import style from './style'


export interface Props {
    name: string,
    price: string,
    img: IImage
}

const ProductCard = (props: Props) => {
    return (
        <View style={style.card}>
            <TouchableOpacity style={style.imgCont}>
                <Image style={style.img} source={{ uri: props.img.url }} />
            </TouchableOpacity>
            <TouchableOpacity style={style.textCont}>
                <Text style={style.name}>{props.name}</Text>
                <Text style={style.price}>{props.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard