import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BackStack from "../../Components/BackStack";
import ListInfoCards from "./ListInfoCards";

export default function InfoCards() {

    const route = useRoute();

    let hours = new Date().getHours();
    const [currentIndex, setCurrentIndex] = useState(0);
    let forecast = route.params?.forecast;

    useEffect(() => {
        // console.log(forecast)
    }, [])

    function handleScroll(event) {
        const itemSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / itemSize);

        if (currentIndex !== index) {
            setCurrentIndex(index);
        }
    }

    function renderItem({ item }) {
        return (<ListInfoCards item={item} />)
    }

    return (
        <View style={[styles.container]}>

            <View style={styles.backStack}>
                <BackStack />
            </View>

            <FlatList
                data={forecast.list}
                keyExtractor={item => String(item.dt)}
                renderItem={renderItem}
                horizontal={true}
                onScroll={handleScroll}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.contentContainer}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backStack: {
        position: 'absolute',
        zIndex: 2,
        padding: 10,
    },
    contentContainer: {
        // flexGrow: 1,
    },
})