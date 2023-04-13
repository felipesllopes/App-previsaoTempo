import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';
import Cards from './cards';
import Header from './header';
import InfoAdc from './infoAdc';

import * as Location from 'expo-location';

/**
 * Função principal, que conterá todos os componentes adicionais, responsável pela chamada do location e das API's
 * @returns 
 */
export default function Home() {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [minute, setMinute] = useState(); // estado para pegar o minuto atual

    useEffect(() => {
        (async () => {

            let slocation = await Location.getCurrentPositionAsync({});
            setLocation(slocation);

            let lat = await slocation.coords.latitude;
            let long = await slocation.coords.longitude;

            let key = "453d5754ff46b5aa37422bee730a7f6d"
            const response = await api.get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
            setWeather(response.data);

            const response2 = await api.get(`/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`)
            setForecast(response2.data);

        })();
    }, [minute]);

    /**
     * Toda vez que o minuto mudar e essa função for acionada, o estado será mudado e o useEffect receberá o novo valor, forçando a atualização do arquivo. A função só funcionará quando o valor real do minuto for diferente do atual. 
     */
    function reload() {
        setMinute(new Date().getMinutes());
    }

    return (
        <ImageBackground source={require("../img/ceu.jpg")} style={styles.container}>

            {location == null || weather == null || forecast == null ?
                <View style={styles.loadingContainer}>
                    <Image source={require("../img/logo.png")} style={{ height: 350, width: 350 }} />
                </View>
                :
                <View style={{ flex: 1 }}>

                    <Header weather={weather} atualizar={minute} />

                    <View style={styles.viewButton}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.updateButton} onPress={reload}>
                            <Text style={styles.updateText}>Atualizar</Text>
                            <Ionicons name="reload-outline" size={24} color='black' />
                        </TouchableOpacity>
                    </View>

                    <Cards forecast={forecast} atualizar={minute} />

                    <InfoAdc weather={weather} atualizar={minute} />
                </View>
            }

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    loadingScreen: {
        fontSize: 19,
        textAlign: 'center',
        color: 'white',
    },
    viewButton: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    updateButton: {
        backgroundColor: '#EEE',
        borderRadius: 3,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
        paddingHorizontal: 5,
    },
    updateText: {
        fontSize: 18,
        marginRight: 4,
        fontWeight: 'bold',
    },
})