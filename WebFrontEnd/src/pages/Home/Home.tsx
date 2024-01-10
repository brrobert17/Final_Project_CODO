import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import SlideShow from "../../components/SlideShow"
import InfoSection from "@components/InfoSection";
import { useNavigate } from "react-router-dom";
import { useProductCores } from "@dbConn/hooks/UseProducts";
import { useEffect } from "react";

export const navigationPages = [
    {
        name: "Home",
        path: "/",

    },
    {
        name: "All Products",
        path: "/products",
        subMenu: [
            {
                name: "Corals",
                path: "/corals",
            },
            {
                name: "Fish",
                path: "/fish",
            },
            {
                name: "Invertibrates",
                path: "/invertibrates",
            },
            {
                name: "Other",
                path: "/other",
            }
        ]
    },
    {
        name: "Info",
        path: "/",

    },
    {
        name: "Contact",
        path: "/",

    }
]
const slideShowImages = [
    {
        url: "https://picsum.photos/1440/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/1441/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/1440/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/1441/421",
        alt: "random image"
    }
]

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"} />
            <SlideShow images={slideShowImages} />
            <InfoSection />
            <div className={'pageContainer'}>
                <ItemSection heading={'Corals'}
                    itemType={'Product'}
                    queryParams={{ limit: 3, type: 'default', categoryId: 'rUm6nc' }}
                    seeMore={{
                        func: () => navigate(`/products/rUm6nc`),
                        img: { url: "https://picsum.photos/300/500", alt: "something something" }
                    }} />
                <ItemSection heading={'Fish'}
                    itemType={'Product'}
                    queryParams={{ limit: 3, type: 'default', categoryId: 'Q0i1y5' }}
                    seeMore={{
                        func: () => navigate(`/products/Q0i1y5`),
                        img: { url: "https://picsum.photos/300/500", alt: "something something" }
                    }} />
                <ItemSection heading={'Invertibrates'}
                    itemType={'Product'}
                    queryParams={{ limit: 3, type: 'default', categoryId: 'aRu8ro' }}
                    seeMore={{
                        func: () => navigate(`/products/aRu8ro`),
                        img: { url: "https://picsum.photos/300/500", alt: "something something" }
                    }} />
                <ItemSection heading={'All Products'}
                    itemType={'Product'}
                    queryParams={{ limit: 7, type: 'default' }}
                    seeMore={{
                        func: () => navigate(`/products`),
                        img: { url: "https://picsum.photos/300/500", alt: "something something" }
                    }} />
            </div>
        </>
    )
}

export default Home