import Svg, {Path} from "react-native-svg";
import {styles} from "./style";

interface Props {
    arrowDirection?: ArrowDirection
}

export enum ArrowDirection {
    UP = 1,
    RIGHT = 2,
    DOWN = 3,
    LEFT = 4
}
const Arrow = (props:Props) => {
    let selectedArrowStyle;

    if(props.arrowDirection) {
        switch (props.arrowDirection) {
            case ArrowDirection.UP:
                selectedArrowStyle = styles.up
                break;
            case ArrowDirection.DOWN:
                selectedArrowStyle = styles.down;
                break;
            case ArrowDirection.LEFT:
                selectedArrowStyle = styles.left;
                break;
            case ArrowDirection.RIGHT:
                break;
            default:
                break;
        }
    }

    return (
        <Svg style={selectedArrowStyle} width="11" height="16" viewBox="0 0 11 16" fill="none" >
            <Path
                d="M10.6558 8.82395L4.01514 15.419C3.55615 15.8748 2.81396 15.8748 2.35986 15.419L1.25635 14.3231C0.797363 13.8672 0.797363 13.1301 1.25635 12.6791L5.96338 8.00442L1.25635 3.3297C0.797363 2.87387 0.797363 2.13678 1.25635 1.6858L2.35498 0.580156C2.81396 0.124323 3.55615 0.124323 4.01025 0.580156L10.6509 7.17519C11.1147 7.63103 11.1147 8.36812 10.6558 8.82395Z"
                fill="white"/>
            <Path
                d="M10.6558 8.82395L4.01514 15.419C3.55615 15.8748 2.81396 15.8748 2.35986 15.419L1.25635 14.3231C0.797363 13.8672 0.797363 13.1301 1.25635 12.6791L5.96338 8.00442L1.25635 3.3297C0.797363 2.87387 0.797363 2.13678 1.25635 1.6858L2.35498 0.580156C2.81396 0.124323 3.55615 0.124323 4.01025 0.580156L10.6509 7.17519C11.1147 7.63103 11.1147 8.36812 10.6558 8.82395Z"
                fill="white"/>
        </Svg>
    )
}
export default Arrow;