import { View, Text, FlatList, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Image as IImage } from '@utils/interfaces';
import style from "./style";
import { useState } from 'react';

interface Props {
    images: IImage[],
}

const ImageSlider = (props: Props) => {

    const [selectedImage, setSelectedImage] = useState<IImage>(props.images[0]);

    const clickHandler = (img: IImage) => {
        setSelectedImage(img)
    }

    return (
        <View>
            <View>
                <Image style={style.bigImg} source={{ uri: selectedImage.url }} />
            </View>
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