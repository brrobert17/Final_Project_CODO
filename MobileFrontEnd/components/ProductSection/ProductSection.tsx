import { View, Text } from 'react-native'
import style from './style'
import gStyle from '@gStyle'
import ProductCard, { Props as IProductCard } from './ProductCard/ProductCard'

interface Props {
    products: IProductCard[]
}

const ProductSection = (props: Props) => {
  return (
    <View style={style.cont}>
        <Text style={gStyle.h1}>Products</Text>
        <View style={style.list}>
            {props.products.map((product) => <ProductCard name={product.name} price={product.price} img={product.img} />)}
        </View>   
    </View>
  )
}

export default ProductSection