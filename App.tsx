import React from 'react';
import { NativeBaseProvider } from 'native-base';
// ou o caminho para o seu componente
import DrawerRoutes from '../MeuApp/rotas/DrawerRoutes';

const App = () => {
  return (
    <NativeBaseProvider>
      <DrawerRoutes />
    </NativeBaseProvider>
  );
};

export default App;
