import React from "react";
import { VStack, Heading, Center } from "native-base";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useForm, Controller } from "react-hook-form";
import { Alert } from "react-native";
import Axios from "axios";
import { useNavigation } from '@react-navigation/native';

export function CadastroMotorista() {
  const navigation = useNavigation();

  type FormData = {
    nome: string;
    Placa: string;
    Modelo: string;
    Cnh: string;
    Telefone: string;
    Email: string;
    Senha: string;
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  async function handleCadastro(data: FormData) {
    try {
      const response = await Axios.post("http://10.0.2.2:3000/registerMotorista", {
        nome: data.nome,
        Placa: data.Placa,
        Modelo: data.Modelo,
        Cnh: data.Cnh,
        Telefone: data.Telefone,
        Email: data.Email,
        Senha: data.Senha,
      });

      if (response.status === 200) {
        Alert.alert("Cadastro realizado com sucesso!");
        navigation.navigate("TelaMotorista" as never); // Navega para a tela desejada após o cadastro
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      Alert.alert("Erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <VStack bgColor="white" flex={1} px={10} justifyContent="center">
      <Center>
        <Heading color="white" mb={4}>Cadastro de Motorista</Heading>

        <Controller
          control={control}
          name="nome"
          rules={{ required: 'Informe o nome' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              errorMessage={errors.nome?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Placa"
          rules={{
            required: 'Informe a Placa do Caminhão',
            pattern: {
              value: /^[A-Z]{3}-\d{4}$/,
              message: 'Placa inválida. Use o formato XXX-1234',
            }
          }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Placa do Caminhão"
              onChangeText={onChange}
              errorMessage={errors.Placa?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Modelo"
          rules={{ required: 'Informe o Modelo do Caminhão' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Modelo"
              onChangeText={onChange}
              errorMessage={errors.Modelo?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Cnh"
          rules={{ required: 'Informe a CNH do Motorista' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="CNH"
              onChangeText={onChange}
              errorMessage={errors.Cnh?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Telefone"
          rules={{ required: 'Informe o telefone' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Telefone"
              onChangeText={onChange}
              errorMessage={errors.Telefone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Email"
          rules={{
            required: 'Informe o email',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Email inválido',
            }
          }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Email"
              onChangeText={onChange}
              errorMessage={errors.Email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="Senha"
          rules={{ required: 'Informe a senha' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.Senha?.message}
            />
          )}
        />

        <Button title="Cadastrar" onPress={handleSubmit(handleCadastro)} />
      </Center>
    </VStack>
  );
}
export default CadastroMotorista