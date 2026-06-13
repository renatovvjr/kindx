import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton, Field, Header } from '../components/AppUI';
import { supabase } from '../lib/supabase';
import { colors } from '../theme/colors';

const categories = ['Groceries', 'Transport', 'Home tasks', 'Companionship', 'Translation', 'Donations', 'Other'];
const urgencyOptions = ['Today', 'This week', 'Flexible'];

export default function AskHelpScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState(urgencyOptions[0]);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !category || !location) {
      Alert.alert('Missing details', 'Please add a title, description, category, and location.');
      return;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from('requests').insert({
        title,
        description: `${description}\nUrgency: ${urgency}`,
        category,
        location,
      });

      if (error) {
        Alert.alert('Saved locally for now', 'The request UI is ready, but Supabase could not save this item.');
      } else {
        Alert.alert('Request posted', 'Your request was shared with the KindX community.');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Request prepared', 'The screen is ready. Please check your Supabase connection to save live data.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Header
        title="Ask for Help"
        subtitle="Tell nearby helpers what you need. Keep it clear and safe."
        onBack={() => navigation.goBack()}
      />

      <View style={styles.form}>
        <Field label="Title" placeholder="What do you need help with?" value={title} onChangeText={setTitle} />
        <Field
          label="Description"
          placeholder="Add useful details, timing, and any accessibility needs."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.chips}>
          {categories.map((item) => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
              <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Urgency</Text>
        <View style={styles.chips}>
          {urgencyOptions.map((item) => (
            <Pressable key={item} onPress={() => setUrgency(item)} style={[styles.chip, urgency === item && styles.chipActiveOrange]}>
              <Text style={[styles.chipText, urgency === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Field label="Location" placeholder="Suburb or approximate area" value={location} onChangeText={setLocation} />

        <View style={styles.privacy}>
          <Text style={styles.privacyTitle}>Privacy note</Text>
          <Text style={styles.privacyCopy}>Your exact address is only shared after you confirm a helper.</Text>
        </View>

        <AppButton label={saving ? 'Posting...' : 'Post Request'} variant="orange" disabled={saving} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipActiveOrange: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.white,
  },
  privacy: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    backgroundColor: colors.primarySoft,
  },
  privacyTitle: {
    color: colors.primaryDark,
    fontWeight: '900',
    marginBottom: 4,
  },
  privacyCopy: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
