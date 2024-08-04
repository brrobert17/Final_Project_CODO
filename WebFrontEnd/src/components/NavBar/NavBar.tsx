import logoWaveless from "@assets/logo-schulz-waveless.svg";
import logo from "@assets/logo-schulz.svg";
import iconBurger from "@assets/icon-burger_menu.svg";
import iconCart from "@assets/icon-shopping-cart.svg";
import iconUsers from "@assets/icon-users.svg";
import "./style.css"
import { useEffect, useRef, useState } from "react";
import { useIsMobile, useWindowWidth } from "@utils/utils";
import { useMediaQuery } from "react-responsive";
import NavMenu from "./NavMenu/NavMenu";
import Burger from "./Burger/Burger";

export interface Page {
    name: string,
    path: string,
    subMenu?: Page[],
}

interface Props {
    pages: Page[],
    loginUrl: string,
    shoppingCartUrl: string
    size: 'small' | 'big'
}

const NavBar = (props: Props) => {

    const isM = useIsMobile();
    const placeholderRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(props.size == "small" ? true : false);
    const [placeholderOffset, setPlaceholderOffset] = useState<number>(0);
    const [isMMenuActive, setIsMMenuActive] = useState<boolean>(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (props.size != "small") setIsScrolling(scrollTop > 0);
    };

    const handleBurgerClick = () => {
        setIsMMenuActive(!isMMenuActive);
    }

    const renderHeightOfPlaceholder = () => {

        if (placeholderRef.current && navRef.current) {
            const off = navRef.current.offsetHeight;
            setPlaceholderOffset(off)
            placeholderRef.current.style.height = `${off}px`;
            console.log("here is the offset of placeholder  ", placeholderOffset)
        }
    }

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);
        renderHeightOfPlaceholder()
    }, [])

    useEffect(() => {
        renderHeightOfPlaceholder()
    }, [isScrolling])

    return (
        <>
            {isM ? <div ref={placeholderRef} className="nav__placeholder"></div> : <></>}
            <div ref={navRef} className={`nav  ${isScrolling ? 'scrolling' : ''}`}>
                <a href="/" className="nav__logo-cont">
                    {isM ?
                        <img className="nav__logo" src={logo} alt={"logo - Schulz morské akvária"}></img>
                        :
                        <img className="nav__logo" src={logoWaveless} alt={"logo - Schulz morské akvária"}></img>}
                </a>
                <NavMenu pages={props.pages} topOffset={isM ? placeholderOffset : undefined} active={isMMenuActive} />
                <div className="nav__icon-cont">
                    <button onClick={handleBurgerClick} className="nav__icon burger">
                        {/* <img src={iconBurger}></img> */}
                        <Burger open={isMMenuActive} />
                    </button>
                    {/*<a href={props.loginUrl} className="nav__icon">*/}
                    {/*  <img src={iconUsers} alt={"users icon"}></img>*/}
                    {/*</a>*/}
                    {/*<a href={props.shoppingCartUrl} className="nav__icon">*/}
                    {/*  <img src={iconCart} alt={"shopping cart icon"}></img>*/}
                    {/*</a>*/}
                </div>
            </div>
        </>
    )
}

export default NavBar