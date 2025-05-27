import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation<any>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const contasSalvas = await AsyncStorage.getItem('@contas');
      const contas = contasSalvas ? JSON.parse(contasSalvas) : [];

      const jaExiste = contas.some((conta: any) => conta.email === email);
      if (jaExiste) {
        Alert.alert('Erro', 'Já existe uma conta com esse e-mail');
        return;
      }

      const novaConta = { nome, email, senha };
      contas.push(novaConta);

      await AsyncStorage.setItem('@contas', JSON.stringify(contas));

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar conta');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#B5BBC4"
      />
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


      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Entrar</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A6FA5', // Azul-profundo
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
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4A6FA5',
    borderRadius: 6,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF', // Branco puro
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4A6FA5', // Azul-profundo
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: ' #2F476D',
    fontSize: 14,
  },
});
