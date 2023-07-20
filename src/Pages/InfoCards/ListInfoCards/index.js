import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListIcons } from "../../../Components/ListIcons";

export default function ListInfoCards({ item }) {

    const windowWidth = Dimensions.get('window').width;

    const [icon, setIcon] = useState();

    let day = item.dt_txt.substring(8, 10);
    let month = item.dt_txt.substring(5, 7);
    let hour = item.dt_txt.substring(11, 13);

    useEffect(() => {
        setIcon(ListIcons(item))
    }, [])

    function pegar() {
        console.log(item)
    }

    return (
        <View style={[styles.container, { width: windowWidth, backgroundColor: hour >= 6 && hour < 18 ? '#00BFFF' : '#000080' }]}>
            <Text style={styles.date}>{day}/{month} - {hour}h</Text>

            <Image source={icon} style={styles.imgIcon} />

            <TouchableOpacity onPress={pegar}>
                <Text>Pegar</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    },
    date: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#FFF'
    },
    imgIcon: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
})