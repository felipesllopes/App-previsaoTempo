import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Loading from '../Components/Loading';
import api from '../services/api';
import apiKey from '../services/apiKey';
import Cards from './cards';
import Header from './header';
import InfoAdc from './infoAdc';

export default function Home() {

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [minute, setMinute] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, [minute])

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

                const response = await api.get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
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

    /**
     * Toda vez que essa função for chamada, ela pegará o minuto atual e jogará no useeffect, que atualizará todo o programa
     */
    function reload() {
        setLoading(true)
        setMinute(new Date().getMinutes());
    }

    return (
        <View style={styles.container}>

            {!forecast ?
                <Loading />
                :
                <View style={{ flex: 1 }}>

                    <Header weather={weather} atualizar={minute} />

                    <TouchableOpacity activeOpacity={0.7} style={styles.updateButton} onPress={reload}>
                        {loading ?
                            <ActivityIndicator size={26} color={'black'} />
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.updateText}>Atualizar</Text>
                                <Ionicons name="reload-outline" size={24} color='black' />
                            </View>
                        }
                    </TouchableOpacity>

                    <Cards forecast={forecast} atualizar={minute} />

                    <InfoAdc weather={weather} atualizar={minute} />

                </View>
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
        marginTop: 25,
        padding: 3,
        paddingHorizontal: 5,
        marginBottom: 35,
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