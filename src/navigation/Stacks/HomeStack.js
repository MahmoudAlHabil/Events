import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../screens";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

export default HomeStack;