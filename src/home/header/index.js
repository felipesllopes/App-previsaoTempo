import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import styled from 'styled-components/native';
import { ListIcons } from '../../Components/ListIcons';

export default function Header({ weather, reload }) {

    const [icon, setIcon] = useState(); // retornará a imagem do icone

    let date = new Date();
    let dayWeek = date.getDay();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();

    let longWeekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    let longMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let longDay = `${longWeekDay[dayWeek]}, ${day} de ${longMonth[month]} de ${year}, ${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}`;

    useEffect(() => {
        setIcon(ListIcons(weather));
    }, [reload])

    return (
        <Container>

            <Box>
                <Temperature>{parseInt(weather.main.temp - 273.15)}ºC</Temperature>
                <Ionicons name="thermometer-outline" size={27} color={'#FFF'} />
            </Box>

            <ImageIcon source={icon} />
            <Text>{weather.sys.country}, {weather.name}</Text>
            <Text>{longDay}</Text>

        </Container>
    )
}

const Container = styled.View`
align-items: center;
padding: 16px 0;
`;

const Box = styled.View`
flex-direction: row;
align-items: baseline;
`;

const Temperature = styled.Text`
font-size: 27px;
color: #FFF;
font-weight: bold;
`;

const ImageIcon = styled.Image`
height: 70px;
width: 70px;
margin: 7px;
`;

const Text = styled.Text`
font-size: 19px;
color: #FFF;
`;
