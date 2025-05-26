import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Forgot from '../screens/auth/Forgot';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
}
