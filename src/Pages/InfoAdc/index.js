import { Feather, Ionicons, } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BackStack from '../../Components/BackStack';
import { ListIcons } from "../../Components/ListIcons";

export default function InfoAdc() {

    const route = useRoute();
    const [icon, setIcon] = useState();
    let hours = new Date().getHours();

    let humidity = route.params?.data.main.humidity;
    let pressure = route.params?.data.main.pressure;
    let visibility = route.params?.data.visibility;
    let description = route.params?.data.weather[0].description;
    let speed = route.params?.data.wind.speed;
    let deg = route.params?.data.wind.deg;
    let locationCountry = route.params?.data.sys.country;
    let location = route.params?.data.name;
    let temp = route.params?.data.main.temp;
    let temp_max = route.params?.data.main.temp_max;
    let temp_min = route.params?.data.main.temp_min;

    useEffect(() => {
        setIcon(ListIcons(route.params?.data));
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: hours >= 6 && hours < 18 ? '#00BFFF' : '#000080' }]}>

            <BackStack />

            <View style={styles.header}>
                <View style={styles.viewLocation}>
                    <Text style={styles.location}>{locationCountry}, {location}</Text>
                    <Ionicons name="location" size={30} color={'#FFF'} />
                </View>

                <Image source={icon} style={styles.imgIcon} />
            </View>

            <View style={[styles.body, { backgroundColor: hours >= 6 && hours < 18 ? '#87CEEB' : '#6959CD' }]}>
                <View style={styles.boxTemp}>
                    <Text style={styles.temp}>{parseInt(temp - 273.15)}ºC<Ionicons name="thermometer-outline" size={30} color={'#FFF'} />
                    </Text>

                    <View style={styles.viewTemp}>
                        <Text style={styles.tempAdc}>{parseInt(temp_max - 273.15)}</Text>
                        <Text style={styles.tempAdc}>/{parseInt(temp_min - 273.15)}ºC</Text>
                    </View>
                </View>
                <View style={styles.line} />

                <Text style={styles.description}>{description}</Text>

                <View style={styles.box}>
                    <Text style={styles.text}>Humidade <Ionicons name="water" size={25} color={'#FFF'} /></Text>
                    <Text style={styles.text}>{humidity}%</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Vel vento <Feather name="wind" size={25} color={'#FFF'} /></Text>
                    <Text style={styles.text}>{speed} km/h</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Pressão atm <Ionicons name="md-chevron-down-sharp" size={25} color={'#FFF'} /></Text>
                    <Text style={styles.text}>{pressure} hPa</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Dir vento <Feather
                        name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                        size={25} color={'#FFF'}
                    /></Text>
                    <Text style={styles.text}>{deg}º</Text>
                </View>


                <View style={styles.box}>
                    <Text style={styles.text}>Visibilidade <Feather name="eye" size={25} color={'#FFF'} /></Text>
                    <Text style={styles.text}>{visibility / 1000} km</Text>
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
    header: {
        borderRadius: 20,
        padding: 10,
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
    body: {
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        paddingBottom: 25
    },
    imgIcon: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    boxTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    temp: {
        fontSize: 33,
        fontWeight: 'bold',
        color: '#FFF',
        fontWeight: 'bold',
    },
    line: {
        backgroundColor: 'white',
        height: 2
    },
    description: {
        fontSize: 17,
        fontStyle: 'italic',
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    viewTemp: {
        flexDirection: 'row',
    },
    tempAdc: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFF',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 17,
        marginVertical: 3,
        color: '#FFF',
        fontWeight: 'bold',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    }
})