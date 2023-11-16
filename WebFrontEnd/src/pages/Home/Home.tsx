import NavBar from "../../components/NavBar/NavBar"
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
    url: "https://picsum.photos/1000/500",
    alt: "random image"
  },
  {
    url: "https://picsum.photos/1001/500",
    alt: "random image"
  },
  {
    url: "https://picsum.photos/1000/501",
    alt: "random image"
  },
  {
    url: "https://picsum.photos/1001/501",
    alt: "random image"
  }
]

interface Props {

}

const Home = () => {

  return (
    <div>
      <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"} />
      <SlideShow images={slideShowImages} />
      home
    </div>
  )
}

export default Home