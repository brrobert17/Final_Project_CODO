import React, { useRef } from 'react';
import { View, Text, FlatList, NativeSyntheticEvent, LayoutChangeEvent, ViewStyle } from 'react-native';
import style from './style';
import gStyle from '@gStyle';
import CategoryCard, { Props as Category } from './CategoryCard/CategoryCard';

interface Props {
    categories: Category[]
}

const CategorySection = (props: Props) => {

    return (
        <View style={style.cont} >
            <Text style={gStyle.h1}>Categories</Text>
            <View style={style.list}>
                {props.categories.map((category) => <CategoryCard name={category.name} img={category.img}/>)}
            </View>
        </View>
    );
};

export default CategorySection;