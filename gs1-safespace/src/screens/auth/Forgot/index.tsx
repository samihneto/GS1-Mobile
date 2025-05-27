import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Forgot() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');

  const handleSendRecovery = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }
    Alert.alert('Sucesso', 'Email de recuperação enviado (simulado)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#B5BBC4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendRecovery}>
        <Text style={styles.buttonText}>Enviar recuperação</Text>
      </TouchableOpacity>
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
});
