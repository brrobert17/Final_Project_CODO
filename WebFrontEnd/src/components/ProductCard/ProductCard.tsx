import { Image as IImage } from '@interfaces';
import './style.css'


export interface Props {
    name: string,
    price: string,
    img: IImage,
    added?: Date,
    id?: string
}

const ProductCard = (props: Props) => {
    // return (
    //     <View style={style.card}>
    //         <TouchableOpacity style={style.imgCont}>
    //             <Image style={style.img} source={{ uri: props.img.url }} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={style.textCont}>
    //             <Text style={style.name}>{props.name}</Text>
    //             <Text style={style.price}>{props.price}</Text>
    //         </TouchableOpacity>
    //     </View>
    // )
}

export default ProductCard