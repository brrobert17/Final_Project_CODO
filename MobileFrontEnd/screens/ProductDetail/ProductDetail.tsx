import BtnIsland from '@components/BtnIsland';
import ImageSlider from '@components/ImageSlider/ImageSlider';
import PriceTag from '@components/PriceTag';
import QuantitySelector from '@components/QuantitySelector';
import { SafeAreaView, View } from 'react-native';

const sliderImages = [
    {
        url: "https://picsum.photos/500/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/510/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/420",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/510/421",
        alt: "random image"
    },
    {
        url: "https://picsum.photos/501/421",
        alt: "random image"
    }
]

const ProductDetail = () => {
    return (
        <>
            <SafeAreaView>
                <ImageSlider images={sliderImages} />
                <PriceTag price='500' />
                <QuantitySelector wisiwyg onChange={(text) => console.log("count: ", text)} />
            </SafeAreaView>
            <BtnIsland price='500' />
        </>
    )
}

export default ProductDetail