import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function InfoAdc({ weather, atualizar: reload }) {

    const navigation = useNavigation();

    useEffect(() => {
    }, [reload])

    function handleNavigation() {
        navigation.navigate('InfoAdc', { data: weather })
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerInfo}>
                <Text style={styles.infoTitle}>Informações Adicionais</Text>
                <Text style={styles.info}>Vento <Feather name="wind" size={20} color="black" /> {weather.wind.speed} km/h</Text>
                <Text style={styles.info}>Umidade <Ionicons name="water" size={20} color="black" /> {weather.main.humidity}%</Text>
                <Text style={styles.info}>Temp máx <Ionicons name="arrow-up" size={20} color="black" /> {parseInt(weather.main.temp_max - 273.15)} ºC</Text>
                <Text style={styles.info}>Temp mín <Ionicons name="arrow-down" size={20} color="black" /> {parseInt(weather.main.temp_min - 273.15)} ºC</Text>

                <TouchableOpacity onPress={handleNavigation}>
                    <Text style={styles.infoAdc}>Informações adicionais</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerInfo: {
        alignItems: 'center',
        backgroundColor: 'rgba(300,300,300, 0.7)',
        paddingHorizontal: 18,
        padding: 10,
        borderRadius: 7,
        elevation: 5,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        fontSize: 17,
    },
    infoAdc: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 5,
    }
})