import { Feather, Ionicons, } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListIcons } from "../../Components/ListIcons";

export default function InfoAdc() {

    const navigation = useNavigation();
    const route = useRoute();

    const [icon, setIcon] = useState();
    const [temaDark, setTemaDark] = useState(false);
    const [color, setColor] = useState('white');

    let day = route.params?.data.dt_txt.substring(8, 10);
    let month = route.params?.data.dt_txt.substring(5, 7);
    let hours = route.params?.data.dt_txt.substring(11, 13);
    let humidity = route.params?.data.main.humidity;
    let pressure = route.params?.data.main.pressure;
    let visibility = route.params?.data.visibility;
    let description = route.params?.data.weather[0].description;
    let speed = route.params?.data.wind.speed;
    let deg = route.params?.data.wind.deg;
    let temp = route.params?.data.main.temp;
    let temp_max = route.params?.data.main.temp_max;
    let temp_min = route.params?.data.main.temp_min;

    function handleTema() {
        setTemaDark(current => (current === true ? false : true))
        setColor(current => (current === 'white' ? 'black' : 'white'))
    }

    useEffect(() => {
        setIcon(ListIcons(route.params?.data));
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: temaDark ? '#000080' : '#00BFFF' }]}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={30} color={'#FFF'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTema} onPress={handleTema}>
                <Ionicons name={temaDark ? 'moon' : 'sunny'} size={30} color={temaDark ? '#FFF' : '#000'} />
            </TouchableOpacity>

            <Text style={styles.date}>{day}/{month} - {hours}h</Text>

            <Image source={icon} style={styles.imgIcon} />

            <View style={styles.body}>

                <View style={styles.boxTemp}>
                    <Text style={[styles.temp, { color: color }]}>{parseInt(temp - 273.15)}ºC<Ionicons name="thermometer-outline" size={27} color={color} /></Text>

                    <Text style={[styles.tempAdc, { color: color }]}>{parseInt(temp_max - 273.15)}/{parseInt(temp_min - 273.15)}ºC</Text>
                </View>

                <View style={{ height: 2, backgroundColor: color }} />

                <Text style={[styles.description, { color: color }]}>{description}</Text>

                <View style={styles.box}>
                    <Text style={[styles.text, { color: color }]}>Humidade <Ionicons name="water" size={25} color={color} /></Text>
                    <Text style={[styles.text, { color: color }]}>{humidity}%</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.text, { color: color }]}>Vel vento <Feather name="wind" size={25} color={color} /></Text>
                    <Text style={[styles.text, { color: color }]}>{speed} km/h</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.text, { color: color }]}>Pressão atm <Ionicons name="md-chevron-down-sharp" size={25} color={color} /></Text>
                    <Text style={[styles.text, { color: color }]}>{pressure} hPa</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.text, { color: color }]}>Dir vento <Feather
                        name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                        size={25} color={color}
                    /></Text>
                    <Text style={[styles.text, { color: color }]}>{deg}º</Text>
                </View>

                <View style={styles.box}>
                    <Text style={[styles.text, { color: color }]}>Visibilidade <Feather name="eye" size={25} color={color} /></Text>
                    <Text style={[styles.text, { color: color }]}>{visibility / 1000} km</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    buttonTema: {
        position: 'absolute',
        right: 0,
        margin: 10,
    },
    date: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#FFF',
        fontWeight: 'bold',
    },
    viewLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    location: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#FFF',
        fontWeight: 'bold',
    },
    imgIcon: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginVertical: 10,
        marginTop: 20,
    },
    body: {
        backgroundColor: 'rgba(300,300,300, 0.5)',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        paddingBottom: 25,
        elevation: 3,
        marginHorizontal: 10,
    },
    boxTemp: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    temp: {
        fontSize: 33,
        fontWeight: 'bold',
        color: '#FFF',
        fontWeight: 'bold',
    },
    tempAdc: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 10,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    },
    text: {
        fontSize: 19,
        marginVertical: 3,
        color: '#FFF',
        fontWeight: 'bold',
    },
})