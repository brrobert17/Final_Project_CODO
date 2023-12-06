import { Image as IImage } from '@interfaces';
import "./style.css";
import {useNavigate} from "react-router-dom";

export interface Props {
    name: string,
    id: string,
    img: IImage,
    bigVariant?: boolean
}


const CategoryCard = (props: Props) => {
   const navigate = useNavigate();
   const handleClick = (categoryId: string)=> {
       navigate(`/products/${categoryId}`)
   }

    return (
    <div className="category-card" onClick={() => handleClick(props.id)}>
        <div className={`category-card__inner ${props.bigVariant && 'square'}`}>
            <div className="category-card__image-cont image-cont--hover">
                <img src={props.img.url} alt={props.img.alt}/>
            </div>
            <h3>{props.name}</h3>
        </div>
    </div>
    )
}

export default CategoryCard