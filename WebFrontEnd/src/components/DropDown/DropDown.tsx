import React from "react";
import './style.css'

interface DropDownProps {
    onChange: (value: [string, string]) => void;
}

enum SortOptions {
    ascending = 'ascending',
    descending = 'descending',
}

export const DropDown: React.FC<DropDownProps> = ({ onChange }) => {
    const data = [
        { label: 'price ascending', value: ['price', SortOptions.ascending] },
        { label: 'price descending', value: ['price', SortOptions.descending] },
        { label: 'alphabetically ascending', value: ['name', SortOptions.ascending] },
        { label: 'alphabetically descending', value: ['name', SortOptions.descending] },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = JSON.parse(event.target.value) as [string, string];
        onChange(selectedValue);
    };

    return (
        <div className="dropdown-container">
            <select onChange={handleChange} className="dropdown-select">
                <option value="">Sort by</option>
                {data.map((item, index) => (
                    <option key={index} value={JSON.stringify(item.value)}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

