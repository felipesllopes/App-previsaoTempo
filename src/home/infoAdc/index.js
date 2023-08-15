import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import styled from 'styled-components/native';

export default function InfoAdc({ weather, reload }) {

    let humidity = weather.main.humidity;
    let pressure = weather.main.pressure;
    let visibility = weather.visibility;
    let description = weather.weather[0].description;
    let speed = weather.wind.speed;
    let deg = weather.wind.deg;
    let temp_max = weather.main.temp_max;
    let temp_min = weather.main.temp_min;

    useEffect(() => {
    }, [reload])

    return (

        <Container style={{ elevation: 2 }}>

            <BoxTop>
                <Description>{description}</Description>
                <Temperature>{parseInt(temp_max - 273.15)}/{parseInt(temp_min - 273.15)}ºC</Temperature>
            </BoxTop>

            <Line />

            <Box>
                <Info>Humidade <Ionicons name="water" size={22} color={'#000'} /></Info>
                <Info>{humidity}%</Info>
            </Box>

            <Box>
                <Info>Vel vento <Feather name="wind" size={22} color={'#000'} /></Info>
                <Info>{speed} km/h</Info>
            </Box>

            <Box>
                <Info>Pressão atm <Ionicons name="md-chevron-down-sharp" size={22} color={'#000'} /></Info>
                <Info>{pressure} hPa</Info>
            </Box>

            <Box>
                <Info>Dir vento <Feather
                    name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                    size={22} color={'#000'}
                /></Info>
                <Info>{deg}º</Info>
            </Box>

            <Box>
                <Info>Visibilidade <Feather name="eye" size={22} color={'#000'} /></Info>
                <Info>{visibility / 1000} km</Info>
            </Box>

        </Container>
    )
}

const Container = styled.View`
background-color: rgba(250,250,250,0.7);
padding: 15px;
border-radius: 7px;
margin: 0 30px;
`;

const BoxTop = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: baseline;
margin: 0 7px;
flex-wrap: wrap;
`;

const Box = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: baseline;
`;

const Description = styled.Text`
font-size: 18px;
font-style: italic;
margin: 0 3px;
`;

const Temperature = styled.Text`
font-size: 24px;
font-weight: bold;

`;

const Line = styled.View`
height: 2px;
background-color: #000;
margin-bottom: 10px;
`;

const Info = styled.Text`
font-size: 18px;
`;