import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Trabalho = {
  id: number;
  Nome: string;
  Telefone: string;
  Cnh: string;
  Placa: string;
  Modelo: string;
  Email: string;
  Senha: string; // Este campo não é utilizado aqui, mas mantido na definição
};

export function EditarMotoristas() {
  const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
  const [editItem, setEditItem] = useState<Trabalho | null>(null);

  useEffect(() => {
    // Inicializa a lista de motoristas com dados de exemplo
    const loadTrabalhos = async () => {
      const storedTrabalhos = await AsyncStorage.getItem('motoristas');
      if (storedTrabalhos) {
        setTrabalhos(JSON.parse(storedTrabalhos));
      } else {
        // Dados de exemplo
        const exampleTrabalhos: Trabalho[] = [
          { id: 1, Nome: 'Joao ', Telefone: '(64) 9999999', Cnh: '88393949', Placa: '67677nn', Modelo: 'Mercesde', Email: 'josedasilva@outlook.com', Senha: 'senha123' },
          
          { id: 3, Nome: 'Carlos Pereira', Telefone: '(61) 77777-7777', Cnh: '1357924680', Placa: 'LMN-9876', Modelo: 'mercedes 109', Email: 'carlos@example.com', Senha: 'senha789' },
        ];
        setTrabalhos(exampleTrabalhos);
        await AsyncStorage.setItem('motoristas', JSON.stringify(exampleTrabalhos)); // Salva dados de exemplo localmente
      }
    };

    loadTrabalhos();
  }, []);

  const handleEdit = (item: Trabalho) => {
    setEditItem({ ...item });
  };

  const handleSave = async () => {
    if (editItem) {
      setTrabalhos((prevTrabalhos) => 
        prevTrabalhos.map((trabalho) => (trabalho.id === editItem.id ? editItem : trabalho))
      );
      await AsyncStorage.setItem('motoristas', JSON.stringify(trabalhos));
      Alert.alert('Sucesso', 'Motorista atualizado com sucesso!');
      setEditItem(null); // Retorna ao modo de visualização
    }
  };

  const handleDelete = async (id: number) => {
    setTrabalhos((prevTrabalhos) => prevTrabalhos.filter((trabalho) => trabalho.id !== id));
    await AsyncStorage.setItem('motoristas', JSON.stringify(trabalhos));
    Alert.alert('Sucesso', 'Motorista excluído com sucesso!');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Editar Motorista</Text>
      <FlatList
        data={trabalhos}
        renderItem={({ item }) => (
          <View style={styles.workContainer}>
            {editItem && editItem.id === item.id ? (
              <View>
                <Text>Nome:</Text>
                <TextInput
                  value={editItem.Nome}
                  onChangeText={(text) => setEditItem({ ...editItem, Nome: text })}
                  style={styles.input}
                />
                <Text>Telefone:</Text>
                <TextInput
                  value={editItem.Telefone}
                  onChangeText={(text) => setEditItem({ ...editItem, Telefone: text })}
                  style={styles.input}
                />
                <Text>CNH:</Text>
                <TextInput
                  value={editItem.Cnh}
                  onChangeText={(text) => setEditItem({ ...editItem, Cnh: text })}
                  style={styles.input}
                />
                <Text>Placa:</Text>
                <TextInput
                  value={editItem.Placa}
                  onChangeText={(text) => setEditItem({ ...editItem, Placa: text })}
                  style={styles.input}
                />
                <Text>Modelo:</Text>
                <TextInput
                  value={editItem.Modelo}
                  onChangeText={(text) => setEditItem({ ...editItem, Modelo: text })}
                  style={styles.input}
                />
                <Text>Email:</Text>
                <TextInput
                  value={editItem.Email}
                  onChangeText={(text) => setEditItem({ ...editItem, Email: text })}
                  style={styles.input}
                />
                <Button title="Salvar" onPress={handleSave} />
                <Button title="Cancelar" onPress={() => setEditItem(null)} color="red" />
              </View>
            ) : (
              <View>
                <Text style={styles.text}>Nome: {item.Nome}</Text>
                <Text style={styles.text}>Telefone: {item.Telefone}</Text>
                <Text style={styles.text}>CNH: {item.Cnh}</Text>
                <Text style={styles.text}>Placa: {item.Placa}</Text>
                <Text style={styles.text}>Modelo: {item.Modelo}</Text>
                <Text style={styles.text}>Email: {item.Email}</Text>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.button}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.button}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  workContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    color: 'blue',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditarMotoristas;
