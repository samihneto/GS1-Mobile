import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/app/Dashboard';
import Agendamentos from '../screens/app/Agendamentos';
import Perfil from '../screens/app/Perfil';
import SolicitarAjuda from '../screens/app/SolicitarAjuda';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Agendamentos" component={Agendamentos} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="SolicitarAjuda" component={SolicitarAjuda} />
    </Stack.Navigator>
  );
}
