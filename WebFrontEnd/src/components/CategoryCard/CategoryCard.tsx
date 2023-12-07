import { Image as IImage } from '@interfaces';
import "./style.css";
import {useNavigate} from "react-router-dom";
import {capitalizeWords} from "@utils/utils";

export interface Props {
    name: string,
    id?: string,
    img: IImage,
    bigVariant?: boolean,
    func?: ()=>void
}


const CategoryCard = (props: Props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        props.id && navigate(`/products/${props.id}`)
        props.func && props.func();
    }

    return (
    <div className="category-card" onClick={handleClick}>
        <div className={`category-card__inner ${props.bigVariant && 'square'}`}>
            <div className="category-card__image-cont image-cont--hover">
                <img src={props.img.url} alt={props.img.alt}/>
            </div>
            <h3>{capitalizeWords(props.name)}</h3>
        </div>
    </div>
    )
}

export default CategoryCard