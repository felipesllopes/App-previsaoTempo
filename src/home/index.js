import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Loading from '../Components/Loading';
import api from '../services/api';
import apiKey from '../services/apiKey';
import Cards from './cards';
import Header from './header';
import InfoAdc from './infoAdc';

export default function Home() {

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());

    useEffect(() => {
        requestLocationPermission();
    }, [currentMinutes])

    async function requestLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            getLocation();
        } else {
            requestLocationPermission();
        }
    }

    async function getLocation() {
        try {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {

                let lat = location.coords.latitude;
                let long = location.coords.longitude;

                const response = await api.get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&lang=pt_br`)
                setWeather(response.data);

                const response2 = await api.get(`/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&lang=pt_br`)
                setForecast(response2.data);

            } else {
                getLocation();
            }
        } catch (error) {
            console.log('Erro ao obter a localização: ', error);
            getLocation();
        }
    };

    function updateTime() {
        setCurrentMinutes(new Date().getMinutes());
    }

    useState(() => {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <View style={styles.container}>

            {!forecast ?
                <Loading />
                :
                <ImageBackground source={require('../img/wallpaper.jpg')} style={{ flex: 1 }}>

                    <Header weather={weather} reload={currentMinutes} />

                    <Cards forecast={forecast} reload={currentMinutes} />

                    <InfoAdc weather={weather} reload={currentMinutes} />

                </ImageBackground>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E90FF',
    },
    loadingScreen: {
        fontSize: 19,
        textAlign: 'center',
        color: 'white',
    },
    updateButton: {
        backgroundColor: '#EEE',
        alignSelf: 'center',
        marginTop: 20,
        padding: 3,
        paddingHorizontal: 5,
        marginBottom: 20,
        borderRadius: 3,
        width: 120,
        alignItems: 'center',
        elevation: 5,
    },
    updateText: {
        fontSize: 18,
        marginRight: 4,
        fontWeight: 'bold',
    },
})