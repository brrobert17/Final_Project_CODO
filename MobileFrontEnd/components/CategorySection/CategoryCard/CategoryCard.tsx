import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import {Image as IImage} from '@utils/interfaces';
import style from "./style";
import React from "react";
import { pageMargin } from "@gStyle";

export interface Props {
  name: string,
  img: IImage,
  bigVariant?: boolean
}


const CategoryCard = (props: Props) => {

  const maxItemsPerRow = props.bigVariant ? 2 : 3;
  const itemWidth = (Dimensions.get('window').width / maxItemsPerRow) - (pageMargin * (1 + (1 / maxItemsPerRow)));

  return (

    <TouchableOpacity style={{...style.card, width: itemWidth, height: props.bigVariant ? itemWidth : 80}} onPress={() => console.log("hello world")}>
      <Image style={style.img} source={{uri: props.img.url}}></Image>
      <View style={style.overlay}></View>
      <Text style={style.text}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard