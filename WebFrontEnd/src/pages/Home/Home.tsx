import NavBar from "../../components/NavBar/NavBar"

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
    <div>
      <NavBar pages={navigationPages} loginUrl={"/login"} shoppingCartUrl={"/cart"}/>
      home
    </div>
  )
}

export default Home