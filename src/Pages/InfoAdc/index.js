import { Feather, Ionicons, } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styled from 'styled-components/native';
import { ListIcons } from "../../Components/ListIcons";
import { getData, storeData } from '../../Storage';

export default function InfoAdc() {

    const navigation = useNavigation();
    const route = useRoute();

    const [icon, setIcon] = useState();
    const [temaDark, setTemaDark] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        (async () => {
            setIcon(ListIcons(route.params?.data));
            setTemaDark(await getData());
            setLoading(false)
        })()
    }, [reload]);

    async function handleTema() {
        setLoading(true)
        setReload(current => (current === false ? true : false));

        if (temaDark) {
            await storeData(false)
        } else {
            await storeData(true);
        }
    }

    return (
        <Container style={{ backgroundColor: temaDark ? '#000080' : '#00BFFF' }}>

            <ButtonBack onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <Feather name="arrow-left" size={30} color={'#FFF'} />
            </ButtonBack>

            <ButtonTheme onPress={handleTema} activeOpacity={0.7}>
                {loading ?
                    <ActivityIndicator size={30} color={'#999'} />
                    :
                    <Ionicons name={temaDark ? 'moon' : 'sunny'} size={30} color={temaDark ? '#FFF' : '#000'} />
                }
            </ButtonTheme>

            <Date>{day}/{month} - {hours}h</Date>

            <ImageIcon source={icon} />

            <Body>

                <BoxTemperature>
                    <Temperature>{parseInt(temp - 273.15)}ºC<Ionicons name="thermometer-outline" size={27} /></Temperature>

                    <TempAdc>{parseInt(temp_max - 273.15)}/{parseInt(temp_min - 273.15)}ºC</TempAdc>
                </BoxTemperature>

                <Line />

                <Description>{description}</Description>

                <Box>
                    <Text>Humidade <Ionicons name="water" size={25} /></Text>
                    <Text>{humidity}%</Text>
                </Box>

                <Box>
                    <Text>Vel vento <Feather name="wind" size={25} /></Text>
                    <Text>{speed} km/h</Text>
                </Box>

                <Box>
                    <Text>Pressão atm <Ionicons name="md-chevron-down-sharp" size={25} /></Text>
                    <Text>{pressure} hPa</Text>
                </Box>

                <Box>
                    <Text>Dir vento <Feather
                        name={deg === 0 ? 'arrow-up' : deg > 0 && deg < 90 ? 'arrow-up-right' : deg === 90 ? 'arrow-right' : deg > 90 && deg < 180 ? 'arrow-down-right' : deg === 180 ? 'arrow-down' : deg > 180 && deg < 270 ? 'arrow-down-left' : deg === 270 ? 'arrow-left' : 'arrow-up-left'}
                        size={25}
                    /></Text>
                    <Text>{deg}º</Text>
                </Box>

                <Box>
                    <Text>Visibilidade <Feather name="eye" size={25} /></Text>
                    <Text>{visibility / 1000} km</Text>
                </Box>
            </Body>

        </Container>
    )
}

const Container = styled.SafeAreaView`
flex: 1;
padding: 10px;
`;

const ButtonBack = styled.TouchableOpacity`
position: absolute;
padding: 10px;
z-index: 2;
`;

const ButtonTheme = styled.TouchableOpacity`
position: absolute;
right: 0;
padding: 10px;
z-index: 2;
`;

const ActivityIndicator = styled.ActivityIndicator``;

const Date = styled.Text`
text-align: center;
font-size: 24px;
font-weight: bold;
color: #FFF;
margin-top: 30px;
`;

const ImageIcon = styled.Image`
height: 200px;
width: 200px;
align-self: center;
margin: 20px 0 10px;
`;

const Body = styled.View`
background-color: rgba(300,300,300,0.5);
border-radius: 20px;
padding: 10px 10px 25px;
margin: 20px 10px 10px;
`;

const BoxTemperature = styled.View`
flex-direction: row;
align-items: baseline;
justify-content: space-between;
margin: 0 10px;
`;

const Temperature = styled.Text`
font-size: 33px;
font-weight: bold;
`;

const TempAdc = styled.Text`
font-size: 25px;
font-weight: bold;
`;

const Line = styled.View`
height: 2px;
background-color: #000;
`;

const Description = styled.Text`
font-size: 18px;
font-style: italic;
font-weight: bold;
margin-bottom: 15px;
margin-left: 10px;
`;

const Box = styled.View`
flex-direction: row;
align-items: baseline;
justify-content: space-between;
margin: 0 25px;
`;

const Text = styled.Text`
font-size: 19px;
margin: 3px 0;
font-weight: bold;
`;
