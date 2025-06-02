import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '@/request'; // Ajuste se o caminho for diferente

type Agendamento = {
  id: string;
  data: string;
  descricao: string;
  idUsuario: string;
};

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const fetchAgendamentos = async () => {
    try {
      const response = await api.get('/Agendamento');
      setAgendamentos(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const renderItem = ({ item }: { item: Agendamento }) => (
    <View style={styles.item}>
      <Text style={styles.data}>{new Date(item.data).toLocaleDateString()}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.usuario}>Usuário: {item.idUsuario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Agendamentos</Text>
      </View>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum agendamento encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7C7E7',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#4A6FA5',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  data: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F476D',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#333',
  },
  usuario: {
    fontSize: 12,
    color: '#4A6FA5',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: '#2F476D',
    marginTop: 40,
    fontSize: 16,
  },
});
