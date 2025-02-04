import priceTagIcon from "@assets/price-tag.svg";
import "./style.css";

interface Props {
    text: number
}

const PriceTag = (props: Props) => {
    return (
        <div className="price-tag">
            <img className="price-tag__img" src={priceTagIcon} alt="Yellow price tag icon" />
            <h2 className="price-tag__text">{props.text}€</h2>
            <span className="price-tag__secondary-text"> s DPH</span>
        </div>
    )
}

export default PriceTag