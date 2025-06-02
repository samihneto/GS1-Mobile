import api from "@/request";
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Ajuda = {
  id: string;
  descricao: string;
  // Adicione outros campos conforme necessário
};

export default function SolicitarAjuda() {
  const [ajudas, setAjudas] = useState<Ajuda[]>([]);
  const [descricao, setDescricao] = useState('');

  const API_URL = 'http://187.72.164.185:5279/SolicitacaoAjuda'; // Altere para seu IP e rota real

  const fetchAjudas = async () => {
    try {
      console.log(" ---> fetchAjudas ")
      //const res = await fetch(API_URL);

      // const data = await res.json();
      const response = await api.get("/SolicitacaoAjuda")

      setAjudas(response.data);

    } catch (error) {
      console.log(error.response.data)
      if (error instanceof Error) {
        Alert.alert('Erro ao buscar dados 1', error.message);
      } else {
        Alert.alert('Erro ao buscar dados 2', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const criarAjuda = async () => {
    try {
      const response = await api.post("/SolicitacaoAjuda", {
        descricao,
      })

      console.log(response.data)
      console.log(" --->")
      console.log(" --->")

    } catch (error) {
      console.log(" --->")
      console.log(error)
      console.log(" --->")
      if (error instanceof Error) {
        Alert.alert('Erro ao criar ajuda 2', error.message);
      } else {
        Alert.alert('Erro ao criar ajuda 3', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const deletarAjuda = async (id: string) => {
    try {
      const response = await api.delete(`/SolicitacaoAjuda/${id}`);
      console.log("Ajuda deletada:", response.data);
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

      <TouchableOpacity style={styles.button} onPress={criarAjuda}>
        <Text style={styles.buttonText}>Enviar Solicitação</Text>
      </TouchableOpacity>

      <FlatList
        data={ajudas}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.descricao}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deletarAjuda(item.id)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7C7E7',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A6FA5',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#333333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4A6FA5',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#2F476D',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});