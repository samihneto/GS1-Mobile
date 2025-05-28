import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert } from 'react-native';

type Ajuda = {
  id: string;
  descricao: string;
  // Adicione outros campos conforme necessário
};

export default function SolicitarAjuda() {
  const [ajudas, setAjudas] = useState<Ajuda[]>([]);
  const [descricao, setDescricao] = useState('');
  const [idUsuarioSS, setIdUsuarioSS] = useState('');

  const API_URL = 'http://192.168.15.5:5000/SolicitacaoAjuda'; // Altere para seu IP e rota real

  const fetchAjudas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAjudas(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao buscar dados', error.message);
      } else {
        Alert.alert('Erro ao buscar dados', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const criarAjuda = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricao,
          dataSolicitacao: new Date().toISOString(),
          idUsuarioSS,
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar ajuda');

      await fetchAjudas();
      setDescricao('');
      setIdUsuarioSS('');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao criar ajuda', error.message);
      } else {
        Alert.alert('Erro ao criar ajuda', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const deletarAjuda = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar');
      await fetchAjudas();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao deletar ajuda', error.message);
      } else {
        Alert.alert('Erro ao deletar ajuda', 'Ocorreu um erro desconhecido');
      }
    }
  };

  useEffect(() => {
    fetchAjudas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitação de Ajuda</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        value={idUsuarioSS}
        onChangeText={setIdUsuarioSS}
      /> */}

      <Button title="Enviar Solicitação" onPress={criarAjuda} />

      <FlatList
        data={ajudas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.descricao}</Text>
            <Button title="Excluir" onPress={() => deletarAjuda(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#4A6FA5' },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  text: { fontSize: 16, color: '#000' },
});
