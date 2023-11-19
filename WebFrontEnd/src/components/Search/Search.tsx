import React, { ChangeEventHandler, useEffect, useState } from 'react'
import "./style.css";
import searchIcon from "@assets/icon-search.svg";
import fishIcon from "@assets/icon-search-fish.svg";

interface Props {
  placeholder?: string
  label?: string,
  onChange?: (text: string) => void,
  onSearch?: (text: string) => void,
  fishIcon?: boolean

}

const Search = (props: Props) => {

  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

  }
  const handleSearch = (e: React.MouseEvent<HTMLElement>) => {
    if (props.onSearch)
      props.onSearch(inputValue);
  }

  useEffect(() => {
    if (props.onChange)
      props.onChange(inputValue);
  }, [inputValue])



  return (
    <div className='search'>
      {props.label ? <label className=''>{props.label}</label> : <></>}
      <div className='search__box'>
        <input type='text' placeholder={props.placeholder || 'Search'} onChange={handleChange} />
        <div className={`search__icon ${props.fishIcon && "fish"}`} onClick={handleSearch}>
          <img src={props.fishIcon ? fishIcon : searchIcon} alt='Search Icon' />
        </div>
      </div>
    </div>
  )
}

export default Search