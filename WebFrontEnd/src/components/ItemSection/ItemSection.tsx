import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'


export const ItemSection = () => {
    const item = {"name": "Invertebrate5",
        "price": '42€',
        "img":
            {"url": "https://picsum.photos/229", "alt": "invertebrate5 image1"}
        }
    return(
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'}>
                    <h2>All Products</h2>
                    <img src={waves} alt={'waves decoration'}></img>
                </div>
                <button>Sort</button>
            </div>
            <div className={'itemSectionContainer'}>
                <ProductCard name={item.name} price={item.price} img={item.img}/>
                <ProductCard name={item.name} price={item.price} img={item.img}/>
                <ProductCard name={item.name} price={item.price} img={item.img}/>
                <ProductCard name={item.name} price={item.price} img={item.img}/>
                <ProductCard name={item.name} price={item.price} img={item.img}/>
            </div>
        </>


    )
}