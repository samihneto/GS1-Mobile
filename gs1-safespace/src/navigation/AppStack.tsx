import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/app/Dashboard';
import Agendamentos from '../screens/app/Agendamentos';
import Perfil from '../screens/app/Perfil';
import SolicitarAjuda from '../screens/app/SolicitarAjuda';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: '#2F476D' },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#2F476D',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerActiveTintColor: '#A7C7E7',
        drawerInactiveTintColor: '#FFF',
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Painel' }} />
      <Drawer.Screen name="Agendamentos" component={Agendamentos} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="SolicitarAjuda" component={SolicitarAjuda} options={{ title: 'Ajuda' }} />
    </Drawer.Navigator>
  );
}
