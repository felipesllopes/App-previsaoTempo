import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListIcons } from '../../Components/ListIcons';

export default function ListCards({ data, reload }) {

    const navigation = useNavigation();
    const [icon, setIcon] = useState();

    let day = data.dt_txt.substring(8, 10);
    let month = data.dt_txt.substring(5, 7);
    let hour = data.dt_txt.substring(11, 13);
    let temp = parseInt(data.main.temp - 273.15);
    let tempMax = parseInt(data.main.temp_max - 273.15);
    let tempMin = parseInt(data.main.temp_min - 273.15);

    useEffect(() => {
        setIcon(ListIcons(data)); // retornará a imagem do icone
    }, [reload])

    function handleNavigation() {
        navigation.navigate('InfoAdc', { data: data })
    }

    return (
        <View style={styles.container}>

            <View style={styles.date}>
                <Text style={styles.time}>{day}/{month}</Text>
                <Text style={styles.time}>{hour}h</Text>
            </View>

            <View style={styles.box}>
                <Text style={[styles.tempText, { fontSize: 18 }]}>{temp}ºC</Text>
                <Ionicons name="thermometer-outline" size={18} color={'#000'} />
            </View>

            <Image source={icon} style={{ height: 50, width: 50 }} />

            <Text style={styles.tempText}>{tempMax}/{tempMin}ºC</Text>

            <TouchableOpacity onPress={handleNavigation} activeOpacity={0.7}>
                <Text style={styles.infoAdc}>Mais info.</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(220,220,220, 0.6)',
        alignItems: 'center',
        borderRadius: 6,
        padding: 5,
        marginHorizontal: 3.5,
        paddingHorizontal: 6,
        elevation: 5,
        marginVertical: 6,
    },
    date: {
        alignItems: 'center'
    },
    box: {
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'baseline'
    },
    time: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    tempText: {
        fontSize: 17,
        marginVertical: 3,
    },
    infoAdc: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        paddingVertical: 3,
        fontSize: 15,
    },
})