import logo from "../../assets/logo-schulz-waveless.svg";
import iconCart from "../../assets/icon-shopping-cart.svg";
import iconUsers from "../../assets/icon-users.svg";
import "./style.css"

interface Page {
  name: string,
  path: string,
  subMenu?: Page[],
}

interface Props {
  pages: Page[],
  loginUrl: string,
  shoppingCartUrl: string
}

const NavBar = (props: Props) => {
  return (
    <div className="nav">
      <a href="/" className="nav__logo-cont">
        <img className="nav__logo" src={logo} alt={"logo - Schulz morské akvária"}></img>
      </a>
      <ul className="nav__menu">
        {props.pages.map((page) =>
          <li>
            <a href={page.path}>{page.name}</a>
            {/* Sub Menu functionality*/}
            {/* {page.subMenu && 
              <div className={"nav__menu__sub-menu"}>
                {page.subMenu.map((subPage) => 
                  <a href={subPage.path}>{subPage.name}</a>
                )}
              </div>
            } */}
          </li>

        )}
      </ul>
      <div className="nav__icon-cont">

        <a href={props.loginUrl} className="nav__icon">
          <img src={iconUsers} alt={"users icon"}></img>
        </a>

        <a href={props.shoppingCartUrl} className="nav__icon">
          <img src={iconCart} alt={"shopping cart icon"}></img>
        </a>

      </div>
    </div>
  )
}

export default NavBar