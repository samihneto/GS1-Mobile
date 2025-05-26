import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const { navigate } = useNavigation<any>();

  return (
    <View>
      <Text>Bem-vindo!</Text>
      <Button title="Login" onPress={() => navigate('Login')} />
      <Button title="Registrar" onPress={() => navigate('Register')} />
    </View>
  );
}
