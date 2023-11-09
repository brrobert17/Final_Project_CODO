import { TouchableOpacity, View, Image } from 'react-native';
import style from "./style";
import CartIcon from "@assets/icon-shopping_cart.svg";
import BurgerMenu from "@assets/icon-burger_menu.svg";


interface Props {
    onPress: () => void
}

let HeaderBtn: any = {}

HeaderBtn.Cart = (props: Props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={style.iconCont}>
            <CartIcon width={24} height={24} fill={'white'}/>
        </TouchableOpacity>

    );
}

HeaderBtn.Burger = (props: Props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={style.iconCont}>
            <BurgerMenu width={24} height={24} fill={'white'}/>
        </TouchableOpacity>

    );
}

export default HeaderBtn;