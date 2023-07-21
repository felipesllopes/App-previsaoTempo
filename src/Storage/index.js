import AsyncStorage from '@react-native-async-storage/async-storage';

let key = "@previsaotempo";

export async function storeData(value) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e);
    }
}

export async function getData() {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        console.log(e);
    }
}