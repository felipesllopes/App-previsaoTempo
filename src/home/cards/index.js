import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListCards from "./listCard";

export default function Cards({ forecast, minute }) {

    useEffect(() => {
    }, [minute])

    function renderItem({ item }) {
        return (<ListCards data={item} />)
    }

    return (
        <View style={styles.cardsContainer}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
                horizontal={true}
                data={forecast.list}
                keyExtractor={item => String(item.dt)}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '30%',
    },
    flatlist: {
        marginHorizontal: 20,
        marginBottom: 35,
    },
})