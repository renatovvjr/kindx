import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao KindX</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('AskHelp')}>
        <Text style={styles.buttonText}>Pedir Ajuda</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.button2]} onPress={() => navigation.navigate('OfferHelp')}>
        <Text style={styles.buttonText}>Oferecer Ajuda</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={() => navigation.navigate('Feed')}>
        <Text style={styles.linkText}>Ver Comunidade</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 30, color: '#00B8D9' },
  button: {
    backgroundColor: '#F97316',
    padding: 14,
    width: '90%',
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  button2: { backgroundColor: '#00B8D9' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  link: { marginTop: 20 },
  linkText: { color: '#00B8D9', fontSize: 16, fontWeight: '600' },
});
