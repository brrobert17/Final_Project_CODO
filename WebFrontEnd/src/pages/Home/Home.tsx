import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import {QueryParam} from "@interfaces";
import {useItemsCore} from "@dbConn/hooks/UseItems";
import {useMemo, useState} from "react";
import SlideShow from "../../components/SlideShow"
import QuantitySelector from "@components/QuantitySelector";

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
  { queryKey: 'allProducts', limit: 7 },
  { queryKey: 'fish', category: 'fish', limit: 3 },
  { queryKey: 'coral', category: 'coral', limit: 3 },
  { queryKey: 'invertebrate', category: 'invertebrate', limit: 3 },
];

const Home = () => {

  const { data, error, isLoading } = useItemsCore(params);

  const memoizedData = useMemo(() => {
    if (!data) return;

    const allProductsData = data.find(d => d.queryKey === 'allProducts')?.result;
    const fishData = data.find(d => d.queryKey === 'fish')?.result;
    const coralData = data.find(d => d.queryKey === 'coral')?.result;
    const invertebrateData = data.find(d => d.queryKey === 'invertebrate')?.result;

    return { allProductsData, fishData, coralData, invertebrateData };
  }, [data]);

    if (isLoading) {
        console.log('loading');
    } else if (error) {
        console.error('error: ', error);
    } else {
        console.log('success', memoizedData?.fishData);
    }
    const [quantity, setQuantity] = useState(1);
    console.log('Quantity: ', quantity);
    return (
        <>
            <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"}/>
            <QuantitySelector setQuantity={setQuantity} quantity={quantity}/>
            <SlideShow images={slideShowImages}/>
            <div className={'pageContainer'}>
                {memoizedData?.allProductsData &&
                    <ItemSection heading={'All Products'}
                                 sorting={true}
                                 items={memoizedData.allProductsData} seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/300/500", alt: "something something"}
                    }}/>}
            </div>
        </>
    )
}

export default Home