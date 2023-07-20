import { View, Text, StyleSheet } from "react-native";
import BackStack from "../../Components/BackStack";

export default function InfoCards() {

    let hours = new Date().getHours();

    return (
        <View style={[styles.container, { backgroundColor: hours > 6 && hours < 18 ? '#00BFFF' : '#000080' }]}>
            <BackStack />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
})