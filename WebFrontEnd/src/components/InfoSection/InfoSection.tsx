import Blob from "components/Blob";
import Search from "components/Search";
import Heading from "components/Heading";
import ItemSection from "@components/ItemSection";
import "./style.css";
import { useCategories } from "@dbConn/hooks/UseCategories";
import {useEffect} from "react";

const InfoSection = () => {
  //const { isLoading, isError, data } = useCategories('root');
  //useEffect(()=> console.log('InfoDATA:',data), [data])
  return (
    <Blob>
      <div className="info__grid">
        <div>
          <Heading text="Know what you looking for?" />
          <Search fishIcon onSearch={(keyword) => window.location.href = `/search?keyword=${keyword}`} />
        </div>
        <div>
          <Heading text="About Us" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
        </div>
        <div className="info__categories-cont">
            <ItemSection small heading="Categories" itemType={'Category'} />
        </div>
      </div>
    </Blob>
  )
}

export default InfoSection