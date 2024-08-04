import { useIsMobile } from "@utils/utils";
import { Page } from "../NavBar";
import "./style.css";
import { useEffect, useRef } from "react";
import arrowIcon from "@assets/icon-arrow-right.svg";

interface Props {
    pages: Page[],
    topOffset?: number,
    active?: boolean
}

const NavMenu = (props: Props) => {

    const menuRef = useRef<HTMLUListElement>(null);

    const handleListItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.classList.toggle('active');
    }

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.style.paddingTop = `${props.topOffset}px`;
        }
    }, [props.topOffset])


    useEffect(() => {
        /* implement active class on nav_menu */
        menuRef.current?.classList.toggle('active');
    }, [props.active])

    return (
        <ul ref={menuRef} className="nav__menu">
            {props.pages.map((page, key) =>
                <li onClick={handleListItemClick} key={key}>
                    <a href={page.path}>{page.name}</a>
                    {page.subMenu &&
                        <>
                            <img className="nav__menu__li-arrow" src={arrowIcon} />
                            <div className={"nav__menu__sub-menu"}>
                                {page.subMenu.map((subPage) =>
                                    <a href={subPage.path}>{subPage.name}</a>
                                )}
                            </div>
                        </>
                    }
                </li>
            )}
        </ul>
    )
}

export default NavMenu