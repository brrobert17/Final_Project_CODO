import './style.css';
import separator from '@assets/separator.svg';

interface Props {
    quantity: number,
    onChange: (newQuantity: number) => void;
}

export const QuantitySelector = (props: Props) => {
    return (
        <div className="quantity-selector">
            <div className="quantity-selector--button" onClick={() => {
                props.quantity - 1 > 0 && props.onChange(props.quantity - 1);
            }}>
                <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="2" rx="1" fill="#fff"/>
                </svg>
            </div>
            <div className="quantity-selector--separator">
                <img src={separator}/>
            </div>
            <div className="quantity-selector--number-input">
                <input type="number" value={props.quantity}
                       onChange={(e) => {
                           const newValue = parseInt(e.target.value, 10);
                           if (!isNaN(newValue) && newValue >= 1 && newValue <= 10000) {
                               props.onChange(newValue);
                           } else {
                               props.onChange(1);
                           }
                       }
                       }/>
                <p>pcs</p>
            </div>
            <div className="quantity-selector--separator">
                <img src={separator}/>
            </div>
            <div className="quantity-selector--button" onClick={() => {
                props.quantity + 1 < 10000 && props.onChange(props.quantity + 1)
            }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="4" width="10" height="2" rx="1" fill="#fff"/>
                    <rect x="4" y="10" width="10" height="2" rx="1" transform="rotate(-90 4 10)" fill="#fff"/>
                </svg>
            </div>
        </div>
    )
}