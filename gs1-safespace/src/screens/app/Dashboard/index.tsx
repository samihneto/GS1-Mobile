import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@user');
    logout();
  };

  const messages = [
    "Você é capaz de grandes coisas!",
    "Hoje é um ótimo dia para começar algo novo.",
    "Cada passo importa. Continue em frente!",
    "Acredite no seu potencial!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out + slide left
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Troca de mensagem
        setCurrentMessageIndex((prevIndex) =>
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );

        // Reset posição e fade in
        translateX.setValue(20); // start da direita
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo ao Painel</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Caixa de Agendamentos */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Seus Agendamentos</Text>
        <Text style={styles.boxContent}>Você ainda não tem agendamentos para hoje.</Text>
      </View>

      {/* Caixa de Mensagens Positivas com Animação */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Mensagem do Dia</Text>
        <Animated.Text
          style={[
            styles.boxContent,
            {
              opacity: opacity,
              transform: [{ translateX: translateX }],
            },
          ]}
        >
          {messages[currentMessageIndex]}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A6FA5',
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  logoutButton: {
    backgroundColor: '#2F476D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F476D',
    marginBottom: 10,
  },
  boxContent: {
    fontSize: 16,
    color: '#333',
  },
});
