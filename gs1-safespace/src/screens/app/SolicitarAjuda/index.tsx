import api from "@/request";
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Ajuda = {
  dataSolicitacao: any;
  id: string;
  descricao: string;
};

export default function SolicitarAjuda() {
  const [ajudas, setAjudas] = useState<Ajuda[]>([]);
  const [descricao, setDescricao] = useState('');
  const [ajudaEditando, setAjudaEditando] = useState<Ajuda | null>(null);

  const fetchAjudas = async () => {
    try {
      const response = await api.get("/SolicitacaoAjuda");
      setAjudas(response.data);
    } catch (error: any) {
      console.log(error.response?.data);
      if (error instanceof Error) {
        Alert.alert('Erro ao buscar dados', error.message);
      } else {
        Alert.alert('Erro ao buscar dados', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const criarAjuda = async () => {
    try {
      const response = await api.post("/SolicitacaoAjuda", {
        descricao,
      });

      console.log(response.data);

      setDescricao('');
      await fetchAjudas();

    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert('Erro ao criar ajuda', error.message);
      } else {
        Alert.alert('Erro ao criar ajuda', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const atualizarAjuda = async () => {
  if (!ajudaEditando) return;

  try {
    const payload = {
      id: ajudaEditando.id,
      descricao: descricao,
      dataSolicitacao: ajudaEditando.dataSolicitacao, // importante enviar!
    };

    console.log("Payload PUT:", payload);

    const response = await api.put(`/SolicitacaoAjuda/${ajudaEditando.id}`, payload);

    console.log("Ajuda atualizada:", response.data);

    setDescricao('');
    setAjudaEditando(null);
    await fetchAjudas();

  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      Alert.alert('Erro ao atualizar ajuda', error.message);
    } else {
      Alert.alert('Erro ao atualizar ajuda', 'Ocorreu um erro desconhecido');
    }
  }
};


  const deletarAjuda = async (id: string) => {
    try {
      const response = await api.delete(`/SolicitacaoAjuda/${id}`);
      console.log("Ajuda deletada:", response.data);
      await fetchAjudas();
    } catch (error: any) {
      if (error instanceof Error) {
        Alert.alert('Erro ao deletar ajuda', error.message);
      } else {
        Alert.alert('Erro ao deletar ajuda', 'Ocorreu um erro desconhecido');
      }
    }
  };

  const editarAjuda = (ajuda: Ajuda) => {
    setAjudaEditando(ajuda);
    setDescricao(ajuda.descricao);
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

      <TouchableOpacity
        style={styles.button}
        onPress={ajudaEditando ? atualizarAjuda : criarAjuda}
      >
        <Text style={styles.buttonText}>
          {ajudaEditando ? 'Atualizar Solicitação' : 'Enviar Solicitação'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={ajudas}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.descricao}</Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editarAjuda(item)}
              >
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarAjuda(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
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
  editButton: {
    backgroundColor: '#F0AD4E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
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
