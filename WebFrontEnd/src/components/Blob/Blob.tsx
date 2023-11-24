import { ReactNode } from 'react';
import './style.css';
import backgroundSvg from "@assets/blob-wave-top-2.svg";

interface Props {
    children: ReactNode
}

const Blob = (props: Props) => {
    return (
        <div className='blob'>
            <img className='blob__background' src={backgroundSvg} alt={backgroundSvg} />
            <div className='blob__children-cont'>
                {props.children}
            </div>
        </div>
    )
}

export default Blob