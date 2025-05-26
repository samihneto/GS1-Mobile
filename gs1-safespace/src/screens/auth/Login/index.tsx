import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';  // importe seu hook useAuth

export default function Login() {
  const navigation = useNavigation<any>();
  const { login } = useAuth(); // pega a função login do contexto
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const contasSalvas = await AsyncStorage.getItem('@contas');
      const contas = contasSalvas ? JSON.parse(contasSalvas) : [];

      const usuarioEncontrado = contas.find((conta: any) => conta.email === email && conta.senha === senha);

      if (!usuarioEncontrado) {
        Alert.alert('Erro', 'Email ou senha inválidos');
        return;
      }

      // Chama o login do contexto para atualizar o estado global de autenticação
      await login();

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      // Navegar para o app principal (opcional, pois a navegação será automática pelo Routes)
      // navigation.navigate('Dashboard'); 

    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar login');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111914',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#f7f7f7',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1d2a23',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#22b85d',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#22b85d',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
});
