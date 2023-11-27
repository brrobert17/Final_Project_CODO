import './style.css'
import {CategoryCore} from "@interfaces";
interface Props {
  categories: CategoryCore[]
}
export const Breadcrumbs = (props: Props) => {
  return(
      <div className="breadcrumbs">
        {props.categories.map(c=> {
          return (<a href={`/products/${c.id}`}>/ {c.name} </a>)
        })}
      </div>
  )
}