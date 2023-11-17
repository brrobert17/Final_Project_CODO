import {Image as IImage} from '@interfaces';
import './style.css'


export interface Props {
    name: string,
    price: string,
    img: IImage,
    added?: Date,
    id?: string
}

const ProductCard = (props: Props) => {
    return (
        <div className={"productCardContainer"}>
            <img src={props.img.url} alt={props.img.alt}/>
            <h3>{props.name}</h3>
            <p>{props.price}</p>
        </div>
    )
}

export default ProductCard