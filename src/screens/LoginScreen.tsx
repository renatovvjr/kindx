import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login KindX</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.replace('Tabs')}
      >
        <Text style={styles.buttonText}>Entrar (temporário)</Text>
      </Pressable>

      <Text style={styles.subtitle}>Depois vamos colocar Google / Apple aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#00B8D9' },
  button: {
    backgroundColor: '#00B8D9',
    padding: 14,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  subtitle: { marginTop: 12, color: '#666' },
});

