import { useIsMobile } from "@utils/utils";
import { Page } from "../NavBar";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import arrowIcon from "@assets/icon-arrow-right.svg";

interface Props {
    pages: Page[],
    topOffset?: number,
    active?: boolean
}

const NavMenu = (props: Props) => {

    const menuRef = useRef<HTMLUListElement>(null);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const isMobile = useIsMobile()

    const handleArrowClick = (e: React.MouseEvent<HTMLImageElement>, pageIndex: number) => {
        if (!isMobile) return;
        e.stopPropagation(); // Prevent triggering the parent li click
        const newExpandedItems = new Set(expandedItems);
        if (expandedItems.has(pageIndex)) {
            newExpandedItems.delete(pageIndex);
        } else {
            newExpandedItems.add(pageIndex);
        }
        setExpandedItems(newExpandedItems);
    };

    const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, pageIndex: number, hasSubMenu: boolean) => {
        e.preventDefault(); // Prevent immediate navigation
        
        if (!hasSubMenu || !isMobile) {
            // If no submenu or is not mobile screen, navigate immediately
            window.location.href = props.pages[pageIndex].path;
            return;
        }

        if (expandedItems.has(pageIndex)) {
            // If already expanded, navigate to the page
            window.location.href = props.pages[pageIndex].path;
        } else {
            // First click: expand the submenu
            const newExpandedItems = new Set(expandedItems);
            newExpandedItems.add(pageIndex);
            setExpandedItems(newExpandedItems);
        }
    };

    const handleSubItemClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.stopPropagation(); // Prevent triggering parent click
        window.location.href = path;
    };

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.style.paddingTop = `${props.topOffset}px`;
        }
    }, [props.topOffset]);

    useEffect(() => {
        menuRef.current?.classList.toggle('active');
    }, [props.active]);

    return (
        <ul ref={menuRef} className="nav__menu">
            {props.pages.map((page, index) => (
                <li 
                    key={index}
                    onClick={(e) => handleItemClick(e, index, !!page.subMenu)}
                    className={expandedItems.has(index) ? 'active' : ''}
                >
                        <span>{page.name}</span>
                        {page.subMenu && (
                            <img 
                                className="nav__menu__li-arrow" 
                                src={arrowIcon} 
                                alt="expand"
                                onClick={(e) => handleArrowClick(e, index)}
                            />
                        )}
                    {page.subMenu && (
                        <div className={`nav__menu__sub-menu ${expandedItems.has(index) ? 'expanded' : ''}`}>
                            {page.subMenu.map((subPage, subIndex) => (
                                <a 
                                    key={subIndex}
                                    onClick={(e) => handleSubItemClick(e, subPage.path)}
                                    href={subPage.path}
                                >
                                    {subPage.name}
                                </a>
                            ))}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;