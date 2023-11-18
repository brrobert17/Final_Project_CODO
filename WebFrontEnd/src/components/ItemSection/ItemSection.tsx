import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'
import {Image as IImage} from "@interfaces";
import type {ProductProps} from '@components/ProductCard'
import type {CategoryProps} from '@components/CategoryCard'
import CategoryCard from "@components/CategoryCard";
import itemSection from "@components/ItemSection/index";

interface Props {
    heading: string,
    items: CategoryProps[] | ProductProps[],
    sorting?: boolean,
    seeMore?: {
        func: () => void,
        img: IImage
    }
}

// const ItemSection = (props: Props) => {
//
//     const isProduct = 'price' in props.items[0]
//
//     return (
//             <View style={style.list}>
//                 {props.items.map((item, index) => {
//                     if(!('price' in item)) {
//                         return <CategoryCard key={index} name={item.name} img={item.img}/>
//                     } else {
//                         return <ProductCard key={index} name={item.name} price={item.price} img={item.img} />
//                     }
//
//                 })}
//                 {isProduct && props.seeMore ? <CategoryCard bigVariant name='See More' img={{url: props.seeMore.img.url, alt: props.seeMore.img.alt}}></CategoryCard> : <></>}
//             </View>
//         </View>
//     );
// };

export const ItemSection = (props: Props) => {

    const isProduct = 'price' in props.items[0];

    return (
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'}>
                    <h2 className={'clickableTitle'}>{props.heading}</h2>
                    <img src={waves} alt={'waves decoration'}></img>
                </div>
                <button>Sort</button>
            </div>
            <div className={'itemSectionContainer'}>
                {props.items.map((item, index) => {
                    if (!('price' in item)) {
                        return <CategoryCard key={index} name={item.name} img={item.img}/>
                    } else {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img}/>
                    }
                })}
                {isProduct && props.seeMore ? <CategoryCard bigVariant name='See More' img={{
                    url: props.seeMore.img.url,
                    alt: props.seeMore.img.alt
                }}></CategoryCard> : <></>}
            </div>
        </>


    )
}