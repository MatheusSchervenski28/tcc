import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Trabalho = {
  id: number;
  concluido: boolean;
  Quantidade: string;
  Tamanho: string;
  Endereco: string;
  NomeCliente: string; // Nome do cliente
  Telefone: string;    // Telefone do cliente
};

// Definimos o tipo de parâmetro esperado para a rota `CheckIn`.
type RootStackParamList = {
  CheckIn: { endereco: string };
};

export function TelaMotorista() {
  const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadTrabalhos();
  }, []);

  const loadTrabalhos = async () => {
    const storedTrabalhos = await AsyncStorage.getItem('trabalhos');
    if (storedTrabalhos) {
      setTrabalhos(JSON.parse(storedTrabalhos));
    } else {
      // Dados de exemplo se não houver trabalhos armazenados
      const exampleTrabalhos: Trabalho[] = [
        { id: 1, concluido: false, Quantidade: '10', Tamanho: 'Pequeno', Endereco: 'Rua A, 123', NomeCliente: 'João', Telefone: '1234-5678' },
        { id: 2, concluido: false, Quantidade: '5', Tamanho: 'Médio', Endereco: 'Rua B, 456', NomeCliente: 'Maria', Telefone: '2345-6789' },
        { id: 3, concluido: false, Quantidade: '20', Tamanho: 'Grande', Endereco: 'Rua C, 789', NomeCliente: 'Carlos', Telefone: '3456-7890' },
        { id: 4, concluido: false, Quantidade: '15', Tamanho: 'Pequeno', Endereco: 'Rua D, 321', NomeCliente: 'Ana', Telefone: '4567-8901' },
        { id: 5, concluido: false, Quantidade: '8', Tamanho: 'Médio', Endereco: 'Rua E, 654', NomeCliente: 'Pedro', Telefone: '5678-9012' },
      ];
      setTrabalhos(exampleTrabalhos);
      await AsyncStorage.setItem('trabalhos', JSON.stringify(exampleTrabalhos)); // Salva dados de exemplo localmente
    }
  };

  const handleConcluirTrabalho = async (id: number) => {
    const updatedTrabalhos = trabalhos.map((trabalho) =>
      trabalho.id === id ? { ...trabalho, concluido: !trabalho.concluido } : trabalho
    );

    setTrabalhos(updatedTrabalhos);
    await AsyncStorage.setItem('trabalhos', JSON.stringify(updatedTrabalhos)); // Salva as alterações
  };

  const handleCheckIn = (endereco: string) => {
    // Navegar para a tela de check-in e passar o endereço como parâmetro
    navigation.navigate('CheckIn', { endereco });
  };

  const renderItem = ({ item }: { item: Trabalho }) => (
    <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10 }}>
      {!item.concluido && (
        <CheckBox
          checked={item.concluido}
          onPress={() => handleConcluirTrabalho(item.id)}
        />
      )}
      {!item.concluido && (
        <>
          <Text style={{ marginBottom: 10 }}>Quantidade: {item.Quantidade}</Text>
          <Text style={{ marginBottom: 10 }}>Tamanho: {item.Tamanho}</Text>
          <Text style={{ marginBottom: 10 }}>Endereço: {item.Endereco}</Text>
          <Text style={{ marginBottom: 10 }}>Cliente: {item.NomeCliente}</Text>
          <Text style={{ marginBottom: 10 }}>Telefone: {item.Telefone}</Text>
          <Button title="Check-in" onPress={() => handleCheckIn(item.Endereco)} />
        </>
      )}
      {item.concluido && (
        <Text style={{ textDecorationLine: 'line-through', color: 'gray' }}>
          Trabalho concluído: {item.Quantidade} - {item.Tamanho} - {item.Endereco} - {item.NomeCliente} - {item.Telefone}
        </Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Trabalhos do Dia - {new Date().toLocaleDateString()}
      </Text>
      <FlatList
        data={trabalhos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default TelaMotorista;
