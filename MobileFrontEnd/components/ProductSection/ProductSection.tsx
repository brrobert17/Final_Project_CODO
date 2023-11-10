import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'
import ProductCard, { Props as IProductCard } from './ProductCard/ProductCard'
import Dropdown from '@components/DropDown'
import { CategoryCard } from '@components/CategorySection'

interface Props {
    products: IProductCard[],
    sorting?: boolean,
    seeMore?: () => void
}

const ProductSection = (props: Props) => {
    return (
        <View style={style.cont}>
            <View style={style.header}>
                {props.seeMore 
                ? 
                    <TouchableOpacity onPress={props.seeMore}>
                        <Text style={style.heading}>Products</Text>
                    </TouchableOpacity>
                :
                <Text style={style.heading}>Products</Text>
                }
                
                {props.sorting ? <Dropdown onChange={(foo) => console.log(foo)} /> : <></>}
            </View>
            <View style={style.list}>
                {props.products.map((product) => <ProductCard name={product.name} price={product.price} img={product.img} />)}
                {props.seeMore ? <CategoryCard bigVariant name='See More' img={{url: "https://picsum.photos/201", alt: "something something"}}></CategoryCard> : <></>}
            </View>
        </View>
    )
}

export default ProductSection