import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation<any>();
  const nome = 'Samir Neto';
  const email = 'samir@email.com';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{nome.charAt(0).toUpperCase()}</Text>
      </View>

      <Text style={styles.name}>{nome}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7C7E7',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A6FA5',
  },
  backButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatar: {
    backgroundColor: '#4A6FA5',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F476D',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#2F476D',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    color: '#B02B2B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
