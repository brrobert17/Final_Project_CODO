import React from "react";
import './style.css'
import Select from "react-select";

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

    const hoverFocusStyles = {
        borderColor: 'var(--colorPrimary)',
        '.dropdown__indicator': {
            color: 'var(--colorPrimary)'
        }
    };

    return (
        <Select
            options={data}
            placeholder={'Sort by...'}
            classNamePrefix="dropdown"
            styles={{
                control: (base, state) => ({
                    ...base,
                    width: '18em',
                    borderColor: 'transparent',
                    cursor: "pointer",
                    backgroundColor: 'var(--backGroundColorTwo)',
                    ...(state.isFocused && hoverFocusStyles),
                    '&:hover': hoverFocusStyles
                }),
                placeholder: (base) => ({
                    ...base,
                    color: '#fff'
                }),
                dropdownIndicator: (base, state) => ({
                    ...base,
                    color: '#fff'
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: "none"
                }),
                singleValue: (base, state) => ({
                    ...base,
                    color: '#fff'
                }),
                menu:(base)=>({
                    ...base,
                    borderColor: 'var(--colorPrimary)',
                    backgroundColor: 'var(--backGroundColorTwo)'
                }),
                option:(base, state)=>({
                    ...base,
                    color: '#fff',
                    backgroundColor: state.isFocused || state.isSelected ? 'var(--colorInput)' : 'var(--backGroundColorTwo)',
                    '&:hover': {
                        backgroundColor: 'var(--colorInput)'
                    }
                })
            }}
        />

    );
};

