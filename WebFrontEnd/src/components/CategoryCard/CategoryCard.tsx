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
        <div className="category-card">
            <div className="category-card__inner">
                <div className="category-card__image-cont image-cont--hover">
                    <img src="https://picsum.photos/300/500" alt="something something"/>
                </div>
                <h3>See More</h3>
            </div>
        </div>

)
}

export default CategoryCard