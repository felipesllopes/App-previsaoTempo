import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListIcons } from '../../Components/ListIcons';

export default function ListCards({ data }) {

    const navigation = useNavigation();
    const [icon, setIcon] = useState();

    let dia = data.dt_txt.substring(8, 10);
    let mes = data.dt_txt.substring(5, 7);
    let hora = data.dt_txt.substring(11, 13);
    let temp = parseInt(data.main.temp - 273.15);
    let tempMax = parseInt(data.main.temp_max - 273.15);
    let tempMin = parseInt(data.main.temp_min - 273.15);

    useEffect(() => {
        setIcon(ListIcons(data)); // retornará a imagem do icone
    }, [])

    function handleNavigation() {
        navigation.navigate('InfoCards')
    }

    return (
        <View style={styles.container}>

            <View style={styles.date}>
                <Text style={[styles.tempText, { fontWeight: 'bold', fontSize: 15 }]}>{dia}/{mes}</Text>
                <Text style={[styles.tempText, { fontWeight: 'bold', fontSize: 15 }]}>{hora}h</Text>
            </View>

            <Text style={styles.tempText}>{temp} ºC</Text>
            <Image source={icon} style={{ height: 50, width: 50 }} />

            <View style={styles.box}>
                <Ionicons name="arrow-up" size={20} color="black" />
                <Text style={styles.tempText}>{tempMax} ºC</Text>
            </View>

            <View style={styles.box}>
                <Ionicons name="arrow-down" size={20} color="black" />
                <Text style={styles.tempText}>{tempMin} ºC</Text>
            </View>

            <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.infoAdc}>Mais info.</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,165,0, 0.9)',
        alignItems: 'center',
        borderRadius: 6,
        padding: 4,
        marginHorizontal: 4,
        paddingHorizontal: 6,
        elevation: 5,
        marginVertical: 6,
    },
    date: {
        alignItems: 'center'
    },
    box: {
        flexDirection: 'row',
        marginBottom: 1,
    },
    tempText: {
        fontSize: 16,
    },
    infoAdc: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        paddingVertical: 3,
    },
})