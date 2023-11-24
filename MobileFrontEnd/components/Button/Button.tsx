import { Text, TouchableOpacity, View } from 'react-native'
import style from './style';

interface Props {
    text: string,
    secondary?: boolean,
    side?: "left" | "right",
}

const Button = (props: Props) => {

    const contStyle = props.side === "left" ? style.contLeft : style.contRight;

    return (
        <TouchableOpacity style={[style.cont, contStyle, props.secondary && style.constSecondary]}>
            <Text style={[style.text, props.secondary && style.textSecondary]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default Button