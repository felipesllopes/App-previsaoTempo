import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import returnIconList from '../../listIcon/returnIconList';

export default function ListCards({ data }) {

    const [icon, setIcon] = useState("");
    let dia = data.dt_txt.substring(8, 10);
    let mes = data.dt_txt.substring(5, 7);
    let hora = data.dt_txt.substring(11, 13);
    let temp = parseInt(data.main.temp - 273.15);
    let tempMax = parseInt(data.main.temp_max - 273.15);
    let tempMin = parseInt(data.main.temp_min - 273.15);

    useEffect(() => {
        setIcon(returnIconList(data)); // pegará o icone passado na função returnIconList de acordo com o fornecido pela API forecast
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>

                <Text style={styles.tempText}>{dia}/{mes}</Text>
                <Text style={styles.tempText}>{hora}h</Text>
                <Text style={styles.tempText}>{temp} ºC</Text>
                <Ionicons name={icon} size={20} color="black" />
                <Text style={styles.tempText}>{tempMax} ºC</Text>
                <Ionicons name="arrow-up" size={20} color="black" />
                <Ionicons name="arrow-down" size={20} color="black" />
                <Text style={styles.tempText}>{tempMin} ºC</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    card: {
        backgroundColor: 'orange',
        alignItems: 'center',
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    tempText: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})