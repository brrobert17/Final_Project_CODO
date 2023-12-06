import Heading from "components/Heading";
import ProductCard from "../ProductCard";
import './style.css'
import waves from '@assets/waves.svg'
import { Image as IImage } from "@interfaces";
import type { ProductProps } from '@components/ProductCard'
import type { CategoryProps } from '@components/CategoryCard'
import CategoryCard from "@components/CategoryCard";
import DropDown from "@components/DropDown";

interface Props {
    heading: string,
    items: CategoryProps[] | ProductProps[],
    sorting?: boolean,
    seeMore?: {
        func: () => void,
        img: IImage
    },
    small?: boolean
}

export const ItemSection = (props: Props) => {



    const isProduct = props.items[0] ? 'price' in props.items[0] : false;

    return (
        <>
            <div className={'itemSectionHeader'}>
                <div className={'itemSectionTitle'}>
                    <h2 className={'title--hover'}>{props.heading}</h2>
                    <img src={waves} alt={'waves decoration'}></img>
                </div>
                {props.sorting ? <DropDown onChange={(foo) => console.log(foo)} /> : <></>}
            </div>
            <div className={`itemSectionContainer ${props.small && 'small'}`}>
                {props.items.map((item, index) => {
                    if (!('price' in item)) {
                        return <CategoryCard key={index} name={item.name} img={item.img} />
                    } else {
                        return <ProductCard key={index} name={item.name} price={item.price} img={item.img} id={item.id} />
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