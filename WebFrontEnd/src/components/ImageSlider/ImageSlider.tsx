// Modified code from https://www.youtube.com/watch?v=W0bEL93tt4k

import { useEffect, useRef, useState } from "react";
import "./style.css";
import { PanInfo, motion } from "framer-motion";
import { Image as IImage } from "@utils/interfaces";

interface Props {
    images: IImage[],
}

const ImageSlider = (props: Props) => {
    const [width, setWidth] = useState(0);
    const [offset, setOffset] = useState<{ x: number }>({ x: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const carousel = useRef<HTMLDivElement>(null);
    const [itemWidth, setItemWidth] = useState(0);
    const [selectedImage, setSelectedImage] = useState<IImage>(props.images[0]);
    
    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
            // Get the first slider item and calculate its total width including padding
            const sliderItem = carousel.current.querySelector('.slider__item');
            if (sliderItem) {
                const computedStyle = window.getComputedStyle(sliderItem);
                const totalWidth = sliderItem.getBoundingClientRect().width +
                    parseFloat(computedStyle.marginLeft || '0') +
                    parseFloat(computedStyle.marginRight || '0');
                setItemWidth(totalWidth);
            }
        }
    }, []);

    const upperLimitReached = !((-offset.x) < width);
    const lowerLimitReached = !(offset.x < 0);

    const arrowClickHandler = (direction: "forwards" | "backwards") => {
        if (carousel.current && itemWidth) {
            const currentPosition = offset.x;
            const newPosition = direction === "forwards" 
                ? Math.max(-width, currentPosition - itemWidth)
                : Math.min(0, currentPosition + itemWidth);
            
            setOffset({ x: newPosition });
        }
    };

    const handleDragEnd = (event: any, info: PanInfo) => {
        setIsDragging(false);
        
        if (itemWidth) {
            // Calculate the nearest snap point
            const currentOffset = offset.x + info.offset.x;
            const nearestMultiple = Math.round(currentOffset / itemWidth) * itemWidth;
            const newPosition = Math.min(0, Math.max(-width, nearestMultiple));
            
            setOffset({ x: newPosition });
        }
    };

    const clickHandler = (image: IImage) => {
        if (isDragging) return;
        setSelectedImage(image);
    }

    console.log(selectedImage)

    return (
        <div>
            <div className="slider-image-view">
                <img src={selectedImage.url} alt={selectedImage.alt} />
            </div>
            <div className="slider">
                <div onClick={() => arrowClickHandler("backwards")}>
                    <svg className={`slide__arrow ${lowerLimitReached && 'disabled'}`} width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" />
                    </svg>
                </div>

                <motion.div
                    ref={carousel}
                    className="slider__carousel"
                    whileTap={{ cursor: "grabbing" }}
                >
                    <motion.div
                        drag="x"
                        onDragStart={(e) => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        animate={offset}
                        transition={{
                            type: "spring",
                            stiffness: 280,  // How stiff the spring is. Higher numbers will create more sudden movement.
                            damping: 23,     // Resistance to motion. Lower numbers may extend the bouncing effect.
                            mass: 1,         // Mass of the object. Higher mass will result in more inertia.
                            restDelta: 0.5   // End animation if the distance to the target is below this value.
                        }}
                        dragConstraints={{ right: 0, left: -width }}
                        className="slider__inner"
                    >
                        {props.images.map((image, index) => {
                            return (
                                <motion.div onClick={() => clickHandler(image)} className="slider__item" key={index}>
                                    <img src={image.url} alt={image.alt} />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
                <div onClick={() => arrowClickHandler("forwards")}>
                    <svg className={`slide__arrow ${upperLimitReached && 'disabled'}`} width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.74365 8.64502L3.10303 15.2856C2.64404 15.7446 1.90186 15.7446 1.44775 15.2856L0.344238 14.1821C-0.114746 13.7231 -0.114746 12.981 0.344238 12.5269L5.05127 7.81982L0.344238 3.11279C-0.114746 2.65381 -0.114746 1.91162 0.344238 1.45752L1.44287 0.344238C1.90186 -0.114746 2.64404 -0.114746 3.09814 0.344238L9.73877 6.98486C10.2026 7.44385 10.2026 8.18604 9.74365 8.64502Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
export default ImageSlider