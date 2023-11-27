import './style.css'
import {useCategories} from "@dbConn/hooks/UseCategories";
interface Props {
  categoryId: string
}
export const Breadcrumbs = (props: Props) => {
    const {isLoading, isError, data } = useCategories(props.categoryId as string);
  return(
      <div className="breadcrumbs">
        {data?.map(c=> {
          return (<a href={`/products/${c.id}`}>/ {c.name} </a>)
        })}
      </div>
  )
}