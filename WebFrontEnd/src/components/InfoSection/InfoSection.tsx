import Blob from "components/Blob";
import Search from "components/Search";
import Heading from "components/Heading";
import ItemSection from "@components/ItemSection";
import "./style.css";
import { useCategories } from "@dbConn/hooks/UseCategories";
import { useEffect } from "react";
import { useIsMobile } from "@utils/utils";

const InfoSection = () => {
  //const { isLoading, isError, data } = useCategories('root');
  //useEffect(()=> console.log('InfoDATA:',data), [data])
  const isM = useIsMobile();
  return (
    <Blob>
      <div className="info__grid">
        <div>
          {isM ? '' : <Heading text="Viete čo hľadáte?" decor />}
          <Search fishIcon={!isM} onSearch={(keyword) => window.location.href = `/search?keyword=${keyword}`} />
        </div>
        <div className="info__about">
          <Heading text="O Nás" decor />
          <p>Vitajte na našej stránke! Táto verzia nášho webu aktuálne slúži ako inventár našich produktov. Každý produkt obsahuje jedinečné ID, ktoré môžete skopírovať a poslať nám pri kontakte, ak máte záujem o daný produkt.

V budúcnosti plánujeme premeniť túto stránku na plnohodnotný e-shop, aby sme vám mohli poskytnúť ešte pohodlnejší nákupný zážitok. Zatiaľ nás však neváhajte kontaktovať prostredníctvom uvedených produktových kódov.

Ďakujeme za návštevu a tešíme sa na spoluprácu! </p>
        </div>
        <div className="info__categories-cont">
          <ItemSection small heading="Categories" itemType={'Category'} noDecoration={isM} />
        </div>
      </div>
    </Blob>
  )
}

export default InfoSection