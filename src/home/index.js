import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from '../Components/Loading';
import api from '../services/api';
import apiKey from '../services/apiKey';
import Cards from './cards';
import Header from './header';
import InfoAdc from './infoAdc';
import { ImageBackground } from 'react-native';

export default function Home() {

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        requestLocationPermission();
        console.log("Chamou")
    }, [reload])

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
                setLoading(false);

                let lat = location.coords.latitude;
                let long = location.coords.longitude;

                const response = await api.get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&lang=pt_br`)
                setWeather(response.data);

                const response2 = await api.get(`/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
                setForecast(response2.data);

            } else {
                getLocation();
            }
        } catch (error) {
            console.log('Erro ao obter a localização: ', error);
            getLocation();
        }
    };


    function reloading() {
        setLoading(true)
        setReload(current => (current === true ? false : true));
    }

    return (
        <View style={styles.container}>

            {!forecast ?
                <Loading />
                :
                <ImageBackground source={require('../img/wallpaper.jpg')} style={{ flex: 1 }}>

                    <Header weather={weather} reload={reload} />

                    <TouchableOpacity activeOpacity={0.7} style={styles.updateButton} onPress={reloading}>
                        {loading ?
                            <ActivityIndicator size={26} color={'black'} />
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.updateText}>Atualizar</Text>
                                <Ionicons name="reload-outline" size={24} color='black' />
                            </View>
                        }
                    </TouchableOpacity>

                    <Cards forecast={forecast} reload={reload} />

                    <InfoAdc weather={weather} reload={reload} />

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