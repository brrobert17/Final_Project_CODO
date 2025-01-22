import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import SlideShow from "../../components/SlideShow"
import InfoSection from "@components/InfoSection";
import { useNavigate } from "react-router-dom";
import { useProductCores } from "@dbConn/hooks/UseProducts";
import { useEffect } from "react";
import { useMenuCategories } from "@dbConn/hooks/UseCategories";

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
        name: "Contact",
        path: "/",

    }
]
const slideShowImages = [
    {
        url: "https://i.pinimg.com/originals/cf/78/f5/cf78f595abe0e226c1bf52837a5cf3b4--coral-color-blue-colors.jpg",
        alt: "random image"
    },
    {
        url: "https://i.pinimg.com/originals/40/aa/04/40aa0499adb6c4bb96f089b956f3f483--macro-nature-photography-creative-photography.jpg",
        alt: "random image"
    },
    {
        url: "https://media.gettyimages.com/id/1357375506/photo/macro-photo-of-a-fan-coral-abstract.jpg?s=612x612&w=0&k=20&c=aZwH6wZm2dJdD9nNUTbUt5lcBMJ2miLPDRoaHpARQmQ=",
        alt: "random image"
    }
]

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar size="big" pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"} />
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