import { View, Text, FlatList, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Image as IImage } from '@utils/interfaces';
import style from "./style";

interface Props {
    images: IImage[],
    onClick?: (img: IImage) => void
}

const ImageSlider = (props: Props) => {

    const clickHandler = (img: IImage) => {
        console.log(img)
        if (props.onClick)
            props.onClick(img)
    }

    return (
        <View>
            <FlatList
                data={props.images}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={(img) =>
                    <TouchableOpacity onPress={() => clickHandler(img.item)}>
                        <Image style={style.img} source={{ uri: img.item.url }} />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default ImageSlider