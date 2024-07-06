import {Image as IImage} from '@interfaces';
import {useNavigate} from 'react-router-dom';
import './style.css'


export interface Props {
    name: string,
    price: string,
    img: IImage,
    added?: Date,
    id?: string
}

const ProductCard = (props: Props) => {
    const navigate = useNavigate();
    return (
        <div className={"product-card"} onClick={()=>navigate(`/product/${props.id}`)}>
            <div className={'product-card__image-cont image-cont--hover'}>
                <img src={props.img.url} alt={props.img.alt}/>
            </div>
            <h3 className={'product-card__title title--hover'}>{props.name}</h3>
            <p>{props.price} €</p>
        </div>
    )
}

export default ProductCard