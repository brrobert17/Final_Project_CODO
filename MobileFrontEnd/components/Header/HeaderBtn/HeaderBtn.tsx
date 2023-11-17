import { TouchableOpacity, View, Image } from 'react-native';
import style from "./style";
import CartIcon from "@assets/icon-shopping_cart.svg";
import BurgerMenu from "@assets/icon-burger_menu.svg";
import ExitIcon from "@assets/icon-exit.svg";
import FishLogo from "@assets/logo-fish.svg";


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
HeaderBtn.Exit = (props: Props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={style.iconCont}>
            <ExitIcon width={18} height={18} fill={'white'}/>
        </TouchableOpacity>

    );
}
HeaderBtn.Fish = (props: Props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={style.iconCont}>
            <FishLogo width={40} height={40} fill={'white'}/>
        </TouchableOpacity>

    );
}

export default HeaderBtn;