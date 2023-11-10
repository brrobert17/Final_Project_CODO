import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { api } from "@dbConn/axios";
import { useState } from "react";
import gStyle from "@gStyle";
import Header from "@components/Header";
import ProductSection from "@components/ProductSection";



const Home = () => {
    const [dd, setDd] = useState('');

    bf().then(data => {
        setDd(data);
    });

    return (
        <View style={gStyle.container}>
            <Header />
            <ScrollView>
                {/* <ProductSection sorting products={[
                    { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/201", alt: "something something" } },
                    { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/201", alt: "something something" } },
                    { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/201", alt: "something something" } }
                ]} /> */}
                <ProductSection
                    title="Corals"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/210", alt: "something something" } }}
                    products={[
                        { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/201", alt: "something something" } },
                        { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/202", alt: "something something" } },
                        { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/203", alt: "something something" } }
                    ]} />
                <ProductSection
                    title="Fish"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/203", alt: "something something" } }}
                    products={[
                        { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/206", alt: "something something" } },
                        { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/204", alt: "something something" } },
                        { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/205", alt: "something something" } }
                    ]} />
                <ProductSection
                    title="Invertibrates"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/202", alt: "something something" } }}
                    products={[
                        { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/207", alt: "something something" } },
                        { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/208", alt: "something something" } },
                        { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/209", alt: "something something" } }
                    ]} />
            </ScrollView>
        </View>
    )
}

const bf = async () => {
    try {
        const res = await api.get('/test');
        return res.data.name;
    } catch (e) {
        console.log("error fetch front: " + e)
    }
}

export default Home;