import React, { useEffect, useRef } from 'react'
import './style.css';

interface Props {
    open: boolean
}

const Burger = (props: Props) => {

    const burgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        burgerRef.current?.classList.toggle('active');
    }, [props.open]);

    return (
        <div ref={burgerRef} className='burger'>
            <div className='burger__line'></div>
            <div className='burger__line'></div>
            <div className='burger__line'></div>
        </div>
    )
}

export default Burger