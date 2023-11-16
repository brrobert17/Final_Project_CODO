import { useReducer, useState } from "react";
import { CircularBuffer } from "../../utils/circularBuffer";
import { Image as IImage } from "../../utils/interfaces";
import "./style.css"

type UpdateAction = {
    type: 'backwards' | 'forwards';
    payload: CircularBuffer<IImage>;
};

function reducer(state: CircularBuffer<IImage>, action: UpdateAction) {
    switch (action.type) {
        case 'backwards':
            return state.rotate(-1);
        case 'forwards':
            return state.rotate(1);
        default:
            return state
    }
}

interface Props {
    images: IImage[]
}

const SlideShow = (props: Props) => {

    const [images, dispatch] = useReducer(reducer, new CircularBuffer(props.images.length, props.images));

    return (
        <div className="slideshow">
            <div className="slideshow__show">
                {
                    images.toArray() != null &&
                    (images.toArray() as IImage[]).map((img) =>
                        <div className="slideshow__slide">
                            <img src={img.url} alt={img.alt} />
                        </div>
                    )
                }
            </div>
            <div className="slideshow__dots">
                <h1>{ }</h1>
            </div>
            <div className="slideshow__arrows">
                <button onClick={() => dispatch({ type: "backwards", payload: images })}>backward</button>
                <button onClick={() => dispatch({ type: "forwards", payload: images })}>forward</button>
            </div>
        </div>
    )
}

export default SlideShow