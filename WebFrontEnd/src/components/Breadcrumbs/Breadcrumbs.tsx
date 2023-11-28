import './style.css'
import {useBreadcrumbs} from "@dbConn/hooks/UseCategories";
interface Props {
  categoryId: string
}
export const Breadcrumbs = (props: Props) => {
    const {isLoading, isError, data } = useBreadcrumbs(props.categoryId as string);
    console.log(data)
  return(
      <div className="breadcrumbs">
        {data?.map(c=> {
          return (<a href={`/products/${c.id}`}>/ {c.name} </a>)
        })}
      </div>
  )
}