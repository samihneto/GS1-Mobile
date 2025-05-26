import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Agendamentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página de Agendamentos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111914' },
  text: { fontSize: 20, color: '#fff' },
});
