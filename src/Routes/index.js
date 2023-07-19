import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoAdc from '../Pages/InfoAdc';
import InfoCards from '../Pages/InfoCards';
import Home from '../home';

const Stack = createNativeStackNavigator();

export default function Routes() {

    return (

        <Stack.Navigator>

            <Stack.Screen name='Home' component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='InfoAdc' component={InfoAdc}
                options={{ title: 'Informações Adicionais' }} />

            <Stack.Screen name='InfoCards' component={InfoCards} />

        </Stack.Navigator>

    )

}