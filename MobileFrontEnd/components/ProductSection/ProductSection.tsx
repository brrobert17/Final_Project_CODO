import { View, Text, TouchableOpacity } from 'react-native'
import {Image as IImage} from '@utils/interfaces'
import style from './style'
import ProductCard, { Props as IProductCard } from './ProductCard/ProductCard'
import Dropdown from '@components/DropDown'
import { CategoryCard } from '@components/CategorySection'

interface Props {
    products: IProductCard[],
    title: string,
    sorting?: boolean,
    seeMore?: {
        func: () => void, 
        img: IImage
    }
}

const ProductSection = (props: Props) => {
    return (
        <View style={style.cont}>
            <View style={style.header}>
                {props.seeMore 
                ? 
                    <TouchableOpacity onPress={props.seeMore.func}>
                        <Text style={style.heading}>{props.title}</Text>
                    </TouchableOpacity>
                :
                <Text style={style.heading}>{props.title}</Text>
                }
                
                {props.sorting ? <Dropdown onChange={(foo) => console.log(foo)} /> : <></>}
            </View>
            <View style={style.list}>
                {props.products.map((product, index) => <ProductCard key={index} name={product.name} price={product.price} img={product.img} />)}
                {props.seeMore ? <CategoryCard bigVariant name='See More' img={{url: props.seeMore.img.url, alt: props.seeMore.img.alt}}></CategoryCard> : <></>}
            </View>
        </View>
    )
}

export default ProductSection