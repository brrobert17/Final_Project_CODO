import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import {QueryParam} from "@interfaces";
import {useItemsCore} from "@dbConn/hooks/UseItems";
import {useMemo} from "react";

const navigationPages = [
  {
    name: "Home",
    path: "/",
    
  },
  {
    name: "All Products",
    path: "/",
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


interface Props {

}

const Home = () => {
  const params: QueryParam[] = [
    {queryKey: 'allProducts', limit:3},
    {queryKey: 'fish', category: 'fish', limit: 3},
    {queryKey: 'coral', category: 'coral', limit: 3},
    {queryKey: 'invertebrate', category: 'invertebrate', limit: 3},
  ];

  const {
    data,
    error,
    isLoading
  } = useItemsCore(params);

  const memoizedData = useMemo(() => {
    if(!data) return;

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
  return (
    <>
      <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"}/>
      <div className={'pageContainer'}>
        <ItemSection/>
      </div>
    </>
  )
}

export default Home