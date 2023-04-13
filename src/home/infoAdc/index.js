import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

/**
 * Função que contém as informações adicionais da previsão, com vento, umidade, temperatura máxima e mínima
 * @param {weather, atualizar} param0 
 * @returns 
 */
export default function InfoAdc({ weather, atualizar }) {

    useEffect(() => {
    }, [atualizar])

    return (
        <SafeAreaView style={styles.container}>

            {weather &&
                <View style={styles.containerInfo}>
                    <Text style={styles.infoTitle}>Informações Adicionais</Text>
                    <Text style={styles.info}>Vento <Feather name="wind" size={20} color="black" /> {weather.wind.speed} km/h</Text>
                    <Text style={styles.info}>Umidade <Ionicons name="water" size={20} color="black" /> {weather.main.humidity}%</Text>
                    <Text style={styles.info}>Temp máx <Ionicons name="arrow-up" size={20} color="black" /> {parseInt(weather.main.temp_max - 273.15)} ºC</Text>
                    <Text style={styles.info}>Temp mín <Ionicons name="arrow-down" size={20} color="black" /> {parseInt(weather.main.temp_min - 273.15)} ºC</Text>
                </View>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerInfo: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        paddingHorizontal: 18,
        paddingBottom: 20,
        borderRadius: 7,
        width: '80%',
    },
    infoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 6,
    },
    info: {
        fontSize: 18,
    },
})