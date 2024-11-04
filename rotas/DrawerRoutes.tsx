import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CadastroScreen from '../screens/CadastroScreen';
import LoginScreen from '../screens/LoginScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import HomeScreen from '../screens/HomeScreen';
import Trabalhos from '../screens/Motoristas/Trabalhos';
import CadastroMotorista from '../screens/Motoristas/CadastroMotorista';
import EditarMotoristas from '../screens/Motoristas/EditarMoto'; // Verifique se o caminho está correto
import TelaMotorista from '../screens/Motoristas/Telamoto'; // Verifique se o caminho está correto
import CheckinScreen from '../screens/Motoristas/checkinScreen';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Página Inicial' }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Cadastro de Usuário' }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Drawer.Screen
          name="Historico"
          component={HistoricoScreen}
          options={{ title: 'Histórico' }}
        />
         <Drawer.Screen
          name="Trabalhos"
          component={Trabalhos}
          options={{ title: 'Trabalhos' }}
        />
            <Drawer.Screen
          name="CadastroMotorista"
          component={CadastroMotorista}
          options={{ title: 'CadastroMotorista' }}
        />
            <Drawer.Screen
          name="EditarMotoristas"
          component={EditarMotoristas}
          options={{ title: 'EditarMotoristas' }}
        />
           <Drawer.Screen
          name="TelaMotorista"
          component={TelaMotorista}
          options={{ title: 'TelaMotorista' }}
        />
  <Drawer.Screen
          name="CheckinScreen"
          component={CheckinScreen}
          options={{ title: 'CheckinScreen' }}
        />
 
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}
