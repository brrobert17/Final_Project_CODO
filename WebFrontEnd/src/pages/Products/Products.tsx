import './style.css';
import NavBar from "@components/NavBar";
import {navigationPages} from "../Home/Home";
export const Products = () => {
    return(
        <>
            <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'}/>
            <div>
                All products
            </div>
        </>
    )
}