import React from "react";
import './style.css'
import Select, { SingleValue } from "react-select";
import { OrderByParams } from "@interfaces";

interface DropDownProps {
    onChange: (value: OrderByParams) => void;
}

export const DropDown: React.FC<DropDownProps> = ({ onChange }) => {


    const data: { label: string, value: OrderByParams }[] = [
        { label: '$', value: { property: 'price', direction: 'asc' } },
        { label: '$$$', value: { property: 'price', direction: 'desc' } },
        { label: 'od A po Z', value: { property: 'name', direction: 'asc' } },
        { label: 'od Z po A', value: { property: 'name', direction: 'desc' } },
        { label: 'najnovšie', value: { property: 'added', direction: 'desc' } },
        { label: 'najnovšie', value: { property: 'added', direction: 'asc' } },

    ];


    const handleChange = (newValue: SingleValue<{ label: string, value: OrderByParams }>) => {
        if (newValue) onChange(newValue?.value);
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
            placeholder={'Zoradiť podľa...'}
            onChange={handleChange}
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
                menu: (base) => ({
                    ...base,
                    borderColor: 'var(--colorPrimary)',
                    backgroundColor: 'var(--backGroundColorTwo)'
                }),
                option: (base, state) => ({
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

