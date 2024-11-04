import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ButtonGroup, Input, Button } from "react-native-elements";
import Axios from "axios";
import { Controller, useForm } from "react-hook-form";

export function Trabalhos() {
  type FormData = {
    Quantidade: number;
    Tamanho: string; // Tamanho do trabalho
    Data: string; // Formato DD/MM/YYYY
    Endereco: string; // Endereço do trabalho
  };

  const sizes = ["3 metros", "4 metros"];
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleCadastro = async (data: FormData) => {
    try {
      // Converter a data do formato DD/MM/YYYY para YYYY-MM-DD
      const [day, month, year] = data.Data.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await Axios.post("http://10.0.2.2:3000/Pedidos", {
        Tamanho: sizes[selectedSizeIndex],
        Quantidade: data.Quantidade,
        Data: formattedDate, // Usando a data no formato YYYY-MM-DD
        Endereco: data.Endereco,
      });

      if (response.status === 200) {
        Alert.alert("Pedido enviado com sucesso!");
      } else {
        Alert.alert("Erro ao enviar o pedido. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      Alert.alert("Erro ao enviar o pedido. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={sizes}
        selectedIndex={selectedSizeIndex}
        onPress={setSelectedSizeIndex}
      />
      <Controller
        control={control}
        name="Quantidade"
        rules={{ required: 'Informe a Quantidade' }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Quantidade"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()} // Converte o número para string
            errorMessage={errors.Quantidade?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="Endereco"
        rules={{ required: 'Informe o Endereco' }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Endereco"
            onChangeText={onChange}
            value={value || ''} // Certifica-se de que `value` seja uma string
            errorMessage={errors.Endereco?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="Data"
        rules={{ required: 'Informe a Data' }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Data (DD/MM/YYYY)"
            onChangeText={onChange}
            value={value || ''} // Certifica-se de que `value` seja uma string
            errorMessage={errors.Data?.message}
          />
        )}
      />
      <Button title="Cadastrar" onPress={handleSubmit(handleCadastro)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default Trabalhos;
