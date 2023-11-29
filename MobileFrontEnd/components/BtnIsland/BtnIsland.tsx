import { View, Text } from 'react-native';
import style from './style';
import Button from '@components/Button';

interface Props {
    price: number
}

const BtnIsland = (props: Props) => {
    return (
        <View style={style.cont}>
            <View style={style.priceCont}>
                <Text style={style.price}>{props.price}€</Text>
            </View>
            <View style={style.btnCont}>
                <Button side='left' text='Add to card'></Button>
                <Button side='right' text='Buy now' secondary></Button>
            </View>
        </View>
    )
}

export default BtnIsland