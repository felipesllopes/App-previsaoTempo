import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfoAdc({ weather, reload }) {

    let humidity = weather.main.humidity;
    let pressure = weather.main.pressure;
    let visibility = weather.visibility;
    let description = weather.weather[0].description;
    let speed = weather.wind.speed;
    let deg = weather.wind.deg;
    let temp_max = weather.main.temp_max;
    let temp_min = weather.main.temp_min;

    useEffect(() => {
    }, [reload])


    return (

        <View style={styles.container}>

            <View style={[styles.box, { marginHorizontal: 7 }]}>
                <Text style={[styles.info, { fontStyle: 'italic' }]}>{description}</Text>
                <Text style={[styles.info, { fontSize: 24 }]}>{parseInt(temp_max - 273.15)}/{parseInt(temp_min - 273.15)}ºC</Text>
            </View>

            <View style={{ height: 2, backgroundColor: 'black', marginBottom: 10, }} />

            <View style={styles.box}>
                <Text style={styles.info}>Humidade <Ionicons name="water" size={25} color={'#000'} /></Text>
                <Text style={styles.info}>{humidity}%</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.info}>Vel vento <Feather name="wind" size={25} color={'#000'} /></Text>
                <Text style={styles.info}>{speed} km/h</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.info}>Pressão atm <Ionicons name="md-chevron-down-sharp" size={25} color={'#000'} /></Text>
                <Text style={styles.info}>{pressure} hPa</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.info}>Dir vento <Feather
                    name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                    size={25} color={'#000'}
                /></Text>
                <Text style={styles.info}>{deg}º</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.info}>Visibilidade <Feather name="eye" size={25} color={'#000'} /></Text>
                <Text style={styles.info}>{visibility / 1000} km</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(250,250,250, 0.7)',
        padding: 15,
        borderRadius: 7,
        elevation: 2,
        marginHorizontal: 30,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    info: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    infoAdc: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 5,
    }
})