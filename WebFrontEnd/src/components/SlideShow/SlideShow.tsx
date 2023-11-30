import { useEffect, useReducer, useState } from "react";
import { CircularBuffer } from "@utils/circularBuffer";
import { Image as IImage } from "@utils/interfaces";
import "./style.css"

export const SLIDESHOW_SLIDE_ANIMATION_DURATION = 1000 // in miliseconds

type Direction = "backwards" | "forwards";

type UpdateAction = {
    type: Direction | 'custom';
    payload?: number
};

function reducer(state: CircularBuffer<IImage>, action: UpdateAction) {
    switch (action.type) {
        case 'backwards':
            return state.rotate(-1);
        case 'forwards':
            return state.rotate(1);
        case 'custom':
            if (action.payload) return state.rotate(action.payload);
            return state
        default:
            return state
    }
}


interface Props {
    images: IImage[]
}

const SlideShow = (props: Props) => {

    const [images, dispatch] = useReducer(reducer, new CircularBuffer(props.images.length, props.images));
    const [animationDirection, setAnimationDirection] = useState<Direction | null>(null)

    useEffect(() => {
        setTimeout(() => setAnimationDirection("forwards"), 8000);
    }, [images])

    const clickHandler = (direction: Direction) => {
        setAnimationDirection(direction)
    }

    /* const navigationHandler = (indexInProps: number) => {
        const image = images.indexOf(props.images[indexInProps])
        if (image != -1)
            dispatch({ type: 'custom', payload: image - 1 })
    } */


    return (
        <div className="slideshow">
            <div className="slideshow__show">
                <div className="slideshow__track">
                    {(images.toArray() as IImage[]).filter((_, index) => index < 3).map((img, index) => {
                        const positionClass = index === 0 ? 'prev' : index === 1 ? 'active' : index === 2 ? 'next' : '';
                        const animateClass = animationDirection === 'forwards' && [1, 2].includes(index) ? 'animate-left' : animationDirection === 'backwards' && [0, 1].includes(index) ? 'animate-right' : ''

                        return (<div onTransitionEnd={() => { if (animationDirection != null && positionClass == 'active') { dispatch({ type: animationDirection }); setAnimationDirection(null) } }} className={`slideshow__slide ${positionClass} ${animateClass}`} key={index}>
                            <img src={img.url} alt={img.alt} />
                        </div>)
                    }
                    )}
                </div>
            </div>
            <div className="slide__arrows">
                <div onClick={() => clickHandler("backwards")}>
                    <svg className="slide__arrow" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" />
                    </svg>
                </div>
                <div onClick={() => clickHandler("forwards")}>
                    <svg className="slide__arrow" width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.74365 8.64502L3.10303 15.2856C2.64404 15.7446 1.90186 15.7446 1.44775 15.2856L0.344238 14.1821C-0.114746 13.7231 -0.114746 12.981 0.344238 12.5269L5.05127 7.81982L0.344238 3.11279C-0.114746 2.65381 -0.114746 1.91162 0.344238 1.45752L1.44287 0.344238C1.90186 -0.114746 2.64404 -0.114746 3.09814 0.344238L9.73877 6.98486C10.2026 7.44385 10.2026 8.18604 9.74365 8.64502Z" />
                    </svg>
                </div>
            </div>
            {/* <div className="slideshow__navigation">
                {props.images.map((_, index) => <div className="slideshow__dot-cont"><div className="slideshow__dot" onClick={() => navigationHandler(index)}></div></div>)}
            </div> */}
        </div>
    )
}

export default SlideShow