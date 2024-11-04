import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert } from 'react-native';

type Trabalho = {
  id: number; // ID é um número e não pode ser undefined
  concluido: boolean;
  Quantidade: string;
  Tamanho: string;
  Endereco: string;
  nome: string; // Novo campo
  Telefone: string; // Novo campo
};

export function HistoricoScreen() {
  const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // Controla qual trabalho está sendo editado
  const [editedWork, setEditedWork] = useState<Trabalho | null>(null);

  useEffect(() => {
    // Inicializa a lista de trabalhos com dados de exemplo
    setTrabalhos([
      {
        id: 1,
        concluido: false,
        Quantidade: "10",
        Tamanho: "Médio",
        Endereco: "Rua A, 123",
        nome: "João Silva",
        Telefone: "(61) 99999-9999",
      },
      {
        id: 2,
        concluido: true,
        Quantidade: "5",
        Tamanho: "Pequeno",
        Endereco: "Avenida B, 456",
        nome: "Maria Oliveira",
        Telefone: "(61) 88888-8888",
      },
      {
        id: 3,
        concluido: false,
        Quantidade: "20",
        Tamanho: "Grande",
        Endereco: "Praça C, 789",
        nome: "Carlos Pereira",
        Telefone: "(61) 77777-7777",
      },
      {
        id: 4,
        concluido: false,
        Quantidade: "4",
        Tamanho: "4",
        Endereco: "Rua 5 quadra 12 lote 13 vila verde",
        nome: "Matheus",
        Telefone: "(64) 92065677",
      },
    ]);
  }, []);

  const handleEdit = (work: Trabalho) => {
    // Cria uma cópia do trabalho a ser editado
    setEditedWork({ ...work });
    setEditingId(work.id); // Define o ID do trabalho a ser editado
  };

  const handleSaveEdit = () => {
    if (editedWork) {
      // Atualiza o trabalho na lista
      setTrabalhos(trabalhos.map(work => (work.id === editedWork.id ? editedWork : work)));
      Alert.alert("Sucesso", "Trabalho atualizado com sucesso!");
      setEditingId(null); // Reseta o ID para voltar ao modo de visualização
      setEditedWork(null); // Limpa o trabalho editado
    }
  };

  const handleDelete = (id: number) => {
    // Exclui o trabalho da lista
    setTrabalhos(trabalhos.filter(work => work.id !== id));
    Alert.alert("Sucesso", "Trabalho excluído com sucesso!");
  };

  const renderItem = ({ item }: { item: Trabalho }) => (
    <View style={styles.workContainer}>
      {editingId === item.id ? ( // Verifica se este é o trabalho que está sendo editado
        <View>
          <TextInput
            placeholder="Nome"
            value={editedWork?.nome}
            onChangeText={(text) => editedWork && setEditedWork({ ...editedWork, nome: text })}
          />
          <TextInput
            placeholder="Telefone"
            value={editedWork?.Telefone}
            onChangeText={(text) => editedWork && setEditedWork({ ...editedWork, Telefone: text })}
          />
          <TextInput
            placeholder="Quantidade"
            value={editedWork?.Quantidade}
            onChangeText={(text) => editedWork && setEditedWork({ ...editedWork, Quantidade: text })}
          />
          <TextInput
            placeholder="Tamanho"
            value={editedWork?.Tamanho}
            onChangeText={(text) => editedWork && setEditedWork({ ...editedWork, Tamanho: text })}
          />
          <TextInput
            placeholder="Endereço"
            value={editedWork?.Endereco}
            onChangeText={(text) => editedWork && setEditedWork({ ...editedWork, Endereco: text })}
          />
          <Button title="Salvar Edição" onPress={handleSaveEdit} />
          <Button title="Cancelar" onPress={() => {
            setEditingId(null); // Cancela a edição e volta para a visualização
            setEditedWork(null); // Limpa o trabalho editado
          }} />
        </View>
      ) : (
        <>
          <Text style={styles.text}>Nome: {item.nome}</Text>
          <Text style={styles.text}>Telefone: {item.Telefone}</Text>
          <Text style={styles.text}>Quantidade: {item.Quantidade}</Text>
          <Text style={styles.text}>Tamanho: {item.Tamanho}</Text>
          <Text style={styles.text}>Endereço: {item.Endereco}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Editar" onPress={() => handleEdit(item)} />
            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Histórico</Text>
      <FlatList
        data={trabalhos}
        renderItem={renderItem}
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
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default HistoricoScreen;
