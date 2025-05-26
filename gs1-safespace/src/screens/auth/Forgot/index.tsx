import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Forgot() {
  const { navigate } = useNavigation<any>();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Enviar recuperação" onPress={() => alert('Email enviado (simulado)')} />
      <Button title="Voltar para Login" onPress={() => navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
});
