import { Image as IImage } from '@interfaces';
import "./style.css";
import {useNavigate} from "react-router-dom";
import {capitalizeWords, useIsMobile} from "@utils/utils";

export interface Props {
    name: string,
    id?: string,
    img: IImage,
    bigVariant?: boolean,
    func?: ()=>void
}


const CategoryCard = (props: Props) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    let fontSize = "var(--fontSize-medium)";
    if(isMobile) {
        if(props.name.length > 5) {
            fontSize = "var(--fontSize-regular)";
        } else if (props.name.length > 11) {
            fontSize = "var(--fontSize-small)";
        }
    }
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
            <h3 style={{fontSize: fontSize}}>{capitalizeWords(props.name)}</h3>
        </div>
    </div>
    )
}

export default CategoryCard