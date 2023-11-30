import {View, Text, TouchableOpacity, Image, Dimensions} from "react-native";
import {Image as IImage} from '@utils/interfaces';
import style from "./style";
import React from "react";
import {pageMargin} from "@gStyle";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackParams} from "../../App";

export interface Props {
    name: string,
    id: string,
    img: IImage,
    bigVariant?: boolean
}


const CategoryCard = (props: Props) => {
    const nav = useNavigation<NativeStackNavigationProp<StackParams>>();

    const maxItemsPerRow = props.bigVariant ? 2 : 3;
    const itemWidth = (Dimensions.get('window').width / maxItemsPerRow) - (pageMargin * (1 + (1 / maxItemsPerRow)));
    const handlePress = () => {
        props.id && nav.push('Products', {categoryId: props.id, categoryName: props.name})
    }
    return (

        <TouchableOpacity style={{...style.card, width: itemWidth, height: props.bigVariant ? itemWidth : 80}}
                          onPress={handlePress}>
            <Image style={style.img} source={{uri: props.img.url}}></Image>
            <View style={style.overlay}></View>
            <Text style={style.text}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard