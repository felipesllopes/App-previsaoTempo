import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoAdc from '../Pages/InfoAdc';
import Home from '../home';

const Stack = createNativeStackNavigator();

export default function Routes() {

    return (

        <Stack.Navigator>

            <Stack.Screen name='Home' component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen name='InfoAdc' component={InfoAdc}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>

    )

}