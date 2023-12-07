import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image as IImage } from '@utils/interfaces'
import style from './style';
import gStyle from '@gStyle';
import Dropdown from '@components/DropDown'
import CategoryCard, { CategoryProps } from '@components/CategoryCard';
import ProductCard, { ProductProps } from '@components/ProductCard';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";
import { capitalizeWords } from '@utils/utils';

interface Props {
    heading: string,
    items: CategoryProps[] | ProductProps[],
    sorting?: boolean,
    seeMore?: {
        func: () => void,
        img: IImage
    },
    nested?: boolean

}

const ItemSection = (props: Props) => {

    const isProduct = 'price' in props.items[0]

    return (
        <View style={isProduct ? props.nested ? style.nestedCont : style.contMargin : style.cont} >
            <View style={style.header}>
                {props.seeMore
                    ?
                    <TouchableOpacity onPress={props.seeMore.func}>
                        <Text style={style.heading}>{capitalizeWords(props.heading)}</Text>
                    </TouchableOpacity>
                    :
                    <Text style={style.heading}>{capitalizeWords(props.heading)}</Text>
                }

                {props.sorting ? <Dropdown onChange={(foo) => console.log(foo)} /> : <></>}
            </View>
            <View style={style.list}>
                {props.items.map((item, index) => {
                    if (!('price' in item)) {
                        return <CategoryCard key={index} name={item.name} img={item.img} id={item.id} />
                    } else {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
                    }

                })}
                {isProduct && props.seeMore ? <CategoryCard seeMoreVariant name={props.heading} func={props.seeMore.func} img={{ url: props.seeMore.img.url, alt: props.seeMore.img.alt }} /> : <></>}
            </View>
        </View>
    );
};

export default ItemSection;