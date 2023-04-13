import { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import ListCards from "./listCard";

/**
 * Função que cria uma lista que irá conter a previsão do tempo de 3 em 3 horas durante os próximos 5 dias.
 * @param {forecast, minute} param0 
 * @returns 
 */
export default function Cards({ forecast, minute }) {

    useEffect(() => {
    }, [minute])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cardsContainer}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatlist}
                    horizontal={true}
                    data={forecast.list}
                    keyExtractor={item => String(item.dt)}
                    renderItem={({ item }) => <ListCards data={item} />}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        height: '30%'
    },
    flatlist: {
        marginHorizontal: 30,
    },
})