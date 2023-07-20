import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListIcons } from '../../Components/ListIcons';

export default function Header({ weather, reload }) {

    const [salutation, setSalutation] = useState(); // estado irá receber a mensagem de acordo com a hora do dia
    const [icon, setIcon] = useState(); // retornará a imagem do icone

    let date = new Date();
    let dayWeek = date.getDay();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();

    useEffect(() => {
        greetingMessage();
        setIcon(ListIcons(weather));
    }, [reload])

    let longWeekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    let longMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let longDay = `${longWeekDay[dayWeek]}, ${day} de ${longMonth[month]} de ${year}, ${hours}:${min < 10 ? "0" + min : min}`;

    function greetingMessage() {
        if (hours == 0 || hours < 6) {
            setSalutation(`Boa madrugada!`);
        } else if (hours == 6 || hours < 12) {
            setSalutation(`Bom dia!`);
        } else if (hours == 12 || hours < 18) {
            setSalutation(`Boa tarde!`);
        } else {
            setSalutation(`Boa noite!`);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={[styles.text, { fontSize: 19 }]}>{salutation}</Text>
            <Text style={styles.temp}>{parseInt(weather.main.temp - 273.15)}ºC</Text>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.text}>{weather.sys.country}, {weather.name}</Text>
            <Text style={styles.text}>{longDay}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 20,
    },
    text: {
        fontSize: 17,
        color: '#FFF',
    },
    temp: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    icon: {
        height: 70,
        width: 70,
    },
})