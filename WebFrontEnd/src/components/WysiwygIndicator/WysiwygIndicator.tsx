import './style.css';

interface Props {
    className?: string;
}

export const WysiwygIndicator = ({ className = '' }: Props) => {
    return (
        <div className={`wysiwyg-indicator ${className}`}>
            <svg className="wysiwyg-indicator__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="wysiwyg-indicator__text">WYSIWYG</span>
        </div>
    );
};