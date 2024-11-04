import React from "react";
import { VStack, Heading, Center, Select, Button, FormControl } from "native-base";
import { Input } from "../components/input"; // Certifique-se de que seu Input tem as props corretas
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Alert } from "react-native";

export function CadastroScreen() {
  const navigation = useNavigation();

  const [userType, setUserType] = React.useState("Cidadão");

  type FormData = {
    nome: string;
    Email: string;
    Senha: string;
    CpfCnpj: string;
    Telefone: string;
  
    Tipo: string;
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { Tipo: "Cidadão" }
  });

  async function handleCadastro(data: FormData) {
    try {
      const response = await Axios.post("http://localhost:3000/register", {
        nome: data.nome,
        Email: data.Email,
        Senha: data.Senha,
        CpfCnpj: data.CpfCnpj,
        Telefone: data.Telefone,
      
        Tipo: data.Tipo,
      });

      if (response.status === 200) {
        Alert.alert("Cadastro realizado com sucesso!");
        navigation.navigate("Historico" as never);
      } else {
        Alert.alert("Erro no cadastro. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      Alert.alert("Erro no cadastro. Tente novamente mais tarde.");
    }
  }

  return (
    <VStack
      bg="white"
      flex={1}
      p={5}
      borderRadius={8}
    >
      <Center flex={1}>
        <Heading m={5}>Cadastro de Usuário</Heading>
        <FormControl>
          <Controller
            control={control}
            name="nome"
            rules={{ required: 'Informe o nome' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={(text) => onChange(text)} // Armazena o valor diretamente
                isInvalid={!!errors.nome}
                errorMessage={errors.nome?.message}
                p={3} // Padding
              />
            )}
          />
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
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                onChangeText={(text) => onChange(text)} // Armazena o valor diretamente
                isInvalid={!!errors.Email}
                errorMessage={errors.Email?.message}
                p={3} // Padding
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
                onChangeText={(text) => onChange(text)} // Armazena o valor diretamente
                isInvalid={!!errors.Senha}
                errorMessage={errors.Senha?.message}
                p={3} // Padding
              />
            )}
          />
          <Controller
            control={control}
            name="CpfCnpj"
            rules={{ required: 'Informe o CPF' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="CPF"
                onChangeText={(text) => onChange(text)} // Armazena o valor diretamente
                isInvalid={!!errors.CpfCnpj}
                errorMessage={errors.CpfCnpj?.message}
                keyboardType="numeric"
                p={3} // Padding
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
                onChangeText={(text) => onChange(text)} // Armazena o valor diretamente
                isInvalid={!!errors.Telefone}
                errorMessage={errors.Telefone?.message}
                keyboardType="numeric"
                p={3} // Padding
              />
            )}
          />
        
          <Controller
            control={control}
            name="Tipo"
            rules={{ required: 'Informe o Tipo' }}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedValue={value}
                onValueChange={onChange}
                placeholder="Tipo"
                p={3} // Padding
              >
                <Select.Item label="Empresa" value="Empresa" />
                <Select.Item label="Cidadão" value="Cidadão" />
                <Select.Item label="Locadora" value="Locadora" />
              </Select>
            )}
          />
        </FormControl>
        <Button
          bg="black"
          _pressed={{ bg: "gray.600" }}
          color="white"
          size="lg"
          onPress={handleSubmit(handleCadastro)}
        >
          Cadastrar
        </Button>
      </Center>
    </VStack>
  );
}

export default CadastroScreen;
