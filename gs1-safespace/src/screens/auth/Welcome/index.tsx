import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function Welcome() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
            <Image
        style={styles.logo}
        source={require('../../../../assets/images/logo_safespace.png')}
      />
      <Text style={styles.title}>Bem-vindo!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7C7E7', // Fundo agora azul-profundo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A6FA5',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4A6FA5',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 40,
    borderRadius: 75, // Tornando a imagem circular
    borderWidth: 2, // Adicionando uma borda
    borderColor: '#4A6FA5', // Cor da borda
    backgroundColor: '#4A6FA5', // Fundo da imagem
  }
});
