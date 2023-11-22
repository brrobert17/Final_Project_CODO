import ImageSlider from '@components/ImageSlider/ImageSlider';
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
        <SafeAreaView>
            <ImageSlider images={sliderImages} />
        </SafeAreaView>
    )
}

export default ProductDetail