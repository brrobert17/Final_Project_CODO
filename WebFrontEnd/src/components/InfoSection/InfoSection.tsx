import Blob from "components/Blob";
import Search from "components/Search";
import Heading from "components/Heading";
import ItemSection from "@components/ItemSection";
import "./style.css";

const InfoSection = () => {
  return (
    <Blob>
      <div className="info__grid">
        <div>
          <Heading text="Know what you looking for?" />
          <Search fishIcon />
        </div>
        <div>
          <Heading text="About Us" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
        </div>
        <div className="info__categories-cont">
          <ItemSection small heading="Categories" items={[{ name: "bla", img: { url: "https://picsum.photos/200/300", alt: "something something" } }, { name: "bla", img: { url: "https://picsum.photos/200/300", alt: "something something" } }, { name: "bla", img: { url: "https://picsum.photos/200/300", alt: "something something" } }, { name: "bla", img: { url: "https://picsum.photos/200/300", alt: "something something" } }]} />
        </div>
      </div>
    </Blob>
  )
}

export default InfoSection