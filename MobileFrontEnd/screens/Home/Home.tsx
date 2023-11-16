import {SafeAreaView, View, Text, ScrollView} from "react-native";
import gStyle from "@gStyle";
import Header from "@components/Header";
import ItemSection from "@components/ItemSection";
import {useItemsCore} from "@dbConn/hooks/UseItems";
import {QueryParam} from "@utils/interfaces";


const Home = () => {

    const params: QueryParam[] = [
        {queryKey: 'fish', category: 'fish', limit: 3},
        {queryKey: 'coral', category: 'coral', limit: 3}];
    const {
        data,
        error,
        isLoading,
        isSuccess
    } = useItemsCore(params);


    // const { data: fishData,
    //     error: fishError,
    //     isLoading:fishIsLoading,
    //     isSuccess: fishIsSuccess } = useItemsCore(3, 'fish', isSuccess);
    // const { data: coralData,
    //     error: coralError,
    //     isLoading:coralIsLoading,
    //     isSuccess: coralIsSuccess} = useItemsCore(3, 'coral', fishIsSuccess);
    // const { data: invertebrateData,
    //     error: invertebrateError,
    //     isLoading:invertebrateIsLoading,
    //     isSuccess: invertebrateIsSuccess} = useItemsCore(3, 'invertebrate', coralIsSuccess);
    // if (isLoading || fishIsLoading || coralIsLoading ||invertebrateIsLoading) {
    //     console.log('Loading...');
    // } else if (error || fishError || coralError || invertebrateError) {
    //     console.error('AllProductsError:', error, 'FishError: ', fishError, 'CoralError: ', coralError, 'InvertebrateError: ', invertebrateError);
    if (isLoading) {
        console.log('loading');
    } else if (error) {
        console.error('error: ', error);
    } else {
        console.log('success');
    }

    return (
        <View style={gStyle.container}>
            <Header/>
            <ScrollView>
                {data && <ItemSection
                    heading="All products"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/210", alt: "something something"}
                    }}
                    items={data}/>}

                {fishData && <ItemSection
                    heading="Fish"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={fishData}/>}
                {coralData && <ItemSection
                    heading="Corals"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={coralData}/>}
                {invertebrateData && <ItemSection
                    heading="Invertebrates"
                    seeMore={{
                        func: () => console.log('hello'),
                        img: {url: "https://picsum.photos/203", alt: "something something"}
                    }}
                    items={invertebrateData}/>}
            </ScrollView>
        </View>
    )
}

export default Home;