import { Image, View, Text } from 'react-native';
import PriceTagIcon from '@assets/price-tag.svg';
import style from './style';

interface Props {
    price: number
}

const PriceTag = (props: Props) => {
    return (
        <View style={style.cont}>
            <PriceTagIcon style={style.icon} />
            <Text style={style.price}>{props.price}€</Text>
        </View>
    )
}

export default PriceTag