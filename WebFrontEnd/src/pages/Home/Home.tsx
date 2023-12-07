import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import {QueryParam} from "@interfaces";
import {useProductsCoreMulti} from "@dbConn/hooks/UseProducts";
import {useMemo, useState} from "react";
import SlideShow from "../../components/SlideShow"
import InfoSection from "@components/InfoSection";
import {useNavigate} from "react-router-dom";

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

interface Props {

}

const params: QueryParam[] = [
    {queryKey: 'allProducts', limit: 7},
    {queryKey: 'fishes', category: 'Q0i1y5', limit: 5},
    {queryKey: 'corals', category: 'rUm6nc', limit: 5},
    {queryKey: 'invertebrates', category: 'aRu8ro', limit: 5},
];

const Home = () => {

    const {data, error, isLoading} = useProductsCoreMulti(params);

    const memoizedData = useMemo(() => {
        if (!data) return;
        const allProductsData = data.find(d => d.queryKey === 'allProducts')?.result;
        const fishData = data.find(d => d.queryKey === 'fishes')?.result;
        // const coralData = data.find(d => d.queryKey === 'coral')?.result;
        // const invertebrateData = data.find(d => d.queryKey === 'invertebrate')?.result;

        return {allProductsData, fishData};
    }, [data]);

    if (isLoading) {
        console.log('loading');
    } else if (error) {
        console.error('error: ', error);
    } else {
        console.log('success', memoizedData?.fishData);
    }

    const navigate = useNavigate();

    return (
        <>
            <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"}/>
            <SlideShow images={slideShowImages}/>
            <InfoSection/>
            <div className={'pageContainer'}>
                {memoizedData?.allProductsData &&
                    <ItemSection heading={'All Products'}
                                 items={memoizedData.allProductsData} seeMore={{
                        func: () => navigate(`/products`),
                        img: {url: "https://picsum.photos/300/500", alt: "something something"}
                    }}/>}
                {memoizedData?.fishData &&
                    <ItemSection heading={'Fish'}
                                 items={memoizedData.fishData} seeMore={{
                        func: () => navigate(`/products/${'Q0i1y5'}`),
                        img: {url: "https://picsum.photos/300/500", alt: "something something"}
                    }}/>}
            </div>
        </>
    )
}

export default Home