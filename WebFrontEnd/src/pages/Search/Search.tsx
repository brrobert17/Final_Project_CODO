import NavBar from "@components/NavBar"
import "./style.css"
import { navigationPages } from "pages/Home/Home"
import SearchBox from "@components/Search"

const Search = () => {
  return (
    <>
    <NavBar size="small" pages={navigationPages} loginUrl={'/login'} shoppingCartUrl={'/cart'} />
    <div className='products-page'>
        <div className='page-cont'>
            <SearchBox displayHits/>
        </div>
    </div>
</>
  )
}

export default Search