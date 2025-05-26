import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const { navigate } = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Painel</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigate('Agendamentos')}>
        <Text style={styles.buttonText}>Agendamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigate('Perfil')}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigate('SolicitarAjuda')}>
        <Text style={styles.buttonText}>Solicitar Ajuda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111914' },
  title: { fontSize: 24, marginBottom: 40, color: '#fff' },
  button: {
    backgroundColor: '#22b85d',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
