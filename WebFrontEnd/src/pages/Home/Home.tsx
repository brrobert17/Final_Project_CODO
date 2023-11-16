import NavBar from "../../components/NavBar/NavBar"
import ItemsGrid from "../../components/ItemSection";
import './style.css'

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
  return (
    <>
      <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"}/>
      <div className={'pageContainer'}>
        <ItemsGrid/>
      </div>
    </>
  )
}

export default Home