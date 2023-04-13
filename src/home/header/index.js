import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import returnIcon from '../../listIcon/returnIcon';

/**
 * Função que contém todas as informações do cabeçalho, com mensagem, temperatura, icone, data e hora.
 * @param {weather, atualizar} param0 
 * @returns 
 */
export default function Header({ weather, atualizar }) {

    const [salutation, setSalutation] = useState(); // estado irá receber a mensagem de acordo com a hora do dia
    const [icon, setIcon] = useState(""); // pegará o icone passado na função returnIcon de acordo com o fornecido pela API weather

    let date = new Date();
    let dayWeek = date.getDay();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();

    let longWeekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    let longMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let longDay = `${longWeekDay[dayWeek]}, ${day} de ${longMonth[month]} de ${year}, ${hours}:${min}`;

    /**
     * Função que retornará para o state salutation a mensagem de acordo com a hora do dia
     */
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

    useEffect(() => {
        greetingMessage();
        setIcon(returnIcon(weather)); // função que retorna a descrição do icon que será utilizado
    }, [atualizar])

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.salutation}>{salutation}</Text>
                <Text style={styles.temp}>{parseInt(weather.main.temp - 273.15)}ºC</Text>
                <Ionicons name={icon} size={35} color='white' />
                <Text style={styles.location}>{weather.sys.country}, {weather.name}</Text>
                <Text style={styles.longDay}>{longDay}</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 20,
    },
    salutation: {
        fontSize: 19,
        color: 'white',
    },
    temp: {
        fontSize: 24,
        color: 'white',
        marginVertical: 3,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 17,
        color: 'white',
    },
    longDay: {
        fontSize: 17,
        color: 'white',
    },
})