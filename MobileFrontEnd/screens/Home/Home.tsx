import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { api } from "@dbConn/axios";
import { useState } from "react";
import gStyle from "@gStyle";
import Header from "@components/Header";
import ItemSection from "@components/ItemSection";
import {useItemsCore} from "@dbConn/hooks/UseItems";



const Home = () => {

    //test react-query: fetch and log all items
    const { data, error, isLoading } = useItemsCore(3);
    if (isLoading) {
        console.log('Loading...');
    } else if (error) {
        console.error('Error:', error);
    } else {
        console.log('success');
        // for (let i = 0; i < 3; i++) {
        //     data && limitedData.push(data[i]);
        // }
    }

    return (
        <View style={gStyle.container}>
            <Header />
            <ScrollView>
                {data && <ItemSection
                    heading="All products"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/210", alt: "something something" } }}
                    items={data} />}

                <ItemSection
                    heading="Fish"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/203", alt: "something something" } }}
                    items={[
                        { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/206", alt: "something something" } },
                        { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/204", alt: "something something" } },
                        { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/205", alt: "something something" } }
                    ]} />
                <ItemSection
                    heading="Invertibrates"
                    seeMore={{ func: () => console.log('hello'), img: { url: "https://picsum.photos/202", alt: "something something" } }}
                    items={[
                        { name: 'kdkdkd', price: '100€', img: { url: "https://picsum.photos/207", alt: "something something" } },
                        { name: 'kdkdkd', price: '150€', img: { url: "https://picsum.photos/208", alt: "something something" } },
                        { name: 'kdkdkd', price: 'jdjdj', img: { url: "https://picsum.photos/209", alt: "something something" } }
                    ]} />
            </ScrollView>
        </View>
    )
}

export default Home;