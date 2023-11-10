import { View, Text, TouchableOpacity, Image } from "react-native";
import {Image as IImage} from '@utils/interfaces';
import style from "./style";
import React from "react";

export interface Props {
  name: string,
  img: IImage
}


const CategoryCard = (props: Props) => {
  return (

    <TouchableOpacity style={style.card} onPress={() => console.log("kokot")}>
      <Image style={style.img} source={{uri: props.img.url}}></Image>
      <View style={style.overlay}></View>
      <Text style={style.text}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard