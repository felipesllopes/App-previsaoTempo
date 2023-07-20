import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';

export default function BackStack() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ paddingVertical: 5, }} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color={'#FFF'} />
        </TouchableOpacity>
    )
}