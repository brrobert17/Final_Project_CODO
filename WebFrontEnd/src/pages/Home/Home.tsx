import NavBar from "../../components/NavBar/NavBar"
import './style.css'
import ItemSection from "../../components/ItemSection";
import SlideShow from "../../components/SlideShow"

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

const Home = () => {

  return (
    <>
      <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"} />
      <SlideShow images={slideShowImages} />
      <div className={'pageContainer'}>
        <ItemSection />
      </div>
    </>
  )
}

export default Home