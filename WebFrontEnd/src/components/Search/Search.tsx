import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import "./style.css";
import searchIcon from "@assets/icon-search.svg";
import fishIcon from "@assets/icon-search-fish.svg";
import algoliasearch from 'algoliasearch/lite';
import { Image, Product, ProductCore } from '@interfaces';
import ItemSection from '@components/ItemSection';
import { debounce } from '@utils/utils'


const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID as string, process.env.REACT_APP_ALGOLIA_ADMIN_API_KEY as string);
const index = searchClient.initIndex('products');

interface Hit {
  objectID: string,
  name: string,
  price: number,
  img: Image[]
}

interface Props {
  placeholder?: string
  label?: string,
  onChange?: (text: string) => void,
  onSearch?: (text: string) => void,
  fishIcon?: boolean,
  displayHits?: boolean

}

const Search = (props: Props) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [hits, setHits] = useState<Hit[]>([])

  // Debounce the search term input by the user
  const debouncedSearch = useCallback(debounce((searchValue: string) => {
    setInputValue(searchValue);
  }, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }


  const handleSearch = () => {
    if (props.onSearch)
      props.onSearch(inputValue);
  }

  const fetchHits = async () => {
    const { hits } = await index.search<Hit>(inputValue);
    console.log("something something hits", hits)
    setHits(hits);

  }

  useEffect(() => {
    if (props.displayHits) {
      fetchHits()
    }
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('keyword'); // Replace 'query' with your parameter name
    if (query) {
      setInputValue(query);
    }
  }, [])

  useEffect(() => {
    if (props.displayHits) {
      fetchHits()
    } else if (props.onChange) {
      props.onChange(inputValue);

    }
  }, [inputValue])

  useEffect(() => {
    console.log("hits", hits)
  }, [hits])



  return (
    <div className='search'>
      {props.label ? <label className=''>{props.label}</label> : <></>}
      <div className={props.displayHits ? "search__box-cont" : ""}>
        {props.displayHits ? <h1>Hľadať produkty</h1> : <></>}
        <div className='search__box'>
          <input defaultValue={inputValue} type='text' placeholder={props.placeholder || 'Hľadať'} onChange={handleChange} onKeyDown={(e) => e.code == "Enter" && props.onSearch && props.onSearch(e.currentTarget.value)} />
          <div className={`search__icon ${props.fishIcon && "fish"}`} onClick={handleSearch}>
            <img src={props.fishIcon ? fishIcon : searchIcon} alt='Search Icon' />
          </div>
        </div>
      </div>
      {props.displayHits && hits ?
        <div className='hits__box'>
          <ItemSection heading={"Search Results"} itemType={hits.map((hit) => { return { id: hit.objectID, name: hit.name, price: hit.price + "", img: hit.img[0], } })} />
        </div>
        :
        <></>
      }

    </div>
  )
}

interface HitProps {
  hit: { ObjectID: string, name: string, price: number, img: Image[] }
  // hit: any
}



export default Search