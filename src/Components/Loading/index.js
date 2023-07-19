import { Image, StyleSheet, View } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../img/logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 280,
        width: 280,
    },
})