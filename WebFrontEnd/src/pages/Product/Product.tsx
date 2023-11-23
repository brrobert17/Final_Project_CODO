import './style.css';
import NavBar from "@components/NavBar";
import {navigationPages} from "../Home/Home";
export const Product = () => {
  return(
      <>
          <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'}/>
          <div>
              Single Product
          </div>
      </>
  )
}