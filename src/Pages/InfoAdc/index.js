import { Feather, Ionicons, } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListIcons } from "../../Components/ListIcons";

export default function InfoAdc() {

    const route = useRoute();
    const [icon, setIcon] = useState();

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
        setIcon(ListIcons(route.params?.data))
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.viewLocation}>
                    <Text style={styles.location}>{locationCountry}, {location}</Text>
                    <Ionicons name="location" size={30} color={'#FF0000'} />
                </View>

                <Image source={icon} style={styles.imgIcon} />
            </View>

            <View style={styles.body}>
                <View style={styles.boxTemp}>
                    <View style={styles.boxTemp2}>
                        <Text style={styles.temp}>{parseInt(temp - 273.15)}ºC<Ionicons name="thermometer-outline" size={30} color={'#000'} />
                        </Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>

                    <View style={styles.viewTemp}>
                        <Text style={styles.tempAdc}>{parseInt(temp_max - 273.15)}</Text>
                        <Text style={styles.tempAdc}>/{parseInt(temp_min - 273.15)}ºC</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Humidade <Ionicons name="water" size={25} color={'#000'} /></Text>
                    <Text style={styles.text}>{humidity}%</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Vel vento <Feather name="wind" size={25} color={'#000'} /></Text>
                    <Text style={styles.text}>{speed} km/h</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Pressão atmosférica <Ionicons name="md-chevron-down-sharp" size={25} color={'#000'} /></Text>
                    <Text style={styles.text}>{pressure} hPa</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text}>Dir vento <Feather
                        name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                        size={25} color={'#000'}
                    /></Text>
                    <Text style={styles.text}>{deg}º</Text>
                </View>


                <View style={styles.box}>
                    <Text style={styles.text}>Visibilidade <Feather name="eye" size={25} color={'#000'} /></Text>
                    <Text style={styles.text}>{visibility / 1000} km</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#808080',
        padding: 10,
    },
    header: {
        backgroundColor: 'rgba(200,200,200, 0.9)',
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
    },
    body: {
        backgroundColor: '#AAA',
        borderRadius: 20,
        padding: 10,
        marginTop: 20
    },
    imgIcon: {
        height: 180,
        width: 180,
        alignSelf: 'center',
    },
    boxTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    boxTemp2: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    temp: {
        fontSize: 33,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 17,
        fontStyle: 'italic',
        marginRight: 40,
    },
    viewTemp: {
        flexDirection: 'row',
    },
    tempAdc: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    text: {
        fontSize: 17,
        marginVertical: 3,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    }
})