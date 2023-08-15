import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
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
        <Container style={{ elevation: 2 }}>

            <ViewDate>
                <TextDate>{day}/{month}</TextDate>
                <TextDate>{hour}h</TextDate>
            </ViewDate>

            <Box>
                <TextTemperature style={{ fontSize: 18 }}>{temp}ºC</TextTemperature>
                <Ionicons name="thermometer-outline" size={18} color={'#000'} />
            </Box>

            <ImageIcon source={icon} />

            <TextTemperature>{tempMax}/{tempMin}ºC</TextTemperature>

            <Button onPress={handleNavigation} activeOpacity={0.7}>
                <TextButton>Mais info.</TextButton>
            </Button>

        </Container>
    )
}

const Container = styled.View`
background-color: rgba(220,220,220, 0.6);
align-items: center;
border-radius: 6px;
padding: 5px 6px;
margin: 6px 3.5px;
`;

const ViewDate = styled.View`
align-items: center;
`;

const TextDate = styled.Text`
font-size: 17px;
font-weight: bold;
`;

const Box = styled.View`
flex-direction: row;
margin-bottom: 2px;
align-items: baseline;
`;

const TextTemperature = styled.Text`
font-size: 17px;
margin: 3px 0;
`;

const ImageIcon = styled.Image`
height: 50px;
width: 50px;
`;

const Button = styled.TouchableOpacity``;

const TextButton = styled.Text`
text-decoration-line: underline;
font-weight: bold;
padding: 3px 0;
font-size: 15px;
`;
