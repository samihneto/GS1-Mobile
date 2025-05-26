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
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
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
    footer: {
      alignItems: 'center',
    },
    footerText: {
      color: '#ccc',
      fontSize: 14,
    },
    link: {
      color: '#22b85d',
      fontSize: 14,
      marginTop: 5,
      textDecorationLine: 'underline',
    },
  });