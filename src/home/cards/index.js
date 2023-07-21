import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListCards from "./listCard";

export default function Cards({ forecast, reload }) {

    useEffect(() => {
    }, [reload])

    function renderItem({ item }) {
        return (<ListCards data={item} reload={reload} />)
    }

    return (
        <View>
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
    flatlist: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
})