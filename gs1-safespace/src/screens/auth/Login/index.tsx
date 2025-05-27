import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';

export default function Login() {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
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

      await login();
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar login');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrar</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#B5BBC4"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#B5BBC4"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
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
    backgroundColor: '#A7C7E7', // Azul-claro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4A6FA5',
    borderRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A6FA5',
    lineHeight: 32,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0', // Cinza-claro
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#333333', // Preto suave
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A6FA5', // Azul-profundo
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Branco puro
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4A6FA5', // Azul-profundo
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  footerText: {
    color: ' #2F476D',
    fontSize: 14,
  },
});
