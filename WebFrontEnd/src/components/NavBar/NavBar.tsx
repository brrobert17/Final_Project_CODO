import logoWaveless from "@assets/logo-schulz-waveless.svg";
import logo from "@assets/logo-schulz.svg";
import iconBurger from "@assets/icon-burger_menu.svg";
import iconCart from "@assets/icon-shopping-cart.svg";
import iconUsers from "@assets/icon-users.svg";
import "./style.css"
import {useState} from "react";
import {isMobile, useWindowWidth} from "@utils/utils";
import {useMediaQuery} from "react-responsive";

interface Page {
    name: string,
    path: string,
    subMenu?: Page[],
}

interface Props {
    pages: Page[],
    loginUrl: string,
    shoppingCartUrl: string
}

const NavBar = (props: Props) => {
    const isM = isMobile();


    return (
        <div className="nav">
            <a href="/" className="nav__logo-cont">
                {isM ? <img className="nav__logo" src={logo} alt={"logo - Schulz morské akvária"}></img> :
                    <img className="nav__logo" src={logoWaveless} alt={"logo - Schulz morské akvária"}></img>}
            </a>
            <ul className="nav__menu">
                {props.pages.map((page, key) =>
                    <li key={key}>
                        <a href={page.path}>{page.name}</a>
                        {/* Sub Menu functionality*/}
                        {/* {page.subMenu &&
              <div className={"nav__menu__sub-menu"}>
                {page.subMenu.map((subPage) => 
                  <a href={subPage.path}>{subPage.name}</a>
                )}
              </div>
            } */}
                    </li>
                )}
            </ul>
            <div className="nav__icon-cont">
                <button className="nav__icon burger">
                    <img src={iconBurger}></img>
                </button>
                {/*<a href={props.loginUrl} className="nav__icon">*/}
                {/*  <img src={iconUsers} alt={"users icon"}></img>*/}
                {/*</a>*/}
                {/*<a href={props.shoppingCartUrl} className="nav__icon">*/}
                {/*  <img src={iconCart} alt={"shopping cart icon"}></img>*/}
                {/*</a>*/}
            </div>
        </div>
    )
}

export default NavBar