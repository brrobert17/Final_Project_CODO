import './style.css';
import NavBar from "@components/NavBar";
import {navigationPages} from "../Home/Home";
import PriceTag from '@components/PriceTag';
import ImageSlider from '@components/ImageSlider';

export const Product = () => {
  return(
      <>
          <NavBar pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'}/>
          <div>
              Single Product
          </div>
          <ImageSlider />
          <PriceTag text='500' />
      </>
  )
}