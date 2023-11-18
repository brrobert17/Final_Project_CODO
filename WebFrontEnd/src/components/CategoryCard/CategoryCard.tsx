import {Image as IImage} from '@interfaces';
import "./style.css";

export interface Props {
    name: string,
    img: IImage,
    bigVariant?: boolean
}


const CategoryCard = (props: Props) => {
    const maxItemsPerRow = props.bigVariant ? 2 : 3;
    // const itemWidth = (Dimensions.get('window').width / maxItemsPerRow) - (pageMargin * (1 + (1 / maxItemsPerRow)));
    //
    // return (
    //
    //   <TouchableOpacity style={{...style.card, width: itemWidth, height: props.bigVariant ? itemWidth : 80}} onPress={() => console.log("hello world")}>
    //     <Image style={style.img} source={{uri: props.img.url}}></Image>
    //     <View style={style.overlay}></View>
    //     <Text style={style.text}>{props.name}</Text>
    //   </TouchableOpacity>
    // )
    return (
        <div className={'categoryCardContainer'}>
          <div className={'categoryCardImageContainer'}>
            <img src={props.img.url} alt={props.img.alt}/>
          </div>
            <h3>{props.name}</h3>

        </div>)
}

export default CategoryCard