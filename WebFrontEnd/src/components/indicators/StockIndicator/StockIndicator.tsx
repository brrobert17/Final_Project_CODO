import './style.css';

interface Props {
    stock: number;
    isWysiwyg?: boolean;
    className?: string;
}

export const StockIndicator = ({ stock, isWysiwyg = false, className = '' }: Props) => {
    const stockValue = isWysiwyg ? "1/1" : stock.toString();

    return (
        <div className={`stock-indicator ${className}`}>
            <span className="stock-indicator__text">
                Stock: 
            </span>
            <span>{stockValue}</span>
        </div>
    );
};
