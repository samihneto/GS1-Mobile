import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SolicitarAjuda() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Solicitação de Ajuda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4A6FA5' },
  text: { fontSize: 20, color: '#fff' },
});