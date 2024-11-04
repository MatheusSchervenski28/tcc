import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Axios, { AxiosError } from 'axios';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type FormData = {
  Email: string;
  Senha: string;
};

// Definindo o tipo para os dados de erro que o servidor pode retornar
interface ErrorResponse {
  message: string;
}

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await Axios.post('http://10.0.2.2:3000/login', {
        Email: data.Email,
        Senha: data.Senha,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      Alert.alert('Login bem-sucedido');
      navigation.navigate('Historico'); // Navegação para a tela de histórico
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error: unknown) => {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      Alert.alert('Erro de Servidor', axiosError.response.data.message || 'Erro desconhecido.');
    } else if (axiosError.request) {
      Alert.alert('Erro de Rede', 'Não foi possível obter uma resposta do servidor.');
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao configurar a requisição.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <Controller
        control={control}
        name="Email"
        rules={{
          required: 'Informe o email',
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,4}$/,
            message: 'Email inválido',
          }
        }}
        render={({ field: { onChange } }) => (
          <Input
            placeholder="Email"
            onChangeText={onChange}
            isInvalid={!!errors.Email}
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
            isInvalid={!!errors.Senha}
          />
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.registerButton}>
        <Text style={styles.buttonText}>Ir para Cadastro</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(handleLogin)} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default LoginScreen;
