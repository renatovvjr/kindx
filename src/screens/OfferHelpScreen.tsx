import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function OfferHelpScreen({ navigation }: any) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!type || !location) {
      Alert.alert('Atenção', 'Preencha pelo menos o tipo de ajuda e a localização.');
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.from('offers').insert({
        type,
        description,
        location,
      });

      if (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível salvar a oferta.');
      } else {
        Alert.alert('Sucesso', 'Sua oferta foi enviada para a comunidade!');
        setType('');
        setDescription('');
        setLocation('');
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Algo inesperado aconteceu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text style={styles.title}>Oferecer Ajuda</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tipo de ajuda (ex: comida, companhia, transporte)"
          value={type}
          onChangeText={setType}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          placeholder="Descreva como você pode ajudar"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Localização (bairro/cidade)"
          value={location}
          onChangeText={setLocation}
        />

        <Pressable
          style={[styles.button, saving && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? 'Enviando...' : 'Enviar Oferta'}
          </Text>
        </Pressable>

        <Pressable style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Voltar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 40, // desce para fugir da câmera frontal
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00B8D9',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00B8D9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#00B8D9',
    fontSize: 16,
    fontWeight: '600',
  },
});



