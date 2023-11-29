import { TouchableOpacity, View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import style from "./style";
import { useEffect, useReducer, useRef } from "react";

type ActionType = {
    type: "minus" | "plus" | "custom",
    payload?: number
}

function reducer(state: number, action: ActionType) {
    switch (action.type) {
        case 'minus':
            if (state > 1) return state - 1;
            return state;
        case 'plus':
            return state + 1;
        case 'custom':
            if (action.payload) return action.payload;
            return state;
        default:
            return state
    }
}

interface Props {
    wysiwyg?: boolean,
    onChange: (quantity: number) => void
}

const QuantitySelector = (props: Props) => {

    const [count, dispatch] = useReducer(reducer, 1);
    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (props.onChange)
            props.onChange(count);
    }, [count])

    return (
        <View style={style.cont}>
            <TouchableOpacity disabled={props.wysiwyg ? true : false} style={style.symbolCont} onPress={() => dispatch({ type: "minus" })}>
                <Text style={[style.symbol, props.wysiwyg && style.symbolDisabled]}>-</Text>
            </TouchableOpacity>
            <View style={style.separator}></View>
            <TouchableWithoutFeedback onPress={() => inputRef.current && inputRef.current.focus()} >
                <View style={style.textCont}>
                    <TextInput
                        ref={inputRef}
                        returnKeyType="done"
                        keyboardType="number-pad"
                        style={style.text}
                        defaultValue={props.wysiwyg ? "WYSIWYG" : count.toString()}
                        onChangeText={(text) => dispatch({ type: "custom", payload: Number(text) })}
                        selectTextOnFocus
                    />
                    {!(props.wysiwyg) &&
                        <Text style={style.text}>pcs</Text>
                    }
                </View>
            </TouchableWithoutFeedback>
            <View style={style.separator}></View>
            <TouchableOpacity disabled={props.wysiwyg ? true : false} style={style.symbolCont} onPress={() => dispatch({ type: 'plus' })}>
                <Text style={[style.symbol, props.wysiwyg && style.symbolDisabled]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuantitySelector